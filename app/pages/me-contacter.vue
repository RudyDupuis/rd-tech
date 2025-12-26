<script setup lang="ts">
useHead({
  title: "Me contacter - Rudy Dupuis - Développeur Web et Web mobile",
  meta: [
    {
      name: "description",
      content:
        "Besoin d'un développeur Web et Web mobile passionné par l'UX pour réaliser votre projet numérique ? Je suis Rudy Dupuis, disponible pour échanger sur vos besoins en développement web."
    }
  ]
});

const emailAddress = ref<string>("dupuisrudypro@gmail.com");
const showSuccesMessage = ref<boolean>(false);

const copyEmail = () => {
  navigator.clipboard.writeText(emailAddress.value).then(() => {
    showSuccesMessage.value = true;
    setTimeout(() => {
      showSuccesMessage.value = false;
    }, 2000);
  });
};
</script>

<template>
  <main class="flex flex-col items-center justify-center px-10 space-y-10">
    <h1 class="large-title pt-20">Me Contacter</h1>
    <div class="flex flex-col items-center justify-center space-y-3">
      <p class="text-center">Vous pouvez me contacter à cette adresse mail :</p>
      <a :href="'mailto:' + emailAddress">{{ emailAddress }}</a>
    </div>
    <button class="button" @click="copyEmail">Copier l'adresse email</button>
    <p>
      <strong class="text-true">
        {{ showSuccesMessage ? "Mail copié !" : "&nbsp;" }}
      </strong>
    </p>
    <ToolsboxFullSvg />
  </main>
</template>
