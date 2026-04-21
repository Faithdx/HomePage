<template>
  <div class="relative w-full h-screen text-white overflow-hidden">
    <LightRays rays-origin="top-center" rays-color="#fff" :light-spread="2" />

    <div class="absolute top-[30%] left-[50%] translate-x-[-50%] z-50 w-full max-w-6xl px-4">
      <div data-aos="fade-up" data-aos-duration="1500">
        <div class="flex items-center justify-between">
          <div class="w-[50%]">
            <div class="text-[50px] font-semibold mb-6">👋 Hello, 我叫何大新</div>

            <div class="flex items-center space-x-3 mb-6">
              <p class="text-2xl">我是一名 93 年的</p>

              <RotatingText
                :texts="['前端工程师', '.NET工程师', '全栈工程师']"
                main-class-name="px-2 sm:px-2 md:px-3 bg-[#539dfd] text-white text-2xl overflow-hidden py-0.5 sm:py-1 justify-center rounded-lg"
              />
            </div>

            <div class="text-xl text-gray-400">
              <SplitText text="目前正在全栈工程师的路上，不断探索中..." />
            </div>

            <div class="flex space-x-4 mt-8">
              <a
                href="https://hedaxin.top"
                target="_blank"
                class="px-6 py-2 no-underline bg-[#539dfd] text-white rounded-full hover:bg-[#3a86f5] cursor-pointer"
              >
                个人博客
              </a>

              <a
                href="https://github.com/Faithdx"
                target="_blank"
                class="px-6 py-2 no-underline border-solid border-gray-800 hover:border-cyan-500/50 cursor-pointer rounded-full text-white "
              >
                GitHub
              </a>
            </div>
          </div>

          <div>
            <img
              src="https://q.qlogo.cn/g?b=qq&nk=3311118881&s=640"
              alt=""
              class="w-[300px] h-[300px] rounded-full mr-12 shadow-[5px_11px_30px_20px_rgba(255,255,255,0.1)]"
            />
          </div>
        </div>
      </div>
    </div>

    <div
      class="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center text-white cursor-pointer animate-bounce"
      @click="scrollToNext"
    >
      <div class="flex items-center justify-center space-x-3 hover:text-primary transition-colors">
        <span class="mb-2 transition-colors">继续了解</span>

        <svg class="w-6 h-6 mt-[-5px] animate-pulse transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LightRays from '@/bits/LightRays/index.vue'
import SplitText from '@/bits/SplitText/index.vue'
import RotatingText from '@/bits/RotatingText/index.vue'

const scrollToNext = () => {
  window.scrollTo({
    top: window.innerHeight,
    behavior: 'smooth'
  })
}
</script>