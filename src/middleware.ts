import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

const logPageVisit = async (url: string) => {
	if (process.env.NODE_ENV === 'production') {
		await fetch(`${process.env.VERCEL_URL}/api/log`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({url}),
		});
	} else {
		console.log('Would\'ve logged page', url);
	}
};

export async function middleware(request: NextRequest) {
	try {
		await logPageVisit(request.nextUrl.pathname);
	} catch (error) {
		console.error('Middleware error');
		console.error(error);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/blog/:path*'],
};
