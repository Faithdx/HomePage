<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  text: string
  className?: string
  delay?: number
  duration?: number
  ease?: string
  splitType?: 'chars' | 'words' | 'lines'
  trigger?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  delay: 0.05,
  duration: 0.6,
  ease: 'power3.out',
  splitType: 'chars',
  trigger: true
})

const containerRef = ref<HTMLParagraphElement>()
let triggers: ScrollTrigger[] = []

onMounted(() => {
  if (!containerRef.value || !props.trigger) return

  const el = containerRef.value
  const text = props.text

  // 根据分割类型处理文本
  let elements: HTMLElement[] = []

  if (props.splitType === 'chars') {
    // 分割为字符
    const chars = text.split('')
    el.innerHTML = chars.map((char) =>
      `<span class="split-char inline-block" style="opacity: 0; transform: translateY(40px)">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('')
    elements = Array.from(el.querySelectorAll('.split-char'))
  } else if (props.splitType === 'words') {
    // 分割为单词
    const words = text.split(' ')
    el.innerHTML = words.map((word) =>
      `<span class="split-word inline-block mr-2" style="opacity: 0; transform: translateY(40px)">${word}</span>`
    ).join('')
    elements = Array.from(el.querySelectorAll('.split-word'))
  } else {
    // 整行
    el.innerHTML = `<span class="split-line inline-block" style="opacity: 0; transform: translateY(40px)">${text}</span>`
    elements = Array.from(el.querySelectorAll('.split-line'))
  }

  // 创建 GSAP 动画
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: el,
      start: 'top 80%',
      toggleActions: 'play none none none',
      once: true,
      onToggle: (self) => {
        if (self.isActive) triggers.push(self)
      }
    }
  })

  tl.to(elements, {
    opacity: 1,
    y: 0,
    duration: props.duration,
    ease: props.ease,
    stagger: props.delay,
    onComplete: () => {
      gsap.set(elements, { clearProps: 'all' })
    }
  })
})

onUnmounted(() => {
  triggers.forEach(st => st.kill())
  triggers = []
})
</script>

<template>
  <p
    ref="containerRef"
    :class="['split-parent overflow-hidden inline-block whitespace-normal', className]"
  >
    {{ !trigger ? text : '' }}
  </p>
</template>
