import SemiboldText16 from "./Text/SemiboldText16";
import { sessionColors } from "../types/colors";
import { type Pomo } from "../types/types";
import styles from './../styles/SessionMini.module.css'

interface SessionProps {
  title?: string;
  pomo: Pomo;
  backgroundColor?: string;
  time: string;
}

export default function Session({
  title,
  pomo,
  backgroundColor,
  time,
}: SessionProps) {
  const bgColor = backgroundColor || sessionColors[pomo]?.main || "#21A060";

  return (
    <div className={styles.container} style={{ background: bgColor }}>
      <div className={styles.header}>
        <SemiboldText16>
          {title} {time}
        </SemiboldText16>
      </div>
    </div>
  );
}
