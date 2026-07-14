'use client';

import { MoonIcon, SunIcon, SunMoonIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { type MouseEvent, useEffect, useRef, useState } from 'react';
import { cn } from 'utils/cn';

const options = [
	{ value: 'light' as const, label: 'Light', Icon: SunIcon },
	{ value: 'dark' as const, label: 'Dark', Icon: MoonIcon },
	{ value: 'system' as const, label: 'System', Icon: SunMoonIcon },
] as const;

const optionBaseClass =
	'inline-flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full text-gray-500 transition-all duration-200 ease-out motion-reduce:transition-none hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100';

const activePillClass =
	'bg-accent-500/15 text-accent-600 dark:bg-accent-400/15 dark:text-accent-400';

type ThemeValue = (typeof options)[number]['value'];

/** Keep three icons mounted briefly after click so inactive slots can squeeze out. */
const POST_PICK_LIST_HOLD_MS = 100;

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [hovered, setHovered] = useState(false);
	const [focusInside, setFocusInside] = useState(false);
	/** After picking a theme with mouse, stay collapsed while pointer is still over the pill. */
	const [dismissAfterPick, setDismissAfterPick] = useState(false);
	/** True while inactive icons animate out before the strip width closes. */
	const [isPostPickCollapsing, setIsPostPickCollapsing] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const postPickCollapseTimeoutRef = useRef<ReturnType<
		typeof setTimeout
	> | null>(null);

	const activeTheme: ThemeValue = options.some((o) => o.value === theme)
		? (theme as ThemeValue)
		: 'system';

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		return () => {
			if (postPickCollapseTimeoutRef.current !== null) {
				clearTimeout(postPickCollapseTimeoutRef.current);
			}
		};
	}, []);

	/** keyboard / focus: treat the strip as “open” so all three show + active pill. */
	useEffect(() => {
		const root = rootRef.current;
		if (!root) {
			return;
		}
		const onFocusIn = () => {
			setFocusInside(true);
		};
		const onFocusOut = (event: FocusEvent) => {
			const next = event.relatedTarget as Node | null;
			if (next && root.contains(next)) {
				return;
			}
			setFocusInside(false);
		};
		root.addEventListener('focusin', onFocusIn);
		root.addEventListener('focusout', onFocusOut);
		return () => {
			root.removeEventListener('focusin', onFocusIn);
			root.removeEventListener('focusout', onFocusOut);
		};
	}, []);

	useEffect(() => {
		if (!menuOpen) {
			return;
		}
		const onPointerDown = (event: PointerEvent) => {
			const root = rootRef.current;
			if (root && !root.contains(event.target as Node)) {
				setMenuOpen(false);
			}
		};
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setMenuOpen(false);
			}
		};
		document.addEventListener('pointerdown', onPointerDown, true);
		document.addEventListener('keydown', onKeyDown, true);
		return () => {
			document.removeEventListener('pointerdown', onPointerDown, true);
			document.removeEventListener('keydown', onKeyDown, true);
		};
	}, [menuOpen]);

	const prefersCoarse =
		typeof window !== 'undefined' &&
		window.matchMedia('(pointer: coarse)').matches;

	/**
	 * Expanded shell: touch sheet, keyboard focus (until dismissed), or hover (until pick).
	 * After a mouse/keyboard pick, `dismissAfterPick` turns off hover + focus expansion so the
	 * pill can close immediately while `isPostPickCollapsing` finishes icon cleanup.
	 */
	const stripExpanded =
		mounted &&
		(menuOpen ||
			(focusInside && !dismissAfterPick) ||
			(hovered && !dismissAfterPick));

	const list =
		stripExpanded || isPostPickCollapsing
			? options
			: options.filter((o) => o.value === activeTheme);

	const onOptionClick = (
		value: ThemeValue,
		event: MouseEvent<HTMLButtonElement>,
	) => {
		if (prefersCoarse) {
			if (!menuOpen) {
				setMenuOpen(true);
				return;
			}
			if (value === activeTheme) {
				setMenuOpen(false);
				return;
			}
		}
		setTheme(value);
		if (prefersCoarse) {
			setMenuOpen(false);
		} else {
			setDismissAfterPick(true);
			const target = event.currentTarget;
			queueMicrotask(() => {
				target?.blur();
			});

			const instantCollapse =
				typeof window !== 'undefined' &&
				window.matchMedia('(prefers-reduced-motion: reduce)').matches;

			if (instantCollapse) {
				setIsPostPickCollapsing(false);
				if (postPickCollapseTimeoutRef.current !== null) {
					clearTimeout(postPickCollapseTimeoutRef.current);
					postPickCollapseTimeoutRef.current = null;
				}
			} else {
				if (postPickCollapseTimeoutRef.current !== null) {
					clearTimeout(postPickCollapseTimeoutRef.current);
				}
				setIsPostPickCollapsing(true);
				postPickCollapseTimeoutRef.current = setTimeout(() => {
					setIsPostPickCollapsing(false);
					postPickCollapseTimeoutRef.current = null;
				}, POST_PICK_LIST_HOLD_MS);
			}
		}
	};

	return (
		<div
			ref={rootRef}
			className={cn('relative inline-flex', menuOpen && 'max-sm:z-[60]')}
		>
			{!mounted ? (
				<div
					className={cn(
						'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200/90 bg-white/90',
						'shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]',
						'dark:border-gray-700/90 dark:bg-gray-900/90 dark:shadow-[inset_0_1px_3px_rgba(0,0,0,0.35)]',
					)}
					aria-hidden
				/>
			) : (
				<fieldset
					className={cn(
						'pointer-events-auto m-0 flex h-9 min-w-0 shrink-0 items-center justify-center overflow-hidden rounded-full border border-solid border-gray-200/90 bg-gray-50/90 p-px',
						'shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]',
						'dark:border-gray-700/90 dark:bg-gray-900/80 dark:shadow-[inset_0_1px_3px_rgba(0,0,0,0.35)]',
						'w-9 min-w-9',
						'transition-[width,min-width,padding] duration-150 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none',
						stripExpanded && 'w-25 min-w-25 px-1.5',
					)}
					onMouseEnter={() => setHovered(true)}
					onMouseLeave={() => {
						setHovered(false);
						setDismissAfterPick(false);
					}}
				>
					<legend className='sr-only'>Color theme</legend>
					<div
						className={cn(
							'flex w-full min-w-0 items-center',
							isPostPickCollapsing && 'justify-center gap-0',
							!isPostPickCollapsing &&
								(stripExpanded ? 'justify-center gap-1' : 'justify-center'),
						)}
					>
						{list.map(({ value, label, Icon }) => {
							const isActive = activeTheme === value;
							return (
								<button
									key={value}
									type='button'
									aria-pressed={isActive}
									title={label}
									className={cn(
										optionBaseClass,
										isPostPickCollapsing &&
											!isActive &&
											'pointer-events-none duration-100 ease-out shrink !min-w-0 !w-0 max-w-0 scale-90 opacity-0 !p-0 !mx-0 border-transparent',
										isActive && 'text-gray-600 dark:text-gray-300',
										/* Teal while open or during instant post-pick squeeze. */
										isActive &&
											(stripExpanded || isPostPickCollapsing) &&
											activePillClass,
									)}
									onClick={(event) => onOptionClick(value, event)}
								>
									<Icon className='h-3.5 w-3.5 shrink-0' aria-hidden />
									<span className='sr-only'>{label}</span>
								</button>
							);
						})}
					</div>
				</fieldset>
			)}
		</div>
	);
}
