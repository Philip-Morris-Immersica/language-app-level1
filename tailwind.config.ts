import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        // UNHCR official color ramps (6 steps each, from lightest to darkest)
        unhcr: {
          blue:   { 1: "#CDE3F1", 2: "#8FC1E1", 3: "#4F9ED0", 4: "#0072BC", 5: "#05568B", 6: "#0B3754" },
          green:  { 1: "#DAF6EB", 2: "#7DE0B9", 3: "#32C189", 4: "#2B9C70", 5: "#257958", 6: "#1F5741" },
          yellow: { 1: "#FEF1D1", 2: "#FFC740", 3: "#E4A202", 4: "#B98405", 5: "#8F6808", 6: "#684D0B" },
          red:    { 1: "#FCE2DE", 2: "#F9B3A7", 3: "#F67F6A", 4: "#D25A45", 5: "#9C4637", 6: "#683229" },
          cyan:   { 1: "#D4F3FE", 2: "#6CD8FD", 3: "#01B6F2", 4: "#0493C2", 5: "#087295", 6: "#0B5269" },
          purple: { 1: "#E7E5F7", 2: "#C3BEED", 3: "#A097E3", 4: "#7E74C2", 5: "#5E578E", 6: "#403C5D" },
          brown:  { 1: "#EAD9D8", 2: "#D3AFAB", 3: "#BC8580", 4: "#A65B54", 5: "#7C3C36", 6: "#482724" },
          grey:   { 1: "#E5E5E5", 2: "#BFBFBF", 3: "#999999", 4: "#737373", 5: "#4D4D4D", 6: "#262626" },
        },
        // Legacy alias — kept for backward compatibility, mapped to new ramp values
        bolt: {
          primary: {
            DEFAULT: "#32C189",
            hover: "#257958",
            dark: "#1F5741",
          },
          secondary: {
            light: "#F5F1E8",
            DEFAULT: "#7DE0B9",
            cream: "#F8F5EE",
          },
          blue: {
            DEFAULT: "#0072BC",
            hover: "#05568B",
            dark: "#0B3754",
          },
          green: {
            button: "#32C189",
            border: "#257958",
            light: "#DAF6EB",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
