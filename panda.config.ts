import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  jsxFramework: "qwik",

  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          primary: {
            content: { value: "hls(323 23% 15%)" },
            DEFAULT: { value: "hls(321 70% 69%)" },
            focus: { value: "hls(321 70% 62%)" },
          },
          secondary: {
            content: { value: "hls(199 28% 14%)" },
            DEFAULT: { value: "hls(197 87% 65%)" },
            focus: { value: "hls(197 87% 58%)" },
          },
          accent: {
            content: { value: "hls(45 42% 13%)" },
            DEFAULT: { value: "hls(48 89% 57%)" },
            focus: { value: "hls(48 89% 50%)" },
          },
          neutral: {
            content: { value: "hls(260 60% 98%)" },
            DEFAULT: { value: "hls(253 59% 20%)" },
            focus: { value: "hls(253 59% 13%)" },
          },
          base: {
            100: { value: "hls(253 58% 15%)" },
            200: { value: "hls(253 58% 8%)" },
            300: { value: "hls(253 58% 1%)" },
            content: { value: "hls(260 60% 98%)" },
          },
          info: {
            content: { value: "hls(257 63% 17%)" },
            DEFAULT: { value: "hls(199 87% 64%)" },
          },
          success: {
            content: { value: "hls(257 63% 17%)" },
            DEFAULT: { value: "hls(168 74% 68%)" },
          },
          warning: {
            content: { value: "hls(257 63% 17%)" },
            DEFAULT: { value: "hls(48 89% 57%)" },
          },
          error: {
            content: { value: "hls(260 60% 98%)" },
            DEFAULT: { value: "hls(352 74% 57%)" },
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "src/styled-system",
});
