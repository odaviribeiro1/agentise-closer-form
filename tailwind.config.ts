import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6C2BD9',
        secondary: '#9B59F5',
        background: '#0D0D0D',
        surface: '#1A1A1A',
        'text-main': '#FFFFFF',
        'text-secondary': '#A0A0A0',
        border: '#2A2A2A',
        success: '#00C48C',
      },
      backgroundColor: {
        primary: '#6C2BD9',
        secondary: '#9B59F5',
        background: '#0D0D0D',
        surface: '#1A1A1A',
        border: '#2A2A2A',
      },
      textColor: {
        primary: '#FFFFFF',
        secondary: '#A0A0A0',
      },
      borderColor: {
        primary: '#6C2BD9',
        border: '#2A2A2A',
      },
    },
  },
  plugins: [],
};

export default config;
