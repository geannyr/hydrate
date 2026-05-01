/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        heading: ['Sora', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        aqua: {
          DEFAULT: '#38bdf8',
          light: '#7dd3fc',
          deep: '#0284c7',
          glow: 'rgba(56, 189, 248, 0.4)',
          subtle: 'rgba(56, 189, 248, 0.12)',
        },
        ink: {
          bg: '#0a1525',
          alt: '#0f1c30',
          surface: 'rgba(255, 255, 255, 0.05)',
          'surface-hover': 'rgba(255, 255, 255, 0.08)',
          border: 'rgba(255, 255, 255, 0.1)',
          'border-hover': 'rgba(255, 255, 255, 0.18)',
          text: '#f0f7ff',
          muted: '#9bb0c8',
          subtle: '#647489',
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        glow: '0 0 32px rgba(56, 189, 248, 0.4)',
        'glow-soft': '0 0 24px rgba(56, 189, 248, 0.25)',
        card: '0 8px 32px rgba(0, 0, 0, 0.25)',
        soft: 'inset 0 1px 0 rgba(255, 255, 255, 0.06)',
      },
      backdropBlur: {
        glass: '20px',
      },
      animation: {
        wave: 'wave 5s ease-in-out infinite',
        'wave-slow': 'wave 8s ease-in-out infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        'slide-down': 'slideDown 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        pop: 'pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'bg-pan': 'bgPan 18s linear infinite',
        'bubble-rise': 'bubbleRise 30s linear infinite',
        celebrate: 'celebrate 1.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        sparkle: 'sparkle 1.6s ease-in-out infinite',
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
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: 0, transform: 'translateY(-16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)' },
        },
        bgPan: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        bubbleRise: {
          '0%': { transform: 'translateY(110vh) translateX(0)', opacity: 0 },
          '10%': { opacity: 0.6 },
          '50%': { transform: 'translateY(45vh) translateX(20px)' },
          '90%': { opacity: 0.6 },
          '100%': { transform: 'translateY(-20vh) translateX(0)', opacity: 0 },
        },
        celebrate: {
          '0%': { transform: 'scale(1)' },
          '30%': { transform: 'scale(1.08) rotate(-2deg)' },
          '60%': { transform: 'scale(1.04) rotate(2deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
        sparkle: {
          '0%, 100%': { opacity: 0, transform: 'scale(0.6)' },
          '50%': { opacity: 1, transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
