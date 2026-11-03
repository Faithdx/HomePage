<template>
  <div class="relative overflow-hidden py-8" @mouseenter="isPaused = true" @mouseleave="isPaused = false">
    <div ref="stripRef" class="flex gap-6 whitespace-nowrap" style="will-change: transform">
      <div v-for="(image, index) in galleryImages" :key="index"
        class="w-[650px] rounded-lg overflow-hidden shadow-xl flex-shrink-0">
        <img :src="image.src" :alt="image.alt"
          class="w-full h-90 object-cover hover:scale-105 transition-transform duration-500" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface ImageData {
  src: string
  alt: string
}

interface Props {
  images?: ImageData[]
  scrollSpeed?: number
}

const props = withDefaults(defineProps<Props>(), {
  scrollSpeed: 2,
  images: () => [
    { src: '/images/flownote-hero.png', alt: 'FlowNote 官网首页' },
    { src: '/images/flownote-features.png', alt: 'FlowNote 核心功能' },
    { src: '/images/flownote-todo.png', alt: 'FlowNote 待办工作流' },
    { src: '/images/flownote-ai.png', alt: 'FlowNote AI 能力' },
    { src: '/images/flownote-editor.png', alt: 'FlowNote 块编辑器' },
    { src: '/images/flownote-mindmap.png', alt: 'FlowNote 思维导图' },
    { src: '/images/flownote-share.png', alt: 'FlowNote 在线分享' },
    { src: '/images/flownote-pricing.png', alt: 'FlowNote 价格方案' },
    { src: '/images/flownote-download.png', alt: 'FlowNote 多端下载' },
  ]
})

const isPaused = ref(false)
const stripRef = ref<HTMLDivElement>()
const position = ref(0)
const singleLoopWidth = ref(0)

// 复制一份图片用于无缝滚动的视觉效果
const galleryImages = [...props.images, ...props.images]

let animationFrameId: number | null = null

onMounted(() => {
  const strip = stripRef.value
  if (!strip) return

  // 计算单组图片的总宽度
  const firstImage = strip.querySelector('img')
  if (firstImage) {
    const imageWidth = firstImage.offsetWidth
    const gap = 24 // 与CSS中的gap-6对应（6*4px=24px）
    singleLoopWidth.value = props.images.length * (imageWidth + gap)
  }

  const animate = () => {
    if (!isPaused.value) {
      position.value -= props.scrollSpeed

      // 使用取模运算实现无缝滚动
      if (singleLoopWidth.value > 0) {
        // 确保position始终为负值，便于取模运算
        position.value = position.value % singleLoopWidth.value
        if (position.value > 0) {
          position.value -= singleLoopWidth.value
        }
      }

      strip.style.transform = `translateX(${position.value}px)`
    }
    animationFrameId = requestAnimationFrame(animate)
  }

  animate()
})

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>