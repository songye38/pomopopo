
import { useNavigate } from "react-router-dom";

type Variant = "start" | "save" | "finish";

type ButtonProps = {
    variant: Variant;
};

export const MainBtn = ({ variant }: ButtonProps) => {
    const navigate = useNavigate();

    const configs: Record<
        Variant,
        { label: string; style: React.CSSProperties; onClick?: () => void }
    > = {
        start: {
            label: "시작하기",
            style: {
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
                fontSize: 22,
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 600,
                wordWrap: "break-word",
                cursor: "pointer",
            },
            onClick: () => navigate("/make"), // ✅ 클릭 시 라우팅
        },
        save: {
            label: "임시저장",
            style: {
                padding: 10,
                background: "#999",
                borderRadius: 6,
                color: "white",
                cursor: "pointer",
            },
        },
        finish: {
            label: "완료",
            style: {
                padding: 10,
                background: "#555",
                borderRadius: 6,
                color: "white",
                cursor: "pointer",
            },
        },
    };

    const { label, style, onClick } = configs[variant];

    return (
        <div
            style={style}
            onClick={() => {
                console.log(`${label} 클릭!`);
                onClick?.(); // ✅ 여기서 navigate 호출
            }}
        >
            {label}
        </div>
    );
};
