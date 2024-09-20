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
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        pink: {
          '400': '#F472B6',
          '500': '#EC4899',
        },
        violet: {
          '50': '#F5F3FF',
          '500': '#8B5CF6',
        },
        zinc: {
          '950': '#09090B',
        },
      },
    },
  },
  plugins: [],
}
export default config
