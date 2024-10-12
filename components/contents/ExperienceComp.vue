<script setup lang="ts">
import type { GetExperience } from '~/utils/entities/experiences/Experience'
import { GetProjectExperience } from '~/utils/entities/experiences/ProjectExperience'
import { formatExperienceDate } from '~/utils/helpers/formatting'

interface Props {
  experience: GetExperience
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col items-center max-w-xs">
    <img
      v-if="experience.thumbnailPath"
      :src="'/api/' + experience.thumbnailPath"
      :alt="'Miniature de ' + experience.title"
      class="w-80 border-2 border-grey_1 select-none mb-5"
    />
    <p class="font-primary_bold text-center">{{ experience.title }}</p>
    <p class="text-medium mb-5">
      {{ formatExperienceDate(experience.startDate, experience.endDate) }}
    </p>
    <p class="mb-2">{{ experience.shortDesc }}</p>
    <router-link
      v-if="experience instanceof GetProjectExperience"
      :to="{ path: `/projet/${experience.slug}` }"
      class="text-primary"
    >
      En savoir plus ➜
    </router-link>
  </div>
</template>
