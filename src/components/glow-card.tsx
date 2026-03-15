'use client';

import { type MouseEvent, type ReactNode, useRef } from 'react';
import { cn } from 'utils/cn';

export function GlowCard({
	className,
	children,
}: {
	className?: string;
	children: ReactNode;
}) {
	const glowRef = useRef<HTMLDivElement>(null);

	function trackGlow(e: MouseEvent<HTMLDivElement>) {
		const glow = glowRef.current;
		if (!glow) return;
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		glow.style.opacity = '1';
		glow.style.background = `radial-gradient(250px circle at ${x}px ${y}px, rgba(45, 212, 191, 0.06), transparent 60%)`;
	}

	function hideGlow() {
		if (glowRef.current) glowRef.current.style.opacity = '0';
	}

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: decorative hover effect
		<div
			onMouseMove={trackGlow}
			onMouseLeave={hideGlow}
			className={cn('relative', className)}
		>
			<div
				ref={glowRef}
				className={cn(
					'pointer-events-none absolute inset-0 rounded-2xl',
					'opacity-0 transition-opacity duration-500',
				)}
				aria-hidden='true'
			/>
			<div className='relative h-full'>{children}</div>
		</div>
	);
}
