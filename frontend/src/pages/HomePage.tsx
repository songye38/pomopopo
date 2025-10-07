import ProfileSection from "../components/ProfileSection";
import logo from "/images/logo.png";
import DefaultPomoSection from "../components/DefaultPomoSection";
import { workf1s } from "../types/workFlow";
import { useState } from "react";
import SessionMini from "../components/SessionMini";
import { sessionTexts } from "../types/sessionTexts";
import {MainBtn} from "../components/Button/MainBtn";

const HomePage = () => {
    const [selectedPomo, setSelectedPomo] = useState<string | null>(null);

    // 선택된 Pomo와 관련된 워크플로우
    const filteredWorkflows = selectedPomo
        ? workf1s.filter(workflow => workflow.index === selectedPomo)
        : [];

    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 40,margin:'24px' }}>

            {/* 로고 + 프로필 */}
            <div style={{ width: "50%", display: "flex", flexDirection: "column", alignItems: "center", gap: 40 }}>
                <img src={logo} alt="로고" style={{ width: '160px', height: "auto" }} />
                <div> 창작자를 위한 뽀모도로, 즐겁게 창작하는 나만의 루틴</div>
                <ProfileSection />
            </div>

            {/* 중앙 레이아웃 */}
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
        </div>
    );
};

export default HomePage;
