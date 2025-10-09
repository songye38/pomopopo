// 세가지 모드가 있음
// 기본 모드 , mini 모드 / expand 모드 
// 기본모드 : 세션 조합할 때 왼쪽에 오는 애들
// mini 모드 : 메인페이지에서 조합을 보여줄 때 사용
// expand 모드 : 드롭다운 했을 때 보여지는 것


import SemiboldText22 from "./Text/SemiboldText22";
import { sessionColors } from "../types/colors";
import { type Pomo } from "../types/types";

interface SessionProps {
  title: string;
  description: string;
  purpose: string;
  pomo: Pomo; // 새로 추가
  backgroundColor?: string; // 선택적, 기본값 가능
  relatedArtists?: string[]; // 선택적, 기본값 가능
}

export default function SessionDefault({
  title,
  purpose,
  pomo,
  backgroundColor,
}: SessionProps) {

  
  // backgroundColor가 없으면 pomo 기준으로 main 컬러 사용
  const bgColor = backgroundColor || sessionColors[pomo]?.main || "#21A060";

  return (
    <div
      style={{
        width: "auto",
        height: "auto",
        padding: 20,
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
        <SemiboldText22>{title}</SemiboldText22>
      </div>

      {/* 설명과 목적 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* <div
            style={{
              color: "white",
              fontSize: 18,
              fontFamily: "Pretendard",
              fontWeight: 500,
              lineHeight: "21px",
              wordWrap: "break-word",
            }}
            dangerouslySetInnerHTML={{ __html: description }}
          /> */}
          <div
            style={{
              color: "black",
              fontSize: 12,
              fontFamily: "Pretendard",
              fontWeight: 600,
              lineHeight: "18px",
              wordWrap: "break-word",
              padding:'10px',
              background:'white',
              borderRadius:'8px',
            }}
            dangerouslySetInnerHTML={{ __html: purpose }}
          />
        </div>
      </div>
    </div>
  );
}
