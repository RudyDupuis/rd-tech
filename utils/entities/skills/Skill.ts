export abstract class PostSkill {
  constructor(
    public name: string,
    public svg?: File
  ) {}
}

export abstract class PutSkill {
  constructor(
    public id: string,
    public name: string,
    public svgPath: string,
    public svg?: File
  ) {}
}

export abstract class GetSkill {
  constructor(
    public id: string,
    public name: string,
    public svgPath: string
  ) {}
}
