<script setup lang="ts">
interface Props {
  isloading: boolean
  hasData: boolean
}

defineProps<Props>()
</script>

<template>
  <div
    v-if="isloading"
    class="loader border-4 border-t-4 border-t-light border-primary rounded-full w-10 h-10 mx-auto animate-spin"
  ></div>
  <p v-if="!hasData && !isloading" class="text-center text-false">
    Il y a un problème avec le backend de l'application, je vais le régler bientôt, désolé pour le
    désagrément
  </p>
</template>

<style lang="scss" scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
