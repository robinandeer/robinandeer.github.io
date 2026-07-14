/**
 * Footer + social — single source for “Connect” rows (avoid drifting from home copy).
 */
export type SiteConnectEntry = {
	label: string;
	href: string;
	/** Shown as secondary line under label */
	display: string;
	external?: boolean;
};

export const siteConnectLinks: Array<SiteConnectEntry> = [
	{
		label: 'GitHub',
		href: 'https://github.com/robinandeer',
		display: '@robinandeer',
		external: true,
	},
	{
		label: 'X',
		href: 'https://x.com/robinandeer',
		display: '@robinandeer',
		external: true,
	},
	{
		label: 'LinkedIn',
		href: 'https://www.linkedin.com/in/robinandeer/',
		display: 'robinandeer',
		external: true,
	},
	{
		label: 'RSS',
		href: '/feed.xml',
		display: 'Atom feed',
		external: false,
	},
];

export const siteSourceRepoUrl =
	'https://github.com/robinandeer/robinandeer.github.io';
