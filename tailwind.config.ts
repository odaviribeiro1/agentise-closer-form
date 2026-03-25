import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#2563EB',
      background: '#FFFFFF',
      white: '#FFFFFF',
      black: '#000000',
      'text-main': '#0D0D0D',
      'text-secondary': '#6B7280',
      'border-light': '#E5E7EB',
      'bg-selected': '#EFF6FF',
      'bg-hover': '#F9FAFB',
      placeholder: '#93C5FD',
    },
    backgroundColor: {
      primary: '#2563EB',
      background: '#FFFFFF',
      white: '#FFFFFF',
      'bg-selected': '#EFF6FF',
      'bg-hover': '#F9FAFB',
    },
    textColor: {
      primary: '#2563EB',
      'text-main': '#0D0D0D',
      'text-secondary': '#6B7280',
      white: '#FFFFFF',
    },
    borderColor: {
      primary: '#2563EB',
      'border-light': '#E5E7EB',
    },
  },
  plugins: [],
};

export default config;
