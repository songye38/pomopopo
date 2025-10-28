// api/sessions.ts
import axios from "./Api";
import type { PomodoroOut,SavedSession } from "../types/types";
import { pomoTypeMap } from "../types/types";

export const saveSessionToServer = async (sessionObj: SavedSession) => {

    const payload = {
        title: sessionObj.title,
        sessions: sessionObj.droppedSessions.map((s, idx) => ({
            goal: s.guide,
            duration: s.time,
            order: idx + 1,       // 1부터 시작하는 순서
            type_id: pomoTypeMap[s.pomo] ?? 1,
            name : s.name,
        })),
    };
    try {
        const res = await axios.post("/pomodoros/add", payload, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("서버 저장 실패:", error);
        throw error;
    }
};



// -------------------------------------
//  사용자 뽀모도로 리스트 가져오기
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
//  특정 뽀모도로 가져오기
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
//  특정 뽀모도로 삭제
// -------------------------------------
export const deletePomodoroById = async (id: string): Promise<void> => {
  try {
    await axios.delete(`/pomodoros/${id}`, { withCredentials: true });
  } catch (error) {
    console.error("뽀모도로 삭제 실패:", error);
    throw error;
  }
};