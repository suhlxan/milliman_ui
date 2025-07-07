/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        bounceY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        swingX: {
          '0%, 100%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(10deg)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        bounceY: 'bounceY 1s infinite',
        swingX: 'swingX 1.5s infinite',
        spinSlow: 'spinSlow 2s linear infinite',
      },
      colors: {
        "brand-primary-blue": "#1355E9",
        "brand-coral": "#F2695A",
        "brand-pale-cyan": "#E1EDFF", 
        "brand-cyan": "#44B8F3",
        "brand-yellow": "#FFC107",
        "brand-navy": "#1A3673",
        "brand-mediumBlue": "#1E58AA",
        "brand-teal" : "#20c997",
        "brand-grayBlue" : "#ecf8fe",
        "brand-linkBlue": "#2861BB",
        "brand-success": "#108000",
        "brand-error": "#DA0A0A",
        "brand-warning": "#F2C135",
        "brand-black": "#131331",
        "brand-gray": "#666666",
        "brand-gray-medium": "#949494",
        "brand-gray-light": "#CCCCCC",
      },
      fontSize: {
        h1: ["60px", "72px"],
        h2: ["48px", "60px"],
        h3: ["36px", "48px"],
        h4: ["28px", "40px"],
        h5: ["24px", "36px"],
        h6: ["20px", "24px"],
        body: ["18px", "26px"],
        "body-sm": ["16px", "22px"],
        button: ["18px", "22px"],
      },
      maxWidth: {
        content: "1250px",
        desktop: "1440px",
      },
      spacing: {
        gutter: "24px",
        column: "72px",
      },
    },
  },
  plugins: [],
};