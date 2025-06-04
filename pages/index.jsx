import { normalizeProject } from '../lib/normalizeProject'
import { normalizeMetadata } from '../lib/normalizeMetadata'

import Head from 'next/head'
import Hero 		from '../components/sections/index/hero'
import Looking 		from '../components/sections/index/looking'
import About 		from '../components/sections/index/about'
import Technical 	from '../components/sections/index/technical'
import Career 		from '../components/sections/index/career'
import FeaturedProjects	from '../components/sections/projects/featured'

import Color 		from '../components/utils/page.colors.util'

import colors 		from '../content/index/_colors.json'

//

export async function getStaticProps() {
  try {
    const projectRes = await fetch(`${process.env.CMS_API_URL}/api/projects?populate[medias][populate]=*&populate[tools][populate]=*&sort=order:asc`);
    const aboutRes = await fetch(`${process.env.CMS_API_URL}/api/about-me`);
    const landingRes = await fetch(`${process.env.CMS_API_URL}/api/description`)
    const metadataRes = await fetch(`${process.env.CMS_API_URL}/api/metadatas?populate[tags][populate]=*`);

    if (!projectRes.ok || !aboutRes.ok || !landingRes.ok || !metadataRes.ok) {
      return {
        props: {
          projects: null,
          about: null,
          landingParagraph: null,
          metadata: null,
          error: true
        },
        // revalidate: 60,
        revalidate: false
      };
    }
  
  const projectData = await projectRes.json();
  const aboutData = await aboutRes.json();
  const landingData = await landingRes.json();
  const metadataData = await metadataRes.json();

	const projects = projectData.data.map((project, i) => {
		const norm = normalizeProject(project);
		return norm;
	});

  const about = aboutData.data.about;
  const landingParagraph = landingData.data.description
  const metadata = normalizeMetadata(metadataData)

    return {
      props: {
        projects: projects,
        about: about,
        landingParagraph: landingParagraph,
        metadata: metadata,
        error: false
      },
      // revalidate: 60,
      revalidate: false,
    };

  } catch (err) {
    console.error("Failed to fetch projects: ", err);
    return {
      props: {
        projects: null,
        about: null,
        metadata: null,
        error: true
      }
    };
  }
}


export default function HomePage({projects, landingParagraph, about, metadata, error}) {

	return (
		<>
    <Head>
      <meta name="keywords" content={metadata?.tags?.join(', ')} />
      <meta name="description" content={`${metadata?.description}`} />
    </Head>
			<Color colors={colors} />
			<Hero landingParagraph={landingParagraph} />
			{/* <Looking /> */}
			<FeaturedProjects projects={projects} error={error}/>
			<About aboutText={about} error={error}/>
			{/* <Technical /> */}
			{/* <Career /> */}
		</>
	);
}