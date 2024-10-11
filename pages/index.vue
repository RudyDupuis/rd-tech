<script setup lang="ts">
import { GetProjectExperience } from '~/utils/entities/experiences/ProjectExperience'
import type { GetHardSkill } from '~/utils/entities/skills/HardSkill'
import type { GetSoftSkill } from '~/utils/entities/skills/SoftSkill'
import { ExperienceApi } from '~/utils/api/ExperienceApi'
import { SkillApi } from '~/utils/api/SkillApi'
import useIsSmallScreen from '~/utils/helpers/useIsSmallScreen'
import { isUndefined } from '~/utils/type/TypeGuard'
import { computed, ref } from 'vue'

// eslint-disable-next-line
useHead({
  title: 'Accueil - Rudy Dupuis - Développeur Web et Web mobile',
  meta: [
    {
      name: 'description',
      content:
        "Je suis Rudy Dupuis, un développeur Web et Web mobile passionné par l'UX. J'ai fusionné ma passion pour le bricolage et le numérique dans la conception de ce site. Découvrez mon parcours et mes compétences. Contactez-moi pour discuter de votre projet numérique."
    }
  ]
})

const isSmallScreen = useIsSmallScreen()

const skillApi = new SkillApi()
const softskillIsLoading = ref<boolean>(false)
const hardskillIsLoading = ref<boolean>(false)

const experienceApi = new ExperienceApi()
const experienceIsLoading = ref<boolean>(false)
const favoriteProjects = ref<Array<GetProjectExperience>>([])

const softSkills = ref<Array<GetSoftSkill>>([])
const hardSkills = ref<Array<GetHardSkill>>([])
const hardSkillsFilter = ref<GetHardSkill['mastery'] | undefined>(undefined)

const filteredHardSkills = computed<Array<GetHardSkill>>(() => {
  if (isUndefined(hardSkillsFilter.value)) {
    return hardSkills.value
  }
  return hardSkills.value.filter((skill) => skill.mastery === hardSkillsFilter.value)
})

function toggleFilter(filter: GetHardSkill['mastery']) {
  hardSkillsFilter.value = hardSkillsFilter.value === filter ? undefined : filter
}

async function fetchData() {
  experienceIsLoading.value = true
  softskillIsLoading.value = true
  hardskillIsLoading.value = true
  try {
    favoriteProjects.value = await experienceApi.getAllFavoriteProjectExperiences()
  } catch (e) {
    console.error(e)
  } finally {
    experienceIsLoading.value = false
  }
  try {
    softSkills.value = await skillApi.getAllSoftSkills()
  } catch (e) {
    console.error(e)
  } finally {
    softskillIsLoading.value = false
  }
  try {
    hardSkills.value = await skillApi.getAllHardSkills()
  } catch (e) {
    console.error(e)
  } finally {
    hardskillIsLoading.value = false
  }
}

fetchData()
</script>

<template>
  <main>
    <section id="hero-banner" class="flex min-h-screen items-center justify-evenly">
      <div class="flex flex-col items-center justify-around space-y-10">
        <h1 class="large-title">Rudy Dupuis</h1>
        <p>Développeur Web et Web mobile</p>
        <ToolsboxAnimComp v-if="isSmallScreen" />
        <a href="#presentation" class="button">Découvrir mon profil</a>
      </div>
      <ToolsboxAnimComp v-if="!isSmallScreen" />
    </section>

    <section
      id="presentation"
      class="flex items-center justify-evenly pb-20 md:px-20 md:space-x-10"
    >
      <img
        v-if="!isSmallScreen"
        src="/images/rudy-picture.svg"
        alt="Une photo de rudy dupuis"
        class="select-none"
      />
      <div class="flex flex-col items-center space-y-20">
        <h2 class="medium-title">Qui suis je ?</h2>
        <img
          v-if="isSmallScreen"
          src="/images/rudy-picture.svg"
          alt="Une photo de rudy dupuis"
          style="width: 250px; height: 250px"
          class="select-none"
        />
        <p class="px-10 md:px-0 max-w-screen-md">
          Passionné par le bricolage et le numérique, j&apos;ai fusionné ces deux univers dans la
          conception de ce site. Tout comme le bricolage nécessite l&apos;utilisation d&apos;outils,
          je donne vie à des concepts numériques à l&apos;aide des langages de programmation et des
          logiciels.
          <br />
          <br />
          Je suis <strong>développeur Web</strong> avec une appétence pour l&apos;
          <strong>UX design</strong>, impliqué dans toutes les étapes du processus, de la
          <strong>conception graphique</strong>, au <strong>développement</strong>, jusqu&apos;au
          <strong>déploiement</strong>.
          <br />
          <br />
          Contactez moi pour discuter de vos besoins en développement web. Ensemble, nous
          réaliserons votre projet numérique.
        </p>
        <router-link :to="{ name: 'me-contacter' }" class="button">Me contacter</router-link>
      </div>
    </section>

    <section id="skills" class="flex flex-col items-center bg-grey_3 py-20 space-y-10">
      <h2 class="medium-title">Mes compétences</h2>
      <div class="w-full px-10 xl:px-40 space-y-10">
        <h3 class="small-title">Hard skills</h3>
        <div
          class="flex flex-col items-center justify-center space-y-3 md:flex-row md:space-y-0 md:space-x-20"
        >
          <button
            class="choice-button"
            :class="{
              'choice-button--active': hardSkillsFilter === 'advanced'
            }"
            @click="toggleFilter('advanced')"
          >
            Avancé
          </button>
          <button
            class="choice-button"
            :class="{
              'choice-button--active': hardSkillsFilter === 'intermediate'
            }"
            @click="toggleFilter('intermediate')"
          >
            Intermédiaire
          </button>
          <button
            class="choice-button"
            :class="{
              'choice-button--active': hardSkillsFilter === 'beginner'
            }"
            @click="toggleFilter('beginner')"
          >
            Débutant
          </button>
        </div>
        <div class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-4">
          <SkillComp
            v-for="(skill, index) in filteredHardSkills"
            :key="index"
            :skill="skill"
            :color="skill.mastery === 'advanced' ? 'primary' : 'grey'"
            size="medium"
          />
        </div>
        <FetchDataComp
          :isloading="hardskillIsLoading"
          :has-data="filteredHardSkills.length !== 0"
        />

        <h3 class="small-title">Soft skills</h3>
        <div class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-4">
          <SkillComp
            v-for="(skill, index) in softSkills"
            :key="index"
            :skill="skill"
            color="grey"
            size="medium"
          />
        </div>
        <FetchDataComp :isloading="softskillIsLoading" :has-data="softSkills.length !== 0" />
      </div>
    </section>

    <section id="favorite-projects" class="flex flex-col items-center py-20 space-y-20">
      <h2 class="medium-title">Mes projets favoris</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-20">
        <ExperienceComp
          v-for="(project, index) in favoriteProjects"
          :key="index"
          :experience="project"
        />
      </div>
      <FetchDataComp :isloading="experienceIsLoading" :has-data="favoriteProjects.length !== 0" />
      <router-link :to="{ name: 'mon-parcours' }" class="button mb4">Voir mon parcours</router-link>
    </section>
  </main>
</template>
