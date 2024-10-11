<script setup lang="ts">
import type { GetJobExperience } from '~/utils/entities/experiences/JobExperience'
import type { GetProjectExperience } from '~/utils/entities/experiences/ProjectExperience'
import type { GetTrainingExperience } from '~/utils/entities/experiences/TrainingExperience'

interface Props {
  experience: GetProjectExperience | GetJobExperience | GetTrainingExperience
}
defineProps<Props>()
</script>

<template>
  <div class="flex flex-col items-center cursor-pointer hover:opacity-50">
    <p class="text-xs">{{ experience.id }}</p>
    <img
      v-if="experience.thumbnailPath"
      :src="'/api/' + experience.thumbnailPath"
      :alt="'Image de ' + experience.title"
      class="w-20"
    />
    <p class="text-xs">{{ experience.title }}</p>
  </div>
</template>
