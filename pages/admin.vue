<script setup lang="ts">
import { type GetJobExperience, PutJobExperience } from '~/utils/entities/experiences/JobExperience'
import {
  type GetProjectExperience,
  PutProjectExperience
} from '~/utils/entities/experiences/ProjectExperience'
import {
  type GetTrainingExperience,
  PutTrainingExperience
} from '~/utils/entities/experiences/TrainingExperience'
import { type GetHardSkill, PutHardSkill } from '~/utils/entities/skills/HardSkill'
import { PutSoftSkill, type GetSoftSkill } from '~/utils/entities/skills/SoftSkill'
import { ExperienceApi } from '~/utils/api/ExperienceApi'
import { SkillApi } from '~/utils/api/SkillApi'
import { JobExperienceMapper } from '~/utils/mappers/experiences/JobExperienceMapper'
import { ProjectExperienceMapper } from '~/utils/mappers/experiences/ProjectExperienceMapper'
import { TrainingExperienceMapper } from '~/utils/mappers/experiences/TrainingExperienceMapper'
import { HardSkillMapper } from '~/utils/mappers/skills/HardSkillMapper'
import { SoftSkillMapper } from '~/utils/mappers/skills/SoftSkillMapper'
import { isNotNull } from '~/utils/type/TypeGuard'
import { onMounted, ref } from 'vue'

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

const projectMapper = new ProjectExperienceMapper()
const jobMapper = new JobExperienceMapper()
const trainingMapper = new TrainingExperienceMapper()
const experienceApi = new ExperienceApi()

const projectExperiences = ref<Array<GetProjectExperience>>([])
const jobExperiences = ref<Array<GetJobExperience>>([])
const trainingExperiences = ref<Array<GetTrainingExperience>>([])
const editingExperience = ref<
  PutProjectExperience | PutJobExperience | PutTrainingExperience | undefined
>(undefined)

async function getExperiences() {
  projectExperiences.value = await experienceApi.getAllProjectExperiences()
  jobExperiences.value = await experienceApi.getAllJobExperiences()
  trainingExperiences.value = await experienceApi.getAllTrainingExperiences()
}

const hasToken = ref<boolean>(false)

function removeToken() {
  localStorage.clear()
  hasToken.value = false
}

function addToken() {
  hasToken.value = true
}

getSkills()
getExperiences()

onMounted(() => {
  hasToken.value = isNotNull(localStorage.getItem('authToken'))
})
</script>

<template>
  <h1 class="large-title mt-40 mb-20">Administration</h1>
  <LoginForm v-if="!hasToken" :add-token="addToken" />
  <template v-else>
    <section class="flex flex-col items-center">
      <button @click="removeToken()" class="button mb-16">Supprimer le token</button>
      <h2 class="medium-title mb-16">Gestion des compétence</h2>
      <SkillForm :skill="editingSkill" :getSkills="getSkills" class="mb-10" />
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
    </section>

    <section class="flex flex-col items-center">
      <h2 class="medium-title py-16">Gestion des expériences</h2>
      <ExperienceForm
        :experience="editingExperience"
        :getExperiences="getExperiences"
        class="mb-10"
      />
      <h3 class="small-title mb-1">Projets</h3>
      <div class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-4 mb-10">
        <AdminExperienceComp
          v-for="(project, index) in projectExperiences"
          :key="index"
          :experience="project"
          class="mb1"
          @click="
            editingExperience = projectMapper.getProjectExperienceToPutProjectExperience(project)
          "
        />
      </div>
      <h3 class="small-title mb-1">Emplois</h3>
      <div class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-4 mb-10">
        <AdminExperienceComp
          v-for="(job, index) in jobExperiences"
          :key="index"
          :experience="job"
          class="mb1"
          @click="editingExperience = jobMapper.getJobExperienceToPutJobExperience(job)"
        />
      </div>
      <h3 class="small-title mb-1">Formations</h3>
      <div class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-4 mb-10">
        <AdminExperienceComp
          v-for="(training, index) in trainingExperiences"
          :key="index"
          :experience="training"
          class="mb1"
          @click="
            editingExperience =
              trainingMapper.getTrainingExperienceToPutTrainingExperience(training)
          "
        />
      </div>
    </section>
  </template>
</template>
