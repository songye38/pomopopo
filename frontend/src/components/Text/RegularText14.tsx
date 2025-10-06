// components/Text.tsx
import React, { type CSSProperties,  type ReactNode } from "react";

interface TextProps {
  children: ReactNode;
  style?: CSSProperties;
}

export default function RegularText14({ children, style }: TextProps) {
  return (
    <div
      style={{
        fontFamily: "Pretendard",
        fontSize: 14,
        fontWeight: 400,
        color: "black",
        wordWrap: "break-word",
        lineHeight:'19px',
        ...style, // 추가 스타일 병합
      }}
    >
      {children}
    </div>
  );
}
