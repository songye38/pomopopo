import { DndProvider, useDrag, useDrop } from 'react-dnd';
import type { DragSourceMonitor } from 'react-dnd';
import type { DropTargetMonitor } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import type { SessionContent } from "./../types/types"
import { useState, type ReactNode } from 'react';
import Session from '../components/Session';
import SessionExpanded from '../components/SessionExpanded';


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
                minHeight: "100vh",
                backgroundColor: "#f9f9f9",
                border: "2px dashed #ccc",
                width: '70%',
            }}
        >
            {/* Drop here */}
            {children}
        </div>
    );
};


export const DragDropPage = ({ sessions }: DragDropPageProps) => {
    const [droppedSessions, setDroppedSessions] = useState<SessionContent[]>([]);

    const handleDrop = (session: SessionContent) => {
        setDroppedSessions((prev) => [...prev, session]);
    };

    const handleRemove = (sessionToRemove: SessionContent) => {
        setDroppedSessions(prev => prev.filter(s => s !== sessionToRemove));
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ display: "flex", gap: 40, padding: 20, height: '100vh', width: '100%' }}>
                {/* 왼쪽 드래그 영역 */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
                    {sessions.map((s, idx) => (
                        <DraggableSession key={idx} session={s} />
                    ))}
                </div>

                {/* 오른쪽 드롭 영역 */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
                    {/* DropZone + droppedSessions를 하나의 flex column 안에 */}
                    <DropZone onDrop={handleDrop}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
                            {droppedSessions.map((s, idx) => (
                                <SessionExpanded
                                    key={idx}
                                    session={s}
                                    title={s.name}
                                    description={`🎯${s.guide}`}
                                    pomo={s.pomo}
                                    time={"25"}
                                    onRemove={handleRemove} // 상위 콜백
                                />
                            ))}
                        </div>
                    </DropZone>
                </div>
            </div>
        </DndProvider>
    );
};

//   title,
//   description,
//   pomo,
//   backgroundColor,
//   time
