import { ArrowLeftIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export function BackLink({ children }: { children: ReactNode }) {
	return (
		<span className='text-gray-500 dark:text-gray-400 text-sm hover:text-gray-900 dark:hover:text-gray-50 transition-colors inline-flex items-center gap-1.5 py-1'>
			<ArrowLeftIcon className='w-4 h-4' />
			{children}
		</span>
	);
}
