'use client';

import { PauseIcon, PlayIcon, RotateCcwIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { cn } from 'utils/cn';

type PostPosterMediaProps = {
	image: string;
	imageWidth?: number;
	imageHeight?: number;
	imageAlt?: string;
	/** /path/under/public — .webm, .mp4, or .mov */
	imageVideo: string;
	playVideoLoops?: number;
	/**
	 * When true on **(hover: hover)** viewports: loop only while hovered (e.g. homepage card).
	 * When false (default): **autoplay** the timed loop on load on all devices — use on full post pages.
	 */
	playOnHover?: boolean;
	className?: string;
};

const transportClass = cn(
	'absolute left-2.5 bottom-2.5 z-10 flex h-11 w-11 items-center justify-center',
	'sm:left-3 sm:bottom-3',
	'rounded-full',
	'bg-white/20 text-gray-800 backdrop-blur-sm',
	'dark:bg-gray-950/45 dark:text-gray-200',
	'transition-colors duration-200 ease-out',
	'hover:bg-white/24 dark:hover:bg-gray-950/50',
	'active:scale-[0.995]',
	'focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-accent-500/50',
);

/**
 * Poster video:
 * - **`playOnHover` + (hover: hover):** static first frame until pointer enters; loops while hovered;
 *   pointer leave resets (replay button after).
 * - **Otherwise:** plays `playVideoLoops` times on load (muted `playsInline`), then stops.
 * - **Reduced motion:** JPEG only.
 */
export function PostPosterMedia({
	image,
	imageWidth = 1200,
	imageHeight = 668,
	imageAlt = '',
	imageVideo,
	playVideoLoops = 2,
	playOnHover = false,
	className,
}: PostPosterMediaProps) {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const /** Skip syncing `isPlaying` from `onPause` when we immediately loop a segment. */
		ignoreNextPauseForPlaying = useRef(false);
	const [useStatic, setUseStatic] = useState(false);
	const [videoReady, setVideoReady] = useState(false);
	const [replaysExhausted, setReplaysExhausted] = useState(false);
	const [mediaHoverCapable, setMediaHoverCapable] = useState(false);
	const hoverToPlay = playOnHover && mediaHoverCapable;
	/** `true` after the first time playback has actually run (avoids a “play” icon before playback). */
	const [hasPlayed, setHasPlayed] = useState(false);
	/** `true` while the element reports playback, except when we’re about to continue a multi-loop. */
	const [isPlaying, setIsPlaying] = useState(false);
	const completedLoops = useRef(0);

	const replayPoster = () => {
		const video = videoRef.current;
		if (!video) return;
		setReplaysExhausted(false);
		completedLoops.current = 0;
		video.loop = false;
		video.currentTime = 0;
		void video.play();
	};

	const onVideoEnded = () => {
		const video = videoRef.current;
		if (!video) return;
		if (video.loop) return;
		completedLoops.current += 1;
		if (completedLoops.current < playVideoLoops) {
			ignoreNextPauseForPlaying.current = true;
			video.currentTime = 0;
			void video.play();
		} else {
			video.pause();
			video.currentTime = 0;
			setIsPlaying(false);
			setReplaysExhausted(true);
		}
	};

	const togglePause = () => {
		const video = videoRef.current;
		if (!video) return;
		if (video.paused) {
			void video.play();
		} else {
			video.pause();
		}
	};

	const resumeFromUserPause = () => {
		const video = videoRef.current;
		if (!video) return;
		void video.play();
	};

	useEffect(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		if (mq.matches) setUseStatic(true);
		const onChange = () => {
			if (mq.matches) setUseStatic(true);
		};
		mq.addEventListener('change', onChange);
		return () => mq.removeEventListener('change', onChange);
	}, []);

	useLayoutEffect(() => {
		setMediaHoverCapable(window.matchMedia('(hover: hover)').matches);
	}, []);

	/** Autoplay the timed loop when not in hover-to-play mode (no `autoPlay` attribute — avoids flash). */
	useEffect(() => {
		if (!videoReady || useStatic || hoverToPlay) return;
		const video = videoRef.current;
		if (!video) return;
		video.loop = false;
		void video.play();
	}, [videoReady, useStatic, hoverToPlay]);

	const onPointerEnter = () => {
		if (!hoverToPlay) return;
		const video = videoRef.current;
		if (!video) return;
		video.loop = true;
		setReplaysExhausted(false);
		void video.play();
	};

	const onPointerLeave = () => {
		if (!hoverToPlay) return;
		const video = videoRef.current;
		if (!video) return;
		video.loop = false;
		video.pause();
		video.currentTime = 0;
		setIsPlaying(false);
		setReplaysExhausted(true);
	};

	if (useStatic) {
		return (
			<Image
				preload
				src={image}
				width={imageWidth}
				height={imageHeight}
				alt={imageAlt}
				className={cn('rounded-lg', className)}
			/>
		);
	}

	return (
		<div
			className={cn(
				'relative w-full max-w-full overflow-hidden rounded-lg',
				'bg-gray-50 dark:bg-gray-950',
				hoverToPlay && 'cursor-pointer',
				className,
			)}
			style={{ aspectRatio: `${imageWidth} / ${imageHeight}` }}
			onPointerEnter={onPointerEnter}
			onPointerLeave={onPointerLeave}
		>
			{/* Keep mounted so layout/letterbox doesn’t jump when the video fades in. */}
			<Image
				preload
				src={image}
				width={imageWidth}
				height={imageHeight}
				alt={videoReady ? '' : imageAlt}
				aria-hidden={videoReady}
				className={cn(
					'absolute inset-0 block h-full w-full object-cover object-center',
					'transition-opacity duration-500',
					videoReady ? 'pointer-events-none opacity-0' : 'opacity-100',
				)}
			/>
			<video
				ref={videoRef}
				className={cn(
					'absolute inset-0 block h-full w-full object-cover object-center',
					'transition-opacity duration-500',
					videoReady ? 'opacity-100' : 'opacity-0',
				)}
				playsInline
				muted
				preload='auto'
				aria-label={imageAlt}
				onLoadedData={() => setVideoReady(true)}
				onEnded={onVideoEnded}
				onPlay={() => {
					setIsPlaying(true);
				}}
				onPause={() => {
					if (ignoreNextPauseForPlaying.current) {
						ignoreNextPauseForPlaying.current = false;
						return;
					}
					const v = videoRef.current;
					// `ended` is handled in `onEnded` (loop vs finish); avoids a bogus “resume” in the gap.
					if (v?.ended) return;
					setIsPlaying(false);
				}}
				onPlaying={() => setHasPlayed(true)}
				onError={() => setUseStatic(true)}
			>
				{imageVideo && (
					<source
						src={imageVideo}
						type={
							imageVideo.endsWith('.mp4')
								? 'video/mp4'
								: imageVideo.endsWith('.mov')
									? 'video/quicktime'
									: 'video/webm'
						}
					/>
				)}
			</video>
			{videoReady && (
				<>
					{replaysExhausted && (
						<button
							type='button'
							className={transportClass}
							aria-label='Replay poster animation from the start'
							onClick={replayPoster}
						>
							<RotateCcwIcon
								className='h-[1.1rem] w-[1.1rem]'
								strokeWidth={1.75}
								aria-hidden
							/>
						</button>
					)}
					{!replaysExhausted && hasPlayed && isPlaying && (
						<button
							type='button'
							className={transportClass}
							aria-label='Pause'
							onClick={togglePause}
						>
							<PauseIcon
								className='h-[1.1rem] w-[1.1rem]'
								strokeWidth={1.75}
								aria-hidden
							/>
						</button>
					)}
					{!replaysExhausted && hasPlayed && !isPlaying && (
						<button
							type='button'
							className={transportClass}
							aria-label='Resume'
							onClick={resumeFromUserPause}
						>
							<PlayIcon
								className='h-[1.1rem] w-[1.1rem] translate-x-px'
								strokeWidth={1.75}
								aria-hidden
							/>
						</button>
					)}
				</>
			)}
		</div>
	);
}
