'use client';

import React from 'react';
import PhotoCredits from '@/components/PhotoCredits';
import WorldEventsCarousel from '@/components/WorldEventsCarousel';
import { eventPhotoCreditLabel, eventPhotoCredits } from '@/content/photo-credits';
import { useI18n } from '@/lib/i18n';

const GlobalEvents: React.FC = () => {
	const { t } = useI18n();

	return (
		<section className="mb-20">
			<div className="rounded-sm border border-cursor-border bg-cursor-surface p-6">
				<h2 className="cursor-section-title mb-2 text-cursor-text">{t('worldEvents.title')}</h2>
				<p className="text-cursor-text-muted text-sm md:text-base mb-6">{t('worldEvents.description')}</p>
				<WorldEventsCarousel />
				<PhotoCredits
					credits={eventPhotoCredits}
					label={eventPhotoCreditLabel}
					className="mt-6 border-t border-cursor-border pt-4 text-sm text-cursor-text-muted"
				/>
			</div>
		</section>
	);
};

export default GlobalEvents;
