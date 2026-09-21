import { collator } from "@/lib/utils";
import { type ExperiencesResponse } from "@/lib/objects";

import { staticExperiences } from "@/data/static/experiences";

export async function GetExperiences(): Promise<ExperiencesResponse> {
  return {
    experiences: staticExperiences.map((experience) => ({
      ...experience,
      positions: experience.positions.map((position) => ({
        ...position,
        projects: position.projects?.sort((a, b) =>
          collator.compare(a.name, b.name),
        ),
      })),
      technologies: experience.technologies?.sort((a, b) =>
        collator.compare(a.name, b.name),
      ),
    })),
  };
}
