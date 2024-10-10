import {
  GetTrainingExperience,
  PostTrainingExperience,
  PutTrainingExperience
} from '~/utils/entities/experiences/TrainingExperience'
import { isDefined } from '~/utils/type/TypeGuard'

export interface TrainingExperienceJson {
  id: string
  title: string
  startDate: string
  shortDesc: string
  endDate?: string
  thumbnailPath?: string
}

export class TrainingExperienceMapper {
  jsonToGetTrainingExperience(trainingExperienceJson: TrainingExperienceJson) {
    return new GetTrainingExperience(
      trainingExperienceJson.id,
      trainingExperienceJson.title,
      new Date(trainingExperienceJson.startDate),
      trainingExperienceJson.shortDesc,
      isDefined(trainingExperienceJson.endDate)
        ? new Date(trainingExperienceJson.endDate)
        : undefined,
      trainingExperienceJson.thumbnailPath
    )
  }

  getTrainingExperienceToPutTrainingExperience(getTrainingExperience: GetTrainingExperience) {
    return new PutTrainingExperience(
      getTrainingExperience.id,
      getTrainingExperience.title,
      getTrainingExperience.startDate,
      getTrainingExperience.shortDesc,
      getTrainingExperience.endDate,
      undefined,
      getTrainingExperience.thumbnailPath
    )
  }

  emptyPostTrainingExperience() {
    return new PostTrainingExperience('', new Date(), '')
  }
}
