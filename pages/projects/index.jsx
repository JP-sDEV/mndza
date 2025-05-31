// Sections
import FeaturedProjects from '../../components/sections/projects/featured'

import Color  from '../../components/utils/page.colors.util'

import settings from '../../content/_settings.json'
import colors from '../../content/projects/_colors.json'

//

export async function getStaticProps() {
  try {
    const res = await fetch(`${process.env.CMS_API_URL}/api/projects?populate[medias][populate]=*`);

    if (!res.ok) {
      return {
        props: {
          projects: null,
          error: true
        }
      };
    }

    const data = await res.json();
    return {
      props: {
        projects: data,
        error: false
      },
      // revalidate: 60,
    };

  } catch (err) {
    console.error("Failed to fetch projects: ", err);
    return {
      props: {
        projects: null,
        error: true
      }
    };
  }
}


export default function Projects({ projects, error }) {
	return (
		<>
		<Color colors={colors} />
		<FeaturedProjects projects={projects} error={error}/>
		</>
	)
}