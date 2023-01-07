module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		fontFamily: {
			poppins: ['Poppins', 'sans-serif'],
		},
		extend: {
			colors: {
				'black-color': '#B2B9C5',
				'grey-color': '#EDF0F4',
				'primary-color': '#FE5267',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/typography'),
	],
};
