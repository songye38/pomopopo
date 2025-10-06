import type { Workflow } from "./types"


// 10개 워크플로우 전체 정의
export const workf1s: Workflow[] = [
  {
    name: "🎨 Refine",
    pattern: "발산 → 스크리닝 → 수렴 → 정밀 조율 → 장기 휴식",
    steps: [
      { order: 1, session: "diverge", duration: "25분", energy: "3", process: "확산", purpose: "결과" },
      { order: 2, session: "observe", duration: "5분", energy: "1", process: "-", purpose: "-" },
      { order: 3, session: "screening", duration: "25분", energy: "2", process: "선택/분류", purpose: "결과" },
      { order: 4, session: "observe", duration: "5분", energy: "1", process: "-", purpose: "-" },
      { order: 5, session: "converge", duration: "25분", energy: "2", process: "수렴", purpose: "결과" },
      { order: 6, session: "observe", duration: "5분", energy: "1", process: "-", purpose: "-" },
      { order: 7, session: "refine", duration: "25분", energy: "2", process: "디테일", purpose: "결과" },
      { order: 8, session: "detox", duration: "20~30분", energy: "1", process: "-", purpose: "-" },
    ],
  },
  {
    name: "🔁 Reverse",
    pattern: "수렴 → 뒤집기 세션 → 수렴 → 장기 휴식",
    steps: [
      { order: 1, session: "converge", duration: "25분", energy: "2", process: "논리", purpose: "결과" },
      { order: 2, session: "observe", duration: "5분", energy: "1", process: "-", purpose: "-" },
      { order: 3, session: "reverse", duration: "25분", energy: "2", process: "재배치/변형", purpose: "결과" },
      { order: 4, session: "observe", duration: "5분", energy: "1", process: "-", purpose: "-" },
      { order: 5, session: "converge", duration: "25분", energy: "2", process: "논리", purpose: "결과" },
      { order: 6, session: "detox", duration: "20~30분", energy: "1", process: "-", purpose: "-" },
    ],
  },
  {
    name: "🎲 Random",
    pattern: "발산 → 제약 도입 → 발산 → 장기 휴식",
    steps: [
      { order: 1, session: "diverge", duration: "25분", energy: "3", process: "직관", purpose: "과정" },
      { order: 2, session: "observe", duration: "5분", energy: "1", process: "-", purpose: "-" },
      { order: 3, session: "constraint", duration: "25분", energy: "2", process: "제약 적용", purpose: "과정" },
      { order: 4, session: "observe", duration: "5분", energy: "1", process: "-", purpose: "-" },
      { order: 5, session: "diverge", duration: "25분", energy: "3", process: "직관", purpose: "과정" },
      { order: 6, session: "detox", duration: "20~30분", energy: "1", process: "-", purpose: "-" },
    ],
  },
  {
    name: "🌊 Emotion",
    pattern: "발산 → 감정 기록 → 발산 → 장기 휴식",
    steps: [
      { order: 1, session: "diverge", duration: "25분", energy: "2", process: "직관", purpose: "감정" },
      { order: 2, session: "observe", duration: "5분", energy: "1", process: "-", purpose: "-" },
      { order: 3, session: "emotion", duration: "25분", energy: "2", process: "기록/분석", purpose: "감정" },
      { order: 4, session: "observe", duration: "5분", energy: "1", process: "-", purpose: "-" },
      { order: 5, session: "diverge", duration: "25분", energy: "2", process: "직관", purpose: "감정" },
      { order: 6, session: "detox", duration: "20~30분", energy: "1", process: "-", purpose: "-" },
    ],
  },
  {
    name: "🚀 Explore",
    pattern: "발산 → 아이디어 태깅 → 발산 → 장기 휴식",
    steps: [
      { order: 1, session: "diverge", duration: "25분", energy: "2", process: "확산", purpose: "과정" },
      { order: 2, session: "observe", duration: "5분", energy: "1", process: "-", purpose: "-" },
      { order: 3, session: "tagging", duration: "25분", energy: "2", process: "기록/분류", purpose: "과정" },
      { order: 4, session: "observe", duration: "5분", energy: "1", process: "-", purpose: "-" },
      { order: 5, session: "diverge", duration: "25분", energy: "2", process: "확산", purpose: "과정" },
      { order: 6, session: "detox", duration: "20~30분", energy: "1", process: "-", purpose: "-" },
    ],
  },
  {
    name: "🧭 Story",
    pattern: "수렴 → 구조화 → 수렴 → 장기 휴식",
    steps: [
      { order: 1, session: "converge", duration: "25분", energy: "2", process: "수렴", purpose: "결과" },
      { order: 2, session: "observe", duration: "5분", energy: "1", process: "-", purpose: "-" },
      { order: 3, session: "structuring", duration: "25분", energy: "2", process: "흐름/정리", purpose: "결과" },
      { order: 4, session: "observe", duration: "5분", energy: "1", process: "-", purpose: "-" },
      { order: 5, session: "converge", duration: "25분", energy: "2", process: "수렴", purpose: "결과" },
      { order: 6, session: "detox", duration: "20~30분", energy: "1", process: "-", purpose: "-" },
    ],
  },
  {
    name: "🔮 Echo",
    pattern: "관찰 → 반응 분석 → 관찰 → 장기 휴식",
    steps: [
      { order: 1, session: "observe", duration: "25분", energy: "2", process: "직관+논리", purpose: "감정" },
      { order: 2, session: "observe", duration: "5분", energy: "1", process: "-", purpose: "-" },
      { order: 3, session: "analysis", duration: "25분", energy: "2", process: "기록/분석", purpose: "감정" },
      { order: 4, session: "observe", duration: "5분", energy: "1", process: "-", purpose: "-" },
      { order: 5, session: "observe", duration: "25분", energy: "2", process: "직관+논리", purpose: "감정" },
      { order: 6, session: "detox", duration: "20~30분", energy: "1", process: "-", purpose: "-" },
    ],
  },
  {
    name: "🛸 Escape",
    pattern: "발산 → 규칙 탈착 → 발산 → 장기 휴식",
    steps: [
      { order: 1, session: "diverge", duration: "25분", energy: "3", process: "직관", purpose: "탐구" },
      { order: 2, session: "observe", duration: "5분", energy: "1", process: "-", purpose: "-" },
      { order: 3, session: "ruleBreaking", duration: "25분", energy: "3", process: "실험/재구성", purpose: "탐구" },
      { order: 4, session: "observe", duration: "5분", energy: "1", process: "-", purpose: "-" },
      { order: 5, session: "diverge", duration: "25분", energy: "3", process: "직관", purpose: "탐구" },
      { order: 6, session: "detox", duration: "20~30분", energy: "1", process: "-", purpose: "-" },
    ],
  },
  {
    name: "🔃 Repeat",
    pattern: "발산 → 수렴 → 변형 → 발산 → 수렴 → 장기 휴식",
    steps: [
      { order: 1, session: "diverge", duration: "25분", energy: "2", process: "확산", purpose: "탐구" },
      { order: 2, session: "observe", duration: "5분", energy: "1", process: "-", purpose: "-" },
      { order: 3, session: "converge", duration: "25분", energy: "2", process: "수렴", purpose: "탐구" },
      { order: 4, session: "transformation", duration: "25분", energy: "2", process: "재배치", purpose: "탐구" },
      { order: 5, session: "diverge", duration: "25분", energy: "2", process: "확산", purpose: "탐구" },
      { order: 6, session: "converge", duration: "25분", energy: "2", process: "수렴", purpose: "탐구" },
      { order: 7, session: "detox", duration: "20~30분", energy: "1", process: "-", purpose: "-" },
    ],
  },
  {
    name: "🔥 Empty",
    pattern: "발산 → 정화 → 발산 → 장기 휴식",
    steps: [
      { order: 1, session: "diverge", duration: "25분", energy: "1", process: "직관", purpose: "과정" },
      { order: 2, session: "observe", duration: "5분", energy: "1", process: "-", purpose: "-" },
      { order: 3, session: "detox", duration: "25분", energy: "1", process: "비움", purpose: "과정" },
      { order: 4, session: "observe", duration: "5분", energy: "1", process: "-", purpose: "-" },
      { order: 5, session: "diverge", duration: "25분", energy: "1", process: "직관", purpose: "과정" },
      { order: 6, session: "detox", duration: "20~30분", energy: "1", process: "-", purpose: "-" },
    ],
  },
];
