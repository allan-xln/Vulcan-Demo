import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        vulcan: {
          orange: "#ff6b16",
          amber: "#ffb020",
          ink: "#070707",
          panel: "#0c0c0f"
        }
      },
      boxShadow: {
        vulcan: "0 0 36px rgba(255,107,22,0.14)"
      }
    }
  },
  plugins: []
};

export default config;
