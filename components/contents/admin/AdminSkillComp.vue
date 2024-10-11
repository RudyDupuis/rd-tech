<script setup lang="ts">
import { GetHardSkill } from '~/utils/entities/skills/HardSkill'
import type { GetSoftSkill } from '~/utils/entities/skills/SoftSkill'
import { capitalizeFirstLetter } from '~/utils/helpers/formatting'

interface Props {
  skill: GetHardSkill | GetSoftSkill
}
const { skill } = defineProps<Props>()

function isHardSkill(checkingSkill: typeof skill): checkingSkill is GetHardSkill {
  return checkingSkill instanceof GetHardSkill
}
</script>

<template>
  <div class="flex flex-col items-center cursor-pointer hover:opacity-50">
    <p class="text-xs">{{ skill.id }}</p>
    <img :src="'/api/' + skill.svgPath" :alt="'Image de ' + skill.name" class="w-8" />
    <p class="text-xs">{{ skill.name }}</p>
    <p v-if="isHardSkill(skill)" class="text-xs">
      {{ capitalizeFirstLetter(skill.mastery) }}
    </p>
  </div>
</template>
