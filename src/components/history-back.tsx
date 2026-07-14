'use client';

import { useRouter } from 'next/navigation';
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';

export function HistoryBack({
	fallback,
	children,
	className,
	...anchorProps
}: {
	fallback: string;
	children: ReactNode;
	className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
	const router = useRouter();

	function goBack(e: MouseEvent<HTMLAnchorElement>) {
		e.preventDefault();
		router.back();
	}

	return (
		<a {...anchorProps} href={fallback} onClick={goBack} className={className}>
			{children}
		</a>
	);
}
