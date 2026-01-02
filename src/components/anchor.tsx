import type { ComponentPropsWithoutRef } from 'react';
import { cn } from 'utils/cn';

type Props = ComponentPropsWithoutRef<'a'>;

export function Anchor({ className, target, rel, ...props }: Props) {
	return (
		<a
			className={cn(
				'font-medium rounded cursor-pointer underline focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50',
				className,
			)}
			target={target}
			rel={target === '_blank' ? 'noopener noreferrer' : rel}
			{...props}
		/>
	);
}
