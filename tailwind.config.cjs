/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {},
	extend: {
		colors: {
			blue: {
				100: '#E6F0FF',
				200: '#CCE1FF',
				300: '#99C2FF',
				400: '#4D84FF',
				500: '#0055FF',
				600: '#0044CC',
				700: '#002D80',
				800: '#001A4D',
				900: '#000D26'
			},
			base: {
				100: '#F7F7F7',
				200: '#EFEFEF',
				300: '#E0E0E0',
				400: '#BDBDBD',
				500: '#9E9E9E',
				600: '#757575',
				700: '#616161',
				800: '#424242',
				900: '#212121'
			},
		}
	},
	plugins: []
};

module.exports = config;
