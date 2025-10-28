import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { type SessionContent } from "../types/types";
import { sessionImages } from "../types/images";
import LogoutBtn from "../components/Button/LogoutBtn";
import { workf1s } from "../types/workFlow";
import { sessionTexts } from "../types/sessionTexts";
import styles from "../styles/PomodoroPage.module.css";
import { fetchPomodoroById } from "../api/sessions";
import { mapTypeToPomo } from "../utils/mapTypeToPomo";

export default function PomodoroPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [sessions, setSessions] = useState<SessionContent[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // URL 쿼리로 모드 결정
    const queryParams = new URLSearchParams(location.search);
    const mode = queryParams.get("mode"); // "server" 또는 "local"
    const isServerMode = mode === "server";



    //화면 크기 감지
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // 서버에서 데이터 가져오기
    const loadServerSessions = async () => {
        if (!id) return;
        try {
            const pomodoro = await fetchPomodoroById(id);
            if (!pomodoro || !pomodoro.sessions?.length) throw new Error("세션 없음");

            const serverSessions: SessionContent[] = pomodoro.sessions.map(s => ({
                guide: s.goal,
                time: s.duration.toString(),
                pomo: mapTypeToPomo(s.type_id),
                order: s.order,
                name: s.name,
                type_id: s.type_id,
            }));

            setSessions(serverSessions);
            setTimeLeft(parseInt(serverSessions[0].time) * 60);
        } catch (error) {
            console.error("서버 세션 로드 실패:", error);
            navigate("/"); // 실패하면 홈으로
        }
    };

    // 로컬 워크플로우에서 데이터 가져오기
    const loadLocalSessions = () => {
        if (!id) return;
        const workflow = workf1s.find(wf => wf.id === id);
        if (!workflow) {
            alert("세션을 찾을 수 없습니다.");
            navigate("/");
            return;
        }

        const workflowSessions: SessionContent[] = workflow.steps.map(step => {
            const sessionTemplate = sessionTexts[step.session];
            return {
                ...sessionTemplate,
                time: step.duration.replace("분", ""),
                pomo: sessionTemplate.pomo,
                id: `${workflow.id}-${step.order}`,
                order: step.order,
            };
        });

        setSessions(workflowSessions);
        setTimeLeft(parseInt(workflowSessions[0].time) * 60);
    };

    useEffect(() => {
        if (!id) return;
        if (isServerMode) {
            loadServerSessions();
        } else {
            loadLocalSessions();
        }
    }, [id, isServerMode]);



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
                <div className={styles.order}>
                    {currentIndex + 1} / {sessions.length} {/* 현재 세션 / 전체 세션 */}
                </div>
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
