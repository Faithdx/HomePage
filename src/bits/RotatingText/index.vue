<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  texts: string[]
  interval?: number
  mainClassName?: string
  staggerDuration?: number
}

const props = withDefaults(defineProps<Props>(), {
  interval: 2000,
  mainClassName: '',
  staggerDuration: 0.03
})

const currentIndex = ref(0)
const isAnimatingOut = ref(false)
const isAnimatingIn = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

const nextText = () => {
  if (isAnimatingOut.value || isAnimatingIn.value) return
  
  isAnimatingOut.value = true
  
  setTimeout(() => {
    currentIndex.value = (currentIndex.value + 1) % props.texts.length
    isAnimatingOut.value = false
    isAnimatingIn.value = true
    
    setTimeout(() => {
      isAnimatingIn.value = false
    }, 400)
  }, 300)
}

onMounted(() => {
  timer = setInterval(nextText, props.interval)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const getCharStyle = (charIndex: number) => {
  const delay = charIndex * props.staggerDuration
  return {
    transitionDelay: `${delay}s`,
    display: 'inline-block'
  }
}
</script>

<template>
  <span :class="['flex flex-wrap whitespace-pre-wrap relative', mainClassName]">
    <span class="sr-only">{{ texts[currentIndex] }}</span>
    <span 
      class="flex flex-wrap whitespace-pre-wrap relative"
      aria-hidden="true"
    >
      <span
        v-for="(char, charIndex) in texts[currentIndex].split('')"
        :key="charIndex"
        :style="getCharStyle(charIndex)"
        class="inline-block transition-all duration-300"
        :class="{
          'translate-y-full opacity-0': isAnimatingOut,
          '-translate-y-full opacity-0': isAnimatingIn && !isAnimatingOut,
          'translate-y-0 opacity-100': !isAnimatingOut && !isAnimatingIn
        }"
      >
        {{ char === ' ' ? '\u00A0' : char }}
      </span>
    </span>
  </span>
</template>
