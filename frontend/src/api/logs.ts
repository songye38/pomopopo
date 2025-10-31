import Api from "./Api";


interface FinishSessionLogParams {
  sessionLogId: number;
  totalPaused: number;   // 초 단위
  pauseCount: number;
}




// --------------------------
// 1️⃣ 뽀모도로 시작
// --------------------------
export const startPomodoro = async (
  pomodoroId?: string,    // UUID
): Promise<{ log_id: string; success: boolean }> => {
  try {
    const res = await Api.post(
      "/logs/pomodoro/start",
      { pomodoro_id: pomodoroId },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.error("뽀모도로 시작 실패:", error);
    throw error;
  }
};

// --------------------------
// 2️⃣ 세션 로그 추가
// --------------------------
export const addSessionLog = async (
  logId: string,               // 뽀모도로 로그 id
  sessionId?: number,
  goal?: string,
  duration?: number,
  order?: number
): Promise<{ session_log_id: number; success: boolean }> => {
  try {
    const res = await Api.post(
      "/logs/session/add",
      {
        log_id: logId,
        session_id: sessionId,
        goal,
        duration,
        order,
      },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.error("세션 로그 추가 실패:", error);
    throw error;
  }
};


export const finishSessionLog = async ({
  sessionLogId,
  totalPaused,
  pauseCount
}: FinishSessionLogParams): Promise<{ session_log_id: number; completed: boolean }> => {
  try {
    const res = await Api.patch(
      "/logs/session/finish",
      {
        session_log_id: sessionLogId,
        total_paused_duration: totalPaused,
        pause_count: pauseCount
      },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.error("세션 로그 완료 실패:", error);
    throw error;
  }
};


// --------------------------
// 4️⃣ 뽀모도로 종료
// --------------------------
export const finishPomodoro = async (
  logId: string
): Promise<{ log_id: string; completed: boolean; total_duration: number }> => {
  try {
    const res = await Api.post(
      "/logs/pomodoro/finish",
      { log_id: logId },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.error("뽀모도로 종료 실패:", error);
    throw error;
  }
};
