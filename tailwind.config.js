/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        /* Industrial Mono — concrete grey + slate, safety-yellow accent */
        primary: '#334155',        // slate (white text passes contrast)
        'primary-dark': '#1E293B',
        'primary-light': '#64748B',
        accent: '#FACC15',         // safety yellow — sparing pop
        'accent-dark': '#CA8A04',
        background: '#F4F5F7',     // cool concrete off-white
        surface: '#FFFFFF',
        ink: '#161616',
        muted: '#5B6573',
        divider: '#E2E6EB',
        deep: '#111418',           // near-black industrial dark sections
      },
      fontFamily: {
        display: ['"Archivo"', 'system-ui', 'sans-serif'],
        serif: ['"Archivo"', 'system-ui', 'sans-serif'],   // accent lines -> condensed display, not elegant serif
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      /* Square / crisp corners — override the soft radius scale */
      borderRadius: {
        DEFAULT: '0.125rem',
        sm: '0.0625rem',
        md: '0.125rem',
        lg: '0.1875rem',
        xl: '0.1875rem',
        '2xl': '0.25rem',
        '3xl': '0.25rem',
        '2.5xl': '0.25rem',
        '4xl': '0.3125rem',
        '5xl': '0.375rem',
        '6xl': '0.5rem',
        '7xl': '0.5rem',
        full: '0.1875rem',         // pills -> sharp rectangles; tiny dots -> crisp squares
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
