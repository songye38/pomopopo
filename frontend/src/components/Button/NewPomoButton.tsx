import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

interface NewPomoButtonProps {
  label?: string;
}

const NewPomoButton: React.FC<NewPomoButtonProps> = ({
  label = "새로운 뽀모도로 만들기",
}) => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  const handleClick = () => {
    const id = uuidv4();  // UUID 생성
    navigate(`/make/${id}`);
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <button
        onClick={handleClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          width: "100%",
          padding: "8px 16px",
          borderRadius: 8,
          background: "white",
          color: "black",
          cursor: "pointer",
          border: hover ? "2px dotted #E5382D" : "1px dotted #ddd",
          transition: "all 0.2s ease",
          fontSize: hover ? "22px" : "18px",
        }}
      >
        {hover && " + "}{label}
      </button>
    </div>
  );
};

export default NewPomoButton;
