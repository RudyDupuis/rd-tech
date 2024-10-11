<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import useIsSmallScreen from '~/utils/helpers/useIsSmallScreen'

const route = useRoute()
const isSmallScreen = useIsSmallScreen()
</script>

<template>
  <header
    class="flex items-center justify-between px-10 md:px-20 py-5 fixed top-0 left-0 w-screen bg-light z-50"
  >
    <router-link to="/">
      <LogoSvg class="fill-primary hover:fill-secondary" />
    </router-link>
    <nav>
      <ul class="flex space-x-5">
        <li>
          <router-link
            :to="{ name: 'mon-parcours' }"
            class="font-primary_medium"
            :class="{ 'is-current-page': route.path === '/mon-parcours' }"
          >
            {{ isSmallScreen ? 'Parcours' : 'Mon parcours' }}
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'me-contacter' }"
            class="font-primary_medium"
            :class="{ 'is-current-page': route.path === '/me-contacter' }"
          >
            {{ isSmallScreen ? 'Contact' : 'Me contacter' }}
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
