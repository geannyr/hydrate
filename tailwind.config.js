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
        marine: {
          DEFAULT: '#2dd4bf',
          light: '#5eead4',
          deep: '#0d9488',
          glow: 'rgba(45, 212, 191, 0.35)',
        },
        iris: {
          DEFAULT: '#a78bfa',
          light: '#c4b5fd',
          deep: '#7c3aed',
          glow: 'rgba(167, 139, 250, 0.32)',
        },
        ink: {
          bg: '#070f1f',
          alt: '#0b1729',
          surface: 'rgba(255, 255, 255, 0.045)',
          'surface-hover': 'rgba(255, 255, 255, 0.075)',
          border: 'rgba(255, 255, 255, 0.09)',
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
        'glow-lg': '0 0 60px rgba(56, 189, 248, 0.45), 0 0 24px rgba(56, 189, 248, 0.3)',
        'glow-iris': '0 0 32px rgba(167, 139, 250, 0.4)',
        'glow-marine': '0 0 32px rgba(45, 212, 191, 0.4)',
        card: '0 12px 40px -8px rgba(0, 0, 0, 0.45), 0 4px 12px rgba(0, 0, 0, 0.18)',
        'card-hover': '0 20px 60px -10px rgba(0, 0, 0, 0.55), 0 6px 16px rgba(0, 0, 0, 0.22)',
        soft: 'inset 0 1px 0 rgba(255, 255, 255, 0.06)',
      },
      backdropBlur: {
        glass: '24px',
      },
      backgroundImage: {
        'grad-water': 'linear-gradient(135deg, #7dd3fc 0%, #38bdf8 45%, #0ea5e9 100%)',
        'grad-water-soft': 'linear-gradient(135deg, rgba(125, 211, 252, 0.18) 0%, rgba(56, 189, 248, 0.10) 100%)',
        'grad-iris': 'linear-gradient(135deg, #c4b5fd 0%, #a78bfa 50%, #7c3aed 100%)',
        'grad-marine': 'linear-gradient(135deg, #5eead4 0%, #2dd4bf 50%, #0d9488 100%)',
        'grad-hero': 'linear-gradient(160deg, rgba(125, 211, 252, 0.18) 0%, rgba(167, 139, 250, 0.10) 50%, rgba(45, 212, 191, 0.12) 100%)',
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
        'pulse-soft': 'pulseSoft 3.5s ease-in-out infinite',
        shimmer: 'shimmer 2.6s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'bar-grow': 'barGrow 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
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
        pulseSoft: {
          '0%, 100%': { opacity: 0.55, transform: 'scale(1)' },
          '50%': { opacity: 0.95, transform: 'scale(1.06)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        barGrow: {
          '0%': { transform: 'scaleY(0)', opacity: 0 },
          '100%': { transform: 'scaleY(1)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
