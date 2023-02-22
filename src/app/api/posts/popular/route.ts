import getPopularPosts from 'database/get-popular-posts';
import {NextResponse} from 'next/server';

export async function GET() {
	const blogPosts = await getPopularPosts();
	return NextResponse.json({blogPosts});
}
