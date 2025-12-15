import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#0a0a0a',
        'accent-orange': '#ffba75',
        'accent-purple': '#7c3aed',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        handwriting: ['var(--font-handwriting)', 'Kaushan Script', 'cursive'],
      },
      animation: {
        'slow-pan': 'slow-pan 60s infinite alternate ease-in-out',
      },
      keyframes: {
        'slow-pan': {
          '0%': { transform: 'scale(1.05) translate(0, 0)' },
          '50%': { transform: 'scale(1.05) translate(-1%, -1%)' },
          '100%': { transform: 'scale(1.05) translate(0, 0)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config

