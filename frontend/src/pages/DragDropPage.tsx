import { DndProvider, useDrag, useDrop } from 'react-dnd';
import type { DragSourceMonitor } from 'react-dnd';
import type { DropTargetMonitor } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import type { SessionContent, SavedSession } from "./../types/types"
import { useState, type ReactNode } from 'react';
import Session from '../components/Session';
import SessionExpanded from '../components/SessionExpanded';
import { MainBtn } from '../components/Button/MainBtn';
import arrowLeft from "/images/arrow-narrow-left.png";
import { useNavigate } from "react-router-dom";
import { generateRandomTitle } from '../utils/random';
import { useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";
import { toast } from 'react-toastify';
import { StartPomoBtn } from '../components/Button/StartPomoBtn';
import { useParams } from "react-router-dom";


type DraggableSessionProps = {
    session: SessionContent;
};

type DropZoneProps = {
    onDrop: (session: SessionContent) => void;
    children?: ReactNode; // ← 여기 추가
};

type DragDropPageProps = {
    sessions: SessionContent[]; // 배열 안 객체 타입 지정
};

const ItemTypes = {
    SESSION: "session",
};


export const DraggableSession = ({ session }: DraggableSessionProps) => {
    const [{ isDragging }, drag] = useDrag<
        { session: SessionContent },
        void,
        { isDragging: boolean }
    >(() => ({
        type: ItemTypes.SESSION,
        item: { session },
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={(node) => {
                drag(node ?? null); // null일 경우도 명시적으로 전달
            }}
            style={{
                opacity: isDragging ? 0.5 : 1, // 드래그 중 투명 처리
                cursor: "grab",
            }}
        >
            {/* 기존 Session 컴포넌트를 그대로 렌더링 */}
            <Session
                title={session.name}
                description={`🎯${session.guide}`}
                purpose={`${session.target}<br/>${session.effect}`}
                pomo={session.pomo}
            />
        </div>
    );
};

// 드롭 가능한 영역
export const DropZone = ({ onDrop, children }: DropZoneProps) => {
    const [, drop] = useDrop<{ session: SessionContent }, void, unknown>(() => ({
        accept: ItemTypes.SESSION,
        drop: (item: { session: SessionContent }, _monitor: DropTargetMonitor) => {
            console.log("Dropped session:", item.session, _monitor);
            onDrop(item.session); // 이제 안전하게 접근 가능
        },
    }));

    return (
        <div
            ref={(node) => {
                drop(node ?? null); // null일 경우도 명시적으로 전달
            }}
            style={{
                flex: 1,
                padding: 20,
                backgroundColor: "#f9f9f9",
                border: "2px dashed #ccc",
                borderRadius: 16,
                width: '90%',
                paddingBottom: 200,
            }}
        >
            {/* Drop here */}
            {children}
        </div>
    );
};


export const DragDropPage = ({ sessions }: DragDropPageProps) => {
    const { id } = useParams<{ id: string }>(); // URL에서 id 가져오기
    const [droppedSessions, setDroppedSessions] = useState<SessionContent[]>([]);
    const navigate = useNavigate();
    const [title, setTitle] = useState(generateRandomTitle());
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

    // const handleDrop = (session: SessionContent) => {
    //     setDroppedSessions((prev) => [...prev, session]);

    // };
    const handleDrop = (session: SessionContent) => {
        setDroppedSessions(prev => [
            ...prev,
            { ...session, id: uuidv4() } // 고유 id 추가
        ]);
    };

    // 개별 세션 저장
    const saveDroppedSessions = (title: string, droppedSessions: SessionContent[]) => {
        if (!id) {
            toast.error("ID가 존재하지 않습니다.");
            return;
        }

        const saveObj: SavedSession = {
            id, // 이제 uuid 대신 URL param 사용
            title,
            droppedSessions,
            savedAt: Date.now(),
        };

        localStorage.setItem(id, JSON.stringify(saveObj));

        // 전체 목록 관리용 배열 업데이트 (중복 체크)
        const existingIds: string[] = JSON.parse(localStorage.getItem("savedSessionIds") || "[]");
        if (!existingIds.includes(id)) {
            localStorage.setItem("savedSessionIds", JSON.stringify([...existingIds, id]));
        }

        setCurrentSessionId(id);
        toast.success("성공! 세션이 저장되었습니다!");
    };


    useEffect(() => {
        console.log("droppedSessions 업데이트됨:", droppedSessions);
    }, [droppedSessions]);

    // const handleRemove = (sessionToRemove: SessionContent) => {
    //     setDroppedSessions(prev => prev.filter(s => s !== sessionToRemove));
    // };

    return (
        <div style={{ margin: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', margin: "-2px 4px 8px 12px", width: '100%' }}>
                <div
                    style={{ display: 'flex', flexDirection: 'row', gap: 12, cursor: 'pointer' }}
                    onClick={() => navigate("/")} // 메인 페이지로 이동
                >
                    <img src={arrowLeft} alt="로고" style={{ width: '24px', height: "auto" }} />
                    <div>메인 페이지로 돌아가기</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 12 }}>
                    {/* 제목 입력창 */}
                    <input
                        type="text"
                        placeholder="제목을 입력하세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{
                            padding: "6px 12px",
                            fontSize: 18,
                            fontWeight: "500",
                            borderRadius: 6,
                            border: "2px solid #c9c9c9",
                            width: '150px',
                            background: 'white',
                            color: 'black'
                        }}
                    />
                    <MainBtn
                        variant="save"
                        onClick={() => saveDroppedSessions(title, droppedSessions)}
                    />
                    <StartPomoBtn
                        width="234px"
                        onClick={() => {
                            if (!currentSessionId) {
                                // 저장되지 않은 경우 자동 저장
                                saveDroppedSessions(title, droppedSessions);
                                // 저장 직후 currentSessionId가 set되므로, 바로 navigate
                                if (id) {
                                    navigate(`/pomo/${id}`);
                                }
                            } else {
                                navigate(`/pomo/${currentSessionId}`);
                            }
                        }}
                    />
                </div>
            </div>
            <DndProvider backend={HTML5Backend}>
                <div style={{ display: "flex", gap: 40, padding: '50px 20px', height: '100%', width: '100%', flexDirection: 'row', overflowY: 'hidden', overflowX: 'hidden', boxSizing: 'border-box' }}>
                    {/* 아래 드래그 영역 */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: '25%', height: '90vh', overflowY: 'auto' }}>
                        {sessions.map((s, idx) => (
                            <DraggableSession key={idx} session={s} />
                        ))}
                    </div>
                    {/* 위 드롭 영역 */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, height: '90vh', width: '75%', overflowY: 'auto' }}>
                        {/* DropZone + droppedSessions를 하나의 flex column 안에 */}
                        <DropZone onDrop={handleDrop}>
                            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
                                {droppedSessions.map((s, idx) => (
                                    <SessionExpanded
                                        key={idx}
                                        session={s}
                                        title={s.name}
                                        description={`🎯${"나만의 목표를 적어보자"}`}
                                        pomo={s.pomo}
                                        time={s.time}
                                        onRemove={(sessionToRemove) => {
                                            setDroppedSessions(prev => prev.filter(s => s !== sessionToRemove));
                                        }}
                                        onUpdate={(updatedSession) => {
                                            setDroppedSessions(prev =>
                                                prev.map(s =>
                                                    s.id === updatedSession.id ? updatedSession : s
                                                )
                                            );
                                        }}
                                    />
                                ))}
                            </div>
                        </DropZone>
                    </div>
                </div>
            </DndProvider>
        </div>
    );
};