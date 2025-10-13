import RegularText14 from "./Text/RegularText14";
import userlogo from "/images/user_logo.png";
import styles from "../styles/ProfileSection.module.css";
import { useNavigate } from "react-router-dom";

interface ProfileSectionProps {
  isLoggedIn: boolean;
  userName?: string;
  totalTime?: string;
  totalFocus?: string;
}

export default function ProfileSection({
  isLoggedIn,
  userName = "Pomo Beginner",
  totalTime = "22시간",
  totalFocus = "30회",
}: ProfileSectionProps) {


  const navigate = useNavigate();
  // ✅ 로그인 O → 유저 정보 보여주기
  if (isLoggedIn) {
    return (
      <div className={styles.container}>
        <img src={userlogo} alt="로고" className={styles.userImage} />
        <div className={styles.textContainer}>
          <RegularText14>{userName}</RegularText14>
          <RegularText14>총 뽀모도로 시간 : {totalTime}</RegularText14>
          <RegularText14>총 집중 횟수 : {totalFocus}</RegularText14>
          <div className={styles.bottomMenu}>
            <RegularText14>⚙️설정</RegularText14>
            <RegularText14>💎기록</RegularText14>
          </div>
        </div>
      </div>
    );
  }

  // ❌ 로그인 X → 로그인 유도 UI
  return (
    <div className={styles.container}>
      <div className={styles.guestContainer}>
        <RegularText14>안녕하세요 👋</RegularText14>
        <RegularText14>로그인 후 나만의 뽀모도로를 관리해보세요!</RegularText14>
        <button
          className={styles.loginButton}
          onClick={() => navigate("/login")}
        >
          로그인하기
        </button>
      </div>
    </div>
  );
}
