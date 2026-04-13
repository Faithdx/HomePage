<template>
  <section id="works" class="py-24 bg-gradient-to-b from-light to-white">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16" v-motion:initial="{ opacity: 0, y: 40 }"
        v-motion:enter="{ opacity: 1, y: 0, transition: { duration: 800, ease: [0.4, 0, 0.2, 1] } }">
        <h2 class="text-[clamp(1.5rem,3vw,2.5rem)] font-display font-bold mb-4">我的作品</h2>
        <div class="w-20 h-1 bg-gradient-to-r from-secondary to-accent mx-auto mb-6 rounded-full"></div>
        <p class="text-gray-600 max-w-2xl mx-auto text-base">
          探索我的创意作品集，展示我在不同领域的设计和开发能力
        </p>
      </div>

      <div class="relative max-w-7xl mx-auto" v-motion:initial="{ opacity: 0, y: 40 }"
        v-motion:enter="{ opacity: 1, y: 0, transition: { duration: 800, ease: [0.4, 0, 0.2, 1] } }">
        <div class="overflow-hidden rounded-2xl shadow-xl">
          <div class="flex transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1)"
            :style="{ transform: `translateX(-${currentIndex * slideWidth}%)` }" @touchstart="handleTouchStart"
            @touchmove="handleTouchMove" @touchend="handleTouchEnd">
            <div v-for="(work, index) in worksList" :key="index" class="min-w-full md:min-w-[33.333%] p-4">
              <div
                class="bg-white rounded-2xl overflow-hidden shadow-lg hover-scale h-full border border-gray-100 group">
                <div class="h-60 overflow-hidden relative">
                  <img :src="work.image" :alt="work.title"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-secondary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  </div>
                  <div
                    class="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <span class="text-white text-sm font-medium">点击查看详情</span>
                  </div>
                </div>
                <div class="p-8">
                  <h3 class="text-xl font-bold mb-3 group-hover:text-gradient transition-colors duration-300">{{
                    work.title }}</h3>
                  <p class="text-gray-600 mb-6 leading-relaxed text-sm">{{ work.description }}</p>
                  <a href="#" class="text-secondary font-semibold flex items-center group/link text-base">
                    查看详情
                    <i
                      class="i-fa-arrow-right ml-2 group-hover/link:translate-x-2 transition-transform duration-300"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 导航按钮 -->
        <button
          class="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-secondary hover:text-white transition-all duration-500 z-10 group hover:-translate-x-2 border border-gray-200"
          @click="prevSlide">
          <i class="i-fa-chevron-left text-xl group-hover:scale-110 transition-transform"></i>
        </button>
        <button
          class="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-secondary hover:text-white transition-all duration-500 z-10 group hover:translate-x-2 border border-gray-200"
          @click="nextSlide">
          <i class="i-fa-chevron-right text-xl group-hover:scale-110 transition-transform"></i>
        </button>

        <!-- 指示器 -->
        <div class="flex justify-center mt-8 space-x-3">
          <button v-for="(_, index) in indicatorsCount" :key="index" @click="goToSlide(index)" :class="['rounded-full transition-all duration-500',
            currentIndicator === index
              ? 'w-10 h-3 bg-gradient-to-r from-secondary to-accent shadow-lg'
              : 'w-3 h-3 bg-gray-300 hover:bg-secondary/70']">
          </button>
        </div>

        <!-- 自动播放进度条 -->
        <div class="max-w-md mx-auto mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div class="h-full bg-gradient-to-r from-secondary to-accent transition-all duration-100"
            :style="{ width: `${progressWidth}%` }"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const worksList = [
  {
    title: 'Web应用设计',
    description: '现代化的用户界面设计，注重用户体验和视觉美感',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20web%20application%20interface%20design%20warm%20colors&image_size=square'
  },
  {
    title: '移动应用界面',
    description: '简洁直观的移动应用界面，提供流畅的用户体验',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mobile%20app%20ui%20design%20minimalist%20warm%20colors&image_size=square'
  },
  {
    title: '数据可视化',
    description: '直观的数据可视化解决方案，帮助用户理解复杂数据',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=data%20visualization%20dashboard%20modern%20warm%20colors&image_size=square'
  },
  {
    title: '品牌设计',
    description: '为企业打造独特的品牌形象，包括标志、色彩系统和视觉识别',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=brand%20identity%20design%20warm%20colors&image_size=square'
  },
  {
    title: '响应式网站',
    description: '适配各种设备的响应式网站设计，提供一致的用户体验',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=responsive%20website%20design%20warm%20colors&image_size=square'
  },
  {
    title: 'UI组件库',
    description: '设计和开发可复用的UI组件库，提高开发效率和一致性',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ui%20kit%20design%20warm%20colors&image_size=square'
  }
]

const currentIndex = ref(0)
const slidesPerView = ref(1)
let autoSlideTimer = null
let progressTimer = null
const progressWidth = ref(0)
const AUTO_SLIDE_INTERVAL = 5000

// 触控相关
let touchStartX = 0
let touchEndX = 0

const slideWidth = computed(() => 100 / slidesPerView.value)
const indicatorsCount = computed(() => Math.ceil(worksList.length / slidesPerView.value))
const currentIndicator = computed(() => Math.floor(currentIndex.value / slidesPerView.value))

const nextSlide = () => {
  if (currentIndex.value < worksList.length - slidesPerView.value) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
  resetProgress()
}

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = worksList.length - slidesPerView.value
  }
  resetProgress()
}

const goToSlide = (index) => {
  currentIndex.value = index * slidesPerView.value
  resetProgress()
}

const handleResize = () => {
  slidesPerView.value = window.innerWidth >= 768 ? 3 : 1
  currentIndex.value = Math.min(currentIndex.value, worksList.length - slidesPerView.value)
}

// 触控事件处理
const handleTouchStart = (e) => {
  touchStartX = e.touches[0].clientX
  pauseAutoSlide()
}

const handleTouchMove = (e) => {
  touchEndX = e.touches[0].clientX
}

const handleTouchEnd = () => {
  const swipeThreshold = 50
  const diff = touchStartX - touchEndX

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextSlide()
    } else {
      prevSlide()
    }
  }

  startAutoSlide()
}

// 自动播放控制
const resetProgress = () => {
  progressWidth.value = 0
  if (progressTimer) clearInterval(progressTimer)
  progressTimer = setInterval(() => {
    progressWidth.value = Math.min(progressWidth.value + (100 / (AUTO_SLIDE_INTERVAL / 100)), 100)
  }, 100)
}

const pauseAutoSlide = () => {
  if (autoSlideTimer) clearInterval(autoSlideTimer)
  if (progressTimer) clearInterval(progressTimer)
}

const startAutoSlide = () => {
  resetProgress()
  autoSlideTimer = setInterval(nextSlide, AUTO_SLIDE_INTERVAL)
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
  startAutoSlide()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  pauseAutoSlide()
})

const revealConfig = {
  initial: { opacity: 0, y: 40 },
  enter: { opacity: 1, y: 0, transition: { duration: 800, ease: [0.4, 0, 0.2, 1] } }
}
</script>
