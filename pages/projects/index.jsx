import { normalizeProject } from '../../lib/normalizeProject'

// Sections
import FeaturedProjects from '../../components/sections/projects/featured'

import Color  from '../../components/utils/page.colors.util'

import settings from '../../content/_settings.json'
import colors from '../../content/projects/_colors.json'

//

export async function getStaticProps() {
  try {
    const projectRes = await fetch(`${process.env.CMS_API_URL}/api/projects?populate[medias][populate]=*&sort=order:asc`);
    if (!projectRes.ok) {
      return {
        props: {
          projects: null,
          error: true
        }
      };
    }

    const projectData = await projectRes.json();
    const projects = projectData.data.map((project, i) => {
        const norm = normalizeProject(project);
        return norm;
      });

    return {
      props: {
        projects: projects,
        error: false
      },
      // revalidate: 60,
      revalidate: false
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