<script setup lang="ts">
import { ref } from 'vue'

const emailAddress = ref<string>('dupuisrudypro@gmail.com')
const showSuccesMessage = ref<boolean>(false)

const copyEmail = () => {
  navigator.clipboard.writeText(emailAddress.value).then(() => {
    showSuccesMessage.value = true
    setTimeout(() => {
      showSuccesMessage.value = false
    }, 2000)
  })
}
</script>

<template>
  <main class="f-col a-cent j-cent">
    <h1 class="mb3">Me Contacter</h1>
    <p class="larger-text text-a-cent mb1 prl2">Vous pouvez me contacter à cette adresse mail :</p>
    <a :href="'mailto:' + emailAddress" class="mb2">{{ emailAddress }}</a>
    <button @click="copyEmail" class="mb1">Copier l'adresse email</button>
    <p class="mb2">
      <strong class="text-succes">{{ showSuccesMessage ? 'Mail copié !' : '&nbsp;' }}</strong>
    </p>
    <ToolsboxFullSvg class="mb4" />
  </main>
</template>
