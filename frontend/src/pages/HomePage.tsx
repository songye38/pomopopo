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

const HomePage = () => {

    const [selectedPomo, setSelectedPomo] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState("프리셋 뽀모도로");
    const [savedSessionIds, setSavedSessionIds] = useState<string[]>([]);
    const navigate = useNavigate();
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isHowToOpen, setHowToOpen] = useState(false);
    const [pomodoros, setPomodoros] = useState<PomodoroOut[]>([]);




    // // 마운트 시 로컬스토리지에서 savedSessionIds 가져오기
    // useEffect(() => {
    //     // 로컬스토리지에 있는 모든 key 가져오기
    //     const allKeys = Object.keys(localStorage);

    //     // savedSessionId 형식의 key만 필터링 (UUID 형식이면)
    //     const savedIds = allKeys.filter(key => {
    //         try {
    //             const item = JSON.parse(localStorage.getItem(key) || "");
    //             return item && item.droppedSessions; // SavedSession 구조가 있는 것만
    //         } catch {
    //             return false;
    //         }
    //     });

    //     setSavedSessionIds(savedIds);
    //     console.log("savedSessionIds 불러옴:", savedIds);
    // }, []);

    // useEffect(() => {
    //     if (selectedPomo) {
    //         setIsPanelOpen(true); // 새로운 Pomo 선택 시 항상 패널 열기
    //     }
    // }, [selectedPomo]);

    useEffect(() => {
        const getPomodoros = async () => {
            try {
                const data = await fetchUserPomodoros(); // 서버에서 가져오기
                setPomodoros(data);

                // 서버 데이터 기준으로 id 리스트 뽑기
                const ids = data.map(p => p.id);
                setSavedSessionIds(ids);

                console.log("savedSessionIds 서버에서 불러옴:", ids,savedSessionIds);
            } catch (error) {
                console.error("뽀모도로 불러오기 실패:", error);
                setSavedSessionIds([]);
            }
        };

        getPomodoros();
        console.log("가져온 뽀모도로들:", pomodoros);
    }, []);



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

            <TabButtons activeTab={activeTab} onTabChange={setActiveTab} tabs={["내 뽀모도로", "프리셋 뽀모도로"]} />

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
                <div className={styles['saved-sessions-grid']}>
                    <NewPomoButton />

                    {pomodoros.length > 0 ? (
                        pomodoros.map(p => (
                            <div key={p.id} className={styles['saved-session-card']}>
                                <h3 className={styles['saved-session-title']}>{p.title}</h3>

                                <div style={{ display: "flex", gap: 8 }}>
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

                // <div className={styles['saved-sessions-grid']}>
                //     <NewPomoButton />
                //     {savedSessionIds.length > 0 ? (
                //         savedSessionIds.map(id => {
                //             const saved = JSON.parse(localStorage.getItem(id) || "{}") as SavedSession;
                //             if (!saved?.droppedSessions) return null;

                //             return (
                //                 <div key={id} className={styles['saved-session-card']}>
                //                     <h3 className={styles['saved-session-title']}>{saved.title}</h3>
                //                     <div style={{ display: "flex", gap: 8 }}>
                //                         {saved.droppedSessions.map(s => (
                //                             <div key={s.id} className={styles['session-circle']} style={{ backgroundColor: getRandomColor() }}>
                //                                 {s.name}
                //                             </div>
                //                         ))}
                //                     </div>
                //                     <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                //                         <StartPomoBtn label="시작하기" onClick={() => navigate(`/pomo/${id}`)} />
                //                     </div>
                //                 </div>
                //             );
                //         })
                //     ) : (
                //         <div className={styles['empty-state']}>저장된 뽀모도로가 없습니다.</div>
                //     )}
                // </div>
            )}

        </div>

    );
};

export default HomePage;
