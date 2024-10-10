<script setup lang="ts">
import { GetHardSkill } from '@/entities/skills/HardSkill'
import type { GetSoftSkill } from '@/entities/skills/SoftSkill'
import { capitalizeFirstLetter } from '~/utils/formatting'

interface Props {
  skill: GetHardSkill | GetSoftSkill
}
const { skill } = defineProps<Props>()

function isHardSkill(checkingSkill: typeof skill): checkingSkill is GetHardSkill {
  return checkingSkill instanceof GetHardSkill
}
</script>

<template>
  <div class="f-col a-cent">
    <p>{{ skill.id }}</p>
    <img :src="'/api/' + skill.svgPath" :alt="'Image de ' + skill.name" />
    <p>{{ skill.name }}</p>
    <p v-if="isHardSkill(skill)">
      {{ capitalizeFirstLetter(skill.mastery) }}
    </p>
  </div>
</template>

<style scoped lang="scss">
img {
  width: 40px;
  height: auto;
}
p {
  font-size: 10px;
}
div {
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
}
</style>
