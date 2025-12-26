<script setup lang="ts">
defineProps<{
  error: NuxtError;
}>();
</script>

<template>
  <HeaderComp />
  <main class="flex flex-col items-center justify-center space-y-20">
    <div class="flex flex-col items-center justify-center space-y-5">
      <h1 class="large-title">{{ error.statusCode }} - Page introuvable</h1>
      <p>Désolé cette page n'existe pas ...</p>
    </div>
    <RouterLink to="/" class="button">Revenir à l'acceuil ?</RouterLink>
    <ToolsboxFullSvg />
  </main>
  <FooterComp />
</template>
