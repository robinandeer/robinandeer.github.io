'use client';

import { useEffect, useState } from 'react';

function getGreeting() {
	const hour = new Date().getHours();
	if (hour < 5) return 'Good evening';
	if (hour < 12) return 'Good morning';
	if (hour < 18) return 'Good afternoon';
	return 'Good evening';
}

export function Greeting() {
	const [greeting, setGreeting] = useState<string | null>(null);

	useEffect(() => {
		setGreeting(getGreeting());
	}, []);

	if (!greeting) return null;

	return <>{greeting}. </>;
}
