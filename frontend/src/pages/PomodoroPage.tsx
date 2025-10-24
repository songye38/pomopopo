import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { SessionContent, SavedSession } from "../types/types";
import { sessionImages } from "../types/images";
import LogoutBtn from "../components/Button/LogoutBtn";
import { workf1s } from "../types/workFlow";
import { sessionTexts } from "../types/sessionTexts";
import styles from "../styles/PomodoroPage.module.css";

export default function PomodoroPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [sessions, setSessions] = useState<SessionContent[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isMobile, setIsMobile] = useState(false);


    //화면 크기 감지
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);


    //세션 불러오기
    useEffect(() => {
        if (!id) return;

        //세션이 있다면 세션을 불러오기
        const savedSession = JSON.parse(localStorage.getItem(id) || "null") as SavedSession | null;
        if (savedSession && savedSession.droppedSessions?.length) {
            setSessions(savedSession.droppedSessions);
            setTimeLeft(parseInt(savedSession.droppedSessions[0].time) * 60);
            return;
        }

        //혹은 기본 워크플로우에서 세션 불러오기
        const workflow = workf1s.find(wf => wf.id === id);
        if (workflow) {
            const workflowSessions: SessionContent[] = workflow.steps.map(step => {
                const sessionTemplate = sessionTexts[step.session];
                return {
                    ...sessionTemplate,
                    time: step.duration.replace("분", ""),
                    pomo: sessionTemplate.pomo,
                    id: `${workflow.id}-${step.order}`
                };
            });
            setSessions(workflowSessions);
            setTimeLeft(parseInt(workflowSessions[0].time) * 60);
            return;
        }

        //세션을 찾을 수 없다면 홈으로 이동
        alert("세션을 찾을 수 없습니다.");
        navigate("/");
    }, [id]);


    //실제 뽀모도로 타이머 로직
    useEffect(() => {
        if (!isRunning) return;

        const timer = setTimeout(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            } else if (currentIndex < sessions.length - 1) {
                const nextIndex = currentIndex + 1;
                setCurrentIndex(nextIndex);
                setTimeLeft(parseInt(sessions[nextIndex].time) * 60);
            } else {
                setIsRunning(false);
                alert("모든 세션 완료!");
            }
        }, 1000);

        return () => clearTimeout(timer);
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
            className={styles.container}
            style={{
                backgroundImage: `url(${isMobile ? sessionImages[sessions[currentIndex].pomo].mobile : sessionImages[sessions[currentIndex].pomo].web})`
            }}
        >
            <div className={styles.header}>
                <LogoutBtn />
            </div>

            <div className={styles.content}>
                <div className={styles.pomoName}>{sessions[currentIndex].pomo}</div>
                <div className={styles.pomoGuide}>🎯{sessions[currentIndex].guide}</div>
                <div className={styles.timer}>{formatTime(timeLeft)}</div>

                <div className={styles.controls}>
                    <button className={styles.button} onClick={startPause}>
                        {isRunning ? "일시정지" : "시작"}
                    </button>
                    <button className={styles.button} onClick={reset}>리셋</button>
                    {currentIndex < sessions.length - 1 && (
                        <button
                            className={styles.button}
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
