import { useEffect, useState } from "react";
import RegularText14 from "./Text/RegularText14";
import userlogo from "/images/user_logo.png";
import styles from "../styles/ProfileSection.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { fetchMyStats } from "../api/logs"; // ✅ 만든 API 함수 import

interface UserStats {
  user_id: string;
  total_pomodoros: number;
  total_sessions: number;
  total_focus_duration_minutes: number;
  average_focus_rate: number;
  last_active_at: string | null;
}

export default function ProfileSection() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;

  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // ✅ 유저 통계 가져오기
  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);
      fetchMyStats()
        .then((data) => {
          setStats(data);
        })
        .catch((err) => {
          console.error(err);
          setError("통계 불러오기 실패");
        })
        .finally(() => setLoading(false));
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
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
          <div
            className={styles.registerText}
            onClick={() => navigate("/register")}
          >
            회원가입
          </div>
        </div>
      </div>
    );
  }

  // ✅ 로그인 상태 & 통계 로딩 중
  return (
    <div className={styles.container}>
      <img src={userlogo} alt="로고" className={styles.userImage} />
      <div className={styles.textContainer}>
        <div className={styles.name}>{user}</div>
        {loading && <RegularText14>통계 로딩 중...</RegularText14>}
        {error && <RegularText14>{error}</RegularText14>}
        {stats && (
          <>
            <RegularText14>
              총 뽀모도로 시간 : {Math.floor(stats.total_focus_duration_minutes / 60)}시간{" "}
              {stats.total_focus_duration_minutes % 60}분
            </RegularText14>
            <RegularText14>총 집중 횟수 : {stats.total_pomodoros}회</RegularText14>
            <RegularText14>평균 집중률 : {stats.average_focus_rate}%</RegularText14>
          </>
        )}
        <div className={styles.bottomMenu}>
          <RegularText14>⚙️ 설정</RegularText14>
          <div className={styles.infoText} onClick={handleLogout}>
            🚪 로그아웃
          </div>
        </div>
      </div>
    </div>
  );
}
