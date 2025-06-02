import Image from 'next/image';
import { m } from "framer-motion";
import Badges from '../../utils/badge.list.util';
import css from '../../../styles/sections/projects/featured.module.scss';

export default function FeaturedProject({ content }, index) {

	return (
		<m.section
			key={index}
			className={css.project}
		>
			<div className={css.details}>
				<div className={css.projectHeader}>
					<div className={css.header}>
						<h3 className="highlight">{content.title ? content.title : "Project"}</h3>
					</div>
					<div className={css.descriptionTitle}>
						<p className={css.description}>{content.description}</p>
					</div>
					<div className={css.stackContainer}>
						{/* <Badges list={stack} block="stack" fullContainer={false} color={false} /> */}
					</div>
				</div>
			</div>

			<div className={css.imageContainer}>
				<span className={`${css.imageAnimationContainer}`}>

					{content.medias && content.medias.length > 0 ? (() => {
					const media = content.medias[0];

					switch (media.type) {
						case "image":
						case "file":
						return (
							<Image
							// src={media.url}
							src={process.env.NODE_ENV === "development" ? `http://localhost:1337${media.url}` : media.url}
							alt="project image"
							width={media.width || 800}
							height={media.height || 600}
							/>
						);

						case "video":
						return (
							<video
							controls
							width="100%"
							style={{ maxWidth: "100%", height: "auto" }}
							>
							<source
							src={process.env.NODE_ENV === "development" ? `http://localhost:1337${media.url}` : media.url}
							type={media.mime || "video/mp4"}/>
							Your browser does not support the video tag.
							</video>
						);

						case "youtube":
						// Optional: extract the video ID if needed
						const youtubeIdMatch = media.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/);
						const youtubeId = youtubeIdMatch ? youtubeIdMatch[1] : null;

						return youtubeId ? (
							<iframe
							width="100%"
							height="450"
							src={`https://www.youtube.com/embed/${youtubeId}`}
							title="YouTube video player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							/>
						) : (
							<p>Invalid YouTube URL</p>
						);

						default:
						return (
							<Image
							src="/placeholder.png"
							alt="placeholder"
							width={800}
							height={600}
							/>
						);
							}
						})() : (
						<Image
							src="/placeholder.png"
							alt="placeholder"
							width={800}
							height={600}
						/>
						)}
				</span>
			</div>
		</m.section>
	);
}