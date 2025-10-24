// api/sessions.ts
import axios from "./Api";
import type { SavedSession } from "./../types/types"




// pomo 값에 따른 기본 type_id 매핑
const pomoTypeMap: Record<string, number> = {
    "diverge": 1,
    "converge": 2,
    "observe": 3,
    "screening": 4,
    "refine": 5,
    "reverse": 6,
    "constraint": 7,
    "emotion": 8,
    "tagging": 9,
    "structuring": 10,
    "analysis": 11,
    "ruleBreaking": 12,
    "transformation": 13,
    "break": 14,
    "detox": 15,
};


export const saveSessionToServer = async (sessionObj: SavedSession) => {

    const payload = {
        title: sessionObj.title,
        sessions: sessionObj.droppedSessions.map((s, idx) => ({
            goal: s.guide,
            duration: s.time,
            order: idx + 1,       // 1부터 시작하는 순서
            type_id: pomoTypeMap[s.pomo] ?? 1,
        })),
    };
    try {
        const res = await axios.post("https://api.pomopopo.com/pomodoros/make", payload, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("서버 저장 실패:", error);
        throw error;
    }
};
