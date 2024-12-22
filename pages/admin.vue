<script setup lang="ts">
import { isNotNull } from '~/utils/types/TypeGuard'
import { onMounted, ref } from 'vue'
import { ApiMethods } from '~/utils/api/ApiMethods'

const api = new ApiMethods()
const hasToken = ref<boolean>(false)
const display = ref<'skills' | 'experiences' | 'saves'>('skills')

function addToken() {
  hasToken.value = true
}

onMounted(() => {
  hasToken.value = isNotNull(localStorage.getItem('authToken'))

  if (hasToken.value) {
    api.getData('auth/try-token').catch(() => {
      localStorage.removeItem('authToken')
      hasToken.value = false
    })
  }
})
</script>

<template>
  <h1 class="large-title mt-40 mb-20">Administration</h1>
  <LoginForm v-if="!hasToken" :add-token="addToken" />
  <template v-else>
    <div
      class="flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 lg:space-x-4"
    >
      <button
        class="choice-button"
        @click="display = 'skills'"
        :class="{
          'choice-button--active': display === 'skills'
        }"
      >
        Compétences
      </button>
      <button
        class="choice-button"
        @click="display = 'experiences'"
        :class="{
          'choice-button--active': display === 'experiences'
        }"
      >
        Expériences
      </button>
      <button
        class="choice-button"
        @click="display = 'saves'"
        :class="{
          'choice-button--active': display === 'saves'
        }"
      >
        Sauvegardes
      </button>
    </div>
    <SkillsManager v-if="display === 'skills'" />
    <ExperiencesManager v-if="display === 'experiences'" />
    <BackupManager v-if="display === 'saves'" />
  </template>
</template>
