import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#ECE7DA',
        ink: '#1A1814',
        'ink-soft': '#242019',
        'ink-border': '#3A3327',
        rust: '#C84B31',
        'warm-grey': '#6B6557',
        'warm-grey-lt': '#A8A290'
      },
      boxShadow: {
        rust: '6px 6px 0 rgba(200, 75, 49, 1)'
      }
    }
  },
  plugins: []
};

export default config;
