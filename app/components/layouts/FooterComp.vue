<template>
  <footer
    class="flex flex-col sm:flex-row space-y-5 sm:space-y-0 items-center justify-between bg-dark-primary px-0 sm:px-20 py-10 mt-10"
  >
    <div class="flex space-x-10">
      <a href="https://www.linkedin.com/in/rudy-dupuis/" target="_blank">
        <LinkedinLogoSvg class="fill-light hover:fill-secondary" />
      </a>
      <a href="https://github.com/RudyDupuis" target="_blank">
        <GithubLogoSvg class="fill-light hover:fill-secondary" />
      </a>
    </div>

    <p class="text-light text-sm">
      Copyright © {{ new Date().getFullYear() }} Rudy Dupuis
    </p>
  </footer>
</template>
