import AdminDashboard from '@/modules/credits/components/AdminDashboard';
import { creditsCopy } from '@/content/credits';

export { creditsMetadata as metadata } from '@/content/credits';

export const dynamic = 'force-dynamic';

export default function CreditsAdminPage() {
	return (
		<main className="min-h-screen bg-cursor-bg px-4 py-10 text-cursor-text">
			<div className="mx-auto w-full max-w-5xl">
				<AdminDashboard
					copy={{
						title: creditsCopy.adminTitle,
						total: creditsCopy.adminTotal,
						hasCursor: creditsCopy.adminHasCursor,
						willRegister: creditsCopy.adminWillRegister,
						export: creditsCopy.adminExport,
						logout: creditsCopy.adminLogout,
						empty: creditsCopy.adminEmpty,
						tableEmail: creditsCopy.adminTableEmail,
						tableChapter: creditsCopy.adminTableChapter,
						tableStatus: creditsCopy.adminTableStatus,
						tableRegistered: creditsCopy.adminTableRegistered,
					}}
				/>
			</div>
		</main>
	);
}
