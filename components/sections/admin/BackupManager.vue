<script setup lang="ts">
import { ref } from 'vue'
import { ApiMethods } from '~/utils/api/ApiMethods'

const api = new ApiMethods()
const isLoading = ref(false)
const errorMessage = ref('')

const backupUrl = ref('')

async function makeBackup() {
  isLoading.value = true
  try {
    const response = await api.getData('backup')
    if (response.downloadLink) {
      backupUrl.value = response.downloadLink
    }
  } catch (error: Error | unknown) {
    errorMessage.value = error instanceof Error ? error.message : 'Une erreur est survenue'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="flex flex-col items-center mb-80">
    <h2 class="medium-title py-16">Gestion des sauvegardes</h2>

    <section v-if="!backupUrl">
      <div v-if="isLoading" class="flex flex-col items-center space-y-8">
        <p>Sauvegarde des données en cours</p>
        <div
          class="loader border-4 border-t-4 border-t-light border-primary rounded-full w-10 h-10 mx-auto animate-spin"
        ></div>
      </div>
      <button v-else @click="makeBackup" class="button">Sauvegarder la base de données</button>
    </section>

    <div v-else class="button mt-4">
      <a :href="backupUrl" download> Télécharger la sauvegarde </a>
    </div>

    <p class="text-false mt-4">{{ errorMessage }}</p>
  </section>
</template>
