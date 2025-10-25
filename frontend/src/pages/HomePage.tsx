import ProfileSection from "../components/ProfileSection";
import logo from "/images/logo.png";
import DefaultPomoSection from "../components/DefaultPomoSection";
import { workf1s } from "../types/workFlow";
import { useState } from "react";
import SessionMini from "../components/SessionMini";
import { sessionTexts } from "../types/sessionTexts";
import { TabButtons } from "../components/Button/TabButtons";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StartPomoBtn } from "../components/Button/StartPomoBtn";
import { getRandomColor } from "../utils/random";
import NewPomoButton from "../components/Button/NewPomoButton";
import styles from '../styles/HomePage.module.css'
import ServiceDescModal from "../components/ServiceModal";
import HowToUseModal from "../components/HowtouseModal";
import { fetchUserPomodoros } from "../api/sessions";
import type { PomodoroOut } from "../types/types";
import { deletePomodoroById } from "../api/sessions";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

const HomePage = () => {

    const [selectedPomo, setSelectedPomo] = useState<string | null>(null);
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState("프리셋 뽀모도로");
    const [savedSessionIds, setSavedSessionIds] = useState<string[]>([]);
    const navigate = useNavigate();
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isHowToOpen, setHowToOpen] = useState(false);
    const [pomodoros, setPomodoros] = useState<PomodoroOut[]>([]);

    // 컴포넌트 내부 또는 hooks 위쪽에 정의
    const handleDeletePomodoro = async (id: string) => {
        const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
        if (!confirmDelete) return;

        try {
            await deletePomodoroById(id);  // 서버에 DELETE 요청
            // 상태 업데이트
            setPomodoros(prev => prev.filter(pomo => pomo.id !== id));
            toast.success("삭제 완료!");
        } catch (error) {
            toast.error("삭제 실패. 다시 시도해주세요.");
            console.error(error);
        }
    };


    useEffect(() => {
        if (!user) {
            // 로그아웃 상태라면 뽀모 리스트 초기화
            setPomodoros([]);
            setSavedSessionIds([]);
            return;
        }

        const getPomodoros = async () => {
            try {
                const data = await fetchUserPomodoros(); // 서버에서 가져오기
                setPomodoros(data);

                const ids = data.map(p => p.id);
                setSavedSessionIds(ids);

                console.log("서버에서 가져온 뽀모도로 전체 데이터:", data);
                console.log("저장된 세션 ID들:", savedSessionIds);
            } catch (error) {
                console.error("뽀모도로 불러오기 실패:", error);
                setSavedSessionIds([]);
            }
        };

        getPomodoros();
    }, [user]);  // 로그인 상태가 바뀔 때마다 실행





    // 선택된 Pomo와 관련된 워크플로우
    const filteredWorkflows = selectedPomo
        ? workf1s.filter(workflow => workflow.index === selectedPomo)
        : [];

    return (

        <div className={styles.container}>

            {/* 헤더 */}
            <div className={styles.header}>
                <div className={styles['header-grid']}>
                    <div className={styles['header-left']}>
                        창작자를 위한 뽀모도로, <br /> 즐겁게 창작하는 나만의 루틴
                    </div>
                    <img src={logo} alt="로고" className={styles['header-logo']} />
                    <div className={styles['header-right']}>
                        <a className={styles['info']} onClick={() => setModalOpen(true)}>🛈 서비스 소개</a>
                        <ServiceDescModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
                        <a className={styles['info']} onClick={() => setHowToOpen(true)}>🍀 사용방법</a>
                        <HowToUseModal isOpen={isHowToOpen} onClose={() => setHowToOpen(false)} />
                        <a className={styles['info']} onClick={() => setModalOpen(true)}>💖 문의</a>
                    </div>
                </div>

                <div style={{ width: '60%' }}>
                    <ProfileSection />
                </div>
            </div>

            <TabButtons activeTab={activeTab} onTabChange={setActiveTab} tabs={["내 뽀모도로", "프리셋 뽀모도로", "기록"]} />

            {/* 프리셋 뽀모도로 */}
            {activeTab === "프리셋 뽀모도로" && (
                <div className={styles['center-section']}>
                    <div className={styles['default-pomo']}>
                        <DefaultPomoSection onSelect={setSelectedPomo} />
                    </div>

                    {/* Dim 처리 */}


                    {selectedPomo && isPanelOpen && (
                        <div className={`${styles['workflow-panel']} ${isPanelOpen ? styles.open : ''}`}>


                            {filteredWorkflows.length > 0 ? (
                                filteredWorkflows.map((w) => (
                                    <div key={w.index} className={styles['workflow-item']}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <div className={styles['workflow-item-header']}>
                                                <h3>{w.name} Mode</h3>

                                                {/* 닫기 버튼 */}
                                                <button
                                                    className={styles.closeButton}
                                                    onClick={() => setIsPanelOpen(false)}
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                            <div className={styles['workflow-item-description']}>
                                                {w.msg}
                                            </div>
                                        </div>
                                        <div className={styles['workflow-steps']}>
                                            {w.steps.map((step) => {
                                                const session = sessionTexts[step.session];
                                                return (
                                                    <SessionMini
                                                        key={step.order}
                                                        title={session.name}
                                                        pomo={session.pomo}
                                                        time={step.duration}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>선택된 Pomo와 관련된 워크플로우가 없습니다.</div>
                            )}

                            <div style={{ marginTop: "auto", width: "100%", display: "flex", justifyContent: "center" }}>
                                <StartPomoBtn
                                    width="90%" // 부모보다 살짝 작게
                                    onClick={() => navigate(`/pomo/${filteredWorkflows[0]?.id}`)}
                                />
                            </div>
                        </div>
                    )}

                </div>
            )}

            {/* 내 뽀모도로 */}
            {activeTab === "내 뽀모도로" && (
                <div
                    className={styles['saved-sessions-grid']}
                    style={
                        !user
                            ? {
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "60vh", // 원하는 높이 지정
                                gap: "16px",
                            }
                            : {}
                    }
                >
                    {user ? (
                        <>
                            <NewPomoButton />
                            {pomodoros.length > 0 ? (
                                pomodoros.map(p => (
                                    <div key={p.id} className={styles['saved-session-card']}>
                                        <div className={styles['saved-session-card-inner']}>
                                            <h3 className={styles['saved-session-title']}>{p.title}</h3>
                                            <div className={styles['info-buttons']}>
                                                <div className={styles['info-text']}>수정 | </div>
                                                <div
                                                    className={styles['info-text']}
                                                    onClick={() => handleDeletePomodoro(p.id)}
                                                >
                                                    삭제
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles['session-circles-container']}>
                                            {p.sessions.map(s => (
                                                <div
                                                    key={s.order}
                                                    className={styles['session-circle']}
                                                    style={{ backgroundColor: getRandomColor() }}
                                                >
                                                    {s.goal}
                                                </div>
                                            ))}
                                        </div>

                                        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                                            <StartPomoBtn label="시작하기" onClick={() => navigate(`/pomo/${p.id}`)} />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className={styles['empty-state']}>저장된 뽀모도로가 없습니다.</div>
                            )}
                        </>
                    ) : (
                        <div>
                            <NewPomoButton label="임시 뽀모도로 만들기" />
                            <div className={styles['empty-state']}>
                                로그인 없이도 뽀모도로를 바로 시작할 수 있어요.  <br />
                                하지만 기록을 남기고 싶다면, 계정을 만들어 주세요 — 당신의 집중력, 놓치지 않기 위해서!
                            </div>
                        </div>
                    )}
                </div>
            )}



            {/* 기록 탭 */}
            {activeTab === "기록" && (
                <div className={styles['saved-sessions-grid']}>
                    <NewPomoButton />

                    {pomodoros.length > 0 ? (
                        pomodoros.map(p => (
                            <div key={p.id} className={styles['saved-session-card']}>
                                <h3 className={styles['saved-session-title']}>{p.title}</h3>
                                <div className="saved-session-card-inner">
                                    {p.sessions.map(s => (
                                        <div
                                            key={s.order} // 서버 세션 id 없으면 order를 key로 사용
                                            className={styles['session-circle']}
                                            style={{ backgroundColor: getRandomColor() }}
                                        >
                                            {s.goal} {/* 서버에서는 guide 대신 goal로 내려줌 */}
                                        </div>
                                    ))}
                                </div>

                                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                                    <StartPomoBtn label="시작하기" onClick={() => navigate(`/pomo/${p.id}`)} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={styles['empty-state']}>저장된 뽀모도로가 없습니다.</div>
                    )}
                </div>
            )}

        </div>

    );
};

export default HomePage;
