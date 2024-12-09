import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");
const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-roboto)", "system-ui", "sans-serif"],
      serif: ["var(--font-lora)", "Georgia", "serif"],
      mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      display: ["var(--font-roboto)", "system-ui", "sans-serif"],
      body: ["var(--font-roboto)", "system-ui", "sans-serif"],
      cormorant: ["Cormorant", "serif"],
    },
    borderRadius: {
      button: "20px",
      none: "0",
      sm: "0.125rem",
      md: "0.375rem",
      lg: "0.5rem",
      full: "9999px",
      large: "12px",
    },

    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "1400px",
        md: "1600",
        lg: "1600",
        xl: "1300",
        "2xl": "1880px",
      },
    },
    extend: {
      colors: {
        primary: "#AD3E39",
        black: "#1d1d1d",
        "black-50": "#f6f6f6",
        "black-100": "#e7e7e7",
        "black-200": "#d1d1d1",
        "black-300": "#b0b0b0",
        "black-400": "#888888",
        "black-500": "#6d6d6d",
        "black-600": "#5d5d5d",
        "black-700": "#4f4f4f",
        "black-800": "#454545",
        "black-900": "#3d3d3d",
        "gray-50": "#f9f9f9",
        "gray-100": "#eeeeee",
        "gray-200": "#dcdcdc",
        "gray-300": "#bdbdbd",
        "gray-400": "#989898",
        "gray-500": "#7c7c7c",
        "gray-600": "#656565",
        "gray-700": "#525252",
        "gray-800": "#464646",
        "gray-900": "#3d3d3d",
        "gray-950": "#292929",
        "border-color": "#DAE9F3",
        warning: "#B11935",
        success: "#20CE5D",
      },
      fontSize: {
        display: "4rem",
        h1: "3rem",
        h2: "2rem",
        h3: "1.625rem",
        h4: "1.25rem",
        base: "1rem",
      },

      backgroundImage: {
        "services-image": "url('/images/ServiceSection.webp')",
        "services-image-1": "url('/images/services-image-1.png')",
        "services-image-2": "url('/images/services-image-2.png')",
        "services-image-3": "url('/images/services-image-3.png')",
        "services-image-4": "url('/images/services-image-4.png')",
      },
      boxShadow: {
        custom:
          "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
        badget:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
        input: "0 0 0 .2rem rgba(0,123,255,.25)",
      },
    },
  },
  plugins: [nextui()],
};
export default config;
