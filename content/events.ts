import { CursorEvent } from '@/lib/types';

// Add events here once they're live on Luma — include the event page URL in lumaUrl.
export const events: CursorEvent[] = [
	{
		id: 'christchurch-meetup-1',
		title: 'Cursor Christchurch Meetup #1',
		status: 'past',
		date: '2026-07-26',
		displayDate: 'Sunday, 26 July 2026',
		location: 'The Arts Centre Te Matatiki Toi Ora · Christchurch',
		lumaUrl: 'https://luma.com/ydfbgrle',
		recapPath: '/recaps/christchurch-meetup-1',
		thumbnail: '/images/events/christchurch-meetup-01-presentation.jpg',
	},
	{
		id: 'auckland-meetup-1',
		title: 'Cursor Meetup Auckland',
		status: 'past',
		date: '2026-08-19',
		displayDate: 'Tuesday, 19 August 2026',
		location: 'GridAKL · Auckland',
		lumaUrl: 'https://luma.com/wpqmhxst',
		recapPath: '/recaps/auckland-meetup-1',
		thumbnail: '/images/events/auckland-meetup-05-agenda.webp',
	},
];

export const upcomingEvents = events.filter((event) => event.status === 'upcoming');
export const pastEvents = events.filter((event) => event.status === 'past');
