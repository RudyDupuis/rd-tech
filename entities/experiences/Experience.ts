export abstract class PostExperience {
  constructor(
    public title: string,
    public startDate: Date,
    public shortDesc: string,
    public endDate?: Date,
    public thumbnail?: File
  ) {}
}

export abstract class PutExperience {
  constructor(
    public id: string,
    public title: string,
    public startDate: Date,
    public shortDesc: string,
    public endDate?: Date,
    public thumbnail?: File,
    public thumbnailPath?: string
  ) {}
}

export abstract class GetExperience {
  constructor(
    public id: string,
    public title: string,
    public startDate: Date,
    public shortDesc: string,
    public endDate?: Date,
    public thumbnailPath?: string
  ) {}
}
