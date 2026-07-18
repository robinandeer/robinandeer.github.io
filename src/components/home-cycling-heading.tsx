'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from 'utils/cn';

const SESSION_INTRO_KEY = 'robin-home-cycling-intro-v1';

function graphemes(text: string): Array<string> {
	try {
		const Segmenter = Intl.Segmenter;
		return [
			...new Segmenter('en', { granularity: 'grapheme' }).segment(text),
		].map((segment) => segment.segment);
	} catch {
		return Array.from(text);
	}
}

export function HomeCyclingHeading({
	lines,
	className,
}: {
	lines: readonly string[];
	className?: string;
}) {
	const hasCycled = useRef(false);
	const [index, setIndex] = useState(0);
	const [sessionIntro, setSessionIntro] = useState(false);

	useEffect(() => {
		try {
			if (sessionStorage.getItem(SESSION_INTRO_KEY)) return;
			sessionStorage.setItem(SESSION_INTRO_KEY, '1');
			setSessionIntro(true);
		} catch {
			// storage unavailable (private mode)
		}
	}, []);

	const cycle = () => {
		hasCycled.current = true;
		setSessionIntro(false);
		setIndex((value) => (value + 1) % lines.length);
	};

	const line = lines[index] ?? lines[0];
	const letters = graphemes(line);
	const showCharStagger = hasCycled.current || sessionIntro;

	return (
		<button
			type='button'
			className={cn(
				'inline-flex flex-wrap items-baseline gap-y-1',
				'm-0 w-auto max-w-full border-0 bg-transparent p-0 text-left font-inherit text-inherit',
				'cursor-pointer rounded-md',
				'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-500/70',
			)}
			aria-live='polite'
			aria-label='Cycle display name'
			onClick={cycle}
		>
			<span
				key={`line-${index}`}
				className={cn(
					'inline-flex flex-wrap items-baseline origin-left [word-break:break-word]',
					className,
				)}
			>
				{letters.map((char, letterIndex) => (
					<span
						key={`${index}-${letterIndex}-${char}`}
						className={cn(
							'inline-block',
							showCharStagger && 'home-cycling-heading-char',
						)}
						style={
							showCharStagger
								? { animationDelay: `${letterIndex * 22}ms` }
								: undefined
						}
					>
						{char === ' ' ? '\u00A0' : char}
					</span>
				))}
			</span>
		</button>
	);
}
