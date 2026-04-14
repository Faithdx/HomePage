<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  minFontSize?: number
  maxFontSize?: number
  startOffset?: number
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  minFontSize: 16,
  maxFontSize: 48,
  startOffset: 100,
  className: ''
})

const containerRef = ref<HTMLDivElement>()
const currentFontSize = ref(props.maxFontSize)
const currentTranslateY = ref(props.startOffset)
const currentOpacity = ref(0)

let rafId: number | null = null

const handleScroll = () => {
  if (!containerRef.value) return

  const rect = containerRef.value.getBoundingClientRect()
  const windowHeight = window.innerHeight
  const elementTop = rect.top
  const elementHeight = rect.height

  // 计算元素在视口中的位置比例
  const scrollProgress = 1 - (elementTop / (windowHeight + elementHeight))
  const clampedProgress = Math.max(0, Math.min(1, scrollProgress))

  // 字体大小：从 max 到 min
  currentFontSize.value = props.maxFontSize - (props.maxFontSize - props.minFontSize) * clampedProgress

  // 位移：从 startOffset 到 0
  currentTranslateY.value = props.startOffset * (1 - clampedProgress)

  // 透明度：0 -> 1 -> 1
  currentOpacity.value = clampedProgress < 0.3 ? clampedProgress / 0.3 : 1
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <div
    ref="containerRef"
    :class="['scroll-animated-heading', className]"
    :style="{
      fontSize: `${currentFontSize}px`,
      transform: `translateY(${currentTranslateY}px)`,
      opacity: currentOpacity,
      transformOrigin: 'center bottom',
      transition: 'font-size 0.1s ease-out, transform 0.1s ease-out, opacity 0.1s ease-out'
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.scroll-animated-heading {
  will-change: font-size, transform, opacity;
}
</style>
