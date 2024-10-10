<script setup lang="ts">
import { GetExperience } from '~/utils/entities/experiences/Experience'
import { GetJobExperience } from '~/utils/entities/experiences/JobExperience'
import { GetProjectExperience } from '~/utils/entities/experiences/ProjectExperience'
import { GetTrainingExperience } from '~/utils/entities/experiences/TrainingExperience'
import { GetHardSkill } from '~/utils/entities/skills/HardSkill'
import { ExperienceApi } from '~/utils/api/ExperienceApi'
import { SkillApi } from '~/utils/api/SkillApi'
import { computed, onMounted, onUnmounted, ref } from 'vue'

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

const showScrollToTopButton = ref<boolean>(false)
function handleScrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleShowScrollToTopButton() {
  showScrollToTopButton.value = window.scrollY > window.innerHeight * 0.5 ? true : false
}

onMounted(async () => {
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

  window.addEventListener('scroll', handleShowScrollToTopButton)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleShowScrollToTopButton)
})
</script>

<template>
  <main>
    <h1 class="mb3">Mon parcours</h1>

    <a href="#parcours" class="f-col a-cent">
      <p>Faites défiler pour voir mon parcours</p>
      <p class="information-arrow">↓</p>
    </a>

    <section class="f-col a-cent bg-grey-3 ptb2">
      <h2 class="mb2">Trier</h2>
      <div class="button-list w80vw f a-cent j-even mb2">
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
      <h2 class="mb2">Projet utilisant</h2>
      <div class="small-skill-list w80vw">
        <SkillComp
          v-for="(skill, index) in hardSkills"
          :key="index"
          :skill="skill"
          :color="projectsFilter.includes(skill.id) ? 'primary' : 'grey'"
          size="small"
          @click="toggleProjectFilterBySkill(skill.id)"
        />
        <FetchDataComp :isloading="skillIsLoading" :has-data="hardSkills.length !== 0" />
      </div>
    </section>

    <button
      v-show="showScrollToTopButton"
      class="scroll-to-top-button"
      @click="handleScrollToTop()"
    >
      ↑
    </button>

    <section id="parcours" class="f-col a-cent ptb3 mb4">
      <div v-for="(experience, index) in filteredExperiences" :key="index" class="f-col a-cent">
        <template
          v-if="
            index === 0 ||
            experience.startDate.getFullYear() !==
              filteredExperiences[index - 1].startDate.getFullYear()
          "
        >
          <div v-if="index !== 0" class="decorative-line bg-primary mb2"></div>
          <h3 class="mb2">
            {{ experience.startDate.getFullYear() }}
          </h3>
        </template>
        <div class="decorative-line bg-primary mb2"></div>
        <ExperienceComp :experience="experience" class="mb2" />
      </div>
      <p v-if="filteredExperiences.length === 0 && experiences.length > 0">Aucun résultat ...</p>
      <FetchDataComp :isloading="experienceIsLoading" :has-data="experiences.length !== 0" />
    </section>
  </main>
</template>

<style scoped lang="scss">
.decorative-line {
  height: 50px;
  width: 5px;
  border-radius: 10px;
}

.information-arrow {
  font-size: 35px;
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

.small-skill-list {
  div {
    cursor: pointer;

    &:hover {
      opacity: 0.6;
    }
  }
}
</style>
