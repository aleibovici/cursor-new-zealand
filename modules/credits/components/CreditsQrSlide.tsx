'use client';

import { QRCodeSVG } from 'qrcode.react';
import { SlideBody, SlideCallout, SlideTitle } from '@/modules/slides/components/primitives';

type CreditsQrSlideProps = {
	url: string;
	title: string;
	instruction: string;
	hint: string;
};

export default function CreditsQrSlide({ url, title, instruction, hint }: CreditsQrSlideProps) {
	return (
		<SlideBody>
			<SlideTitle centered>{title}</SlideTitle>
			<div className="mx-auto flex max-w-xl flex-col items-center gap-6">
				<div className="rounded-md border border-cursor-border bg-white p-6">
					<QRCodeSVG value={url} size={240} level="M" includeMargin />
				</div>
				<SlideCallout variant="blue" className="w-full text-center">
					<p className="text-lg text-cursor-text">{instruction}</p>
					<p className="mt-2 text-sm text-cursor-text-secondary">{hint}</p>
					<p className="mt-3 break-all text-xs text-cursor-text-faint">{url}</p>
				</SlideCallout>
			</div>
		</SlideBody>
	);
}
