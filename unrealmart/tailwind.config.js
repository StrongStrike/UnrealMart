/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class', // уже есть
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	safelist: ['light'], // 👈 если используешь light в classList
	theme: {
		extend: {},
	},
	plugins: [],
}
