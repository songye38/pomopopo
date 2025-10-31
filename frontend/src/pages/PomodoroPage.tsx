import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { type SessionContent } from "../types/types";
import { sessionImages } from "../types/images";
import LogoutBtn from "../components/Button/LogoutBtn";
import styles from "../styles/PomodoroPage.module.css";
import { fetchPomodoroById } from "../api/sessions";
import { mapTypeToPomo } from "../utils/mapTypeToPomo";
import { startPomodoro, addSessionLog, finishSessionLog } from "../api/logs";

export default function PomodoroPage() {
    const { id: pomodoroId } = useParams<{ id: string }>(); //여기서의 id는 뽀모도로 아이디 잊지말자!!
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
        if (!pomodoroId) return;
        try {
            const pomodoro = await fetchPomodoroById(pomodoroId);
            if (!pomodoro || !pomodoro.sessions?.length) throw new Error("세션 없음");

            const serverSessions: SessionContent[] = pomodoro.sessions.map(s => ({
                id : s.id,
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
    //! 결국 이건 지워야 하는 기능이다. 서버에서 가져오는 걸로 통합해야한다. 
    // const loadLocalSessions = () => {
    //     if (!pomodoroId) return;
    //     const workflow = workf1s.find(wf => wf.id === pomodoroId);
    //     if (!workflow) {
    //         alert("세션을 찾을 수 없습니다.");
    //         navigate("/");
    //         return;
    //     }

    //     const workflowSessions: SessionContent[] = workflow.steps.map(step => {
    //         const sessionTemplate = sessionTexts[step.session];
    //         return {
    //             ...sessionTemplate,
    //             time: step.duration.replace("분", ""),
    //             pomo: sessionTemplate.pomo,
    //             id: `${workflow.id}-${step.order}`,
    //             order: step.order,
    //         };
    //     });

    //     setSessions(workflowSessions);
    //     setTimeLeft(parseInt(workflowSessions[0].time) * 60);
    // };


    // 뽀모도로 시작 및 첫 세션 로그 추가   
    useEffect(() => {
        if (!pomodoroId) return;

        loadServerSessions();

        // 2️⃣ 뽀모도로 로그 생성 + 첫 세션 로그 시작
        const initPomodoro = async () => {
            if (!sessions || sessions.length === 0) return; // 세션이 준비되지 않았으면 스킵

            try {
                // 뽀모도로 로그 생성
                const logRes = await startPomodoro(pomodoroId);
                setLogId(logRes.log_id);

            } catch (error) {
                console.error("뽀모도로 초기화 실패:", error);
            }
        };

        initPomodoro();
    }, [pomodoroId, isServerMode]);


    // 세션 시작/일시정지 핸들러
    const HandleStartSession = async () => {
        if (!logId || !sessions || sessions.length === 0) return;

        if (!isRunning) {
            // 재시작 시 일시정지 시간 누적
            if (pauseStart) {
                const pausedSeconds = Math.floor((Date.now() - pauseStart) / 1000);
                setTotalPaused(prev => prev + pausedSeconds);
                setPauseCount(prev => prev + 1);
                setPauseStart(null);
            }

            // 첫 세션 로그 생성
            if (!currentSessionLogId) {
                const firstSessionLog = await addSessionLog(
                    logId,
                    sessions[currentIndex].id,
                    sessions[currentIndex].guide,
                    parseInt(sessions[currentIndex].time),
                    currentIndex + 1
                );
                setCurrentSessionLogId(firstSessionLog.session_log_id);
            }

            // 타이머 시작
            setIsRunning(true);
        } else {
            // 일시정지
            setIsRunning(false);
            setPauseStart(Date.now());
        }
    };

    const HandleFinishSession = async () => {
        if (!currentSessionLogId) return;

        // 일시정지 중이었다면 마지막 구간 계산
        if (pauseStart) {
            const pausedSeconds = Math.floor((Date.now() - pauseStart) / 1000);
            setTotalPaused(prev => prev + pausedSeconds);
            setPauseCount(prev => prev + 1);
            setPauseStart(null);
        }

        try {
            await finishSessionLog({
                sessionLogId: currentSessionLogId,
                totalPaused: totalPaused,
                pauseCount: pauseCount
            });

            // 다음 세션으로 이동 준비
            if (currentIndex < sessions.length - 1) {
                const nextIndex = currentIndex + 1;
                setCurrentIndex(nextIndex);
                setTimeLeft(parseInt(sessions[nextIndex].time) * 60);
                setCurrentSessionLogId(null); // 다음 세션 로그 새로 생성
                setIsRunning(false);
                setTotalPaused(0);
                setPauseCount(0);
            }
        } catch (error) {
            console.error("세션 종료 실패:", error);
        }
    };





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



    // const startPause = () => setIsRunning(!isRunning);

    const reset = () => {
        setTimeLeft(parseInt(sessions[currentIndex].time) * 60);
        setIsRunning(false);
        setCurrentSessionLogId(null);
        setTotalPaused(0);
        setPauseCount(0);
        setPauseStart(null);
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
                    <button className={styles.button} onClick={HandleStartSession}>
                        {isRunning ? "일시정지" : "시작"}
                    </button>

                    <button className={styles.button} onClick={reset}>리셋</button>
                    {currentIndex < sessions.length - 1 && (
                        <button
                            className={styles.button}
                            onClick={async () => {
                                await HandleFinishSession(); // 현재 세션 종료 및 서버 업데이트

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
