import { GetSkill, PostSkill, PutSkill } from './Skill'

export class PostSoftSkill extends PostSkill {
  constructor(name: string, svg?: File) {
    super(name, svg)
  }
}

export class PutSoftSkill extends PutSkill {
  constructor(id: string, name: string, svgPath: string, svg?: File) {
    super(id, name, svgPath, svg)
  }
}

export class GetSoftSkill extends GetSkill {
  constructor(id: string, name: string, svgPath: string) {
    super(id, name, svgPath)
  }
}
