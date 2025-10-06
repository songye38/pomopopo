import RegularText12 from "./Text/RegularText12";



export default function ProfileSection() {
  return (
    <div style={{ display: "inline-flex", justifyContent: "space-between", alignItems: "center",gap:'40px' }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <RegularText12>사용자이름</RegularText12>
        <RegularText12>총 뽀모도로 시간</RegularText12>
        <RegularText12>총 집중 횟수</RegularText12>
      </div>
      <div style={{ width: 86, height: 86, borderRadius: 9999, background: "#D9D9D9" }} />
    </div>
  );
}