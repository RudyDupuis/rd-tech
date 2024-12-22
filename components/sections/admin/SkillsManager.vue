<script setup lang="ts">
import { type GetHardSkill, PutHardSkill } from '~/utils/entities/skills/HardSkill'
import { PutSoftSkill, type GetSoftSkill } from '~/utils/entities/skills/SoftSkill'
import { SkillApi } from '~/utils/api/SkillApi'
import { HardSkillMapper } from '~/utils/mappers/skills/HardSkillMapper'
import { SoftSkillMapper } from '~/utils/mappers/skills/SoftSkillMapper'
import { ref } from 'vue'

const softSkillMapper = new SoftSkillMapper()
const hardSkillMapper = new HardSkillMapper()
const skillApi = new SkillApi()

const softSkills = ref<Array<GetSoftSkill>>([])
const hardSkills = ref<Array<GetHardSkill>>([])
const editingSkill = ref<PutSoftSkill | PutHardSkill | undefined>(undefined)

async function getSkills() {
  softSkills.value = await skillApi.getAllSoftSkills()
  hardSkills.value = await skillApi.getAllHardSkills()
}

getSkills()
</script>

<template>
  <section class="flex flex-col items-center">
    <h2 class="medium-title py-16">Gestion des compétences</h2>
    <SkillForm :skill="editingSkill" :getSkills="getSkills" class="mb-10" />

    <div class="mb-20 w-full px-4 md:px-20">
      <h3 class="small-title">Soft Skill</h3>
      <p class="text-center">Cliquer sur un élément des listes pour le modifier</p>
      <div class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-4">
        <AdminSkillComp
          v-for="(skill, index) in softSkills"
          :key="index"
          :skill="skill"
          @click="editingSkill = softSkillMapper.getSoftSkillToPutSoftSkill(skill)"
        />
      </div>
    </div>

    <div class="mb-10 w-full px-4 md:px-20">
      <h3 class="small-title">Hard Skill</h3>
      <p class="text-center">Cliquer sur un élément des listes pour le modifier</p>
      <div class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-4">
        <AdminSkillComp
          v-for="(skill, index) in hardSkills"
          :key="index"
          :skill="skill"
          @click="editingSkill = hardSkillMapper.getHardSkillToPutHardSkill(skill)"
        />
      </div>
    </div>
  </section>
</template>
