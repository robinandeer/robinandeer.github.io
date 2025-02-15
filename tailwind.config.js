module.exports = {
	content: [
		'./src/components/**/*.{js,ts,jsx,tsx}',
		'./src/app/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				gray: {
					50: '#cdd9e5',
					100: '#adbac7',
					200: '#909dab',
					300: '#768390',
					400: '#636e7b',
					500: '#545d68',
					600: '#444c56',
					700: '#373e47',
					800: '#2d333b',
					900: '#22272e',
				},
				'twitter-blue': '#075D92',
			},
			typography: theme => ({
				DEFAULT: {
					css: {
						h2: {
							fontSize: '1.4rem',
							fontWeight: '500',
						},
						a: {
							textDecoration: 'none',
							'&:hover': {
								textDecoration: 'underline',
							},
						},
					},
				},
				light: {
					css: [
						{
							color: theme('colors.gray.50'),
							'[class~="lead"]': {
								color: theme('colors.white'),
							},
							a: {
								color: theme('colors.yellow.500'),
							},
							strong: {
								color: theme('colors.white'),
							},
							'ol > li::before': {
								color: theme('colors.gray.300'),
							},
							'ul > li::before': {
								backgroundColor: theme('colors.gray.600'),
							},
							hr: {
								borderWidth: 0,
								height: 3,
								backgroundColor: theme('colors.gray.600'),
								borderRadius: 2,
							},
							blockquote: {
								color: theme('colors.gray.200'),
								borderLeftColor: theme('colors.gray.600'),
								'p::before': {
									content: '""',
								},
							},
							h1: {
								color: theme('colors.white'),
							},
							h2: {
								color: theme('colors.white'),
							},
							h3: {
								color: theme('colors.white'),
							},
							h4: {
								color: theme('colors.white'),
							},
							'figure figcaption': {
								color: theme('colors.gray.400'),
							},
							code: {
								color: theme('colors.white'),
							},
							'p code': {
								backgroundColor: theme('colors.gray.700'),
								padding: '0.2rem 0.3rem',
								borderRadius: '0.2rem',
								fontWeight: 500,
								fontSize: '0.8rem',
							},
							'a code': {
								color: theme('colors.white'),
							},
							pre: {
								color: theme('colors.gray.200'),
								backgroundColor: theme('colors.gray.800'),
							},
							thead: {
								color: theme('colors.white'),
								borderBottomColor: theme('colors.gray.400'),
							},
							'tbody tr': {
								borderBottomColor: theme('colors.gray.600'),
							},
						},
					],
				},
			}),
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
};
