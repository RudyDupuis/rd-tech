import ProjectExperienceDto from './ProjectExperienceDto'
import ProjectExperienceModel from './ProjectExperienceModel'
import { isDefined } from '../../../shared/utils/TypeGuard'
import HardSkill from '../../skills/hardSkill/HardSkill'

export default class ProjectExperience {
  constructor(
    public title: string,
    public startDate: Date,
    public shortDesc: string,
    public longDesc: string,
    public isFavorite: boolean,
    public id?: number,
    public slug?: string,
    public endDate?: Date,
    public thumbnailPath?: string,
    public imagesPath?: Array<string>,
    public projectLink?: string,
    public codeLink?: string,
    public hardSkills?: Array<HardSkill>
  ) {}

  public static fromDto(projectExperienceDto: ProjectExperienceDto) {
    return new ProjectExperience(
      projectExperienceDto.title,
      new Date(projectExperienceDto.startDate),
      projectExperienceDto.shortDesc,
      projectExperienceDto.longDesc,
      projectExperienceDto.isFavorite,
      projectExperienceDto.id,
      projectExperienceDto.slug,
      isDefined(projectExperienceDto.endDate) ? new Date(projectExperienceDto.endDate) : undefined,
      projectExperienceDto.thumbnailPath,
      projectExperienceDto.imagesPath,
      projectExperienceDto.projectLink,
      projectExperienceDto.codeLink,
      projectExperienceDto.hardSkills?.map((hardSkillDto) => {
        return HardSkill.fromDto(hardSkillDto)
      })
    )
  }

  public static toDto(projectExperience: ProjectExperience): ProjectExperienceDto {
    return {
      title: projectExperience.title,
      startDate: projectExperience.startDate.toISOString(),
      shortDesc: projectExperience.shortDesc,
      longDesc: projectExperience.longDesc,
      isFavorite: projectExperience.isFavorite,
      id: projectExperience.id,
      slug: projectExperience.slug,
      endDate: isDefined(projectExperience.endDate)
        ? projectExperience.endDate.toISOString()
        : undefined,
      thumbnailPath: projectExperience.thumbnailPath,
      imagesPath: projectExperience.imagesPath,
      projectLink: projectExperience.projectLink,
      codeLink: projectExperience.codeLink,
      hardSkills: projectExperience.hardSkills?.map((hardSkill) => {
        return HardSkill.toDto(hardSkill)
      })
    }
  }

  public static fromModel(projectExperienceModel: ProjectExperienceModel): ProjectExperience {
    return new ProjectExperience(
      projectExperienceModel.title,
      projectExperienceModel.startDate,
      projectExperienceModel.shortDesc,
      projectExperienceModel.longDesc,
      projectExperienceModel.isFavorite,
      projectExperienceModel.id,
      projectExperienceModel.slug ?? undefined,
      projectExperienceModel.endDate ?? undefined,
      projectExperienceModel.thumbnailPath ?? undefined,
      projectExperienceModel.imagesPath ?? undefined,
      projectExperienceModel.projectLink ?? undefined,
      projectExperienceModel.codeLink ?? undefined
    )
  }
}
