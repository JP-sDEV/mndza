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
  try {
    const res = await fetch(`${process.env.CMS_API_URL}/api/projects?populate=*`);

    if (!res.ok) {
      throw new Error(`Failed to fetch projects: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    if (!data?.data || !Array.isArray(data.data)) {
      throw new Error("Invalid data structure returned from API");
    }

    const paths = data.data
    .filter((project) => project?.uuid) // Skip if uuid is missing
    .map((project) => ({
      params: { uuid: project.uuid.toString() },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);

    // Optionally: return an empty paths array to prevent build failure
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}


export async function getStaticProps({ params }) {
	const res = await fetch(
    `${process.env.CMS_API_URL}/api/projects?filters[uuid][$eq]=${params.uuid}&populate[medias][populate]=*`
  );
  const data = await res.json();
  
  if (!data || !Array.isArray(data.data) || data.data.length === 0) {
    return { notFound: true };
  }

  const projects = data.data.map((project, i) => normalizeProject(project));

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