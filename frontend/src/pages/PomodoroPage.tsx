import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { SessionContent, SavedSession } from "../types/types";
import { sessionImages } from "../types/images";
import LogoutBtn from "../components/Button/LogoutBtn";
import { workf1s } from "../types/workFlow";
import { sessionTexts } from "../types/sessionTexts";


export default function PomodoroPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [sessions, setSessions] = useState<SessionContent[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0); // 초 단위
    const [isRunning, setIsRunning] = useState(false);

    // const timerRef = useRef<number | null>(null);

    // useEffect(() => {
    //     if (!id) return;

    //     const target = JSON.parse(localStorage.getItem(id) || "{}") as SavedSession;
    //     if (target && target.droppedSessions) {
    //         setSessions(target.droppedSessions);
    //         if (target.droppedSessions.length > 0) {
    //             setTimeLeft(parseInt(target.droppedSessions[0].time) * 60);
    //         }
    //     } else {
    //         alert("저장된 세션을 찾을 수 없습니다.");
    //         navigate("/");
    //     }
    // }, [id]);
    useEffect(() => {
        if (!id) return;

        // 1️⃣ 로컬스토리지에서 찾아보기 (사용자 세션)
        const savedSession = JSON.parse(localStorage.getItem(id) || "null") as SavedSession | null;
        if (savedSession && savedSession.droppedSessions?.length) {
            setSessions(savedSession.droppedSessions);
            setTimeLeft(parseInt(savedSession.droppedSessions[0].time) * 60);
            return;
        }


        console.log("id",id);
        // 2️⃣ 워크플로우에서 찾아보기 (기본 세션)
        const workflow = workf1s.find(wf => wf.id === id);
        console.log("workflow",workflow);
        if (workflow) {
            // steps 배열을 SessionContent[]로 변환
            const workflowSessions: SessionContent[] = workflow.steps.map(step => {
                const sessionTemplate = sessionTexts[step.session]; // ex: diverge
                return {
                    ...sessionTemplate,
                    time: step.duration.replace("분", ""), // 문자열 "25분" → 숫자 "25"
                    pomo: sessionTemplate.pomo,
                    id: `${workflow.id}-${step.order}` // workflow용 고유 id
                };
            });
            setSessions(workflowSessions);
            setTimeLeft(parseInt(workflowSessions[0].time) * 60);
            return;
        }

        // 3️⃣ 둘 다 아니면 에러
        alert("세션을 찾을 수 없습니다.");
        navigate("/");
    }, [id]);


    // 타이머 로직
    useEffect(() => {
        if (!isRunning) return; // 타이머가 안 돌고 있으면 바로 종료

        const timer = setTimeout(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            } else {
                // 시간 다 되면 다음 세션으로 이동
                if (currentIndex < sessions.length - 1) {
                    const nextIndex = currentIndex + 1;
                    setCurrentIndex(nextIndex);
                    setTimeLeft(parseInt(sessions[nextIndex].time) * 60);
                } else {
                    setIsRunning(false);
                    alert("모든 세션 완료!");
                }
            }
        }, 1000);

        // cleanup: 항상 void 반환
        return () => {
            clearTimeout(timer);
        };
    }, [isRunning, timeLeft, currentIndex, sessions]);








    const startPause = () => setIsRunning(!isRunning);
    const reset = () => {
        setTimeLeft(parseInt(sessions[currentIndex].time) * 60);
        setIsRunning(false);
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    if (!sessions.length) return <div>세션을 불러오는 중...</div>;

    return (
        <div
            style={{
                padding: 20,
                borderRadius: 12,
                backgroundImage: `url(${sessionImages[sessions[currentIndex].pomo]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "white",
                minHeight: "100vh", // 화면 절반
            }}
        >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <LogoutBtn />
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column", // 세로로 쌓기
                    // justifyContent: "center", 
                    alignItems: "center", // 수평 중앙
                    height: "100vh", // 화면 전체 높이
                    gap: 20, // 요소 간 간격
                    textAlign: "center", // 글자 중앙 정렬
                    marginTop: '20px'
                }}
            >
                <div style={{ color: "black", fontSize: '60px', fontWeight: '600', fontFamily: "Outfit" }}>{sessions[currentIndex].pomo}</div>
                <div style={{ color: "black", fontSize: '20px', fontWeight: '500' }}>🎯{sessions[currentIndex].guide}</div>

                <div style={{ fontSize: 200, color: "black", fontFamily: "Outfit" }}>{formatTime(timeLeft)}</div>

                <div style={{ display: "flex", gap: 12 }}>
                    <button onClick={startPause}>{isRunning ? "일시정지" : "시작"}</button>
                    <button onClick={reset}>리셋</button>
                    {currentIndex < sessions.length - 1 && (
                        <button
                            onClick={() => {
                                const nextIndex = currentIndex + 1;
                                setCurrentIndex(nextIndex);
                                setTimeLeft(parseInt(sessions[nextIndex].time) * 60);
                            }}
                        >
                            다음 세션
                        </button>
                    )}
                </div>
            </div>

        </div>

    );
}
