<script setup lang="ts">
import type { GetJobExperience } from '@/entities/experiences/JobExperience'
import type { GetProjectExperience } from '@/entities/experiences/ProjectExperience'
import type { GetTrainingExperience } from '@/entities/experiences/TrainingExperience'

interface Props {
  experience: GetProjectExperience | GetJobExperience | GetTrainingExperience
}
defineProps<Props>()
</script>

<template>
  <div class="f-col a-cent">
    <p>{{ experience.id }}</p>
    <img
      v-if="experience.thumbnailPath"
      :src="'/api/' + experience.thumbnailPath"
      :alt="'Image de ' + experience.title"
    />
    <p>{{ experience.title }}</p>
  </div>
</template>

<style scoped lang="scss">
img {
  width: 80px;
  height: auto;
}
p {
  font-size: 10px;
  text-align: center;
}
div {
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
}
</style>
