/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "app/**/*.{ts,tsx}",
        "components/**/*.{ts,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "bg-primary-light": "#ffffff",
                "bg-primary-dark": "#121212",
                "bg-secondary-light": "#f3f4f6",
                "bg-secondary-dark": "#1a1a1a",
                "text-primary-light": "#1f2937",
                "text-primary-dark": "#ffffff",
                "text-secondary-light": "#4b5563",
                "text-secondary-dark": "#e5e7eb",
                "border-primary-light": "#e5e7eb",
                "border-primary-dark": "#383838",
                "border-primary-hovered": "#464646",
            },
            borderRadius: {
                "rounded-primary": "8px",
                "rounded-secondary": "16px",
                "rounded-tertiary": "24px",
                "rounded-full": "9999px",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}
