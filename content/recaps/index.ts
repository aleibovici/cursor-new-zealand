import { RecapData } from '@/lib/types';
import { aucklandMeetup1Recap } from '@/content/recaps/auckland-meetup-1';
import { aucklandMeetup2Recap } from '@/content/recaps/auckland-meetup-2';
import { christchurchMeetup1Recap } from '@/content/recaps/christchurch-meetup-1';

export const recapsBySlug: Record<string, RecapData> = {
	[aucklandMeetup1Recap.slug]: aucklandMeetup1Recap,
	[aucklandMeetup2Recap.slug]: aucklandMeetup2Recap,
	[christchurchMeetup1Recap.slug]: christchurchMeetup1Recap,
};
