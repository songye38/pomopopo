import styles from '../styles/DefaultPomoSection.module.css'


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
  console.log("Rendering DefaultPomoSection");
  return (
    <div className={styles.container}>
      {defaultPomos.map((pomo) => (
        <div
          key={pomo.name}
          className={styles['pomo-card']}
          onClick={() => {
            console.log(pomo.name); // 콘솔에 출력
            onSelect?.(pomo.name); // 원래 onSelect 호출
          }}
        >
          <img src={pomo.thumbnail} alt={pomo.name} className={styles['pomo-image']} />
          {/* <div>{pomo.name}</div> */}
        </div>
      ))}
    </div>
  );
}
