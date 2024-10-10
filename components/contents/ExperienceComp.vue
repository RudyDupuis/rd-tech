<script setup lang="ts">
import type { GetExperience } from '@/entities/experiences/Experience'
import { GetProjectExperience } from '@/entities/experiences/ProjectExperience'
import { formatExperienceDate } from '~/utils/formatting'

interface Props {
  experience: GetExperience
}

defineProps<Props>()
</script>

<template>
  <div class="f-col a-cent prl2">
    <img
      v-if="experience.thumbnailPath"
      :src="'/api/' + experience.thumbnailPath"
      :alt="'Miniature de ' + experience.title"
      class="primary-border mb1"
    />
    <p class="text-bold mb05">{{ experience.title }}</p>
    <p class="text-medium mb05">
      {{ formatExperienceDate(experience.startDate, experience.endDate) }}
    </p>
    <p class="mb05">{{ experience.shortDesc }}</p>
    <router-link
      v-if="experience instanceof GetProjectExperience"
      :to="{ path: `/${experience.slug}` }"
      class="text-important"
    >
      En savoir plus ➜
    </router-link>
  </div>
</template>

<style scoped lang="scss">
div {
  width: 350px;
}
img {
  width: 350px;
  height: auto;

  @media (max-width: 520px) {
    width: 300px;
  }
  @media (max-width: 400px) {
    width: 280px;
  }
}
p {
  text-align: center;
}
</style>
