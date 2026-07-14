import Image from 'next/image';
import { cn } from 'utils/cn';

/** Runway mark from `public/icons/runway-mark.png` (source: runwayml.com favicon). */
export function RunwayMark({ className }: { className?: string }) {
	return (
		<Image
			src='/icons/runway-mark.png'
			alt=''
			width={40}
			height={40}
			sizes='40px'
			aria-hidden
			className={cn(
				'size-[1em] shrink-0 object-contain opacity-95 dark:opacity-90',
				className,
			)}
		/>
	);
}
