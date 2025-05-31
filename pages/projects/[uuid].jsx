import { normalizeProject } from '../../lib/normalizeProject'

// Sections
import Section from '../../components/structure/section'
import Container from '../../components/structure/container'
import SectionTitle from '../../components/blocks/section.title.block'
import css from '../../styles/sections/projects/featured.module.scss'

import Color  from '../../components/utils/page.colors.util'

import settings from '../../content/_settings.json'
import colors from '../../content/projects/_colors.json'

import Carousel from '../../components/utils/carousel.util'

export async function getStaticPaths() {
  const res = await fetch(`${process.env.CMS_API_URL}/api/projects?populate=*`);
  const data = await res.json();

  const paths = data.data.map((project) => (
	{
    params: { uuid: project.uuid.toString() }, 
  	}
));

  return {
    paths,
    fallback: 'blocking', // or 'true' if you want a loading state
  };
}

export async function getStaticProps({ params }) {
	const res = await fetch(
    `${process.env.CMS_API_URL}/api/projects?filters[uuid][$eq]=${params.uuid}&populate[medias][populate]=*`
  );
  const data = await res.json();
  
  const projects = data.data.map((project, i) => {
      const norm = normalizeProject(project);
      return norm;
    });


  if (!data || !data.data ||data.data.length == 0 ) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      project: projects[0]
    },
    // revalidate: 60,
  };


}

export default function ProjectPage({ project }) {

    return (
        <>
        <Color colors={colors} />
        
        <Section classProp={css.hasBg}>	

          <Container spacing={'verticalXXLrg'}>

          <SectionTitle
                title={project.title}
              />

          </Container>
		
          <Container spacing={['verticalXL','bottomLrg']}>
            <Carousel media={project.medias.map((media) => ({
            url: media.url?.startsWith('/')
              ? `http://localhost:1337${media.url}`
              : media.url,
          }))} />

          </Container>

          <Container spacing={'bottomLrg'}>
              {project.description}
          </Container>

			<div className={css.bgContainer}>
				<span className={css.orbitalBg}>
					<span class={`${css.bgSection}`}><span className={`${css.bgInner} ${css.heroLeft} ${css.heroOrbital}`}></span></span>
					<span class={`${css.bgSection}`}><span className={`${css.bgInner} ${css.heroCenter}`}></span></span>
					<span class={`${css.bgSection}`}><span className={`${css.bgInner} ${css.heroRight} ${css.heroOrbital}`}></span></span>
				</span>
				<span className={css.afterGlowBg}></span>
			</div>
		</Section>
        </>
    )
}