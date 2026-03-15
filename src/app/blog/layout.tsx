import type { ReactNode } from 'react';

export default function BlogLayout({ children }: { children: ReactNode }) {
	return (
		<div className='px-6 py-12 sm:py-16 max-w-2xl mx-auto w-full'>
			{children}
		</div>
	);
}
