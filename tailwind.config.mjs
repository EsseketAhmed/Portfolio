/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,tsx,ts,js}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Pr_1', 'sans-serif'],
        body: ['Pr_2', 'sans-serif'],
      },
      colors: {
        accent: '#E8FF00',
        dark: '#0A0A0A',
        surface: '#111111',
      },
      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      keyframes: {
        'animate-marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'animate-marquee 20s linear infinite',
      },
    },
  },
  plugins: [],
};
