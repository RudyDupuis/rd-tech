<script setup lang="ts">
const route = useRoute();
const isSmallScreen = useIsSmallScreen();
</script>

<template>
  <header
    class="flex items-center justify-between px-10 md:px-20 py-5 fixed top-0 left-0 w-screen bg-light z-50"
  >
    <NuxtLink to="/">
      <LogoSvg class="fill-primary hover:fill-secondary" />
    </NuxtLink>
    <nav>
      <ul v-if="isDefined(isSmallScreen)" class="flex space-x-5">
        <li>
          <NuxtLink
            to="/mon-parcours"
            class="font-primary-medium"
            :class="{ 'is-current-page': route.path === '/mon-parcours' }"
          >
            {{ isSmallScreen ? "Parcours" : "Mon parcours" }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/me-contacter"
            class="font-primary-medium"
            :class="{ 'is-current-page': route.path === '/me-contacter' }"
          >
            {{ isSmallScreen ? "Contact" : "Me contacter" }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
@reference "~/assets/css/main.css";
.is-current-page {
  @apply cursor-default underline;

  &:hover {
    @apply text-dark;
  }
}
</style>
