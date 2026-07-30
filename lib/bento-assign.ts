import { BentoImage, BentoSlot, HeaderPhoto, HeroBentoPhotos } from '@/lib/types';

function hashString(input: string): number {
	let hash = 2166136261;
	for (let i = 0; i < input.length; i += 1) {
		hash ^= input.charCodeAt(i);
		hash = Math.imul(hash, 16777619);
	}
	return hash >>> 0;
}

function mulberry32(seed: number) {
	return () => {
		let t = (seed += 0x6d2b79f5);
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

function seededShuffle<T>(items: T[], seed: string): T[] {
	const result = [...items];
	const random = mulberry32(hashString(seed));

	for (let i = result.length - 1; i > 0; i -= 1) {
		const j = Math.floor(random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}

	return result;
}

function mobileVisibleSlots(slots: BentoSlot[]): BentoSlot[] {
	return slots
		.filter((slot) => !slot.mobileHidden)
		.map((slot) => {
			const mobile = slot.mobile ?? {
				row: slot.row,
				col: slot.col,
				rowSpan: slot.rowSpan,
				colSpan: slot.colSpan,
			};

			return {
				row: mobile.row,
				col: mobile.col,
				rowSpan: mobile.rowSpan,
				colSpan: mobile.colSpan,
			};
		});
}

export function assignPhotosToSlots(pool: BentoImage[], slots: BentoSlot[], seed: string): HeaderPhoto[] {
	const shuffled = seededShuffle(pool, seed);

	return slots.map((slot, index) => ({
		...slot,
		...shuffled[index % shuffled.length],
	}));
}

export function assignHeroPhotos(pool: BentoImage[], slots: BentoSlot[], seed: string): HeroBentoPhotos {
	return {
		desktop: assignPhotosToSlots(pool, slots, seed),
		mobile: assignPhotosToSlots(pool, mobileVisibleSlots(slots), `${seed}:m`),
	};
}

export function dailyBentoSeed(communityName: string, date = new Date()): string {
	const day = date.toISOString().slice(0, 10);
	return `${day}:${communityName}`;
}

export function slotArea(slot: Pick<BentoSlot, 'rowSpan' | 'colSpan'>): number {
	return (slot.rowSpan ?? 1) * (slot.colSpan ?? 1);
}

const HERO_COPY_PANEL = { maxRow: 2, maxCol: 2 };

export function overlapsHeroCopyPanel(slot: Pick<BentoSlot, 'row' | 'col' | 'rowSpan' | 'colSpan'>): boolean {
	const rowEnd = slot.row + (slot.rowSpan ?? 1) - 1;
	const colEnd = slot.col + (slot.colSpan ?? 1) - 1;

	return slot.row <= HERO_COPY_PANEL.maxRow && rowEnd >= 1 && slot.col <= HERO_COPY_PANEL.maxCol && colEnd >= 1;
}

export function getTileImageSizes(variant: 'desktop' | 'mobile', colSpan: number | undefined, cols: number): string {
	const tileVw = Math.round(((colSpan ?? 1) / cols) * 100);

	if (variant === 'mobile') {
		return `(max-width: 767px) ${tileVw}vw, 0px`;
	}

	return `(min-width: 768px) ${tileVw}vw, 0px`;
}

export function isPriorityPhoto(photo: HeaderPhoto, photos: HeaderPhoto[]): boolean {
	const visiblePhotos = photos.filter((candidate) => !overlapsHeroCopyPanel(candidate));
	if (visiblePhotos.length === 0 || overlapsHeroCopyPanel(photo)) {
		return false;
	}

	const maxArea = Math.max(...visiblePhotos.map(slotArea));
	if (slotArea(photo) < maxArea) {
		return false;
	}

	const largest = visiblePhotos
		.filter((candidate) => slotArea(candidate) === maxArea)
		.sort((a, b) => a.row - b.row || a.col - b.col);

	return largest[0]?.src === photo.src;
}
