import ProfileSection from "../components/ProfileSection";
import logo from "/images/logo.png";
import DefaultPomoSection from "../components/DefaultPomoSection";

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
                <img src={logo} alt="로고" style={{ width: '160px', height: "auto" }} />
                <ProfileSection />
                <DefaultPomoSection />
            </div>
        </div>

    );
};

export default HomePage;
