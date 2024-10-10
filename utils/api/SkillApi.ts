import type { GetHardSkill } from '@/entities/skills/HardSkill'
import { HardSkillMapper, type HardSkillJson } from '../mappers/skills/HardSkillMapper'
import { SoftSkillMapper, type SoftSkillJson } from '../mappers/skills/SoftSkillMapper'
import { ApiMethods } from './ApiMethods'
import type { GetSoftSkill } from '@/entities/skills/SoftSkill'

export class SkillApi {
  private api = new ApiMethods()
  private hardSkillMapper = new HardSkillMapper()
  private softSkillMapper = new SoftSkillMapper()

  async getAllHardSkills(): Promise<Array<GetHardSkill>> {
    try {
      const rawHardSkills = await this.api.getData('hard-skills')
      const hardSkills = rawHardSkills.map((value: HardSkillJson) =>
        this.hardSkillMapper.jsonToGetHardSkill(value)
      )

      return hardSkills.sort((a: GetHardSkill, b: GetHardSkill) => a.name.localeCompare(b.name))
    } catch (error) {
      throw new Error(`Error fetching hardSkills: ${error}`)
    }
  }

  async getAllSoftSkills(): Promise<Array<GetSoftSkill>> {
    try {
      const rawSoftSkills = await this.api.getData('soft-skills')
      const softSkills = rawSoftSkills.map((value: SoftSkillJson) =>
        this.softSkillMapper.jsonToGetSoftSkill(value)
      )

      return softSkills.sort((a: GetHardSkill, b: GetHardSkill) => a.name.localeCompare(b.name))
    } catch (error) {
      throw new Error(`Error fetching softSkills: ${error}`)
    }
  }
}
