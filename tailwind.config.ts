import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Phoebus Digital Color System
        'cream-base': '#f5f0e8',
        'cream-card': '#f0ebe3', 
        'shadow-dark': '#d4cfc7',
        'shadow-light': '#ffffff',
        'text-primary': '#4a4a4a',
        'text-secondary': '#666666',
        'text-muted': '#999999',
        'sage-green': '#8fad7f',
        'salmon-pink': '#f0807f',
        'bronze': '#d4a574',
      },
      fontFamily: {
        'display': ['Montserrat', 'system-ui', 'sans-serif'],
        'mono': ['Chivo Mono', 'monospace'],
      },
      animation: {
        'gradient-shift': 'gradientShift 30s ease infinite',
        'metal-shimmer': 'metalShimmer 20s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      borderRadius: {
        'neumorphic': '35px',
        'neumorphic-inner': '30px',
        'neumorphic-sm': '25px',
      }
    },
  },
  plugins: [],
}
export default config