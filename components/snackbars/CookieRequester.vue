<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { isNotNull } from '~/utils/type/TypeGuard'

// eslint-disable-next-line
const { initialize } = useGtag()

const hasConsent = ref<boolean>(false)
const isDefinedConsent = ref<boolean>(false)

const enableAnalytics = () => {
  if (!hasConsent.value) return
  initialize()
}

const acceptCookies = () => {
  localStorage.setItem('cookieConsent', 'accepted')
  enableAnalytics()
  isDefinedConsent.value = true
}

const refuseCookies = () => {
  localStorage.setItem('cookieConsent', 'refused')
  isDefinedConsent.value = true
}

onMounted(() => {
  isDefinedConsent.value = isNotNull(localStorage.getItem('cookieConsent'))
  if (isDefinedConsent.value) {
    hasConsent.value = localStorage.getItem('cookieConsent') === 'accepted'
  }
  enableAnalytics()
})
</script>

<template>
  <div
    v-if="!isDefinedConsent"
    class="fixed bottom-4 right-4 bg-primary text-light p-4 rounded shadow-lg mx-6"
  >
    Des cookies sont utilisés par Google Analitycs pour mesurer le trafic.
    <button class="ml-4 underline" @click="acceptCookies">Accepter</button>
    <button class="ml-4 underline" @click="refuseCookies">Refuser</button>
  </div>
</template>
