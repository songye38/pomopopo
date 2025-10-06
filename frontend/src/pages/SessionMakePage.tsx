import Session from "../components/Session";
import { sessionTexts } from "../types/sessionTexts";
import SessionMini from "../components/SessionMini";
import { workf1s } from "../types/workFlow";
import { type Workflow } from "../types/types";

const SessionMakePage = () => {
    return (
        <div style={{ display: "flex", flexDirection: "row", gap: 40, padding: 40 }}>
            <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 20 }}>
                {Object.values(sessionTexts).map((session, idx) => (
                    <Session
                        key={idx}
                        title={session.name}
                        description={`🎯${session.guide}`}
                        purpose={`${session.target}<br/>${session.effect}`}
                        pomo={session.pomo}
                    />
                ))}
            </div>
            {/* <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 20 }}>
                {Object.values(sessionTexts).map((session, idx) => (
                    <SessionMini
                        key={idx}
                        title={session.name}
                        pomo={session.pomo}
                        time={session.time}
                    />
                ))}
            </div> */}
            <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 20 }}>
                {workf1s.map((workflow: Workflow) => (
                    <div key={workflow.name} style={{ marginBottom: 40 }}>
                        <h3>{workflow.name}</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            {workflow.steps.map((step) => {
                                const session = sessionTexts[step.session]; // sessionTexts에서 상세 정보 가져오기
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
                ))}

            </div>

        </div>
    );
};

export default SessionMakePage;
