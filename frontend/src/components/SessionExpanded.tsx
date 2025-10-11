
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
import styles from '../styles/SessionExpanded.module.css'

interface SessionExpandedProps {
  session: SessionContent;
  title: string;
  description: string;
  pomo: Pomo;
  backgroundColor?: string;
  time: string;
  onRemove: (session: SessionContent) => void;
  onUpdate: (updatedSession: SessionContent) => void;
}

export default function SessionExpanded({
  session,
  title,
  description,
  pomo,
  backgroundColor,
  time,
  onRemove,
  onUpdate,
}: SessionExpandedProps) {
  const [editableDescription, setEditableDescription] = useState(description);
  const [selectedTime, setSelectedTime] = useState(Number(time));

  const bgColor = backgroundColor || sessionColors[pomo]?.light || "#21A060";
  const bgColorforTime = backgroundColor || sessionColors[pomo]?.main || "#21A060";

  const handleDescriptionChange = (value: string) => {
    setEditableDescription(value);
    onUpdate({ ...session, guide: value });
  };

  const handleTimeChange = (value: number) => {
    setSelectedTime(value);
    console.log("selectedTime",selectedTime)
    onUpdate({ ...session, time: String(value) });
  };

  return (
    <div className={styles.container} style={{ background: bgColor }}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        <div className={styles.removeButton} onClick={() => onRemove(session)}>
          ×
        </div>
      </div>

      <div className={styles.textareaWrapper}>
        <textarea
          value={editableDescription}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          className={styles.textarea}
        />
      </div>

      <TimeSelector
        time={25}
        mainColor={bgColorforTime}
        onChange={handleTimeChange}
      />
    </div>
  );
}
