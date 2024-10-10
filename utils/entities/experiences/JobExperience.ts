import { GetExperience, PostExperience, PutExperience } from './Experience'

export class PostJobExperience extends PostExperience {
  constructor(title: string, startDate: Date, shortDesc: string, endDate?: Date, thumbnail?: File) {
    super(title, startDate, shortDesc, endDate, thumbnail)
  }
}

export class PutJobExperience extends PutExperience {
  constructor(
    id: string,
    title: string,
    startDate: Date,
    shortDesc: string,
    endDate?: Date,
    thumbnail?: File,
    thumbnailPath?: string
  ) {
    super(id, title, startDate, shortDesc, endDate, thumbnail, thumbnailPath)
  }
}

export class GetJobExperience extends GetExperience {
  constructor(
    id: string,
    title: string,
    startDate: Date,
    shortDesc: string,
    endDate?: Date,
    thumbnailPath?: string
  ) {
    super(id, title, startDate, shortDesc, endDate, thumbnailPath)
  }
}
