'use client';

import { LogoIcon } from 'components/logo-icon';
import { useRef, useState } from 'react';
import { cn } from 'utils/cn';

const effects = [
	'rotate-[360deg] scale-110',
	'rotate-[-360deg] hue-rotate-90 scale-125',
	'rotate-[720deg] hue-rotate-180 scale-110',
	'rotate-[-720deg] hue-rotate-270 scale-150',
	'rotate-[1080deg] scale-100 brightness-150',
];

export function InteractiveLogo({ className }: { className?: string }) {
	const [clicks, setClicks] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

	function handleClick() {
		if (isAnimating) return;

		const next = clicks + 1;
		setClicks(next);
		setIsAnimating(true);

		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => {
			setIsAnimating(false);
		}, 600);
	}

	const effectIndex = isAnimating ? (clicks - 1) % effects.length : -1;

	return (
		<button type='button' onClick={handleClick} className='cursor-pointer'>
			<LogoIcon
				className={cn(
					className,
					'transition-all duration-500 ease-out',
					effectIndex >= 0 && effects[effectIndex],
				)}
			/>
		</button>
	);
}
