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
];

export default function defaultPomoSection() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 12,
        width: "100%",
        maxWidth: 500,
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
        >
          <img src={pomo.thumbnail} alt={pomo.name} style={{ width: "100%", height: "auto" }} />
          {/* <div>{pomo.name}</div> */}
        </div>
      ))}
    </div>
  );
}
