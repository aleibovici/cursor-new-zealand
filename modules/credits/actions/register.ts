'use server';

import { headers } from 'next/headers';
import { siteConfig } from '@/content/site.config';
import { normalizeEmail, isValidEmail } from '@/modules/credits/lib/email';
import { isRateLimited, saveRegistration } from '@/modules/credits/lib/store';
import type { AccountStatus, RegisterResult } from '@/modules/credits/types';

const chapters = siteConfig.lumaChapterCalendars.map((entry) => entry.chapter);

function isAccountStatus(value: FormDataEntryValue | null): value is AccountStatus {
	return value === 'has_cursor' || value === 'will_register';
}

export async function registerCreditEmail(
	_prev: RegisterResult | null,
	formData: FormData,
): Promise<RegisterResult | null> {
	const accountStatusRaw = formData.get('accountStatus');
	const emailRaw = formData.get('email')?.toString() ?? '';
	const confirmRaw = formData.get('confirmEmail')?.toString() ?? '';
	const chapterRaw = formData.get('chapter')?.toString() ?? '';
	const confirmed = formData.get('confirmed') === 'on';

	if (!isAccountStatus(accountStatusRaw)) {
		return { status: 'error', message: 'Please choose whether you already have Cursor.' };
	}

	const email = normalizeEmail(emailRaw);
	const confirmEmail = normalizeEmail(confirmRaw);

	if (!email || !isValidEmail(email)) {
		return { status: 'error', message: 'Please enter a valid email address.' };
	}

	if (email !== confirmEmail) {
		return { status: 'error', message: 'Email addresses do not match.' };
	}

	if (!chapters.includes(chapterRaw)) {
		return { status: 'error', message: 'Please choose your chapter.' };
	}

	if (!confirmed) {
		return {
			status: 'error',
			message:
				accountStatusRaw === 'has_cursor'
					? 'Please confirm this is the email on your Cursor account.'
					: 'Please confirm you will register Cursor with this exact email.',
		};
	}

	const headersList = await headers();
	const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ?? headersList.get('x-real-ip') ?? 'unknown';

	try {
		if (await isRateLimited(ip)) {
			return { status: 'rate_limited' };
		}

		await saveRegistration({
			email,
			chapter: chapterRaw,
			accountStatus: accountStatusRaw,
			createdAt: new Date().toISOString(),
		});

		return { status: 'success' };
	} catch (error) {
		console.error('Credit registration failed:', error);
		return { status: 'error', message: 'Something went wrong. Try again in a moment.' };
	}
}
