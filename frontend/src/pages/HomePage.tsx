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
                                width: "20%",
                                height: 'auto',
                                background: "white",
                                borderRadius: 8,
                                flexShrink: 0,
                                transition: "all 0.3s ease",
                                overflowY: "auto",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                                display: "flex",
                                flexDirection: "column", // 🔥 세로로 쌓기
                                boxSizing: "border-box",
                                overflowX: 'hidden',
                                padding: '20px',

                            }}
                        >
                            <div style={{ flexGrow: 1 }}>
                                {filteredWorkflows.length > 0 ? (
                                    filteredWorkflows.map(workflow => (
                                        <div
                                            key={workflow.index}
                                            style={{ marginBottom: 20, cursor: "pointer" }}
                                        >
                                            <h3>{workflow.name}</h3>
                                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                                {workflow.steps.map(step => {
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
                            </div>

                            {/* 버튼을 항상 아래에 붙이기 */}
                            <div style={{ marginTop: "auto" }}>
                                <StartPomoBtn
                                    width="234px"
                                    onClick={() => {
                                        if (filteredWorkflows.length > 0) {
                                            navigate(`/pomo/${filteredWorkflows[0].id}`);
                                        } else {
                                            alert("워크플로우를 찾을 수 없습니다.");
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    )}

                </div>
            )}

            {activeTab === "내 뽀모도로" && (
                <div
                    style={{
                        width: "70%",
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)", // 항상 3열
                        gap: 20,
                        padding: "20px",
                        transition: "all 0.3s ease",
                    }}
                >
                    {/* 항상 보이는 새 세션 만들기 버튼 */}
                    <NewPomoButton />
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
                                    {/* <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                        {savedSession.droppedSessions.map((s) => (
                                            <SessionMini
                                                key={s.id}
                                                title={s.name}
                                                pomo={s.pomo}
                                                time={s.time}
                                            />
                                        ))}
                                    </div> */}
                                    {/* 세션 목록 (간단히 카드 형태) */}
                                    <div style={{ display: "flex", gap: 8 }}>
                                        {savedSession.droppedSessions.map((s) => (
                                            <div
                                                key={s.id}
                                                style={{
                                                    backgroundColor: getRandomColor(), // 랜덤 색상
                                                    width: '60px',
                                                    height: '60px',
                                                    borderRadius: '50%',              // 원으로 만들기
                                                    display: 'flex',                  // flex로 중앙 정렬
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: "#fff",
                                                    fontWeight: "bold",
                                                    fontSize: 12,                     // 글자 길이에 맞춰 조금 작게
                                                    textAlign: "center",
                                                    padding: 4,                        // 혹시 긴 글자 대비
                                                    overflow: 'hidden',               // 글자가 넘치면 잘림
                                                }}
                                            >
                                                {s.name}
                                            </div>

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
