import { useNavigate } from "react-router-dom";
import logout from "/images/log_out.png";

const LogoutBtn = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm("정말 종료하시겠습니까?");
    if (confirmed) {
      navigate("/"); // 메인 페이지로 이동
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <img
        src={logout}
        alt="로그아웃"
        style={{ width: 24, height: 24, cursor: "pointer" }}
        onClick={handleLogout}
      />
    </div>
  );
};

export default LogoutBtn;
