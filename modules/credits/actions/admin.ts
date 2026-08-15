'use server';

import { redirect } from 'next/navigation';
import {
	clearAdminSession,
	isAdminAuthenticated,
	setAdminSession,
	verifyPassword,
} from '@/modules/credits/lib/admin-auth';
import { listRegistrations, registrationsToCsv } from '@/modules/credits/lib/store';
import type { CreditRegistration } from '@/modules/credits/types';

async function requireAdmin(): Promise<void> {
	const authed = await isAdminAuthenticated();
	if (!authed) redirect('/credits/admin/login');
}

export async function loginAdmin(
	_prev: { error?: string } | undefined,
	formData: FormData,
): Promise<{ error?: string }> {
	const password = formData.get('password')?.toString() ?? '';

	if (!verifyPassword(password)) {
		return { error: 'Invalid password.' };
	}

	await setAdminSession();
	redirect('/credits/admin');
}

export async function logoutAdmin(): Promise<void> {
	await clearAdminSession();
	redirect('/credits/admin/login');
}

export type AdminStats = {
	total: number;
	hasCursor: number;
	willRegister: number;
};

export async function getAdminStats(): Promise<AdminStats> {
	await requireAdmin();
	const registrations = await listRegistrations();
	return {
		total: registrations.length,
		hasCursor: registrations.filter((row) => row.accountStatus === 'has_cursor').length,
		willRegister: registrations.filter((row) => row.accountStatus === 'will_register').length,
	};
}

export async function getRegistrations(): Promise<CreditRegistration[]> {
	await requireAdmin();
	return listRegistrations();
}

export async function exportRegistrationsCsv(): Promise<string> {
	await requireAdmin();
	const registrations = await listRegistrations();
	return registrationsToCsv(registrations);
}
