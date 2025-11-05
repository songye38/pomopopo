import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { type SessionContent } from "../types/types";
import { sessionImages } from "../types/images";
import LogoutBtn from "../components/Button/LogoutBtn";
import styles from "../styles/PomodoroPage.module.css";
import { fetchPomodoroById } from "../api/sessions";
import { mapTypeToPomo } from "../utils/mapTypeToPomo";
import { startPomodoro, addSessionLog, finishSessionLog, finishPomodoro } from "../api/logs";

export default function PomodoroPage() {
    const { id: pomodoroId } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [sessions, setSessions] = useState<SessionContent[]>([]);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const [logId, setLogId] = useState<string | null>(null);
    const [currentSessionLogId, setCurrentSessionLogId] = useState<number | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const [pauseStart, setPauseStart] = useState<number | null>(null);
    const [totalPaused, setTotalPaused] = useState(0);
    const [pauseCount, setPauseCount] = useState(0);

    const log = (label: string, color: string, ...msg: unknown[]) => {
        console.log(`%c[${label}]`, `color:${color}; font-weight:bold;`, ...msg);
    };

    // 화면 크기 감지
    useEffect(() => {
        log("INIT", "#888", "페이지 로드됨");
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // 서버에서 세션 데이터 로드
    const loadServerSessions = async () => {
        log("FETCH", "deepskyblue", "서버에서 뽀모도로 세션 불러오는 중...");
        if (!pomodoroId) return [];
        try {
            const pomodoro = await fetchPomodoroById(pomodoroId);
            if (!pomodoro || !pomodoro.sessions?.length) throw new Error("세션 없음");

            const serverSessions: SessionContent[] = pomodoro.sessions.map(s => ({
                id: s.id,
                guide: s.goal,
                time: s.duration.toString(),
                pomo: mapTypeToPomo(s.type_id),
                order: s.order,
                name: s.name,
                type_id: s.type_id,
            }));

            log("FETCH", "green", "✅ 세션 불러오기 성공", serverSessions);
            setSessions(serverSessions);
            setTimeLeft(parseInt(serverSessions[0].time) * 60);
            return serverSessions;
        } catch (error) {
            log("FETCH", "red", "🚨 세션 불러오기 실패:", error);
            navigate("/");
            return [];
        }
    };

    // 첫 로드 시 데이터 초기화
    useEffect(() => {
        const init = async () => {
            const loaded = await loadServerSessions();
            if (loaded.length) {
                log("INIT", "green", "세션 초기화 완료");
                setSessions(loaded);
                setTimeLeft(parseInt(loaded[0].time) * 60);
            }
        };
        init();
    }, [pomodoroId]);

    // 세션 시작
    const handleStartSession = async () => {
        log("START", "limegreen", "▶ 세션 시작 클릭됨");
        if (!sessions.length) {
            log("START", "red", "🚫 세션이 아직 없음!");
            return;
        }

        try {
            let newLogId = logId;
            if (!newLogId) {
                const logRes = await startPomodoro(pomodoroId!);
                newLogId = logRes.log_id;
                setLogId(newLogId);
                log("START", "yellow", "🟢 뽀모도로 로그 생성됨:", newLogId);
            }

            if (!currentSessionLogId) {
                const currentSession = sessions[currentIndex];
                const newSessionLog = await addSessionLog(
                    newLogId,
                    currentSession.id!,
                    currentSession.guide,
                    parseInt(currentSession.time),
                    currentIndex + 1
                );
                setCurrentSessionLogId(newSessionLog.session_log_id);
                log("SESSION", "skyblue", "🟢 세션 로그 생성:", newSessionLog);
            }

            setIsRunning(true);
            if (timeLeft === 0) {
                setTimeLeft(parseInt(sessions[currentIndex].time) * 60);
            }
        } catch (error) {
            log("START", "red", "🚨 세션 시작 실패:", error);
        }
    };

    // 일시정지 / 재개
    const handlePauseResume = () => {
        if (isRunning) {
            setPauseStart(Date.now());
            setIsRunning(false);
            log("PAUSE", "orange", "⏸ 일시정지 시작");
        } else {
            if (pauseStart) {
                const pausedSeconds = Math.floor((Date.now() - pauseStart) / 1000);
                setTotalPaused(prev => prev + pausedSeconds);
                setPauseCount(prev => prev + 1);
                setPauseStart(null);
                log("PAUSE", "orange", `▶ 재개됨 | 일시정지 누적: ${pausedSeconds}s`);
            }
            setIsRunning(true);
        }
    };

    // 다음 세션 이동
    const handleNextSession = async () => {
        log("NEXT", "violet", "➡ 다음 세션 이동 시도");
        if (!currentSessionLogId) return;

        await finishSessionLog({
            sessionLogId: currentSessionLogId,
            totalPaused,
            pauseCount,
        });
        log("NEXT", "violet", "✅ 현재 세션 종료 로그 기록 완료");

        const nextIndex = currentIndex + 1;
        if (nextIndex < sessions.length) {
            const next = sessions[nextIndex];
            const { session_log_id } = await addSessionLog(
                logId!,
                next.id!,
                next.guide,
                parseInt(next.time),
                nextIndex + 1
            );

            log("NEXT", "violet", "🆕 다음 세션 로그 생성:", session_log_id);
            setCurrentIndex(nextIndex);
            setTimeLeft(parseInt(next.time) * 60);
            setCurrentSessionLogId(session_log_id);
            setTotalPaused(0);
            setPauseCount(0);
            setIsRunning(false);
        }
    };

    // 전체 뽀모도로 종료
    const handleFinishPomodoro = async () => {
        log("FINISH", "red", "🏁 뽀모도로 종료 시도");
        if (!currentSessionLogId || !logId) return;

        await finishSessionLog({
            sessionLogId: currentSessionLogId,
            totalPaused,
            pauseCount,
        });

        await finishPomodoro(logId);
        log("FINISH", "red", "🎉 모든 세션 완료 로그 기록됨");
        alert("🎉 모든 세션 완료! 수고했어!");
        navigate(`/summary/${logId}`);
    };

    // 타이머 로직
    useEffect(() => {
        if (!isRunning) return;
        const timer = setTimeout(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            } else if (currentIndex < sessions.length - 1) {
                const nextIndex = currentIndex + 1;
                setCurrentIndex(nextIndex);
                setTimeLeft(parseInt(sessions[nextIndex].time) * 60);
                log("TIMER", "gray", "⏭ 다음 세션 자동 이동");
            } else {
                setIsRunning(false);
                log("TIMER", "red", "⏹ 모든 세션 종료");
                alert("모든 세션 완료!");
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [isRunning, timeLeft, currentIndex, sessions]);

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
                <LogoutBtn logId={logId} handleFinishPomodoro={handleFinishPomodoro} />
            </div>

            <div className={styles.content}>
                <div className={styles.order}>
                    {currentIndex + 1} / {sessions.length}
                </div>
                <div className={styles.pomoName}>{sessions[currentIndex].pomo}</div>
                <div className={styles.pomoGuide}>🎯{sessions[currentIndex].guide}</div>
                <div className={styles.timer}>{formatTime(timeLeft)}</div>

                <div className={styles.controls}>
                    {!logId ? (
                        <button className={styles.button} onClick={handleStartSession}>
                            시작하기
                        </button>
                    ) : (
                        <button className={styles.button} onClick={handlePauseResume}>
                            {isRunning ? "일시정지" : "재개"}
                        </button>
                    )}

                    {currentIndex < sessions.length - 1 ? (
                        <button
                            className={styles.button}
                            onClick={handleNextSession}
                            style={{
                                opacity: !currentSessionLogId || isRunning ? 0.5 : 1,
                                cursor: !currentSessionLogId || isRunning ? "not-allowed" : "pointer",
                            }}
                        >
                            다음 세션
                        </button>
                    ) : (
                        <button
                            className={styles.button}
                            onClick={handleFinishPomodoro}
                            disabled={!currentSessionLogId}
                            style={{
                                opacity: !currentSessionLogId || isRunning ? 0.5 : 1,
                                cursor: !currentSessionLogId || isRunning ? "not-allowed" : "pointer",
                            }}
                        >
                            뽀모도로 종료
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
