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
        parch: {
          50: '#FEFEFC',
          100: '#F9F4ED',
          200: '#F1E8D8',
          300: '#E6D8C4',
          400: '#D4C0A4',
          500: '#BCA888',
        },
        gold: {
          100: '#F8ECC0',
          200: '#EDD278',
          300: '#D4A840',
          400: '#B88A1A',
          500: '#9A7008',
        },
        stone: {
          200: '#DDD0BC',
          300: '#C0A888',
          400: '#9A8068',
          500: '#786050',
          600: '#584438',
        },
        ink: '#0A0806',
        noir: '#13100C',
        charcoal: '#1E1912',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        dm: ['var(--font-dm)', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}

export default config
