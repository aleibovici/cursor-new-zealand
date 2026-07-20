export const siteConfig = {
	communityName: 'Cursor New Zealand',
	communityNameLocal: 'New Zealand',
	city: 'Auckland',
	country: 'New Zealand',
	// Fallback when no curated upcoming events exist (primary chapter calendar).
	lumaUrl: 'https://luma.com/cursor-auckland-nz',
	lumaChapterCalendars: [
		{ chapter: 'Auckland', url: 'https://luma.com/cursor-auckland-nz' },
		{ chapter: 'Christchurch', url: 'https://luma.com/cursor-christchurch-nz' },
	],
	// Paste embed URL from Luma → Calendar → Settings → Embed. Leave empty to hide embedded calendar.
	lumaCalendarEmbedUrl: '',
	cursorCommunityUrl: 'https://cursor.com/community',
	defaultLocale: 'en',
	locales: ['en'],
	footerTagline: 'Made with Cursor in Aotearoa New Zealand',
	description: 'Cursor meetups, workshops, and community events across New Zealand.',
	ogImage: '/og.jpg',
	sections: {
		matchmaking: false,
		photoDisclaimer: true,
		lumaCalendar: false,
		communityTweets: false,
	},
};

export type SiteConfig = typeof siteConfig;
