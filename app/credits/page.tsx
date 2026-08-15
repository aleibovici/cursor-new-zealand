import RegisterForm from '@/modules/credits/components/RegisterForm';
import { creditsCopy } from '@/content/credits';
import { siteConfig } from '@/content/site.config';

export { creditsMetadata as metadata } from '@/content/credits';

export const dynamic = 'force-dynamic';

export default function CreditsPage() {
	const chapters = siteConfig.lumaChapterCalendars.map((entry) => entry.chapter);

	return (
		<main className="min-h-screen bg-cursor-bg px-4 py-10 text-cursor-text">
			<div className="mx-auto w-full max-w-lg space-y-6">
				<header className="space-y-2 text-center">
					<p className="text-sm text-cursor-text-muted">{siteConfig.communityName}</p>
					<h1 className="text-2xl font-normal tracking-tight">{creditsCopy.title}</h1>
				</header>
				<RegisterForm chapters={chapters} copy={creditsCopy} />
			</div>
		</main>
	);
}
