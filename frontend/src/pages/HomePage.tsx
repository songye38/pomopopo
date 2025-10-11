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
import type { SavedSession } from "../types/types";
import { getRandomColor } from "../utils/random";
import NewPomoButton from "../components/Button/NewPomoButton";
import styles from '../styles/HomePage.module.css'

const HomePage = () => {
    const [selectedPomo, setSelectedPomo] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState("프리셋 뽀모도로");
    const [savedSessionIds, setSavedSessionIds] = useState<string[]>([]);
    const navigate = useNavigate();

    // 마운트 시 로컬스토리지에서 savedSessionIds 가져오기
    useEffect(() => {
        // 로컬스토리지에 있는 모든 key 가져오기
        const allKeys = Object.keys(localStorage);

        // savedSessionId 형식의 key만 필터링 (UUID 형식이면)
        const savedIds = allKeys.filter(key => {
            try {
                const item = JSON.parse(localStorage.getItem(key) || "");
                return item && item.droppedSessions; // SavedSession 구조가 있는 것만
            } catch {
                return false;
            }
        });

        setSavedSessionIds(savedIds);
        console.log("savedSessionIds 불러옴:", savedIds);
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
                        <a>서비스 소개</a>
                        <a>사용방법</a>
                        <a>문의</a>
                    </div>
                </div>

                <div style={{ width: '60%' }}>
                    <ProfileSection isLoggedIn={false} />
                </div>
            </div>

            <TabButtons activeTab={activeTab} onTabChange={setActiveTab} tabs={["내 뽀모도로", "프리셋 뽀모도로"]} />

            {/* 프리셋 뽀모도로 */}
            {activeTab === "프리셋 뽀모도로" && (
                <div className={styles['center-section']}>
                    <div className={styles['default-pomo']}>
                        <DefaultPomoSection onSelect={setSelectedPomo} />
                    </div>

                    {selectedPomo && (
                        <div className={styles['workflow-panel']}>
                            {filteredWorkflows.length > 0 ? (
                                filteredWorkflows.map(w => (
                                    <div key={w.index} className={styles['workflow-item']}>
                                        <h3>{w.name}</h3>
                                        <div className={styles['workflow-steps']}>
                                            {w.steps.map(step => {
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

                            <div style={{ marginTop: "auto" }}>
                                <StartPomoBtn width="234px" onClick={() => navigate(`/pomo/${filteredWorkflows[0]?.id}`)} />
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* 내 뽀모도로 */}
            {activeTab === "내 뽀모도로" && (
                <div className={styles['saved-sessions-grid']}>
                    <NewPomoButton />
                    {savedSessionIds.length > 0 ? (
                        savedSessionIds.map(id => {
                            const saved = JSON.parse(localStorage.getItem(id) || "{}") as SavedSession;
                            if (!saved?.droppedSessions) return null;

                            return (
                                <div key={id} className={styles['saved-session-card']}>
                                    <h3 className={styles['saved-session-title']}>{saved.title}</h3>
                                    <div style={{ display: "flex", gap: 8 }}>
                                        {saved.droppedSessions.map(s => (
                                            <div key={s.id} className={styles['session-circle']} style={{ backgroundColor: getRandomColor() }}>
                                                {s.name}
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                                        <StartPomoBtn label="시작하기" onClick={() => navigate(`/pomo/${id}`)} />
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className={styles['empty-state']}>저장된 뽀모도로가 없습니다.</div>
                    )}
                </div>
            )}

        </div>

    );
};

export default HomePage;
