import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        background: '#FFFFFF',
        'text-main': '#0D0D0D',
        'text-secondary': '#6B7280',
        'border-light': '#E5E7EB',
        'bg-selected': '#EFF6FF',
        'bg-hover': '#F9FAFB',
        placeholder: '#93C5FD',
      },
    },
  },
  plugins: [],
};

export default config;
