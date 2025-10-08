


export function getRandomColor() {
  const colors = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722"];
  return colors[Math.floor(Math.random() * colors.length)];
}


export function generateRandomTitle() {
  const words1 = [
    "번뜩이는",
    "반짝이는",
    "촉촉한",
    "훅 들어오는",
    "폭발적인",
    "구름 같은",
    "파도치는",
    "자유로운",
    "몰입한",
    "상상력 있는",
    "와르르 쏟아지는",
    "살랑이는",
    "부릉거리는",
    "톡톡 튀는",
    "빛나는",
    "찰랑이는",
    "전율하는",
    "창의적인",
    "직관적인",
    "유연한"
  ];
  const words2 = [
    "폭죽",
    "파도",
    "구름",
    "별빛",
    "달빛",
    "회오리",
    "물결",
    "숨결",
    "깃발",
    "섬광",
    "바람",
    "조각",
    "여운",
    "전류",
    "빛살",
    "울림",
    "마루",
    "여정",
    "고리",
    "소용돌이"
  ];


  const w1 = words1[Math.floor(Math.random() * words1.length)];
  const w2 = words2[Math.floor(Math.random() * words2.length)];

  return `${w1} ${w2}`;
}

