'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import { registerCreditEmail } from '@/modules/credits/actions/register';
import { Button } from '@/components/ui';
import type { AccountStatus, RegisterResult } from '@/modules/credits/types';

type RegisterFormProps = {
	chapters: string[];
	copy: {
		title: string;
		subtitle: string;
		hasCursor: string;
		hasCursorHelp: string;
		willRegister: string;
		willRegisterHelp: string;
		email: string;
		confirmEmail: string;
		chapter: string;
		confirmHasCursor: string;
		confirmWillRegister: string;
		submit: string;
		successTitle: string;
		successBody: string;
		rateLimited: string;
		signUpLink: string;
	};
};

const initialState: RegisterResult | null = null;

export default function RegisterForm({ chapters, copy }: RegisterFormProps) {
	const [state, formAction, pending] = useActionState(registerCreditEmail, initialState);
	const [accountStatus, setAccountStatus] = useState<AccountStatus>('has_cursor');

	if (state?.status === 'success') {
		return (
			<div className="rounded-md border border-cursor-border bg-cursor-surface p-6 text-center">
				<h2 className="text-xl font-normal text-cursor-text">{copy.successTitle}</h2>
				<p className="mt-2 text-sm text-cursor-text-secondary">{copy.successBody}</p>
			</div>
		);
	}

	const confirmLabel = accountStatus === 'has_cursor' ? copy.confirmHasCursor : copy.confirmWillRegister;

	return (
		<form action={formAction} className="space-y-5">
			<fieldset className="space-y-3">
				<legend className="text-sm font-normal text-cursor-text">{copy.subtitle}</legend>
				<label className="flex cursor-pointer gap-3 rounded-md border border-cursor-border bg-cursor-surface p-4">
					<input
						type="radio"
						name="accountStatus"
						value="has_cursor"
						checked={accountStatus === 'has_cursor'}
						onChange={() => setAccountStatus('has_cursor')}
						className="mt-1"
					/>
					<span>
						<span className="block text-sm text-cursor-text">{copy.hasCursor}</span>
						<span className="mt-1 block text-xs text-cursor-text-muted">{copy.hasCursorHelp}</span>
					</span>
				</label>
				<label className="flex cursor-pointer gap-3 rounded-md border border-cursor-border bg-cursor-surface p-4">
					<input
						type="radio"
						name="accountStatus"
						value="will_register"
						checked={accountStatus === 'will_register'}
						onChange={() => setAccountStatus('will_register')}
						className="mt-1"
					/>
					<span>
						<span className="block text-sm text-cursor-text">{copy.willRegister}</span>
						<span className="mt-1 block text-xs text-cursor-text-muted">
							{copy.willRegisterHelp}{' '}
							<Link href="https://cursor.com" target="_blank" rel="noopener noreferrer" className="underline">
								{copy.signUpLink}
							</Link>
						</span>
					</span>
				</label>
			</fieldset>

			<div className="space-y-4">
				<label className="block space-y-2">
					<span className="text-sm text-cursor-text">{copy.email}</span>
					<input
						type="email"
						name="email"
						autoComplete="email"
						inputMode="email"
						required
						className="w-full rounded-md border border-cursor-border bg-cursor-bg px-4 py-3 text-base text-cursor-text"
					/>
				</label>
				<label className="block space-y-2">
					<span className="text-sm text-cursor-text">{copy.confirmEmail}</span>
					<input
						type="email"
						name="confirmEmail"
						autoComplete="email"
						inputMode="email"
						required
						className="w-full rounded-md border border-cursor-border bg-cursor-bg px-4 py-3 text-base text-cursor-text"
					/>
				</label>
				<label className="block space-y-2">
					<span className="text-sm text-cursor-text">{copy.chapter}</span>
					<select
						name="chapter"
						required
						defaultValue=""
						className="w-full rounded-md border border-cursor-border bg-cursor-bg px-4 py-3 text-base text-cursor-text"
					>
						<option value="" disabled>
							Choose chapter
						</option>
						{chapters.map((chapter) => (
							<option key={chapter} value={chapter}>
								{chapter}
							</option>
						))}
					</select>
				</label>
				<label className="flex cursor-pointer items-start gap-3 text-sm text-cursor-text-secondary">
					<input type="checkbox" name="confirmed" className="mt-1" />
					<span>{confirmLabel}</span>
				</label>
			</div>

			{state?.status === 'error' && (
				<p className="rounded-md border border-cursor-accent-red/30 bg-cursor-accent-red-bg px-4 py-3 text-sm text-cursor-text">
					{state.message}
				</p>
			)}
			{state?.status === 'rate_limited' && (
				<p className="rounded-md border border-cursor-accent-yellow/30 bg-cursor-accent-yellow-bg px-4 py-3 text-sm text-cursor-text">
					{copy.rateLimited}
				</p>
			)}

			<Button type="submit" variant="primary" size="lg" className="w-full" disabled={pending}>
				{pending ? 'Submitting…' : copy.submit}
			</Button>
		</form>
	);
}
