import RegisterForm from '@/modules/credits/components/RegisterForm';
import { creditsCopy } from '@/content/credits';
import { siteConfig } from '@/content/site.config';

export { creditsMetadata as metadata } from '@/content/credits';

export const dynamic = 'force-dynamic';

export default function CreditsPage() {
	const chapters = siteConfig.lumaChapterCalendars.map((entry) => entry.chapter);

	return (
		<main className="min-h-dvh bg-cursor-bg text-cursor-text supports-[min-height:100dvh]:min-h-dvh">
			<div className="mx-auto flex w-full max-w-lg flex-col px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-6 sm:py-10">
				<header className="space-y-3 pb-6 text-center sm:pb-8">
					<p className="text-sm text-cursor-text-muted">{siteConfig.communityName}</p>
					<h1 className="text-[1.75rem] font-normal leading-tight tracking-tight sm:text-2xl">{creditsCopy.title}</h1>
					<p className="text-base leading-relaxed text-cursor-text-secondary">{creditsCopy.intro}</p>
				</header>
				<RegisterForm chapters={chapters} copy={creditsCopy} />
			</div>
		</main>
	);
}
