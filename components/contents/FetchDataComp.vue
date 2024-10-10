<script setup lang="ts">
interface Props {
  isloading: boolean
  hasData: boolean
}

defineProps<Props>()
</script>

<template>
  <div v-if="isloading" class="loader"></div>
  <p v-if="!hasData && !isloading" class="text-a-cent text-error">
    Il y a un problème avec le backend de l'application, je vais le régler bientôt, désolé pour le
    désagrément
  </p>
</template>
