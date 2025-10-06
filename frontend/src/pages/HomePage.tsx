import ProfileSection from "../components/ProfileSection";
import logo from "/images/logo.png";
import DefaultPomoSection from "../components/DefaultPomoSection";

const HomePage = () => {
  return (
    <div
      style={{
        width: "100%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 40,
      }}
    >
      {/* 로고 + 프로필: 부모 50% 기준 */}
      <div
        style={{
          width: "100%", // 부모 50% 폭 기준
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        <img src={logo} alt="로고" style={{ width: '160px', height: "auto" }} />
        <ProfileSection />
      </div>

      {/* DefaultPomoSection: 화면 전체 폭 기준 */}
      <div
        style={{
          width: "100vw", // 화면 전체 폭
          maxWidth: "100%", // 혹시 부모 제한 걸려도 최대 100%
          marginLeft: "-25%", // 부모 50% 중앙 기준에서 좌측으로 이동
          marginRight: "-25%", // 우측 이동
          display: "flex",
          justifyContent: "center",
        }}
      >
        <DefaultPomoSection />
      </div>
    </div>
  );
};


export default HomePage;
