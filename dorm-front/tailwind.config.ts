import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nps: ["NPSFont", "sans-serif"],
      },
    },
    colors: {
      // Brand colors
      primary: "#E70050",
      primaryMid: "#FF7E8D",
      primaryLight: "#FFF9FA",

      //secondary color
      secondary: "#FFE8DE",

      // Particular colors
      point: "#FF6A3B",

      //background color
      background: "#FFFDFD",

      // Achromatic colors
      black: "#191919",
      gray5: "#727375",
      gray4: "#9E9FA1",
      gray3: "#BEBEBE",
      gray2: "#CBCCCE",
      gray1: "#E4E5E7",
      gray0: "#F4F5F7",
      white: "#FFFFFF",
      blue: "#6283FD",

      // 그 외 추가 컬러
      // ...
    },
    fontSize: {
      //폰트 사이즈
      h1: "24px", // Head 1
      h2: "20px", // Title 1
      h3: "18px", // Title 2, 3
      h4: "16px", // Title 4, 5, SubTitle 1, Body1
      h5: "14px", // SubTitle 2, Body2, Button
      h6: "12px",
    },
  },
  plugins: [],
};
export default config;
