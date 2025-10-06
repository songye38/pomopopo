// components/Text.tsx
import React, { type CSSProperties,  type ReactNode } from "react";

interface TextProps {
  children: ReactNode;
  style?: CSSProperties;
}

export default function MediumText16({ children, style }: TextProps) {
  return (
    <div
      style={{
        fontFamily: "Pretendard",
        fontSize: 16,
        fontWeight: 500,
        color: "black",
        wordWrap: "break-word",
        ...style, // 추가 스타일 병합
      }}
    >
      {children}
    </div>
  );
}
