<script setup lang="ts">
import { ApiMethods } from '~/utils/api/ApiMethods'
import { ref } from 'vue'

interface Props {
  addToken(): void
}

const props = defineProps<Props>()

const api = new ApiMethods()

const loginInfo = ref({
  username: '',
  password: ''
})
const errorMessage = ref<string | undefined>(undefined)

async function handleSubmit() {
  try {
    const response = await api.postData('auth', loginInfo.value)

    if (response.message) {
      errorMessage.value = response.message
    }

    if (response.token) {
      localStorage.setItem('authToken', response.token)
      props.addToken()
    }
  } catch {
    errorMessage.value = 'Une erreur inattendue est apparue.'
  }
}
</script>

<template>
  <div class="f-col a-cent mb4">
    <p class="larger-text text-a-cent text-error mb4">
      Accès réservé exclusivement au personnel (moi)
    </p>
    <h3 class="mb2">Connexion</h3>
    <div class="mb4">
      <form @submit.prevent="handleSubmit" class="mb1">
        <input v-model="loginInfo.username" type="text" placeholder="Username" required />
        <input v-model="loginInfo.password" type="text" placeholder="Password" required />

        <button type="submit">Se connecter</button>
      </form>
      <p class="text-error text-a-cent">{{ errorMessage }}</p>
    </div>
  </div>
</template>
