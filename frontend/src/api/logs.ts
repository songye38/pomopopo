import Api from "./Api";
import type { AxiosResponse } from "axios";

// 서버 응답 타입 정의
interface StartPomodoroResponse {
  log_id: string;
  success: boolean;
}

interface FinishSessionLogParams {
  sessionLogId: number;
  totalPaused: number;   // 초 단위
  pauseCount: number;
}

// ✅ 세션 완료 응답 타입
interface FinishSessionResponse {
  session_log_id: number;
  effective_duration: number;
  focus_rate: number;
  completed: boolean;
}

// ✅ 뽀모도로 완료 응답 타입
interface FinishPomodoroResponse {
  log_id: string;
  completed: boolean;
  total_effective_duration: number;
}

export interface PomodoroSummary {
  total_sessions: number;
  total_minutes: number;
  focus_rate: number;
  comment?: string;
  rating?: number;
}


// --------------------------
// 1️⃣ 뽀모도로 시작
//--------------------------
export const startPomodoro = async (
  pomodoroId: string
): Promise<StartPomodoroResponse> => {
  try {
    const res: AxiosResponse<StartPomodoroResponse> = await Api.post(
      "/logs/pomodoro/start",
      { pomodoro_id: pomodoroId },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
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
  logId: string,
  sessionId: number,
  goal: string,
  plannedDuration: number, // ✅ duration → plannedDuration
  order?: number
): Promise<{ session_log_id: number; success: boolean }> => {
  try {
    const res = await Api.post(
      "/logs/session/add",
      {
        log_id: logId,
        session_id: sessionId,
        goal,
        planned_duration: plannedDuration, // ✅ 수정됨
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


// --------------------------
// 3️⃣ 세션 로그 완료
// --------------------------
export const finishSessionLog = async ({
  sessionLogId,
  totalPaused,
  pauseCount,
}: FinishSessionLogParams): Promise<FinishSessionResponse> => {
  try {
    const res = await Api.patch(
      "/logs/session/finish",
      {
        session_log_id: sessionLogId,
        total_paused_duration: totalPaused,
        pause_count: pauseCount,
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
): Promise<FinishPomodoroResponse> => {
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


// --------------------------
// 5️⃣ 뽀모도로 회고 데이터 가져오기
// --------------------------
export const getPomodoroSummary = async (
  logId: string
): Promise<PomodoroSummary> => {
  try {
    const res = await Api.get<PomodoroSummary>(
      `/logs/pomodoro/${logId}/summary`,
      { withCredentials: true }
    );

    return res.data;
  } catch (error) {
    console.error("🚨 뽀모도로 회고 데이터 불러오기 실패:", error);
    throw error;
  }
};



// --------------------------
// 6️⃣ 뽀모도로 회고 코멘트 저장
// --------------------------
export const savePomodoroFeedback = async (
  logId: string,
  comment: string,
  rating: number
): Promise<{ success: boolean }> => {
  try {
    const res = await Api.patch(
      `/logs/pomodoro/${logId}/feedback`,
      { comment, rating },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.error("회고 피드백 저장 실패:", error);
    throw error;
  }
};


// --------------------------
// 7️⃣ 로그인 유저 통계 조회
// --------------------------
export const fetchMyStats = async (): Promise<{
  user_id: string;
  total_pomodoros: number;
  total_sessions: number;
  total_focus_duration_minutes: number;
  average_focus_rate: number;
  last_active_at: string | null;
}> => {
  try {
    const res = await Api.get("/logs/user/me/stats", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("유저 통계 조회 실패:", error);
    throw error;
  }
};
