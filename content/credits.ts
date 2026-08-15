import type { Metadata } from 'next';
import { localeBundles } from '@/content/locales';

const copy = localeBundles.en.credits;

export const creditsCopy = copy;

export const creditsMetadata: Metadata = {
	title: copy.title,
	description: copy.qrInstruction,
	robots: {
		index: false,
		follow: false,
	},
};
