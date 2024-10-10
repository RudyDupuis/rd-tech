<template>
  <footer class="f a-cent j-betw bg-primary prl4 ptb2">
    <div>
      <a href="https://www.linkedin.com/in/rudy-dupuis/" target="_blank" class="svg-link">
        <LinkedinLogoSvg />
      </a>
      <a href="https://github.com/RudyDupuis" target="_blank" class="svg-link ml2">
        <GithubLogoSvg />
      </a>
    </div>
    <p>Copyright © {{ new Date().getFullYear() }} Rudy Dupuis</p>
  </footer>
</template>

<style scoped lang="scss">
footer {
  @media (max-width: 650px) {
    flex-direction: column;
    padding: 32px 0;

    p {
      margin-top: 32px;
    }
  }
}
</style>
