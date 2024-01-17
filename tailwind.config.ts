import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "selected-language-in": "selected-language-in 0.1s ease-in-out",
      },
      keyframes: {
        "selected-language-in": {
          "0%": {
            opacity: "0",
            transform: "translate3d(-50%, -100%, 0)",
          },
          "100%": {
            opacity: "1",
            transform: "translate3d(-50%, -50%, 0)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
