import { useNavigate } from "react-router-dom";
import logout from "/images/log_out.png";

interface LogoutBtnProps {
  logId: string | null;
  handleFinishPomodoro?: () => Promise<void>;
}

const LogoutBtn = ({ logId, handleFinishPomodoro }: LogoutBtnProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (!logId) {
      // 아직 시작 안 한 경우
      const confirmed = window.confirm("정말 종료하시겠습니까?");
      if (confirmed) navigate("/");
      return;
    }

    // logId가 있는 경우 → 세션이 시작됨
    const confirmed = window.confirm("세션이 진행 중입니다. 종료하시겠습니까?");
    if (!confirmed) return;

    try {
      if (handleFinishPomodoro) {
        await handleFinishPomodoro(); // 뽀모도로 종료
      } else {
        navigate("/"); // fallback
      }
    } catch (error) {
      console.error("뽀모도로 종료 실패:", error);
      alert("뽀모도로 종료 중 오류가 발생했어요.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <img
        src={logout}
        alt="종료"
        style={{ width: 24, height: 24, cursor: "pointer" }}
        onClick={handleLogout}
      />
    </div>
  );
};

export default LogoutBtn;
