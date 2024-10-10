import { GetSoftSkill, PostSoftSkill, PutSoftSkill } from '@/entities/skills/SoftSkill'

export interface SoftSkillJson {
  id: string
  name: string
  svgPath: string
}

export class SoftSkillMapper {
  jsonToGetSoftSkill(softSkillJson: SoftSkillJson) {
    return new GetSoftSkill(softSkillJson.id, softSkillJson.name, softSkillJson.svgPath)
  }

  getSoftSkillToPutSoftSkill(getSoftSkill: GetSoftSkill) {
    return new PutSoftSkill(getSoftSkill.id, getSoftSkill.name, getSoftSkill.svgPath, undefined)
  }

  emptyPostSoftSkill() {
    return new PostSoftSkill('')
  }
}
