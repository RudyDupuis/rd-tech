<script setup lang="ts">
import { GetProjectExperience } from '~/utils/entities/experiences/ProjectExperience'
import type { GetHardSkill } from '~/utils/entities/skills/HardSkill'
import type { GetSoftSkill } from '~/utils/entities/skills/SoftSkill'
import { ExperienceApi } from '~/utils/api/ExperienceApi'
import { SkillApi } from '~/utils/api/SkillApi'
import useIsSmallScreen from '~/utils/helpers/useIsSmallScreen'
import { isUndefined } from '~/utils/type/TypeGuard'
import { computed, onMounted, ref } from 'vue'

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

onMounted(async () => {
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
})
</script>

<template>
  <main>
    <section id="hero-banner" class="f a-cent j-even">
      <div class="f-col a-cent j-around">
        <h1 class="mb2">Rudy Dupuis</h1>
        <p class="larger-text mb2">Développeur Web et Web mobile</p>
        <ToolsboxAnimComp v-if="isSmallScreen" />
        <a href="#presentation" class="button">Découvrir mon profil</a>
      </div>
      <ToolsboxAnimComp v-if="!isSmallScreen" />
    </section>

    <section id="presentation" class="f a-cent j-even ptb4">
      <img
        v-if="!isSmallScreen"
        src="/images/rudy-picture.svg"
        alt="Une photo de rudy dupuis"
        class="mb2"
      />
      <div class="f-col a-cent">
        <h2 class="mb3">Qui suis je ?</h2>
        <img
          v-if="isSmallScreen"
          src="/images/rudy-picture.svg"
          alt="Une photo de rudy dupuis"
          class="mb3"
        />
        <p class="mb3">
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
        <router-link :to="{ name: 'contact' }" class="button">Me contacter</router-link>
      </div>
    </section>

    <section id="skills" class="f-col a-cent bg-grey-3 ptb3 mb4">
      <h2 class="mb3">Mes compétences</h2>
      <div class="prl2">
        <h3 class="mb2">Hard skills</h3>
        <div class="button-list w80vw f a-cent j-even mb3">
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
            class="choice-button ml1"
            :class="{
              'choice-button--active': hardSkillsFilter === 'intermediate'
            }"
            @click="toggleFilter('intermediate')"
          >
            Intermédiaire
          </button>
          <button
            class="choice-button ml1"
            :class="{
              'choice-button--active': hardSkillsFilter === 'beginner'
            }"
            @click="toggleFilter('beginner')"
          >
            Débutant
          </button>
        </div>

        <div class="medium-skill-list mb3">
          <SkillComp
            v-for="(skill, index) in filteredHardSkills"
            :key="index"
            :skill="skill"
            :color="skill.mastery === 'advanced' ? 'primary' : 'secondary'"
            size="medium"
          />
          <FetchDataComp
            :isloading="hardskillIsLoading"
            :has-data="filteredHardSkills.length !== 0"
          />
        </div>
        <h3 class="mb3">Soft skills</h3>
        <div class="medium-skill-list">
          <SkillComp
            v-for="(skill, index) in softSkills"
            :key="index"
            :skill="skill"
            color="secondary"
            size="medium"
          />
          <FetchDataComp :isloading="softskillIsLoading" :has-data="softSkills.length !== 0" />
        </div>
      </div>
    </section>

    <section id="favorite-projects" class="f-col a-cent">
      <h2 class="mb3">Mes projets favoris</h2>
      <div class="w100 f f-wrap j-even mb3">
        <ExperienceComp
          v-for="(project, index) in favoriteProjects"
          :key="index"
          :experience="project"
        />
        <FetchDataComp :isloading="experienceIsLoading" :has-data="favoriteProjects.length !== 0" />
      </div>
      <router-link :to="{ name: 'mon-parcours' }" class="button mb4">Voir mon parcours</router-link>
    </section>
  </main>
</template>

<style scoped lang="scss">
#hero-banner {
  height: calc(100dvh - 96px);
}

#presentation {
  p {
    width: 40vw;
    text-align: justify;
  }

  @media (max-width: 1100px) {
    img {
      margin-top: 64px;
      width: 273px;
      height: 272px;
    }

    p {
      width: 60vw;
    }
  }

  @media (max-width: 500px) {
    img {
      width: 212px;
      height: 211px;
    }

    p {
      width: 80vw;
    }
  }
}

#skills {
  h3 {
    text-align: left;
  }
}
</style>
