import Session from "../components/session";
import { sessionTexts } from "../types/sessionTexts";

const SessionMakePage = () => {
    return (
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
    );
};

export default SessionMakePage;
