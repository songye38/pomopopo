
import { useNavigate } from "react-router-dom";

type Variant = "start" | "save" | "finish";

type ButtonProps = {
    variant: Variant;
    onClick?: () => void; // 외부에서 클릭 핸들러를 받을 수 있게 추가
};

export const MainBtn = ({ variant,onClick: externalOnClick }: ButtonProps) => {
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
                fontSize: 18,
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
                width: "auto",
                height: "auto",
                padding: 10,
                background: "#CACACA",
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
            },
            onClick: () => { }, // 기본 동작은 아무것도 안 함
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

    const { label, style, onClick: defaultOnClick } = configs[variant];

    return (
        <div
            style={style}
            onClick={() => {
                console.log(`${label} 클릭!`);
                defaultOnClick?.();       // configs 안 기본 동작
                externalOnClick?.();      // 외부에서 전달된 동작
            }}
        >
            {label}
        </div>
    );
};
