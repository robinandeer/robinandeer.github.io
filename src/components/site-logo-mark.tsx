import { LogoIcon } from 'components/logo-icon';
import { cn } from 'utils/cn';

const frames = {
	/** Aligned with `ThemeToggle` shell (~h-9) */
	sm: { box: 'h-9 w-9 p-1.5', icon: 'h-5 w-5' },
	/** Post byline */
	md: {
		box: 'h-11 w-11 p-2 sm:h-12 sm:w-12 sm:p-2.5',
		icon: 'h-6 w-6 sm:h-7 sm:w-7',
	},
	/** Post author footer (slightly larger than byline, not dominant) */
	lg: {
		box: 'h-14 w-14 p-2 sm:h-16 sm:w-16 sm:p-2.5',
		icon: 'h-7 w-7 sm:h-8 sm:w-8',
	},
} as const;

type SiteLogoMarkProps = {
	className?: string;
	size?: keyof typeof frames;
};

/**
 * Site logo inside a theme-toggle–style frame: rounded pill, light/dark border + surface, neutral mark.
 */
export function SiteLogoMark({ className, size = 'md' }: SiteLogoMarkProps) {
	const { box, icon } = frames[size];

	return (
		<div
			className={cn(
				'flex shrink-0 items-center justify-center rounded-full',
				'border border-solid border-gray-200 bg-white',
				'dark:border-gray-700 dark:bg-gray-900',
				box,
				className,
			)}
			aria-hidden
		>
			<LogoIcon className={cn('text-gray-800 dark:text-gray-200', icon)} />
		</div>
	);
}
