const defaultPomos = [
  { name: "refine", thumbnail: "/images/thumbnail/refine.png" },
  { name: "random", thumbnail: "/images/thumbnail/random.png" },
  { name: "reverse", thumbnail: "/images/thumbnail/reverse.png" },
  { name: "emotion", thumbnail: "/images/thumbnail/emotion.png" },
  { name: "explore", thumbnail: "/images/thumbnail/explore.png" },
  { name: "story", thumbnail: "/images/thumbnail/story.png" },
  { name: "echo", thumbnail: "/images/thumbnail/echo.png" },
  { name: "escape", thumbnail: "/images/thumbnail/escape.png" },
  { name: "repeat", thumbnail: "/images/thumbnail/repeat.png" },
  { name: "empty", thumbnail: "/images/thumbnail/empty.png" },
];



interface DefaultPomoSectionProps {
  onSelect?: (pomoName: string) => void; // 선택 시 호출되는 콜백
}


export default function DefaultPomoSection({ onSelect }: DefaultPomoSectionProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: 12,
        // width: "70%",
        // maxWidth: 500,
        marginBottom:40,
      }}
    >
      {defaultPomos.map((pomo) => (
        <div
          key={pomo.name}
          style={{
            background: "#F5F5F5",
            width: "auto",
            aspectRatio: "3 / 4",
            borderRadius: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            cursor: "pointer",
          }}
          onClick={() => onSelect?.(pomo.name)} // 클릭 시 부모로 선택 값 전달
        >
          <img src={pomo.thumbnail} alt={pomo.name} style={{ width: "100%", height: "auto" }} />
          {/* <div>{pomo.name}</div> */}
        </div>
      ))}
    </div>
  );
}
