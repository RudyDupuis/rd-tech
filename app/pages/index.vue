<script setup lang="ts">
useHead({
  title: "Accueil - Rudy Dupuis - Développeur Web et Web mobile",
  meta: [
    {
      name: "description",
      content:
        "Je suis Rudy Dupuis, un développeur Web et Web mobile passionné par l'UX. J'ai fusionné ma passion pour le bricolage et le numérique dans la conception de ce site. Découvrez mon parcours et mes compétences. Contactez-moi pour discuter de votre projet numérique."
    }
  ]
});

const isSmallScreen = useIsSmallScreen();
</script>

<template>
  <main>
    <section
      id="hero-banner"
      class="flex min-h-screen items-center justify-evenly"
    >
      <template v-if="isDefined(isSmallScreen)">
        <div class="flex flex-col items-center justify-around space-y-10">
          <h1 class="large-title">Rudy Dupuis</h1>
          <p>Concepteur développeur d'applications</p>
          <ToolsboxAnimComp v-if="isSmallScreen" />
          <a href="#presentation" class="button">Découvrir mon profil</a>
        </div>
        <ToolsboxAnimComp v-if="!isSmallScreen" />
      </template>
      <div
        v-else
        class="loader border-4 border-t-4 border-t-light border-primary rounded-full w-10 h-10 mx-auto animate-spin"
      />
    </section>

    <section
      v-if="isDefined(isSmallScreen)"
      id="presentation"
      class="flex items-center justify-evenly pb-20 md:px-20 md:space-x-10"
    >
      <img
        v-if="!isSmallScreen"
        src="/images/rudy-picture.svg"
        alt="Une photo de rudy dupuis"
        class="select-none"
      >
      <div class="flex flex-col items-center space-y-20">
        <h2 class="medium-title">Qui suis je ?</h2>
        <img
          v-if="isSmallScreen"
          src="/images/rudy-picture.svg"
          alt="Une photo de rudy dupuis"
          style="width: 250px; height: 250px"
          class="select-none"
        >
        <p class="px-10 md:px-0 max-w-screen-md">
          Passionné par le bricolage et le numérique, j&apos;ai fusionné ces
          deux univers dans la conception de ce site. Tout comme le bricolage
          nécessite l&apos;utilisation d&apos;outils, je donne vie à des
          concepts numériques à l&apos;aide des langages de programmation et des
          logiciels.
          <br >
          <br >
          Je suis
          <strong>développeur d'applications</strong>
          avec une appétence pour l&apos;
          <strong>UX design</strong>
          , impliqué dans toutes les étapes du processus, de la
          <strong>conception graphique</strong>
          , au
          <strong>développement</strong>
          , jusqu&apos;au
          <strong>déploiement.</strong>
          <br >
          <br >
          Contactez moi pour discuter de vos besoins en développement
          informatique. Ensemble, nous réaliserons votre projet numérique.
        </p>
        <router-link :to="{ name: 'me-contacter' }" class="button">
          Me contacter
        </router-link>
      </div>
    </section>
  </main>
</template>
