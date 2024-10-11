<script setup lang="ts">
import type { GetSkill } from '~/utils/entities/skills/Skill'
import { ref } from 'vue'

interface Props {
  skill: GetSkill
  size: 'medium' | 'small'
  color: 'primary' | 'grey'
}

const props = defineProps<Props>()
const svgContent = ref<string>()

function fetchSvg() {
  fetch('/api/' + props.skill.svgPath)
    .then((response) => response.text())
    .then((text) => (svgContent.value = text))
}

fetchSvg()
</script>

<template>
  <div class="flex flex-col items-center">
    <div v-html="svgContent" :class="`skill-size-${props.size} skill-color-${props.color}`"></div>
    <p class="text-xs text-center select-none" :class="color === 'primary' ? 'text-primary' : ''">
      {{ skill.name }}
    </p>
  </div>
</template>

<style lang="scss">
.skill-size-medium {
  @apply size-16;
  svg {
    @apply size-16;
  }
}
.skill-size-small {
  @apply size-10;
  svg {
    @apply size-10;
  }
}

.skill-color-primary {
  svg {
    path {
      @apply fill-primary;
    }
  }
}
.skill-color-grey {
  svg {
    path {
      @apply fill-grey_1;
    }
  }
}
</style>
