<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface SwiperItem {
  id: number
  src: string
  title: string
  url?: string
}

const swiperItems = ref<SwiperItem[]>([

  {
    id: 2,
    src: '/images/notePin客户端.png',
    title: 'NotePin 便笺应用 - 客户端',
    url: 'https://clipnote.com',
  },
  {
    id: 1,
    src: '/images/notePin-web.png',
    title: 'NotePin 便笺应用 - web 端官网',
    url: 'https://clipnotre.com',
  },
  {
    id: 3,
    src: '/images/个人主页.png',
    title: '个人主页 - web 网站',
    url: 'https://my.hedaxin.top',
  },
  {
    id: 4,
    src: '/images/托管登录.png',
    title: '智能教育 - 家长端',
    url: 'https://daxin.net',
  },

  {
    id: 6,
    src: '/images/notePin-web-3.png',
    title: '智能教育 - 管理后台',
    url: 'https://daxin.net',
  },
  {
    id: 7,
    src: '/images/智能简历.png',
    title: 'AI 智能简历',
    url: 'https://daxin.net',
  }, {
    id: 5,
    src: '/images/tuoguan-后台.png',
    title: '智能教育 - 用户端',
    url: 'https://daxin.net',
  },
])

const currentIndex = ref(2)
const isHovering = ref(false)
const containerRef = ref<HTMLDivElement>()
let autoPlayInterval: ReturnType<typeof setInterval> | null = null

// 复制数组以实现无缝滚动效果
const duplicatedItems = ref([...swiperItems.value, ...swiperItems.value])

const handlePrev = () => {
  currentIndex.value = currentIndex.value === 0 ? swiperItems.value.length - 1 : currentIndex.value - 1
}

const handleNext = () => {
  currentIndex.value = (currentIndex.value + 1) % swiperItems.value.length
}

const openUrl = (url?: string) => {
  if (url) window.open(url, '_blank')
}

// 自动播放
const startAutoPlay = () => {
  if (autoPlayInterval) clearInterval(autoPlayInterval)
  autoPlayInterval = setInterval(() => {
    if (!isHovering.value) {
      handleNext()
    }
  }, 3000)
}

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
    autoPlayInterval = null
  }
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<template>
  <div ref="containerRef" class="swiper-container">
    <h1 class="text-white text-3xl text-center relative top-32">我的作品 🥳</h1>

    <div class="banner" @mouseenter="isHovering = true" @mouseleave="isHovering = false">
      <div class="img-wrapper" :style="{
        transform: `translateX(-${currentIndex * (25 + 1.78)}vw)`,
        transition: isHovering ? 'none' : 'transform 0.5s ease',
      }">
        <div v-for="(item, index) in duplicatedItems" :key="`${item.id}-${index}`" class="img-box"
          @click="openUrl(item.url)">
          <div class="info">
            <h3>{{ item.title }}</h3>
          </div>
          <img :src="item.src" :alt="item.title" />
        </div>
      </div>
    </div>

    <div class="btn-group">
      <button class="last btn" @click="handlePrev">
        <svg class="icon left" viewBox="0 0 1024 1024" width="128" height="128">
          <path
            d="M862.485 481.154H234.126l203.3-203.3c12.497-12.497 12.497-32.758 0-45.255s-32.758-12.497-45.255 0L135.397 489.373c-12.497 12.497-12.497 32.758 0 45.254l256.774 256.775c6.249 6.248 14.438 9.372 22.627 9.372s16.379-3.124 22.627-9.372c12.497-12.497 12.497-32.759 0-45.255l-203.3-203.301h628.36c17.036 0 30.846-13.81 30.846-30.846s-13.81-30.846-30.846-30.846z" />
        </svg>
      </button>

      <button class="next btn" @click="handleNext">
        <svg class="icon right" viewBox="0 0 1024 1024" width="128" height="128">
          <path
            d="M862.485 481.154H234.126l203.3-203.3c12.497-12.497 12.497-32.758 0-45.255s-32.758-12.497-45.255 0L135.397 489.373c-12.497 12.497-12.497 32.758 0 45.254l256.774 256.775c6.249 6.248 14.438 9.372 22.627 9.372s16.379-3.124 22.627-9.372c12.497-12.497 12.497-32.759 0-45.255l-203.3-203.301h628.36c17.036 0 30.846-13.81 30.846-30.846s-13.81-30.846-30.846-30.846z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.swiper-container {
  --post-spacing: 1.78vw;
  --post-size: 25vw;
  --mask-size: 100vw;
  position: relative;
  width: 100vw;
  height: 100vh;
  font-size: 62.5%;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.swiper-container * {
  box-sizing: border-box;
}

.swiper-container .title {
  position: absolute;
  left: 50%;
  top: 5%;
  transform: translate(-50%, -5%);
  z-index: 10;
}

.swiper-container .title p {
  font-size: 4rem;
  font-weight: 800;
  white-space: nowrap;
  padding: 10px 20px;
  border-radius: 10px;
  margin: 0;
}

.swiper-container .banner {
  overflow: hidden;
  position: relative;
  width: 100vw;
  height: calc(var(--post-size) / 0.72);
  mask: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDQwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDE0NDAgNTAwIiBpZD0iaiI+CiAgPHBhdGggZmlsbD0icmdiKDIwMCwyMDAsMjAwKSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMCAwczI3NS4wNCAxMDAgNzIwIDEwMFMxNDQwIDAgMTQ0MCAwdjUwMHMtMjc1LjA0LTEwMC03MjAtMTAwUzAgNTAwIDAgNTAwVjB6Ii8+Cjwvc3ZnPgo=);
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: var(--mask-size);
  position: absolute;
  top: 10%;
  background-repeat: repeat;
  background-size: 300px 300px;
}

.swiper-container .img-wrapper {
  display: flex;
  position: absolute;
  width: max-content;
  height: calc(var(--post-size) / 0.72);
  transform: translate(13.39vw, 0);
}

.swiper-container .img-box {
  height: 100%;
  margin-right: var(--post-spacing);
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
}

.swiper-container .img-box .info {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: hsla(0, 0%, 9%, 0.5);
  text-align: center;
  color: #fff9f1;
  font-size: 2rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  margin: 0;
}

.swiper-container .img-box:hover .info {
  opacity: 1;
}

.swiper-container .img-box img {
  width: var(--post-size);
  height: 100%;
  object-position: center;
  object-fit: cover;
  display: block;
}

.swiper-container .btn-group {
  height: 15vh;
  position: absolute;
  left: 50%;
  bottom: 5%;
  transform: translate(-50%, -50%);
  transition: opacity 1s;
  opacity: 0;
  display: flex;
  z-index: 10;
}

.swiper-container .banner:hover~.btn-group,
.swiper-container .btn-group:hover {
  opacity: 1;
}

.swiper-container .btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid #171717;
  background-color: #fff;
  margin: 10px;
  cursor: pointer;
  transition: 0.4s;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.swiper-container .btn:hover {
  transform: scale(1.2);
  background-color: #000;
}

.swiper-container .btn:hover .icon {
  fill: #fff;
}

.swiper-container .icon {
  width: 30px;
  height: 30px;
}

.swiper-container .right {
  transform: rotate(180deg);
}
</style>
