import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#3E4095",
        color: "#FFAB00",
        bgColor: "#F7F8FC",
        txtColor: "#F3F5F6",
        gray: {
          1: "#A9ABAE",
          2: "#BDBFC1",
          3: "#727376",
          4: "#606062",
        },
      },
    },
  },
  plugins: [],
};
export default config;
