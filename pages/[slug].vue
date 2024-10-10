<script setup lang="ts">
import { GetProjectExperience } from '@/entities/experiences/ProjectExperience'
import { ExperienceApi } from '@/utils/api/ExperienceApi'
import { formatExperienceDate } from '@/utils/formatting'
import { isDefined } from '~/utils/TypeGuard'
import { onMounted, ref } from 'vue'
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

onMounted(async () => {
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
})
</script>

<template>
  <main v-if="project !== undefined">
    <section class="f a-cent j-even mb2">
      <div class="title f-col a-start">
        <h1>{{ project.title }}</h1>
        <p class="text-medium larger-text">
          {{ formatExperienceDate(project.startDate, project.endDate) }}
        </p>
      </div>
      <div class="carousel f a-cent j-cent" v-if="carouselUrls.length != 0">
        <p
          v-if="carouselUrls.length > 1"
          :class="{ 'carousel-btn--disabled': carouselIndex === 0 }"
          class="carousel-btn"
          @click="handleCarousel('left')"
        >
          《
        </p>
        <img
          :src="carouselUrls[carouselIndex]"
          :alt="'Image n°' + carouselIndex + ' du projet ' + project.title"
          class="primary-border mb1"
        />
        <p
          v-if="carouselUrls.length > 1"
          :class="{
            'carousel-btn--disabled': carouselIndex === carouselUrls.length - 1
          }"
          class="carousel-btn"
          @click="handleCarousel('right')"
        >
          》
        </p>
      </div>
    </section>

    <section class="bg-grey-3 f a-cent j-even ptb2 mb3">
      <pre class="long-desc prl2">{{ project.longDesc }}</pre>
      <div>
        <h3 class="mb2">Technologie utilisées :</h3>
        <div class="small-skill-list prl2">
          <SkillComp
            v-for="hardSkill in project.hardSkills"
            :key="hardSkill.id"
            :skill="hardSkill"
            size="small"
            color="secondary"
          />
        </div>
      </div>
    </section>

    <section class="f a-cent j-even mb4">
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
  <main v-else class="f-col a-cent">
    <section v-if="experienceIsLoading" class="loader-container f-col a-cent j-cent">
      <div class="loader"></div>
    </section>
    <template v-else>
      <h1 class="mb4">Projet introuvable</h1>
      <p class="larger-text text-a-cent mb1 prl2">Le projet n'a pas été trouvé ...</p>
      <RouterLink :to="{ name: 'mon-parcours' }" class="button mb4"
        >Revenir à la liste des projets ?</RouterLink
      >
      <ToolsboxFullSvg class="mb4" />
    </template>
  </main>
</template>

<style scoped lang="scss">
.loader-container {
  height: calc(100dvh - 96px);
}
img {
  width: 600px;
  height: auto;

  @media (max-width: 1300px) {
    width: 500px;
  }
  @media (max-width: 700px) {
    width: 400px;
  }
  @media (max-width: 520px) {
    width: 300px;
  }
  @media (max-width: 400px) {
    width: 280px;
  }
}
.long-desc {
  max-width: 600px;
  white-space: pre-wrap;
  text-align: justify;
}
.small-skill-list {
  width: 600px;
  @media (max-width: 1300px) {
    width: 500px;
  }
}
.carousel {
  max-width: 100vw;
  overflow: hidden;
}

@media (max-width: 1050px) {
  section {
    .title {
      margin-bottom: 64px;
      align-items: center;
    }

    .long-desc {
      margin-bottom: 64px;
      max-width: 100%;
    }

    .small-skill-list {
      width: 80vw;
    }

    flex-direction: column;
  }

  .button {
    width: 80%;
    margin-bottom: 32px;
  }
}
</style>
