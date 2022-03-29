module.exports = {
    content: ["./public/index.ejs, dashboard.ejs", "./views/**/*.{ejs,js,png,svg}"],
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