import { collator } from "@/lib/utils";
import { type ProjectsResponse } from "@/lib/objects";

import { staticProjects } from "@/data/static/projects";

type Props = {
  Featured?: boolean;
};

export async function GetProjects({
  Featured = false,
}: Props): Promise<ProjectsResponse> {
  const sorted = staticProjects.map((project) => ({
    ...project,
    technologies: project.technologies?.sort((a, b) =>
      collator.compare(a.name, b.name),
    ),
  }));

  if (Featured) {
    return {
      projects: sorted.filter((p) => p.featured),
    };
  }

  // Keep "My GitHub" card last if present (matches original behaviour)
  const githubIndex = sorted.findIndex((p) => p.name === "My GitHub");
  if (githubIndex !== -1) {
    const [githubProject] = sorted.splice(githubIndex, 1);
    sorted.push(githubProject);
  }

  return { projects: sorted };
}
