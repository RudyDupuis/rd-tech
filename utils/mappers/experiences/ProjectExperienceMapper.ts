import {
  GetProjectExperience,
  PostProjectExperience,
  PutProjectExperience
} from '~/utils/entities/experiences/ProjectExperience'
import { GetHardSkill } from '~/utils/entities/skills/HardSkill'
import { isDefined } from '~/utils/types/TypeGuard'

export interface ProjectExperienceJson {
  id: string
  title: string
  startDate: string
  shortDesc: string
  slug: string
  longDesc: string
  hardSkills: Array<{
    ProjectExperienceHardSkills: JSON
    createdAt: string
    id: string
    mastery: 'advanced' | 'intermediate' | 'beginner'
    name: string
    svgPath: string
    updatedAt: string
  }>
  isFavorite: boolean
  endDate?: string
  thumbnailPath?: string
  imagesPath?: Array<string>
  projectLink?: string
  codeLink?: string
}

export class ProjectExperienceMapper {
  jsonToGetProjectExperience(projectExperienceJson: ProjectExperienceJson) {
    return new GetProjectExperience(
      projectExperienceJson.id,
      projectExperienceJson.title,
      new Date(projectExperienceJson.startDate),
      projectExperienceJson.shortDesc,
      projectExperienceJson.slug,
      projectExperienceJson.longDesc,
      projectExperienceJson.hardSkills.map(
        (hardSkillJson) =>
          new GetHardSkill(
            hardSkillJson.id,
            hardSkillJson.name,
            hardSkillJson.svgPath,
            hardSkillJson.mastery
          )
      ),
      projectExperienceJson.isFavorite,
      isDefined(projectExperienceJson.endDate)
        ? new Date(projectExperienceJson.endDate)
        : undefined,
      projectExperienceJson.thumbnailPath,
      projectExperienceJson.imagesPath,
      projectExperienceJson.projectLink,
      projectExperienceJson.codeLink
    )
  }

  getProjectExperienceToPutProjectExperience(getProjectExperience: GetProjectExperience) {
    return new PutProjectExperience(
      getProjectExperience.id,
      getProjectExperience.title,
      getProjectExperience.startDate,
      getProjectExperience.shortDesc,
      getProjectExperience.longDesc,
      getProjectExperience.hardSkills,
      getProjectExperience.hardSkills.map((skill) => skill.id),
      getProjectExperience.isFavorite,
      getProjectExperience.endDate,
      undefined,
      getProjectExperience.thumbnailPath,
      undefined,
      getProjectExperience.imagesPath,
      getProjectExperience.projectLink,
      getProjectExperience.codeLink
    )
  }

  emptyPostProjectExperience() {
    return new PostProjectExperience('', new Date(), '', '', [], false)
  }
}
