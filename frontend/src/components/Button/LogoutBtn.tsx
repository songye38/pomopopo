import { useNavigate } from "react-router-dom";
import logout from "/images/log_out.png";
import { finishPomodoro } from "../../api/logs"; // finishPomodoro API import 필요

interface LogoutBtnProps {
  logId: string | null;
  handleFinishPomodoro?: () => Promise<void>; // 회고 작성 포함 뽀모도로 종료
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
    // 세션 진행 중일 때 선택지 안내
    const action = window.prompt(
      "세션이 진행 중입니다. 선택해주세요:\n1. 세션 계속하기\n2. 회고 작성하러 가기\n3. 회고 작성 안하고 메인으로 가기",
      "1"
    );

    switch (action) {
      case "1":
        // 세션 그대로 계속
        break;

      case "2":
        try {
          if (handleFinishPomodoro) {
            await handleFinishPomodoro(); // 뽀모도로 종료 후 회고 페이지로 이동
          } else {
            // handleFinishPomodoro가 없으면 일단 finishPomodoro만 호출 후 회고 페이지 이동
            await finishPomodoro(logId);
            navigate(`/summary/${logId}`);
          }
        } catch (error) {
          console.error("뽀모도로 종료 실패:", error);
          alert("뽀모도로 종료 중 오류가 발생했어요.");
        }
        break;

      case "3":
        try {
          // 로그만 종료하고 회고 없이 메인으로
          await finishPomodoro(logId);
        } catch (error) {
          console.error("뽀모도로 종료 실패:", error);
        } finally {
          navigate("/");
        }
        break;

      default:
        // 취소 또는 잘못 입력 시 세션 계속
        break;
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
