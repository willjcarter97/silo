/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#FF322E',
      },
      // Spacing tokens for consistent section spacing across the site
      // Usage: my-section (mobile), md:my-section-lg (desktop)
      spacing: {
        'section': '4rem',      // 64px - mobile section divider spacing
        'section-lg': '6rem',   // 96px - desktop section divider spacing  
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 18s linear infinite',
      },
      fontFamily: {
        // System stack to match clean sans look
        sans: [
          'ui-sans-serif',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
        dm: ['DM Sans', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial'],
        epilogue: ['Epilogue', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial'],
      },
    },
  },
  plugins: [],
  // safelist font-weight utilities used dynamically for per-letter weights in AnimatedLetters
  safelist: [
    'font-thin','font-light','font-normal','font-medium','font-semibold','font-bold','font-black'
  ],
};


