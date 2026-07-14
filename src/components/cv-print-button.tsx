'use client';

import { PrinterIcon } from 'lucide-react';
import { cn } from 'utils/cn';

export function CvPrintButton() {
	return (
		<button
			type='button'
			onClick={() => window.print()}
			className={cn(
				'fixed bottom-5 right-5 z-40 print:hidden',
				'inline-flex items-center gap-2 rounded-full px-4 py-2.5',
				'bg-gray-950 text-white text-sm font-medium shadow-lg shadow-gray-950/10',
				'hover:bg-gray-800 active:bg-black',
				'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600',
				'transition-colors',
			)}
		>
			<PrinterIcon className='size-4 shrink-0' aria-hidden />
			Save as PDF
		</button>
	);
}
