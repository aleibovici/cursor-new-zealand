import { RecapData } from '@/lib/types';
import { christchurchMeetup1Recap } from '@/content/recaps/christchurch-meetup-1';

export const recapsBySlug: Record<string, RecapData> = {
	[christchurchMeetup1Recap.slug]: christchurchMeetup1Recap,
};
