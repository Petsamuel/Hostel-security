module.exports = {
  content: ["./public/index.html", "./views/**/*.{ejs,js,png,svg,gif}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#ffff",
          primary: "#f97316",
          secondary: "#004a3a",
        },
      },
    },
  },
  varients: {
    extend: {
      display: ["group-focus"],
      opacity: ["group-focus"],
      inset: ["group-focus"],
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
