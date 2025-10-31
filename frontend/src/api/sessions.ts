// api/sessions.ts
import axios from "./Api";
import type { PomodoroOut,SavedSession } from "../types/types";




// -------------------------------------
//  1️⃣ 새 뽀모도로 세션 서버에 저장
// -------------------------------------
export const saveSessionToServer = async (sessionObj: SavedSession) => {

  console.log("saveSessionToServer 호출됨:");

    const payload = {
        title: sessionObj.title,
        sessions: sessionObj.droppedSessions.map((s, idx) => ({
            goal: s.guide,
            duration: s.time,
            order: idx + 1,       // 1부터 시작하는 순서
            type_id : s.type_id,
            name : s.name,
        })),
    };

    console.log("서버에 저장할 페이로드:", payload);
    try {
        const res = await axios.post("/pomodoros/add", payload, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("서버 저장 실패:", error);
        throw error;
    }
};



// -------------------------------------
//  2️⃣ 사용자 뽀모도로 리스트 가져오기
// -------------------------------------
export const fetchUserPomodoros = async (): Promise<PomodoroOut[]> => {
  try {
    const res = await axios.get("/pomodoros", { withCredentials: true });
    return res.data;
  } catch (error) {
    console.error("뽀모도로 불러오기 실패:", error);
    throw error;
  }
};

// -------------------------------------
//  3️⃣ 특정 뽀모도로 가져오기
// -------------------------------------
export const fetchPomodoroById = async (pomodoroId: string): Promise<PomodoroOut> => {
  try {
    const res = await axios.get(`/pomodoros/${pomodoroId}`, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.error(`뽀모도로 ${pomodoroId} 불러오기 실패:`, error);
    throw error;
  }
};


// -------------------------------------
//  4️⃣ 특정 뽀모도로 수정
// -------------------------------------
export const updatePomodoro = async (
  pomodoroId: string,
  sessionObj: SavedSession
): Promise<PomodoroOut> => {
  console.log("updatePomodoro 호출됨:", pomodoroId);

  // 세션 payload 준비
  const payload = {
    title: sessionObj.title,
    sessions: sessionObj.droppedSessions.map((s, idx) => ({
      id: s.id,           // 기존 세션이면 id 포함
      goal: s.guide,
      duration: s.time,
      order: idx + 1,     // 1부터 시작하는 순서
      type_id: s.type_id,
      name: s.name,
    })),
  };

  console.log("서버에 보낼 수정 페이로드:", payload);

  try {
    const res = await axios.put(`/pomodoros/${pomodoroId}`, payload, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error(`뽀모도로 ${pomodoroId} 수정 실패:`, error);
    throw error;
  }
};



// -------------------------------------
//  5️⃣ 특정 뽀모도로 삭제
// -------------------------------------
export const deletePomodoroById = async (id: string): Promise<void> => {
  try {
    await axios.delete(`/pomodoros/${id}`, { withCredentials: true });
  } catch (error) {
    console.error("뽀모도로 삭제 실패:", error);
    throw error;
  }
};