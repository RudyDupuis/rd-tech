<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()
</script>

<template>
  <HeaderComp />
  <main class="f-col a-cent j-cent">
    <h1 class="mb3">{{ error.statusCode }} - Page introuvable</h1>
    <p class="larger-text text-a-cent mb1 prl2">Désolé cette page n'existe pas ...</p>
    <RouterLink :to="{ name: 'home' }" class="button mb2">Revenir à l'acceuil ?</RouterLink>
    <ToolsboxFullSvg class="mb4" />
  </main>
  <FooterComp />
</template>
