import RegularText14 from "./Text/RegularText14";
import userlogo from "/images/user_logo.png";



export default function ProfileSection() {
  return (
    <div style=
      {{
        display: "flex", // inline-flex → flex
        justifyContent: "flex-start", // 왼쪽으로 정렬
        alignItems: "center",
        gap: 20, // 이미지와 텍스트 간 간격
        flexDirection:'column'
      }}>
      <img src={userlogo} alt="로고" style={{ width: '86px', height: "auto" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 5,alignItems: "center",textAlign: "center" }}>
        <RegularText14>Pomo Beginner</RegularText14>
        <RegularText14>총 뽀모도로 시간 : 22시간 </RegularText14>
        <RegularText14>총 집중 횟수 : 30회</RegularText14>
        <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <RegularText14>⚙️설정</RegularText14>
          <RegularText14>💎기록</RegularText14>
        </div>
      </div>

    </div>
  );
}