'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { cn } from 'utils/cn';

let hasPlayed = false;

export function StaggerGrid({
	className,
	children,
}: {
	className?: string;
	children: ReactNode;
}) {
	const [shouldAnimate] = useState(!hasPlayed);

	useEffect(() => {
		hasPlayed = true;
	}, []);

	return (
		<div className={cn(className, shouldAnimate && 'stagger-grid')}>
			{children}
		</div>
	);
}
