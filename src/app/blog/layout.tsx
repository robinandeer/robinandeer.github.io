import type { ReactNode } from 'react';

export default function BlogLayout({ children }: { children: ReactNode }) {
	return <div className='p-5 sm:p-6'>{children}</div>;
}
