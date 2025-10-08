//포모도로 시작 버튼


import { useState } from "react";
import { useNavigate } from "react-router-dom";

type ButtonProps = {
  label?: string;
  onClick?: () => void;
  width?: string | number; // 숫자(px)나 문자열(%, rem 등) 모두 가능
};

export const StartPomoBtn = ({ label = "시작하기", onClick, width = "100%" }: ButtonProps) => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false); // 🔥 hover 상태 추가

  const style: React.CSSProperties = {
    width: width,
    height: "auto",
    padding: 10,
    background: hover ? "rgba(229, 56, 45, 0.3)" : "#E5382D", // hover 시 색 변경
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    display: "inline-flex",
    color: "white",
    fontSize: 18,
    fontFamily: "Pretendard, sans-serif",
    fontWeight: 600,
    wordWrap: "break-word",
    cursor: "pointer",
    transition: "background 0.2s ease", // 자연스러운 색 전환
  };

  const handleClick = () => {
    console.log(`${label} 클릭!`);
    navigate("/make");
    onClick?.();
  };

  return (
    <div
      style={style}
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}   // 마우스 올리면 hover true
      onMouseLeave={() => setHover(false)}  // 마우스 나가면 hover false
    >
      {label}
    </div>
  );
};
