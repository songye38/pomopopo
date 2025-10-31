export type Pomo =
  | "basic"
  | "refine"
  | "random"
  | "reverse"
  | "emotion"
  | "explore"
  | "story"
  | "echo"
  | "escape"
  | "repeat"
  | "empty";

export type Session =
  | "diverge" //기본
  | "converge" //기본
  | "observe" //기본
  | "screening"
  | "refine"
  | "reverse"
  | "constraint"
  | "emotion"
  | "tagging"
  | "structuring"
  | "analysis"
  | "ruleBreaking"
  | "transformation"
  | "break"
  | "detox";




// pomo 값에 따른 기본 type_id 매핑
export const pomoTypeMap: Record<string, number> = {
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

export const TypePomoMap: Record<number, string> = {
    1 : "diverge",
    2: "converge",
    3: "observe" ,
    4: "screening",
    5: "refine",
    6:"reverse",
    7:"constraint",
    8:"emotion",
    9:"tagging",
    10:"structuring",
    11:"analysis",
    12:"ruleBreaking",
    13:"transformation",
    14:"break",
    15:"detox"
};

export const SessionNameTypeMap: Record<string, number> = {
    "발산": 1,
    "수렴":2,
    "관찰":3,
    "스크리닝":4,
    "정밀 조율":5,
    "뒤집기 사고":6,
    "제약 도입":7,
    "감정 기록":8,
    "아이디어 태깅":9,
    "구조화":10,
    "반응 분석":11,
    "규칙 탈착":12,
    "변형":13,
    "단기휴식":14,
    "장기휴식":15,
}

export interface SessionContent {
  id?: number;              // 고유 ID 추가 (선택적) 중복 세션이 있을수도 있으므로 고유id가 필요하다. 
  name: string;            // 세션 이름
  target?: string;          // 목적
  effect?: string;          // 기대 효과
  energy?: "1" | "2" | "3";  // 에너지 강도
  features?: string[];      // 특화 기능
  guide: string;           // 설명/가이드
  time: string;           // 시간
  pomo:Pomo;
  relatedArtists?: string[]; // 관련 아티스트 (선택 사항)
  order?:number;
  type_id : number;
}

export interface WorkflowStep {
  order: number;
  session: Session;       // <- 문자열이 아니라 Session 타입
  duration: string;
  energy: "1" | "2" | "3";
  process: string;
  purpose: string;
}

export interface Workflow {
  id : string;
  name: string;            // 워크플로우 이름
  index : string;         // 워크플로우 인덱스
  pattern: string;         // 워크패턴 설명
  steps: WorkflowStep[];   // 각 단계 배열
  msg : string;
}

export interface SavedSession {
    id: string;
    title: string;
    droppedSessions: SessionContent[];
    savedAt: number;
}


// types/types.ts
export type SessionOut = {
  id : number;
  goal: string;
  duration: number;
  order: number;
  type_id: number;
  name: string;
};


export type PomodoroOut = {
  id: string;
  title: string;
  sessions: SessionOut[];
};