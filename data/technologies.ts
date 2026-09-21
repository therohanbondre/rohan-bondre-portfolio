import { TechnologyCategory, type TechnologiesResponse } from "@/lib/objects";
import { collator } from "@/lib/utils";

import { staticTechnologies } from "@/data/static/technologies";

export async function GetTechnologies(): Promise<TechnologiesResponse> {
  return {
    technologies: staticTechnologies
      .filter(
        (tech) =>
          tech.category !== TechnologyCategory.None &&
          tech.category !== TechnologyCategory.Invalid,
      )
      .sort((a, b) => collator.compare(a.name, b.name)),
  };
}
