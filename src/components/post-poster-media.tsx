'use client';

import { PauseIcon, PlayIcon, RotateCcwIcon } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from 'utils/cn';

type PostPosterMediaProps = {
	image: string;
	imageWidth?: number;
	imageHeight?: number;
	imageAlt?: string;
	/** /path/under/public — .webm, .mp4, or .mov */
	imageVideo: string;
	playVideoLoops?: number;
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
 * Plays a short poster loop a few times on load, then pauses; user can pause/resume or replay
 * the full run. Falls back to `image` if video is missing, fails, or reduced motion is preferred.
 */
export function PostPosterMedia({
	image,
	imageWidth = 1200,
	imageHeight = 668,
	imageAlt = '',
	imageVideo,
	playVideoLoops = 2,
	className,
}: PostPosterMediaProps) {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const /** Skip syncing `isPlaying` from `onPause` when we immediately loop a segment. */
		ignoreNextPauseForPlaying = useRef(false);
	const [useStatic, setUseStatic] = useState(false);
	const [videoReady, setVideoReady] = useState(false);
	const [replaysExhausted, setReplaysExhausted] = useState(false);
	/** `true` after the first time playback has actually run (avoids a “play” icon before autoplay). */
	const [hasPlayed, setHasPlayed] = useState(false);
	/** `true` while the element reports playback, except when we’re about to continue a multi-loop. */
	const [isPlaying, setIsPlaying] = useState(false);
	const completedLoops = useRef(0);

	const replayPoster = useCallback(() => {
		const video = videoRef.current;
		if (!video) return;
		setReplaysExhausted(false);
		completedLoops.current = 0;
		video.currentTime = 0;
		void video.play();
	}, []);

	const onVideoEnded = useCallback(() => {
		const video = videoRef.current;
		if (!video) return;
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
	}, [playVideoLoops]);

	const togglePause = useCallback(() => {
		const video = videoRef.current;
		if (!video) return;
		if (video.paused) {
			void video.play();
		} else {
			video.pause();
		}
	}, []);

	const resumeFromUserPause = useCallback(() => {
		const video = videoRef.current;
		if (!video) return;
		void video.play();
	}, []);

	useEffect(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		if (mq.matches) setUseStatic(true);
		const onChange = () => {
			if (mq.matches) setUseStatic(true);
		};
		mq.addEventListener('change', onChange);
		return () => mq.removeEventListener('change', onChange);
	}, []);

	if (useStatic) {
		return (
			<Image
				priority
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
				className,
			)}
			style={{ aspectRatio: `${imageWidth} / ${imageHeight}` }}
		>
			{/* Keep mounted so layout/letterbox doesn’t jump when the video fades in. */}
			<Image
				priority
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
				autoPlay
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
