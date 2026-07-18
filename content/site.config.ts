export const siteConfig = {
	communityName: 'Cursor New Zealand',
	communityNameLocal: 'New Zealand',
	city: 'Auckland',
	country: 'New Zealand',
	lumaUrl: 'https://luma.com/cursor-new-zealand',
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
