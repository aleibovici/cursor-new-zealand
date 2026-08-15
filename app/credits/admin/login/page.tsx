import AdminLoginForm from '@/modules/credits/components/AdminLoginForm';
import { creditsCopy } from '@/content/credits';

export { creditsMetadata as metadata } from '@/content/credits';

export const dynamic = 'force-dynamic';

export default function CreditsAdminLoginPage() {
	return (
		<main className="min-h-screen bg-cursor-bg px-4 py-16 text-cursor-text">
			<AdminLoginForm
				copy={{
					title: creditsCopy.adminLoginTitle,
					password: creditsCopy.adminPassword,
					submit: creditsCopy.adminSubmit,
				}}
			/>
		</main>
	);
}
