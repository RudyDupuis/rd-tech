import { GetSkill, PostSkill, PutSkill } from './Skill'

export class PostHardSkill extends PostSkill {
  constructor(
    name: string,
    public mastery: 'advanced' | 'intermediate' | 'beginner',
    svg?: File
  ) {
    super(name, svg)
  }
}

export class PutHardSkill extends PutSkill {
  constructor(
    id: string,
    name: string,
    svgPath: string,
    public mastery: 'advanced' | 'intermediate' | 'beginner',
    svg?: File
  ) {
    super(id, name, svgPath, svg)
  }
}

export class GetHardSkill extends GetSkill {
  constructor(
    id: string,
    name: string,
    svgPath: string,
    public mastery: 'advanced' | 'intermediate' | 'beginner'
  ) {
    super(id, name, svgPath)
  }
}
