'use client';

import { type MouseEvent, type ReactNode, useRef } from 'react';
import { cn } from 'utils/cn';

export function TiltCard({
	className,
	children,
}: {
	className?: string;
	children: ReactNode;
}) {
	const ref = useRef<HTMLDivElement>(null);

	function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
		const el = ref.current;
		if (!el) return;

		const rect = el.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width;
		const y = (e.clientY - rect.top) / rect.height;

		const rotateX = (y - 0.5) * -6;
		const rotateY = (x - 0.5) * 6;

		el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
	}

	function handleMouseLeave() {
		const el = ref.current;
		if (!el) return;
		el.style.transform = '';
	}

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: decorative visual effect only
		<div
			ref={ref}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			className={cn('transition-transform duration-200 ease-out', className)}
		>
			{children}
		</div>
	);
}
