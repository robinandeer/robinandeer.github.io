import { ScrollToTopButton } from 'components/scroll-to-top-button';
import type { ReactNode } from 'react';

export default function BlogPostLayout({ children }: { children: ReactNode }) {
	return (
		<>
			{children}
			<ScrollToTopButton />
		</>
	);
}
