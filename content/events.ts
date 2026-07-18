import { CursorEvent } from '@/lib/types';

// Add events here once they're live on Luma — include the event page URL in lumaUrl.
export const events: CursorEvent[] = [];

export const upcomingEvents = events.filter((event) => event.status === 'upcoming');
export const pastEvents = events.filter((event) => event.status === 'past');
