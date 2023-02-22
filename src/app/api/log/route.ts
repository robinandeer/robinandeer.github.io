import incrementPageCount from 'database/increment-page-count';
import {NextResponse} from 'next/server';

export async function POST(request: Request) {
	const data = await request.json();
	await incrementPageCount(data.url);
	return NextResponse.json({status: 'OK'});
}
