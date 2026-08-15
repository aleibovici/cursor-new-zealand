import { kv } from '@vercel/kv';
import type { CreditRegistration } from '@/modules/credits/types';

const REGISTRATIONS_KEY = 'credits:registrations';
const RATE_LIMIT_SECONDS = 30;

function assertKvConfigured(): void {
	if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
		throw new Error('Missing KV_REST_API_URL or KV_REST_API_TOKEN. Enable Upstash KV on Vercel.');
	}
}

function parseRegistration(raw: unknown): CreditRegistration {
	if (typeof raw === 'string') {
		return JSON.parse(raw) as CreditRegistration;
	}

	return raw as CreditRegistration;
}

export async function saveRegistration(registration: CreditRegistration): Promise<void> {
	assertKvConfigured();
	await kv.hset(REGISTRATIONS_KEY, {
		[registration.email]: registration,
	});
}

export async function listRegistrations(): Promise<CreditRegistration[]> {
	assertKvConfigured();
	const entries = await kv.hgetall<Record<string, unknown>>(REGISTRATIONS_KEY);
	if (!entries) return [];

	return Object.values(entries)
		.map(parseRegistration)
		.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function isRateLimited(ip: string): Promise<boolean> {
	assertKvConfigured();
	const key = `credits:rate:${ip}`;
	const created = await kv.set(key, 1, { ex: RATE_LIMIT_SECONDS, nx: true });
	return created === null;
}

export function registrationsToCsv(registrations: CreditRegistration[]): string {
	const header = 'email,chapter,account_status,created_at';
	const rows = registrations.map((row) =>
		[row.email, row.chapter, row.accountStatus, row.createdAt]
			.map((value) => `"${value.replaceAll('"', '""')}"`)
			.join(','),
	);
	return [header, ...rows].join('\n');
}
