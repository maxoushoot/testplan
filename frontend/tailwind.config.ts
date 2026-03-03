import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        forest: '#0F2A1E',
        moss: '#2E5B3C',
        night: '#172433',
        sun: '#F2B84B',
        cream: '#F6F2EA',
        border: '#E6E1D7'
      },
      fontFamily: {
        heading: ['var(--font-sora)', 'Manrope', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif']
      },
      boxShadow: {
        card: '0 14px 40px rgba(23, 36, 51, 0.08)'
      }
    }
  },
  plugins: []
};

export default config;
