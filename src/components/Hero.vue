<template>
  <header class="min-h-screen flex items-center relative overflow-hidden pt-20">
    <!-- 背景渐变和浮动装饰 -->
    <div class="absolute inset-0 z-0">
      <div class="absolute inset-0 bg-gradient-to-br from-secondary/10 via-light to-accent/5"></div>
      <div class="absolute top-20 left-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed"></div>
      <div class="absolute top-1/2 left-1/4 w-32 h-32 bg-secondary/5 rounded-full blur-2xl animate-bounce-slow"></div>
      <div class="absolute top-1/3 right-1/3 w-24 h-24 bg-accent/5 rounded-full blur-2xl animate-float"></div>
    </div>

    <div class="container mx-auto px-6 z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div class="order-2 lg:order-1">
          <div v-motion:initial="{ opacity: 0, y: 40 }"
            v-motion:enter="{ opacity: 1, y: 0, transition: { duration: 1000, ease: [0.4, 0, 0.2, 1] } }">
            <h1 class="text-[clamp(2.5rem,6vw,4.5rem)] font-display font-bold mb-6 leading-tight text-shadow-soft">
              你好啊！<span class="inline-block animate-bounce-slow">👋</span>
            </h1>
          </div>
          <div v-motion:initial="{ opacity: 0, y: 40 }"
            v-motion:enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200, ease: [0.4, 0, 0.2, 1] } }">
            <div class="text-[clamp(1rem,2vw,1.4rem)] text-gray-600 mb-8 leading-relaxed">
              <p class="mb-4">欢迎访问我的个人网站！在这里你可以看到我的教育背景，工作经历，个人技能，以及一些项目经验。</p>
              <p class="mb-4">推门进来吧，此处永远备着一份舍不得褪去的热忱和未写完的下一行<span class="text-secondary font-semibold">{{ displayedText
                  }}</span><span class="inline-block w-2 h-6 bg-secondary align-middle ml-1 animate-pulse"></span></p>
            </div>
          </div>
          <div v-motion:initial="{ opacity: 0, y: 40 }"
            v-motion:enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 400, ease: [0.4, 0, 0.2, 1] } }">
            <div class="flex flex-col sm:flex-row gap-4">
              <a href="#projects"
                class="group px-10 py-4 bg-gradient-to-r from-secondary to-accent text-white rounded-full font-medium hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 shadow-xl flex items-center justify-center gap-2">
                查看我的项目
                <i class="i-fa-arrow-right group-hover:translate-x-2 transition-transform duration-300"></i>
              </a>
              <a href="#contact"
                class="group px-10 py-4 border-2 border-primary rounded-full font-medium hover:bg-primary hover:text-white transition-all duration-500 hover:-translate-y-2 flex items-center justify-center gap-2">
                联系我
                <i class="i-fa-envelope-o group-hover:-translate-y-1 transition-transform duration-300"></i>
              </a>
            </div>
          </div>

          <!-- 社交链接 -->
          <div v-motion:initial="{ opacity: 0, y: 40 }"
            v-motion:enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 600, ease: [0.4, 0, 0.2, 1] } }"
            class="mt-12 flex items-center gap-4">
            <span class="text-gray-500 text-sm">关注我</span>
            <div class="h-px w-12 bg-gray-300"></div>
            <a href="#"
              class="w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center hover:bg-secondary hover:text-white hover:-translate-y-1 transition-all duration-300 group">
              <i class="i-fa-github text-lg group-hover:scale-110 transition-transform"></i>
            </a>
            <a href="#"
              class="w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center hover:bg-secondary hover:text-white hover:-translate-y-1 transition-all duration-300 group">
              <i class="i-fa-linkedin text-lg group-hover:scale-110 transition-transform"></i>
            </a>
            <a href="#"
              class="w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center hover:bg-secondary hover:text-white hover:-translate-y-1 transition-all duration-300 group">
              <i class="i-fa-twitter text-lg group-hover:scale-110 transition-transform"></i>
            </a>
          </div>
        </div>

        <div class="order-1 lg:order-2" v-motion:initial="{ opacity: 0, x: 40 }"
          v-motion:enter="{ opacity: 1, x: 0, transition: { duration: 1000, ease: [0.4, 0, 0.2, 1] } }">
          <div class="relative group">
            <!-- 浮动装饰元素 -->
            <div
              class="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-2xl blur-xl group-hover:scale-125 transition-transform duration-700 animate-float">
            </div>
            <div
              class="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-2xl blur-xl group-hover:scale-125 transition-transform duration-700 animate-float-delayed">
            </div>
            <div
              class="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-secondary/15 to-accent/15 rounded-full blur-lg group-hover:scale-110 transition-transform duration-500 animate-bounce-slow">
            </div>

            <div class="relative overflow-hidden rounded-3xl shadow-2xl">
              <div
                class="absolute inset-0 bg-gradient-to-tr from-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
              </div>
              <img
                src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimalist%20line%20art%20illustration%20of%20a%20person%20with%20a%20dog%2C%20simple%20black%20and%20white%20drawing%2C%20clean%20lines%2C%20whimsical%20style&image_size=portrait_4_3"
                alt="人物插画" class="w-full h-auto group-hover:scale-105 transition-transform duration-700">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 向下滚动提示 -->
    <div class="absolute bottom-12 left-1/2 transform -translate-x-1/2">
      <a href="#about"
        class="flex flex-col items-center gap-2 text-gray-500 hover:text-secondary transition-all duration-300 group">
        <span class="text-sm font-medium group-hover:-translate-y-1 transition-transform duration-300">向下滚动</span>
        <div
          class="w-8 h-12 border-2 border-gray-400 rounded-full flex justify-center p-2 group-hover:border-secondary transition-colors duration-300">
          <div
            class="w-1.5 h-3 bg-gray-400 rounded-full animate-bounce group-hover:bg-secondary transition-colors duration-300">
          </div>
        </div>
      </a>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const displayedText = ref('')
const texts = ['代码', '故事', '梦想', '旅程']
let textIndex = 0
let charIndex = 0
let isDeleting = false
let timer = null

const typingSpeed = 150
const deletingSpeed = 100
const pauseTime = 2000

const typeWriter = () => {
  const currentText = texts[textIndex]

  if (isDeleting) {
    displayedText.value = currentText.substring(0, charIndex - 1)
    charIndex--
  } else {
    displayedText.value = currentText.substring(0, charIndex + 1)
    charIndex++
  }

  let speed = isDeleting ? deletingSpeed : typingSpeed

  if (!isDeleting && charIndex === currentText.length) {
    speed = pauseTime
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    textIndex = (textIndex + 1) % texts.length
    speed = 500
  }

  timer = setTimeout(typeWriter, speed)
}

onMounted(() => {
  typeWriter()
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})
</script>
