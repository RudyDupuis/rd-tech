<script setup lang="ts">
import { GetExperience } from '~/utils/entities/experiences/Experience'
import { GetJobExperience } from '~/utils/entities/experiences/JobExperience'
import { GetProjectExperience } from '~/utils/entities/experiences/ProjectExperience'
import { GetTrainingExperience } from '~/utils/entities/experiences/TrainingExperience'
import { GetHardSkill } from '~/utils/entities/skills/HardSkill'
import { ExperienceApi } from '~/utils/api/ExperienceApi'
import { SkillApi } from '~/utils/api/SkillApi'
import { computed, ref } from 'vue'

// eslint-disable-next-line
useHead({
  title: 'Mon parcours - Rudy Dupuis - Développeur Web et Web mobile',
  meta: [
    {
      name: 'description',
      content:
        "Découvrez mon parcours (Rudy Dupuis), développeur Web et Web mobile passionné. Explorez mes formations, mes expériences professionnelles et les projets que j'ai réalisés."
    }
  ]
})

const skillApi = new SkillApi()
const skillIsLoading = ref<boolean>(false)

const experienceApi = new ExperienceApi()
const experienceIsLoading = ref<boolean>(false)

const hardSkills = ref<Array<GetHardSkill>>([])

const experiences = ref<Array<GetExperience>>([])
const experiencesFilter = ref<undefined | 'project' | 'job' | 'training'>(undefined)
const projectsFilter = ref<Array<GetHardSkill['id']>>([])
const filteredExperiences = computed<Array<GetExperience>>(() => {
  if (projectsFilter.value.length === 0) {
    switch (experiencesFilter.value) {
      case 'project':
        return experiences.value.filter(
          (exp): exp is GetProjectExperience => exp instanceof GetProjectExperience
        )
      case 'job':
        return experiences.value.filter(
          (exp): exp is GetJobExperience => exp instanceof GetJobExperience
        )
      case 'training':
        return experiences.value.filter(
          (exp): exp is GetTrainingExperience => exp instanceof GetTrainingExperience
        )
      default:
        return experiences.value
    }
  }

  return experiences.value
    .filter((exp): exp is GetProjectExperience => exp instanceof GetProjectExperience)
    .filter((project: GetProjectExperience) =>
      projectsFilter.value?.every((filterId) =>
        project.hardSkills.some((skill) => skill.id === filterId)
      )
    )
})

function toggleExperiencesFilter(filter: 'project' | 'job' | 'training') {
  projectsFilter.value = []
  experiencesFilter.value = experiencesFilter.value === filter ? undefined : filter
}

function toggleProjectFilterBySkill(filter: GetHardSkill['id']) {
  if (projectsFilter.value?.includes(filter)) {
    projectsFilter.value = projectsFilter.value.filter((id) => id !== filter)
  } else {
    projectsFilter.value.push(filter)
  }
}

async function fetchDate() {
  skillIsLoading.value = true
  experienceIsLoading.value = true
  try {
    hardSkills.value = await skillApi.getAllHardSkills()
  } catch (e) {
    console.error(e)
  } finally {
    skillIsLoading.value = false
  }
  try {
    const projectExperiences = await experienceApi.getAllProjectExperiences()
    const jobExperiences = await experienceApi.getAllJobExperiences()
    const trainingExperiences = await experienceApi.getAllTrainingExperiences()
    experiences.value = [...projectExperiences, ...jobExperiences, ...trainingExperiences].sort(
      (a, b) => {
        return b.startDate.getTime() - a.startDate.getTime()
      }
    )
  } catch (e) {
    console.error(e)
  } finally {
    experienceIsLoading.value = false
  }
}

fetchDate()
</script>

<template>
  <main>
    <h1 class="large-title mt-40 mb-16">Mon parcours</h1>

    <a href="#parcours" class="flex flex-col items-center mb-5">
      <p class="font-primary_regular text-sm text-center">Faites défiler pour voir mon parcours</p>
      <p class="information-arrow text-4xl">↓</p>
    </a>

    <section class="flex flex-col items-center bg-grey_3 py-10 space-y-10">
      <h2 class="medium-title">Trier</h2>
      <div
        class="flex flex-col items-center justify-center space-y-3 lg:flex-row lg:space-y-0 lg:space-x-20 w-full"
      >
        <button
          class="choice-button"
          :class="{
            'choice-button--active': experiencesFilter === 'project' || projectsFilter.length > 0
          }"
          @click="toggleExperiencesFilter('project')"
        >
          Projets uniquement
        </button>
        <button
          class="choice-button ml1"
          :class="{
            'choice-button--active': experiencesFilter === 'job' && projectsFilter.length === 0
          }"
          @click="toggleExperiencesFilter('job')"
        >
          Emplois uniquement
        </button>
        <button
          class="choice-button ml1"
          :class="{
            'choice-button--active': experiencesFilter === 'training' && projectsFilter.length === 0
          }"
          @click="toggleExperiencesFilter('training')"
        >
          Formations uniquement
        </button>
      </div>
      <h2 class="medium-title">Projet utilisant</h2>
      <div
        class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 xl:grid-cols-12 gap-4"
      >
        <SkillComp
          v-for="(skill, index) in hardSkills"
          :key="index"
          :skill="skill"
          :color="projectsFilter.includes(skill.id) ? 'primary' : 'grey'"
          size="small"
          @click="toggleProjectFilterBySkill(skill.id)"
          class="cursor-pointer hover:opacity-50"
        />
      </div>
      <FetchDataComp
        v-if="hardSkills"
        :isloading="skillIsLoading"
        :has-data="hardSkills.length !== 0"
      />
    </section>

    <section id="parcours" class="flex flex-col items-center py-20">
      <div
        v-for="(experience, index) in filteredExperiences"
        :key="index"
        class="flex flex-col items-center space-y-10"
      >
        <template
          v-if="
            index === 0 ||
            experience.startDate.getFullYear() !==
              filteredExperiences[index - 1].startDate.getFullYear()
          "
        >
          <div v-if="index !== 0" class="bg-primary w-2 h-10 rounded-xl mt-10"></div>
          <h3 class="small-title">
            {{ experience.startDate.getFullYear() }}
          </h3>
        </template>
        <div class="bg-primary w-2 h-10 rounded-xl mt-10"></div>
        <ExperienceComp :experience="experience" />
      </div>
      <p v-if="filteredExperiences.length === 0 && experiences.length > 0">Aucun résultat ...</p>
      <FetchDataComp
        v-if="experiences"
        :isloading="experienceIsLoading"
        :has-data="experiences.length !== 0"
      />
    </section>
  </main>
</template>

<style scoped lang="scss">
.information-arrow {
  animation: moving 3s ease-in-out infinite;

  @keyframes moving {
    0% {
      transform: translateY(0);
    }
    30% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(10px);
    }
    50% {
      transform: translateY(2px);
    }
    60% {
      transform: translateY(10px);
    }
    70% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(0);
    }
  }
}
</style>
