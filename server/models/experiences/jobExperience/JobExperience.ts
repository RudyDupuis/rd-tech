import { isDefined } from '~/utils/type/TypeGuard'
import { JobExperienceDto } from './JobExperienceDto'
import JobExperienceModel from './JobExperienceModel'

export default class JobExperience {
  constructor(
    public title: string,
    public startDate: Date,
    public shortDesc: string,
    public id?: number,
    public endDate?: Date,
    public thumbnailPath?: string
  ) {}

  public static fromDto(jobExperienceDto: JobExperienceDto) {
    return new JobExperience(
      jobExperienceDto.title,
      new Date(jobExperienceDto.startDate),
      jobExperienceDto.shortDesc,
      jobExperienceDto.id,
      isDefined(jobExperienceDto.endDate) ? new Date(jobExperienceDto.endDate) : undefined,
      jobExperienceDto.thumbnailPath
    )
  }

  public static toDto(jobExperience: JobExperience): JobExperienceDto {
    return {
      title: jobExperience.title,
      startDate: jobExperience.startDate.toISOString(),
      shortDesc: jobExperience.shortDesc,
      id: jobExperience.id,
      endDate: isDefined(jobExperience.endDate) ? jobExperience.endDate.toISOString() : undefined,
      thumbnailPath: jobExperience.thumbnailPath
    }
  }

  public static fromModel(jobExperienceModel: JobExperienceModel): JobExperience {
    return new JobExperience(
      jobExperienceModel.title,
      jobExperienceModel.startDate,
      jobExperienceModel.shortDesc,
      jobExperienceModel.id,
      jobExperienceModel.endDate ?? undefined,
      jobExperienceModel.thumbnailPath ?? undefined
    )
  }
}
