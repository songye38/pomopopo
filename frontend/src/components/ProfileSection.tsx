import RegularText14 from "./Text/RegularText14";



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
      <div style={{ width: 86, height: 86, borderRadius: 9999, background: "#D9D9D9" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <RegularText14>사용자이름 : hello stranger!</RegularText14>
        <RegularText14>총 뽀모도로 시간 : 22시간 </RegularText14>
        <RegularText14>총 집중 횟수 : 30회</RegularText14>
      </div>

    </div>
  );
}