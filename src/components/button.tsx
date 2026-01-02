import type { ComponentPropsWithoutRef } from 'react';
import { cn } from 'utils/cn';

const baseStyles =
	'rounded-lg py-2 font-medium text-base text-center bg-gray-50 bg-opacity-50 hover:bg-opacity-75 active:bg-opacity-100 dark:bg-gray-500 dark:bg-opacity-90 dark:hover:bg-opacity-80 dark:active:bg-opacity-90 text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50';

export function Button({
	className,
	...props
}: ComponentPropsWithoutRef<'button'>) {
	return <button className={cn(baseStyles, className)} {...props} />;
}

export function ButtonLink({
	className,
	href,
	...props
}: ComponentPropsWithoutRef<'a'> & { href: string }) {
	const isExternal = href.startsWith('http');
	return (
		<a
			href={href}
			className={cn(baseStyles, className)}
			{...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
			{...props}
		/>
	);
}
