
import { TypePomoMap } from "../types/types";
import type { Pomo } from "../types/types";

export const mapTypeToPomo = (type: number): Pomo => {
  const temp = TypePomoMap[type] ?? "basic"; // 1~15 숫자에서 문자열로 변환

  switch (temp) {
    case "diverge":
    case "converge":
    case "observe":
      return "basic"; // Pomo 타입과 동일
    case "screening":
    case "refine":
      return "refine"; // 다른 그룹은 explore로 매핑
    case "reverse":
      return "reverse"; // 또 다른 그룹은 story로 매핑
    case "constraint":
      return "random"; // 또 다른 그룹은 story로 매핑
    case "emotion":
      return "emotion"; // 또 다른 그룹은 story로 매핑
    case "tagging":
      return "explore"; // 또 다른 그룹은 story로 매핑
    case "structuring":
      return "story"; // 또 다른 그룹은 story로 매핑
    case "analysis":
      return "echo"; // 또 다른 그룹은 story로 매핑
    case "ruleBreaking":
      return "escape"; // 또 다른 그룹은 story로 매핑
    case "transformation":
      return "repeat"; // 또 다른 그룹은 story로 매핑
    case "break":
    case "detox":
      return "empty"; // 또 다른 그룹은 story로 매핑
    default:
      return "basic"; // 나머지는 기본 Pomo
  }
};








