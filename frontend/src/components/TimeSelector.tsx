import { useState } from "react";

interface TimeSelectorProps {
  time: number;
  options?: number[];
  onChange?: (newTime: number) => void;
  mainColor?: string; // 추가: 메인 컬러
}

export default function TimeSelector({
  time,
  options = [5, 10, 15, 25, 60],
  onChange,
  mainColor = "#E5382D", // 기본 강조 색
}: TimeSelectorProps) {
  const [selectedTime, setSelectedTime] = useState(time);

  const handleSelect = (t: number) => {
    setSelectedTime(t);
    onChange?.(t);
  };

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {options.map((t) => (
        <button
          key={t}
          onClick={() => handleSelect(t)}
          style={{
            padding: "6px 12px",
            borderRadius: 6,
            border: selectedTime === t ? `2px solid ${mainColor}` : "1px solid #ccc",
            backgroundColor: selectedTime === t ? mainColor : "#fff",
            color: selectedTime === t ? "#fff" : "#000",
            cursor: "pointer",
            minWidth: 50,
          }}
        >
          {t}분
        </button>
      ))}
    </div>
  );
}
