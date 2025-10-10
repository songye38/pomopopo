import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import styles from '../../styles/NewPomoButton.module.css'

interface NewPomoButtonProps {
  label?: string;
}

const NewPomoButton: React.FC<NewPomoButtonProps> = ({
  label = "새로운 뽀모도로 만들기",
}) => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  const handleClick = () => {
    const id = uuidv4();
    navigate(`/make/${id}`);
  };

  return (
    <div className={styles.wrapper}>
      <button
        onClick={handleClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`${styles.button} ${hover ? styles.hover : ""}`}
      >
        {hover && " + "} {label}
      </button>
    </div>
  );
};

export default NewPomoButton;
