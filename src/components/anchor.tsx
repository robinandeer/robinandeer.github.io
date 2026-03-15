import type { ComponentPropsWithoutRef } from 'react';
import { cn } from 'utils/cn';

type Props = ComponentPropsWithoutRef<'a'>;

export function Anchor({ className, target, rel, ...props }: Props) {
	return (
		<a
			className={cn(
				'font-medium underline underline-offset-2 decoration-gray-300 dark:decoration-gray-600 hover:decoration-current transition-colors',
				className,
			)}
			target={target}
			rel={target === '_blank' ? 'noopener noreferrer' : rel}
			{...props}
		/>
	);
}
