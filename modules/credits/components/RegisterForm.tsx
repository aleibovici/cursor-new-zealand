'use client';

import { useActionState, useId, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { registerCreditEmail } from '@/modules/credits/actions/register';
import { Button, cn } from '@/components/ui';
import type { AccountStatus, RegisterResult } from '@/modules/credits/types';

type RegisterFormProps = {
	chapters: string[];
	copy: {
		title: string;
		intro: string;
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
		submitting: string;
		successTitle: string;
		successBody: string;
		rateLimited: string;
		signUpLink: string;
	};
};

const initialState: RegisterResult | null = null;

const fieldClassName =
	'w-full min-h-12 rounded-xl border border-cursor-border bg-cursor-bg px-4 py-3 text-base text-cursor-text shadow-none outline-none transition-colors placeholder:text-cursor-text-faint focus:border-cursor-border-emphasis focus:ring-2 focus:ring-cursor-accent-orange/30';

function ChoiceCard({ children, selected, className }: { children: ReactNode; selected: boolean; className?: string }) {
	return (
		<span
			className={cn(
				'flex min-h-15 w-full items-start gap-3 rounded-xl border px-4 py-4 transition-colors',
				selected
					? 'border-cursor-action bg-cursor-surface ring-2 ring-cursor-action/15'
					: 'border-cursor-border bg-cursor-surface',
				className,
			)}
		>
			{children}
		</span>
	);
}

export default function RegisterForm({ chapters, copy }: RegisterFormProps) {
	const [state, formAction, pending] = useActionState(registerCreditEmail, initialState);
	const [accountStatus, setAccountStatus] = useState<AccountStatus>('has_cursor');
	const [chapter, setChapter] = useState('');
	const formId = useId();

	if (state?.status === 'success') {
		return (
			<div className="rounded-2xl border border-cursor-accent-green/30 bg-cursor-accent-green-bg px-6 py-10 text-center">
				<div
					aria-hidden
					className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-cursor-accent-green/15 text-2xl text-cursor-accent-green"
				>
					✓
				</div>
				<h2 className="text-2xl font-normal text-cursor-text">{copy.successTitle}</h2>
				<p className="mt-3 text-base leading-relaxed text-cursor-text-secondary">{copy.successBody}</p>
			</div>
		);
	}

	const confirmLabel = accountStatus === 'has_cursor' ? copy.confirmHasCursor : copy.confirmWillRegister;

	return (
		<form id={formId} action={formAction} className="space-y-6 pb-28 sm:space-y-7 sm:pb-0" noValidate={false}>
			<fieldset className="space-y-3 border-0 p-0">
				<legend className="mb-1 block text-base font-normal text-cursor-text">{copy.subtitle}</legend>
				<label className="block cursor-pointer touch-manipulation">
					<input
						type="radio"
						name="accountStatus"
						value="has_cursor"
						checked={accountStatus === 'has_cursor'}
						onChange={() => setAccountStatus('has_cursor')}
						className="sr-only"
					/>
					<ChoiceCard selected={accountStatus === 'has_cursor'}>
						<span
							aria-hidden
							className={cn(
								'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2',
								accountStatus === 'has_cursor'
									? 'border-cursor-action bg-cursor-action'
									: 'border-cursor-border-emphasis bg-cursor-bg',
							)}
						>
							{accountStatus === 'has_cursor' ? <span className="h-2 w-2 rounded-full bg-cursor-action-text" /> : null}
						</span>
						<span className="min-w-0 text-left">
							<span className="block text-base text-cursor-text">{copy.hasCursor}</span>
							<span className="mt-1 block text-sm leading-relaxed text-cursor-text-muted">{copy.hasCursorHelp}</span>
						</span>
					</ChoiceCard>
				</label>
				<label className="block cursor-pointer touch-manipulation">
					<input
						type="radio"
						name="accountStatus"
						value="will_register"
						checked={accountStatus === 'will_register'}
						onChange={() => setAccountStatus('will_register')}
						className="sr-only"
					/>
					<ChoiceCard selected={accountStatus === 'will_register'}>
						<span
							aria-hidden
							className={cn(
								'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2',
								accountStatus === 'will_register'
									? 'border-cursor-action bg-cursor-action'
									: 'border-cursor-border-emphasis bg-cursor-bg',
							)}
						>
							{accountStatus === 'will_register' ? (
								<span className="h-2 w-2 rounded-full bg-cursor-action-text" />
							) : null}
						</span>
						<span className="min-w-0 text-left">
							<span className="block text-base text-cursor-text">{copy.willRegister}</span>
							<span className="mt-1 block text-sm leading-relaxed text-cursor-text-muted">
								{copy.willRegisterHelp}{' '}
								<Link
									href="https://cursor.com"
									target="_blank"
									rel="noopener noreferrer"
									className="underline decoration-cursor-border-emphasis underline-offset-2"
								>
									{copy.signUpLink}
								</Link>
							</span>
						</span>
					</ChoiceCard>
				</label>
			</fieldset>

			<div className="space-y-4">
				<label className="block space-y-2">
					<span className="text-base text-cursor-text">{copy.email}</span>
					<input
						type="email"
						name="email"
						autoComplete="email"
						autoCapitalize="none"
						autoCorrect="off"
						spellCheck={false}
						inputMode="email"
						enterKeyHint="next"
						required
						className={fieldClassName}
					/>
				</label>
				<label className="block space-y-2">
					<span className="text-base text-cursor-text">{copy.confirmEmail}</span>
					<input
						type="email"
						name="confirmEmail"
						autoComplete="email"
						autoCapitalize="none"
						autoCorrect="off"
						spellCheck={false}
						inputMode="email"
						enterKeyHint="done"
						required
						className={fieldClassName}
					/>
				</label>

				<fieldset className="space-y-3 border-0 p-0">
					<legend className="mb-1 block text-base font-normal text-cursor-text">{copy.chapter}</legend>
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
						{chapters.map((option) => (
							<label key={option} className="block cursor-pointer touch-manipulation">
								<input
									type="radio"
									name="chapter"
									value={option}
									checked={chapter === option}
									onChange={() => setChapter(option)}
									required
									className="sr-only"
								/>
								<ChoiceCard selected={chapter === option} className="min-h-13 items-center py-3.5">
									<span
										aria-hidden
										className={cn(
											'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2',
											chapter === option
												? 'border-cursor-action bg-cursor-action'
												: 'border-cursor-border-emphasis bg-cursor-bg',
										)}
									>
										{chapter === option ? <span className="h-2 w-2 rounded-full bg-cursor-action-text" /> : null}
									</span>
									<span className="text-base text-cursor-text">{option}</span>
								</ChoiceCard>
							</label>
						))}
					</div>
				</fieldset>

				<label className="flex min-h-12 scroll-mb-36 cursor-pointer touch-manipulation items-start gap-3 rounded-xl border border-cursor-border bg-cursor-surface px-4 py-4 sm:scroll-mb-0">
					<input
						type="checkbox"
						name="confirmed"
						required
						className="mt-1 h-5 w-5 shrink-0 rounded border-cursor-border-emphasis accent-cursor-action"
					/>
					<span className="text-base leading-relaxed text-cursor-text-secondary">{confirmLabel}</span>
				</label>
			</div>

			{state?.status === 'error' && (
				<p
					role="alert"
					className="rounded-xl border border-cursor-accent-red/30 bg-cursor-accent-red-bg px-4 py-3 text-base text-cursor-text"
				>
					{state.message}
				</p>
			)}
			{state?.status === 'rate_limited' && (
				<p
					role="alert"
					className="rounded-xl border border-cursor-accent-yellow/30 bg-cursor-accent-yellow-bg px-4 py-3 text-base text-cursor-text"
				>
					{copy.rateLimited}
				</p>
			)}

			<div className="fixed inset-x-0 bottom-0 z-20 border-t border-cursor-border/80 bg-cursor-bg/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-sm sm:static sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
				<Button
					type="submit"
					form={formId}
					variant="primary"
					size="lg"
					className="min-h-13 w-full text-base sm:min-h-12"
					disabled={pending}
				>
					{pending ? copy.submitting : copy.submit}
				</Button>
			</div>
		</form>
	);
}
