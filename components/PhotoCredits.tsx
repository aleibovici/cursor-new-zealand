import React from 'react';
import { RecapPhotoCredit } from '@/lib/types';

type PhotoCreditsProps = {
	credits: RecapPhotoCredit[];
	label: string;
	className?: string;
};

const PhotoCredits: React.FC<PhotoCreditsProps> = ({ credits, label, className }) => {
	if (credits.length === 0) {
		return null;
	}

	return (
		<p className={className ?? 'text-sm text-cursor-text-muted'}>
			<span className="mr-1">{label}</span>
			{credits.map((credit, index) => (
				<span key={`${credit.name}-${index}`}>
					{credit.url ? (
						<a
							href={credit.url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-cursor-text hover:underline"
						>
							{credit.name}
						</a>
					) : (
						<span className="text-cursor-text">{credit.name}</span>
					)}
					{index < credits.length - 1 ? <span>, </span> : <span>.</span>}
				</span>
			))}
		</p>
	);
};

export default PhotoCredits;
