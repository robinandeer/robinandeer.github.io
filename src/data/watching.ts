export type RecentFlick = {
	title: string;
	creditLine: string;
	poster: string;
	href: string;
};

/** Recent picks for the homepage — posters in `public/posters/`. */
export const recentFlicks: readonly RecentFlick[] = [
	{
		title: 'The Drama',
		creditLine: 'Kristoffer Borgli · 2026',
		poster: '/posters/the-drama.jpg',
		href: 'https://letterboxd.com/film/the-drama/',
	},
	{
		title: 'Hail Mary',
		creditLine: 'Rosemary Rodriguez · 2023',
		poster: '/posters/hail-mary-2023.jpg',
		href: 'https://letterboxd.com/film/hail-mary-2023/',
	},
];
