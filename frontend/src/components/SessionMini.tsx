// 세가지 모드가 있음
// 기본 모드 , mini 모드 / expand 모드 
// 기본모드 : 세션 조합할 때 왼쪽에 오는 애들
// mini 모드 : 메인페이지에서 조합을 보여줄 때 사용
// expand 모드 : 드롭다운 했을 때 보여지는 것


import SemiboldText16 from "./Text/SemiboldText16";
import { sessionColors } from "../types/colors";
import { type Pomo } from "../types/types";

interface SessionProps {
  title: string;
  pomo: Pomo; // 새로 추가
  backgroundColor?: string; // 선택적, 기본값 가능
  time:string;
}

export default function Session({
  title,
  pomo,
  backgroundColor,
  time
}: SessionProps) {
  const bgColor = backgroundColor || sessionColors[pomo]?.main || "#21A060";

  return (
    <div
      style={{
        width: "234px",
        height: "auto",
        padding: 12,
        background: bgColor,
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 20,
      }}
    >
      {/* 제목 */}
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <SemiboldText16>{title} {time}</SemiboldText16>
      </div>


    </div>
  );
}
