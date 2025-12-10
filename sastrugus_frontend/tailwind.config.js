/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class', // Enable dark mode via a CSS class
  content: [
    // Next.js 13 App Directory paths
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./_components/**/*.{js,ts,jsx,tsx}",
    "./resources/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Outfit"', '"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
        mono: ['"DM Mono"', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        brand: {
          50: '#eff4ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        pastel: {
          pink: '#fce7f3', 
          pinkText: '#9d174d',
          mint: '#d1fae5', 
          mintText: '#065f46',
          orange: '#ffedd5',
          orangeText: '#9a3412',
        },
        // 3. The "Canvas" (Warm Neutrals for Light Mode)
        canvas: {
          50: '#f9fafb', // Main App BG (Slightly cool)
          100: '#f3f4f6', // Secondary BG
          200: '#e5e7eb', // Borders
          900: '#111827', // Text
        },
        // 4. The "Night" (Soft Blue-Grays for Dark Mode)
        night: {
          950: '#0f172a', // Main Dark BG (Deep Slate, not Black)
          900: '#1e293b', // Card/Panel BG
          800: '#334155', // Borders/Inputs
          100: '#f1f5f9', // Text
        },
      },
      boxShadow: {
        // Soft, diffuse shadows 
        'soft': '0 10px 40px -10px rgba(0,0,0,0.08)',
        'float': '0 20px 60px -15px rgba(59, 130, 246, 0.15)', 
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}