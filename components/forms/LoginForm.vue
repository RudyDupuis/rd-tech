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
  <div class="flex flex-col items-center mb-40">
    <p class="text-false mb-20">Accès réservé exclusivement au personnel (moi)</p>
    <h3 class="medium-title mb-10">Connexion</h3>
    <div>
      <form @submit.prevent="handleSubmit">
        <input v-model="loginInfo.username" type="text" placeholder="Username" required />
        <input v-model="loginInfo.password" type="text" placeholder="Password" required />

        <button type="submit" class="button mt-10">Se connecter</button>
      </form>
      <p class="text-false text-center">{{ errorMessage }}</p>
    </div>
  </div>
</template>
