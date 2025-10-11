import { useState } from "react";
import styles from '../styles/TimeSelector.module.css'

interface TimeSelectorProps {
  time: number;
  options?: number[];
  onChange?: (newTime: number) => void;
  mainColor?: string;
}

export default function TimeSelector({
  time,
  options = [5, 10, 15, 25, 60],
  onChange,
  mainColor = "#E5382D",
}: TimeSelectorProps) {
  const [selectedTime, setSelectedTime] = useState(time);

  const handleSelect = (t: number) => {
    setSelectedTime(t);
    onChange?.(t);
  };

  return (
    <div className={styles.container}>
      {options.map((t) => {
        const isSelected = selectedTime === t;
        return (
          <button
            key={t}
            onClick={() => handleSelect(t)}
            className={`${styles.button} ${isSelected ? styles.selected : ""}`}
            style={
              isSelected
                ? {
                    backgroundColor: mainColor,
                    border: `2px solid ${mainColor}`,
                  }
                : {}
            }
          >
            {t}분
          </button>
        );
      })}
    </div>
  );
}
