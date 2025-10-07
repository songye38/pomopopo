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

export interface SessionContent {
  name: string;            // 세션 이름
  target: string;          // 목적
  effect: string;          // 기대 효과
  energy: "1" | "2" | "3";  // 에너지 강도
  features: string[];      // 특화 기능
  guide: string;           // 설명/가이드
  time: string;           // 시간
  pomo:Pomo;
  relatedArtists?: string[]; // 관련 아티스트 (선택 사항)
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
  name: string;            // 워크플로우 이름
  index : string;         // 워크플로우 인덱스
  pattern: string;         // 워크패턴 설명
  steps: WorkflowStep[];   // 각 단계 배열
}
