import ProfileSection from "../components/ProfileSection";
import logo from "/images/logo.png";
import DefaultPomoSection from "../components/DefaultPomoSection";
import { workf1s } from "../types/workFlow";
import { useState } from "react";
import SessionMini from "../components/SessionMini";
import { sessionTexts } from "../types/sessionTexts";
import { MainBtn } from "../components/Button/MainBtn";
import { TabButtons } from "../components/Button/TabButtons";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StartPomoBtn } from "../components/Button/StartPomoBtn";
import type { SavedSession } from "../types/types";

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
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 40, margin: '24px' }}>

            {/* 로고 + 프로필 */}
            <div style={{ width: '100%', display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
                <div style={{
                    width: '100%',
                    display: "grid",
                    gridTemplateColumns: "1fr auto 1fr",
                    alignItems: "center",
                    padding: "0 40px",  // ← margin 말고 padding
                    boxSizing: 'border-box',   // ← padding까지 포함해서 100%로 계산
                }}>
                    <div style={{ textAlign: 'left' }}>
                        창작자를 위한 뽀모도로, <br></br> 즐겁게 창작하는 나만의 루틴
                    </div>

                    <img src={logo} alt="로고" style={{ width: '220px', height: "auto", justifySelf: 'center' }} />

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'flex-end' }}>
                        <a>서비스 소개</a>
                        <a>사용방법</a>
                        <a>문의</a>
                    </div>
                </div>

                <div style={{ width: '50%' }}>
                    <ProfileSection />

                </div>
            </div>

            <TabButtons activeTab={activeTab} onTabChange={setActiveTab} tabs={["내 뽀모도로", "프리셋 뽀모도로"]} />

            {/* 중앙 레이아웃 */}

            {/* 선택된 탭에 따라 다른 콘텐츠 보여주기 */}
            {activeTab === "프리셋 뽀모도로" && (
                <div style={{ width: "100%", display: "flex", justifyContent: "center", gap: 20, transition: "all 0.3s ease" }}>

                    {/* DefaultPomoSection */}
                    <div
                        style={{
                            width: selectedPomo ? "70%" : "70%", // 선택 전/후 동일 (중앙 정렬 유지)
                            transition: "all 0.3s ease",
                        }}
                    >
                        <DefaultPomoSection onSelect={(pomoName: string) => setSelectedPomo(pomoName)} />
                    </div>

                    {/* 오른쪽 워크플로우 패널 */}
                    {selectedPomo && (
                        <div
                            style={{
                                width: "25%",
                                background: "#f9f9f9",
                                padding: 12,
                                borderRadius: 8,
                                flexShrink: 0,
                                transition: "all 0.3s ease",
                                overflowY: "auto",
                                maxHeight: "80vh",
                            }}
                        >
                            {filteredWorkflows.length > 0 ? (
                                filteredWorkflows.map(workflow => (
                                    <div key={workflow.index} style={{ marginBottom: 20 }}>
                                        <h3>{workflow.name}</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

                                            {workflow.steps.map((step) => {
                                                const session = sessionTexts[step.session]; // step.session → sessionTexts에서 매핑
                                                return (
                                                    <SessionMini
                                                        key={step.order}
                                                        title={session.name}   // 화면에 보여줄 이름
                                                        pomo={session.pomo}    // session에 매핑된 Pomo
                                                        time={step.duration}   // 시간 표시
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>선택된 Pomo와 관련된 워크플로우가 없습니다.</div>
                            )}
                            <MainBtn variant="start" />
                        </div>
                    )}
                </div>
            )}

            {activeTab === "내 뽀모도로" && (
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: 20,
                        transition: "all 0.3s ease",
                    }}
                >
                    {savedSessionIds.length > 0 ? (
                        savedSessionIds.map((id) => {
                            const savedSession = JSON.parse(localStorage.getItem(id) || "{}") as SavedSession;

                            if (!savedSession || !savedSession.droppedSessions) return null;

                            return (
                                <div
                                    key={id}
                                    style={{
                                        border: "1px solid #ddd",
                                        borderRadius: 12,
                                        padding: 16,
                                        background: "#fff",
                                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 12,
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    {/* 카드 상단: 제목 */}
                                    <h3 style={{ margin: 0, fontSize: 20, color: "#333" }}>
                                        {savedSession.title}
                                    </h3>

                                    {/* 세션 목록 */}
                                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                        {savedSession.droppedSessions.map((s) => (
                                            <SessionMini
                                                key={s.id}
                                                title={s.name}
                                                pomo={s.pomo}
                                                time={s.time}
                                            />
                                        ))}
                                    </div>

                                    {/* 카드 하단: 시작 버튼 */}
                                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                                        <StartPomoBtn
                                            label="시작하기"
                                            onClick={() => navigate(`/pomo/${id}`)}
                                        />
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div
                            style={{
                                textAlign: "center",
                                padding: 40,
                                color: "#999",
                                fontSize: 16,
                            }}
                        >
                            저장된 세션이 없습니다.
                        </div>
                    )}
                </div>
            )}






        </div>
    );
};

export default HomePage;
