'use client';

import { useRouter } from 'next/navigation';
import type { MouseEvent, ReactNode } from 'react';

export function HistoryBack({
	fallback,
	children,
}: {
	fallback: string;
	children: ReactNode;
}) {
	const router = useRouter();

	function goBack(e: MouseEvent<HTMLAnchorElement>) {
		e.preventDefault();
		router.back();
	}

	return (
		<a href={fallback} onClick={goBack}>
			{children}
		</a>
	);
}
