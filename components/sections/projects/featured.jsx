import Link from 'next/link';
import FeaturedProject from '../../blocks/projects/featured'
import { normalizeProject } from '../../../lib/normalizeProject';


// Section structure
import Section 		from '../../structure/section';
import Container 	from '../../structure/container';
import Badges 		from '../../utils/badge.list.util'
import Icon 		from '../../utils/icon.util'
import SectionTitle from '../../blocks/section.title.block'

import css 			from '../../../styles/sections/projects/featured.module.scss'

export default function FeaturedProjects({ projects, error }) {

	if (error) {
  		return <div>Error occurred while loading projects.</div>;
	}

	if (!projects) {
    	return <div>Loading projects...</div>;
  	}
	
	return (
		<Section classProp={css.hasBg}>	
		<Container spacing={'verticalXXXLrg'}>

		<SectionTitle
					title="Featured Projects"
					preTitle="Digital Advertising and Designs"
					subTitle="Story telling through digital design."
				/> 	

		</Container>
		
		<Container spacing={'verticalStd'}>

			{projects.map((content, index) => (
				<Link href={`/projects/${content.uuid}`} key={content.uuid}>
					<a>
						<FeaturedProject content={content} error={error} index={index} key={index} />
					</a>
				</Link>
			))}

		</Container>
			<div className={css.bgContainer}>
				<span className={css.orbitalBg}>
					<span className={`${css.bgSection}`}><span className={`${css.bgInner} ${css.heroLeft} ${css.heroOrbital}`}></span></span>
					<span className={`${css.bgSection}`}><span className={`${css.bgInner} ${css.heroCenter}`}></span></span>
					<span className={`${css.bgSection}`}><span className={`${css.bgInner} ${css.heroRight} ${css.heroOrbital}`}></span></span>
				</span>
				<span className={css.afterGlowBg}></span>
			</div>
		</Section>
	)
}