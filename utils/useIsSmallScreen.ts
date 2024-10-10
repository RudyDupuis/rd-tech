import { onMounted, onUnmounted, ref } from 'vue'

const SMALL_SCREEN_SIZE_LIMIT = 768

export default function useIsSmallScreen() {
  const isSmallScreen = ref(false)

  const updateIsSmallScreen = () => {
    isSmallScreen.value = window.innerWidth <= SMALL_SCREEN_SIZE_LIMIT
  }

  onMounted(() => {
    window.addEventListener('resize', updateIsSmallScreen)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateIsSmallScreen)
  })

  return isSmallScreen
}
