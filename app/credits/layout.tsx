import type { Viewport } from 'next';
import type { ReactNode } from 'react';

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	viewportFit: 'cover',
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#f7f7f4' },
		{ media: '(prefers-color-scheme: dark)', color: '#14120b' },
	],
};

export default function CreditsLayout({ children }: { children: ReactNode }) {
	return children;
}
