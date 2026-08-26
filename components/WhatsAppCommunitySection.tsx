'use client';

import React from 'react';
import Image from 'next/image';
import { MessageCircle } from 'lucide-react';
import { whatsappCommunity } from '@/content/whatsapp';
import { useI18n } from '@/lib/i18n';
import { Button, cardInteractive } from '@/components/ui';

const WhatsAppCommunitySection: React.FC = () => {
	const { t } = useI18n();

	return (
		<section className="mb-20 scroll-mt-20" aria-labelledby="whatsapp-community-heading">
			<div className={`${cardInteractive} p-6 md:p-8`}>
				<div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-10">
					<div className="shrink-0 mx-auto md:mx-0">
						<Image
							src={whatsappCommunity.qrImage}
							alt={t('whatsapp.qrAlt')}
							width={280}
							height={340}
							className="h-auto w-[220px] md:w-[240px]"
							priority={false}
						/>
					</div>

					<div className="flex-1 text-center md:text-left">
						<div className="mb-4 flex items-center justify-center gap-2 md:justify-start">
							<MessageCircle className="h-5 w-5 text-cursor-text" aria-hidden="true" />
							<p className="cursor-eyebrow">{t('whatsapp.eyebrow')}</p>
						</div>
						<h2 id="whatsapp-community-heading" className="cursor-section-title mb-3 text-cursor-text">
							{t('whatsapp.heading')}
						</h2>
						<p className="mb-6 text-cursor-text-muted leading-relaxed">{t('whatsapp.description')}</p>
						<Button href={whatsappCommunity.joinUrl} external variant="primary" size="md">
							{t('whatsapp.cta')}
							<span aria-hidden="true">↗</span>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default WhatsAppCommunitySection;
