import { isDefined } from '~/utils/types/TypeGuard'
import TrainingExperienceDto from './TrainingExperienceDto'
import TrainingExperienceModel from './TrainingExperienceModel'

export default class TrainingExperience {
  constructor(
    public title: string,
    public startDate: Date,
    public shortDesc: string,
    public id?: number,
    public endDate?: Date,
    public thumbnailPath?: string
  ) {}

  public static fromDto(trainingExperienceDto: TrainingExperienceDto) {
    return new TrainingExperience(
      trainingExperienceDto.title,
      new Date(trainingExperienceDto.startDate),
      trainingExperienceDto.shortDesc,
      trainingExperienceDto.id,
      isDefined(trainingExperienceDto.endDate)
        ? new Date(trainingExperienceDto.endDate)
        : undefined,
      trainingExperienceDto.thumbnailPath
    )
  }

  public static toDto(trainingExperience: TrainingExperience): TrainingExperienceDto {
    return {
      title: trainingExperience.title,
      startDate: trainingExperience.startDate.toISOString(),
      shortDesc: trainingExperience.shortDesc,
      id: trainingExperience.id,
      endDate: isDefined(trainingExperience.endDate)
        ? trainingExperience.endDate.toISOString()
        : undefined,
      thumbnailPath: trainingExperience.thumbnailPath
    }
  }

  public static fromModel(trainingExperienceModel: TrainingExperienceModel) {
    return new TrainingExperience(
      trainingExperienceModel.title,
      trainingExperienceModel.startDate,
      trainingExperienceModel.shortDesc,
      trainingExperienceModel.id,
      trainingExperienceModel.endDate ?? undefined,
      trainingExperienceModel.thumbnailPath ?? undefined
    )
  }
}
