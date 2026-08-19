import { RecapData } from '@/lib/types';
import { aucklandMeetup1Recap } from '@/content/recaps/auckland-meetup-1';
import { christchurchMeetup1Recap } from '@/content/recaps/christchurch-meetup-1';

export const recapsBySlug: Record<string, RecapData> = {
	[aucklandMeetup1Recap.slug]: aucklandMeetup1Recap,
	[christchurchMeetup1Recap.slug]: christchurchMeetup1Recap,
};
