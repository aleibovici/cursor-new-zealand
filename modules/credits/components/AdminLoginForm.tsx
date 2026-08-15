'use client';

import { useActionState } from 'react';
import { loginAdmin } from '@/modules/credits/actions/admin';
import { Button } from '@/components/ui';

type AdminLoginFormProps = {
	copy: {
		title: string;
		password: string;
		submit: string;
	};
};

export default function AdminLoginForm({ copy }: AdminLoginFormProps) {
	const [state, formAction, pending] = useActionState(loginAdmin, undefined);

	return (
		<form action={formAction} className="mx-auto w-full max-w-sm space-y-4">
			<h1 className="text-2xl font-normal text-cursor-text">{copy.title}</h1>
			<label className="block space-y-2">
				<span className="text-sm text-cursor-text">{copy.password}</span>
				<input
					type="password"
					name="password"
					autoComplete="current-password"
					required
					className="w-full rounded-md border border-cursor-border bg-cursor-bg px-4 py-3 text-base text-cursor-text"
				/>
			</label>
			{state?.error && (
				<p className="rounded-md border border-cursor-accent-red/30 bg-cursor-accent-red-bg px-4 py-3 text-sm text-cursor-text">
					{state.error}
				</p>
			)}
			<Button type="submit" variant="primary" size="md" className="w-full" disabled={pending}>
				{pending ? 'Signing in…' : copy.submit}
			</Button>
		</form>
	);
}
