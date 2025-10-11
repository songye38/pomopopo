import { DndProvider, useDrag, useDrop } from 'react-dnd';
import type { DragSourceMonitor } from 'react-dnd';
import type { DropTargetMonitor } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import type { SessionContent, SavedSession } from "./../types/types"
import { useState, type ReactNode } from 'react';
import Session from '../components/SessionDefault';
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
import styles from '../styles/DragDropPage.module.css'


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
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.backButton} onClick={() => navigate("/")}>
          <img src={arrowLeft} alt="로고" />
          <div>메인 페이지로 돌아가기</div>
        </div>
        <div className={styles.headerRight}>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.titleInput}
          />
          <MainBtn variant="save" onClick={() => saveDroppedSessions(title, droppedSessions)} />
          <StartPomoBtn
            width="auto"
            onClick={() => {
              if (!currentSessionId) {
                saveDroppedSessions(title, droppedSessions);
                if (id) navigate(`/pomo/${id}`);
              } else {
                navigate(`/pomo/${currentSessionId}`);
              }
            }}
          />
        </div>
      </div>

      <DndProvider backend={HTML5Backend}>
        <div className={styles.dragDropWrapper}>
          {/* 드래그 가능한 세션 */}
          <div className={styles.sessionList}>
            {sessions.map((s, idx) => (
              <DraggableSession key={idx} session={s} />
            ))}
          </div>

          {/* 드롭 영역 */}
          <div className={styles.dropAreaWrapper}>
            <DropZone onDrop={handleDrop}>
              <div className={styles.droppedSessions}>
                {droppedSessions.map((s, idx) => (
                  <SessionExpanded
                    key={idx}
                    session={s}
                    title={s.name}
                    description={`🎯${"나만의 목표를 적어보자"}`}
                    pomo={s.pomo}
                    time={s.time}
                    onRemove={(sessionToRemove) =>
                      setDroppedSessions(prev => prev.filter(s => s !== sessionToRemove))
                    }
                    onUpdate={(updatedSession) =>
                      setDroppedSessions(prev =>
                        prev.map(s => (s.id === updatedSession.id ? updatedSession : s))
                      )
                    }
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