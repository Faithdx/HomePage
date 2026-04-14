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
    { src: 'https://bu.dusays.com/2025/08/09/689624f3698af.jpg', alt: 'Image 14' },
    { src: 'https://bu.dusays.com/2025/08/09/6896247e7aaf6.jpg', alt: 'Image 13' },
    { src: 'https://bu.dusays.com/2025/08/09/689623fe118af.jpg', alt: 'Image 2' },
    { src: 'https://bu.dusays.com/2025/08/09/6896246086c01.jpg', alt: 'Image 6' },
    { src: 'https://bu.dusays.com/2025/08/09/689624cac990f.jpg', alt: 'Image 11' },
    { src: 'https://bu.dusays.com/2025/08/09/6896247f92f1f.jpg', alt: 'Image 10' },
    { src: 'https://bu.dusays.com/2025/08/09/689624d0475a5.jpg', alt: 'Image 12' },
    { src: 'https://bu.dusays.com/2025/08/09/6896240e1153a.jpg', alt: 'Image 9' },
    { src: 'https://bu.dusays.com/2025/08/09/689624670f0f7.jpg', alt: 'Image 8' },
    { src: 'https://bu.dusays.com/2025/08/09/6896246546c88.jpg', alt: 'Image 7' },
    { src: 'https://bu.dusays.com/2025/08/09/689624592b4bf.jpg', alt: 'Image 5' },
    { src: 'https://bu.dusays.com/2025/08/09/6896245875d65.jpg', alt: 'Image 4' },
    { src: 'https://bu.dusays.com/2025/08/09/68962457e423c.jpg', alt: 'Image 3' },
    { src: 'https://bu.dusays.com/2025/08/09/689623fc681f2.jpg', alt: 'Image 1' },
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

<template>
  <div
    class="relative overflow-hidden py-8"
    @mouseenter="isPaused = true"
    @mouseleave="isPaused = false"
  >
    <div
      ref="stripRef"
      class="flex gap-6 whitespace-nowrap"
      style="will-change: transform"
    >
      <div
        v-for="(image, index) in galleryImages"
        :key="index"
        class="w-[650px] rounded-lg overflow-hidden shadow-xl flex-shrink-0"
      >
        <img
          :src="image.src"
          :alt="image.alt"
          class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>
  </div>
</template>
