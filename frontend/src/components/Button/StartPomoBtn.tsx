import { useNavigate } from "react-router-dom";

type ButtonProps = {
    label?: string; // 버튼 텍스트를 외부에서 바꾸고 싶으면
    onClick?: () => void;
};

export const StartPomoBtn = ({ label = "시작하기", onClick }: ButtonProps) => {
    const navigate = useNavigate();

    const style: React.CSSProperties = {
        width: "225px",
        height: "auto",
        padding: 10,
        background: "#E5382D",
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        display: "inline-flex",
        color: "white",
        fontSize: 18,
        fontFamily: "Pretendard, sans-serif",
        fontWeight: 600,
        wordWrap: "break-word",
        cursor: "pointer",
    };

    const handleClick = () => {
        console.log(`${label} 클릭!`);
        navigate("/make"); // 원래 start 버튼 동작
        onClick?.();       // 외부에서 전달된 동작
    };

    return (
        <div style={style} onClick={handleClick}>
            {label}
        </div>
    );
};
