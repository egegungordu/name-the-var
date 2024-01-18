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
        "squiggly-slide": "squiggly-slide 6s linear infinite",
        "fade-in": "fade-in 0.2s ease-in-out",
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
        "squiggly-slide": {
          "0%": {
            backgroundPosition: "0% 100%",
          },
          "100%": {
            backgroundPosition: "90px 100%",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.98)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
