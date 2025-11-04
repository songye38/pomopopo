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


    //화면 크기 감지
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // 서버에서 데이터 가져오기
    const loadServerSessions = async () => {
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

            setSessions(serverSessions);
            setTimeLeft(parseInt(serverSessions[0].time) * 60);

            return serverSessions; // ✅ 이거 추가!
        } catch (error) {
            console.error("서버 세션 로드 실패:", error);
            navigate("/");
            return []; // ✅ 실패 시에도 항상 배열 반환
        }
    };


    // 로컬 워크플로우에서 데이터 가져오기
    //! 결국 이건 지워야 하는 기능이다. 서버에서 가져오는 걸로 통합해야한다. 
    //TODO 서버에서 프리셋 뽀모도로 정보도 가져오도록 통합하기 
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
        const init = async () => {
            const loaded = await loadServerSessions();
            if (loaded.length) {
                setSessions(loaded);
                setTimeLeft(parseInt(loaded[0].time) * 60);
            }
        };
        init();
    }, [pomodoroId]);


    const handleStartSession = async () => {
        // 세션 데이터가 준비 안 됐으면 중단
        if (!sessions.length) return;

        try {
            // 뽀모도로 로그가 없다면 (처음 시작이라면)
            let newLogId = logId;
            if (!newLogId) {
                const logRes = await startPomodoro(pomodoroId!);
                newLogId = logRes.log_id;
                setLogId(newLogId);
                console.log("✅ 뽀모도로 시작:", newLogId);
            }

            // 현재 세션 로그가 없다면 새로 생성
            if (!currentSessionLogId) {
                const currentSession = sessions[currentIndex];
                const newSessionLog = await addSessionLog(
                    newLogId,
                    currentSession.id!,
                    currentSession.guide,
                    parseInt(currentSession.time),  // planned_duration
                    currentIndex + 1
                );

                setCurrentSessionLogId(newSessionLog.session_log_id);
                console.log("🟢 세션 로그 생성:", newSessionLog.session_log_id);
            }

            // 타이머 시작
            setIsRunning(true);
            if (timeLeft === 0) {
                setTimeLeft(parseInt(sessions[currentIndex].time) * 60);
            }

        } catch (error) {
            console.error("🚨 세션 시작 실패:", error);
        }
    };


    const handlePauseResume = () => {
        if (isRunning) {
            // ⏸ 일시정지
            setPauseStart(Date.now());
            setIsRunning(false);
            console.log("⏸ 일시정지 시작");
        } else {
            // ▶ 재개 시 일시정지 시간 계산
            if (pauseStart) {
                const pausedSeconds = Math.floor((Date.now() - pauseStart) / 1000);
                setTotalPaused(prev => prev + pausedSeconds);
                setPauseCount(prev => prev + 1);
                setPauseStart(null);
            }
            setIsRunning(true);
            console.log("▶ 재개");
        }
    };

    const handleNextSession = async () => {
        if (!currentSessionLogId) return;

        await finishSessionLog({
            sessionLogId: currentSessionLogId,
            totalPaused,
            pauseCount,
        });

        // 다음 세션으로 이동
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

            setCurrentIndex(nextIndex);
            setTimeLeft(parseInt(next.time) * 60);
            setCurrentSessionLogId(session_log_id);
            setTotalPaused(0);
            setPauseCount(0);
            setIsRunning(false);
        }
    };

    const handleFinishPomodoro = async () => {
        if (!currentSessionLogId || !logId) return;

        await finishSessionLog({
            sessionLogId: currentSessionLogId,
            totalPaused,
            pauseCount,
        });

        await finishPomodoro(logId);
        alert("🎉 모든 세션 완료! 수고했어!");
        navigate(`/summary/${logId}`);
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

                {/* //TODO 뽀모도로 자체를 종료하는 함수 연결하기  */}
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
                    {/* 첫 시작 버튼 (logId 없을 때만 표시) */}
                    {!logId ? (
                        <button className={styles.button} onClick={handleStartSession}>
                            시작하기
                        </button>
                    ) : (
                        // 이미 logId가 있으면 일시정지/재개 토글 버튼
                        <button className={styles.button} onClick={handlePauseResume}>
                            {isRunning ? "일시정지" : "재개"}
                        </button>
                    )}

                    <button className={styles.button} onClick={reset}>리셋</button>

                    {currentIndex < sessions.length - 1 ? (
                        // 중간 세션: 다음 세션으로 이동
                        <button
                            className={styles.button}
                            onClick={async () => {
                                await handleNextSession(); // 현재 세션만 종료
                                const nextIndex = currentIndex + 1;
                                setCurrentIndex(nextIndex);
                                setTimeLeft(parseInt(sessions[nextIndex].time) * 60);
                            }}
                        >
                            다음 세션
                        </button>
                    ) : (
                        // 마지막 세션: 전체 뽀모도로 종료
                        <button
                            className={styles.button}
                            onClick={handleFinishPomodoro}
                            disabled={!currentSessionLogId} // 세션 로그 없으면 비활성화
                            style={{
                                opacity: currentSessionLogId ? 1 : 0.5,
                                cursor: currentSessionLogId ? "pointer" : "not-allowed",
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
