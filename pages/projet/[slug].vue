<script setup lang="ts">
import { GetProjectExperience } from '~/utils/entities/experiences/ProjectExperience'
import { ExperienceApi } from '@/utils/api/ExperienceApi'
import { formatExperienceDate } from '~/utils/helpers/formatting'
import { isDefined } from '~/utils/types/TypeGuard'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = route.params.slug.toString()

const experienceApi = new ExperienceApi()
const experienceIsLoading = ref<boolean>(false)

const project = ref<GetProjectExperience | undefined>(undefined)
const carouselIndex = ref<number>(0)
const carouselUrls = ref<Array<string | undefined>>([])

function handleCarousel(direction: 'right' | 'left') {
  if (direction === 'right' && carouselIndex.value < carouselUrls.value.length - 1) {
    carouselIndex.value += 1
  }
  if (direction === 'left' && carouselIndex.value > 0) carouselIndex.value -= 1
}

async function fetchData() {
  experienceIsLoading.value = true
  try {
    project.value = await experienceApi.getProjectExperienceBySlug(slug)
    const thumbnailUrl = project.value.thumbnailPath ? ['/api/' + project.value.thumbnailPath] : []
    const imageUrls = project.value.imagesPath
      ? project.value.imagesPath.map((path) => '/api/' + path)
      : []
    carouselUrls.value = [...thumbnailUrl, ...imageUrls]
  } catch (e) {
    console.error(e)
  } finally {
    experienceIsLoading.value = false
  }

  // eslint-disable-next-line
  useHead({
    title: `${project.value?.title} - Rudy Dupuis - Développeur Web et Web mobile`,
    meta: [
      {
        name: 'description',
        content: project.value?.longDesc
      }
    ]
  })
}

fetchData()
</script>

<template>
  <main v-if="project !== undefined" class="flex flex-col items-center justify-center">
    <section
      class="flex flex-col md:flex-row items-center justify-evenly w-full space-y-20 md:space-y-0 py-20"
    >
      <div class="flex flex-col">
        <h1 class="large-title mt-20">{{ project.title }}</h1>
        <p>
          {{ formatExperienceDate(project.startDate, project.endDate) }}
        </p>
      </div>
      <div class="flex items-center justify-center" v-if="carouselUrls.length != 0">
        <p
          v-if="carouselUrls.length > 1"
          class="hover:opacity-50 text-4xl cursor-pointer select-none mr-3"
          :class="{ 'opacity-20': carouselIndex === 0 }"
          @click="handleCarousel('left')"
        >
          <CaretLeftSvg />
        </p>
        <img
          :src="carouselUrls[carouselIndex]"
          :alt="'Image n°' + carouselIndex + ' du projet ' + project.title"
          class="w-9/12 md:w-72 lg:w-96 xl:w-135"
        />
        <p
          v-if="carouselUrls.length > 1"
          class="hover:opacity-50 text-4xl cursor-pointer select-none ml-3"
          :class="{
            'opacity-20': carouselIndex === carouselUrls.length - 1
          }"
          @click="handleCarousel('right')"
        >
          <CaretRightSvg />
        </p>
      </div>
    </section>

    <section
      class="bg-grey_3 flex flex-col xl:flex-row items-center justify-evenly py-20 w-full px-10 space-y-20 xl:space-y-0"
    >
      <pre class="max-w-screen-sm whitespace-pre-wrap font-primary_regular">{{
        project.longDesc
      }}</pre>
      <div>
        <h3 class="small-title mb-5">Technologie utilisées :</h3>
        <div class="grid grid-cols-3 md:grid-cols-6 gap-4">
          <SkillComp
            v-for="hardSkill in project.hardSkills"
            :key="hardSkill.id"
            :skill="hardSkill"
            size="small"
            color="grey"
          />
        </div>
      </div>
    </section>

    <section
      class="flex flex-col md:flex-row items-center justify-evenly py-20 w-full space-y-10 md:space-y-0"
    >
      <a
        v-if="isDefined(project.projectLink)"
        :href="project.projectLink"
        target="_blank"
        class="button"
      >
        Découvrir le projet
      </a>
      <a v-if="isDefined(project.codeLink)" :href="project.codeLink" target="_blank" class="button">
        Voir le code
      </a>
    </section>
  </main>
  <main v-else class="flex flex-col items-center justify-center space-y-20">
    <section v-if="experienceIsLoading">
      <div
        class="loader border-4 border-t-4 border-t-light border-primary rounded-full w-10 h-10 mx-auto animate-spin"
      ></div>
    </section>
    <template v-else>
      <div class="flex flex-col items-center justify-center space-y-10">
        <h1 class="large-title mt-20">Projet introuvable</h1>
        <p>Le projet n'a pas été trouvé ...</p>
      </div>
      <RouterLink :to="{ name: 'mon-parcours' }" class="button">
        Revenir à la liste des projets ?
      </RouterLink>
      <ToolsboxFullSvg />
    </template>
  </main>
</template>
