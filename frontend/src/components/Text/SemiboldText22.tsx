// components/Text.tsx
import React, { type CSSProperties,  type ReactNode } from "react";

interface TextProps {
  children: ReactNode;
  style?: CSSProperties;
}

export default function SemiboldText22({ children, style }: TextProps) {
  return (
    <div
      style={{
        fontFamily: "Pretendard",
        fontSize: 22,
        fontWeight: 700,
        color: "black",
        wordWrap: "break-word",
        ...style, // 추가 스타일 병합
      }}
    >
      {children}
    </div>
  );
}
