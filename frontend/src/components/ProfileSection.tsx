import RegularText14 from "./Text/RegularText14";
import userlogo from "/images/user_logo.png";
import styles from "../styles/ProfileSection.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // ✅ 추가

export default function ProfileSection() {
  const navigate = useNavigate();
  const { user,logout } = useAuth(); // ✅ 전역 상태 가져오기
  const isLoggedIn = !!user; // 유저 존재 여부로 로그인 상태 판별

   const handleLogout = async () => {
    await logout(); // ✅ 서버 + 클라이언트 로그아웃 동시 수행
    navigate("/");
  };

  // ✅ 로그인 상태일 때
  if (isLoggedIn) {
    return (
      <div className={styles.container}>
        <img src={userlogo} alt="로고" className={styles.userImage} />
        <div className={styles.textContainer}>
          <div className={styles.name}>{user}</div>
          <RegularText14>총 뽀모도로 시간 : 22시간</RegularText14>
          <RegularText14>총 집중 횟수 : 30회</RegularText14>
          <div className={styles.bottomMenu}>
            <RegularText14>⚙️ 설정</RegularText14>
            <RegularText14>💎 기록</RegularText14>
            <div className={styles.infoText} onClick={handleLogout}>
              🚪 로그아웃
            </div>
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
