/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Caveat"', 'cursive'],
        hand: ['"Patrick Hand"', 'cursive'],
        label: ['"Kalam"', 'cursive'],
      },
      colors: {
        paper: {
          DEFAULT: '#fdfaf3',
          alt: '#f7f0df',
          edge: '#ebe2cc',
        },
        ink: {
          DEFAULT: '#5a4a36',     // warm brown — not pure black
          soft: '#7a6a55',
          muted: '#a89880',
          subtle: '#c9bca5',
        },
        water: {
          soft: '#cfe6f5',         // baby blue
          DEFAULT: '#8fbfe0',
          deep: '#5c95c3',
        },
        lilac: {
          soft: '#e3daf2',
          DEFAULT: '#b8a8db',
          deep: '#8d77c0',
        },
        butter: {
          soft: '#fcecae',
          DEFAULT: '#f6d65c',
          deep: '#d7a823',
        },
        blush: {
          soft: '#fad6da',
          DEFAULT: '#eaa3aa',
          deep: '#c87481',
        },
        mint: {
          soft: '#d2ebd9',
          DEFAULT: '#8fc9a5',
          deep: '#5ca37c',
        },
        peach: {
          soft: '#fde0c6',
          DEFAULT: '#f4b078',
          deep: '#cf8745',
        },
      },
      boxShadow: {
        sticker: '0 1px 0 rgba(90, 74, 54, 0.06), 0 4px 14px -8px rgba(90, 74, 54, 0.16)',
        'sticker-lifted': '0 2px 0 rgba(90, 74, 54, 0.08), 0 10px 22px -12px rgba(90, 74, 54, 0.22)',
        soft: '2px 2px 0 rgba(90, 74, 54, 0.6)',
        cute: '3px 3px 0 rgba(90, 74, 54, 0.45)',
      },
      animation: {
        wave: 'wave 5s ease-in-out infinite',
        'wave-slow': 'wave 8s ease-in-out infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        'slide-down': 'slideDown 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        pop: 'pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        celebrate: 'celebrate 1.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        sparkle: 'sparkle 1.8s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3.5s ease-in-out infinite',
        wiggle: 'wiggle 4s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(14px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: 0, transform: 'translateY(-14px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pop: {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.06) rotate(-1deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
        celebrate: {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '30%': { transform: 'scale(1.06) rotate(-2deg)' },
          '60%': { transform: 'scale(1.03) rotate(2deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
        sparkle: {
          '0%, 100%': { opacity: 0.3, transform: 'scale(0.85) rotate(-6deg)' },
          '50%': { opacity: 1, transform: 'scale(1) rotate(6deg)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 0.85, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.04)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-0.6deg)' },
          '50%': { transform: 'rotate(0.6deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
    },
  },
  plugins: [],
};
