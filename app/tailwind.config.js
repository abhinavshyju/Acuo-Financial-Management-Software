/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
  },
  plugins: [require("daisyui"),require('flowbite/plugin')],
  daisyui: {
    themes: [
      {
        mytheme: {
        
  "primary": "#057aff",
        
  "secondary": "#463aa1",
        
  "accent": "#c149ad",
        
  "neutral": "#021431",
        
  "base-100": "#ffffff",
        
  "info": "#93e6fb",
        
  "success": "#80ced1",
        
  "warning": "#efd8bd",
        
  "error": "#e58b8b",
        },
      }
    ],
  },
}

