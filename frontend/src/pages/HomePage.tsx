import ProfileSection from "../components/ProfileSection";
import logo from "/images/logo.png";

const HomePage = () => {
    return (
        <div
            style={{
                width: "50%",
                margin: "0 auto", // 좌우 중앙 정렬
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 40,
                
            }}
        >
            <div
                style={{
                    width: "100%", // 내부 컨텐츠는 부모 폭 기준
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 40,
                }}
            >
                <img src={logo} alt="로고" style={{ width: '240px', height: "auto" }} />
                <ProfileSection />
            </div>
        </div>

    );
};

export default HomePage;
