
// 세가지 모드가 있음
// 기본 모드 , mini 모드 / expand 모드 
// 기본모드 : 세션 조합할 때 왼쪽에 오는 애들
// mini 모드 : 메인페이지에서 조합을 보여줄 때 사용
// expand 모드 : 드롭다운 했을 때 보여지는 것

import { sessionColors } from "../types/colors";
import { type Pomo } from "../types/types";
import type { SessionContent } from "../types/types";
import { useState } from "react";
import TimeSelector from "./TimeSelector";

interface SessionExpandedProps {
  session: SessionContent; // 원본 세션 객체
  title: string;
  description: string;
  pomo: Pomo; // 새로 추가
  backgroundColor?: string; // 선택적, 기본값 가능
  time: string;
  onRemove: (session: SessionContent) => void; // 상위 콜백
  onUpdate: (updatedSession: SessionContent) => void; // 수정 콜백
}

export default function SessionExpanded({
  session,
  title,
  description,
  pomo,
  backgroundColor,
  time,
  onRemove,
  onUpdate
}: SessionExpandedProps) {

  const [editableDescription, setEditableDescription] = useState(description); //사용자가 쓰는 목표 
  const [selectedTime, setSelectedTime] = useState(Number(time)); // 사용자가 선택하는 시간



  const bgColor = backgroundColor || sessionColors[pomo]?.light || "#21A060";
  const bgColorforTime = backgroundColor || sessionColors[pomo]?.main || "#21A060";


  const handleDescriptionChange = (value: string) => {
    setEditableDescription(value);
    onUpdate({ ...session, guide: value });
  };

  const handleTimeChange = (value: number) => {
    setSelectedTime(value);
    console.log("selectedTime",selectedTime);
    onUpdate({ ...session, time: String(value) });
  };


  return (
    <div
      style={{
        width: "auto",
        height: "100%",
        padding: 20,
        background: bgColor,
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 12,
      }}
    >

      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
        {/* 제목 */}
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div
            style={{
              fontFamily: "Pretendard",
              fontSize: 20,
              fontWeight: 700,
              color: "black",
              wordWrap: "break-word",
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{ cursor: "pointer", color: "black", fontSize: 20, fontWeight: "bold" }}
          onClick={() => onRemove(session)}
        >
          x
        </div>
      </div>

      {/* 설명과 목적 (editable) */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
        <textarea
          value={editableDescription}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          style={{
            width: "90%",
            height: '20px',
            padding: 8,
            borderRadius: 6,
            border: "none",
            fontSize: 16,
            fontFamily: "Pretendard",
            fontWeight: 500,
            lineHeight: "21px",
            resize: "vertical",
            backgroundColor: "transparent",
            color: '#898989',
          }}
        />
      </div>
      <TimeSelector
        time={25} // 초기 시간
        mainColor={bgColorforTime} // 세션 배경색 전달
        onChange={handleTimeChange}
      />
    </div>
  );
}
