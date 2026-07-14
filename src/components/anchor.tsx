import type { ComponentPropsWithoutRef } from 'react';
import { cn } from 'utils/cn';

/** Shared with in-app `Link` usages that should match external **`Anchor`** styling. */
export const anchorLinkClassName = cn(
	'font-medium text-gray-800 underline underline-offset-2 decoration-gray-400/80',
	'dark:text-gray-200 dark:decoration-gray-500',
	'hover:decoration-current transition-colors',
);

type Props = ComponentPropsWithoutRef<'a'>;

export function Anchor({ className, target, rel, ...props }: Props) {
	return (
		<a
			className={cn(anchorLinkClassName, className)}
			target={target}
			rel={target === '_blank' ? 'noopener noreferrer' : rel}
			{...props}
		/>
	);
}
