export const sessionColors = {
  basic: {
    main: "#E5382D",
    light: "rgba(229, 56, 45, 0.3)",
    dim: 'rgba(229, 56, 45, 0.15)'
  },

  refine: {
    main: "#21A060",
    light: "rgba(33, 160, 96, 0.3)",
    dim: 'rgba(33, 160, 96, 0.15)'
  },
  random: {
    main: "#E47118",
    light: "rgba(228, 113, 24, 0.3)",
    dim: 'rgba(228, 113, 24, 0.15)'
  },
  reverse: {
    main: "#81338E",
    light: "rgba(129, 51, 142, 0.3)",
    dim: 'rgba(129, 51, 142, 0.15)'
  },
  emotion: {
    main: "#E8CC29",
    light: "rgba(232, 204, 41, 0.3)",
    dim: 'rgba(232, 204, 41, 0.15)'
  },
  explore: {
    main: "#303E90",
    light: "rgba(48, 62, 144, 0.3)",
    dim: 'rgba(48, 62, 144, 0.15)'
  },
  story: {
    main: "#D84A95",
    light: "rgba(216, 74, 149, 0.3)",
    dim: 'rgba(216, 74, 149, 0.15)'
  },
  echo: {
    main: "#349539",
    light: "rgba(52, 149, 57, 0.3)",
    dim: 'rgba(52, 149, 57, 0.15)'
  },
  escape: {
    main: "#953131",
    light: "rgba(149, 49, 49, 0.3)",
    dim: 'rgba(149, 49, 49, 0.15)'
  },
  repeat: {
    main: "#4CBDC7",
    light: "rgba(76, 189, 199, 0.3)",
    dim: 'rgba(76, 189, 199, 0.15)'
  },
  empty: {
    main: "#30896E",
    light: "rgba(48, 137, 110, 0.3)",
    dim: 'rgba(48, 137, 110, 0.15)'
  }
};

// brandColors.ts
export const brandColors = {
  primary: {
    1: "#FCEBEA",
    2: "#F9CFCD",
    3: "#F3A9A5",
    4: "#EE827B",
    5: "#E95C54",
    6: "#E4382E", // 메인
    7: "#C23027",
    8: "#A22821",
    9: "#82201A",
    10: "#671915",
  },
  secondary: {
    1: "#F2E6FF",
    2: "#E0CCFF",
    3: "#C299FF",
    4: "#A366FF",
    5: "#8533FF",
    6: "#6600FF", // 메인
    7: "#5200CC",
    8: "#3D0099",
    9: "#290066",
    10: "#140033",
  },
  gray: {
    1: "#FFFFFF",
    2: "#FCFCFC",
    3: "#F5F5F5",
    4: "#F0F0F0",
    5: "#D9D9D9",
    6: "#BFBFBF",
    7: "#8C8C8C",
    8: "#595959",
    9: "#454545",
    10: "#262626",
    11: "#1F1F1F",
    12: "#141414",
    13: "#000000",
  },
} as const;





// 나중에 사용 예시
// import { sessionColors } from "../styles/colors";

// export const SessionCard = () => {
//   return (
//     <div
//       style={{
//         background: `linear-gradient(135deg, ${sessionColors.focus.main}, ${sessionColors.focus.light})`,
//         borderRadius: "12px",
//         padding: "16px",
//         color: "#fff"
//       }}
//     >
//       Focus Session
//     </div>
//   );
// };
