import { ArrowLeftCircleIcon } from 'lucide-react';
import type React from 'react';

const BackLink = ({ children }: { children: React.ReactNode }) => (
	<span className='text-gray-700 dark:text-gray-200 text-base hover:bg-gray-50 hover:bg-opacity-50 dark:hover:bg-gray-700 dark:hover:text-gray-50 active:bg-gray-200 dark:active:bg-gray-600 rounded inline-block px-2 py-1 -ml-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50'>
		<div className='flex items-center gap-1'>
			<ArrowLeftCircleIcon className='w-5 h-5' />
			{children}
		</div>
	</span>
);

export default BackLink;
