import { useNavigate } from "react-router-dom";
import logout from "/images/log_out.png";


//이름을 잘못 지었다. 실제 로그아웃을 하는게 아니라 뽀모도로 세션 페이지를 나올 때 사용하는 버튼
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
