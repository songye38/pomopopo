import SemiboldText22 from "./Text/SemiboldText22";
import { sessionColors } from "../types/colors";
import { type Pomo } from "../types/types";
import styles from '../styles/SessionDefault.module.css'

interface SessionProps {
  title?: string;
  description: string;
  purpose: string;
  pomo: Pomo;
  backgroundColor?: string;
  relatedArtists?: string[];
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
    <div className={styles.container} style={{ background: bgColor }}>
      <div className={styles.header}>
        <SemiboldText22>{title}</SemiboldText22>
      </div>

      <div className={styles.content}>
        <div
          className={styles.purposeBox}
          dangerouslySetInnerHTML={{ __html: purpose }}
        />
      </div>
    </div>
  );
}
