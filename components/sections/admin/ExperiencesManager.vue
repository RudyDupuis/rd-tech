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
import { ExperienceApi } from '~/utils/api/ExperienceApi'
import { JobExperienceMapper } from '~/utils/mappers/experiences/JobExperienceMapper'
import { ProjectExperienceMapper } from '~/utils/mappers/experiences/ProjectExperienceMapper'
import { TrainingExperienceMapper } from '~/utils/mappers/experiences/TrainingExperienceMapper'
import { ref } from 'vue'

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

getExperiences()
</script>

<template>
  <section class="flex flex-col items-center">
    <h2 class="medium-title py-16">Gestion des expériences</h2>
    <ExperienceForm
      :experience="editingExperience"
      :getExperiences="getExperiences"
      class="mb-10"
    />

    <div class="mb-20 w-full px-4 md:px-20">
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
    </div>

    <div class="mb-20 w-full px-4 md:px-20">
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
    </div>

    <div class="w-full px-4 md:px-20">
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
    </div>
  </section>
</template>
