<script setup lang="ts">
import { onMounted } from 'vue'
import Header from './components/Header/index.vue'
import Swiper from './components/Swiper/index.vue'
import Info from './components/Info/index.vue'
import StickyNavbar from './components/StickyNavbar/index.vue'

onMounted(() => {
  // 检查是否为移动端设备
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }

  if (isMobile()) {
    document.body.innerHTML =
      '<div style="padding: 20px; text-align: center; font-size: 18px; color:#fff">此网站仅支持电脑端访问，请使用电脑浏览器打开。</div>'
  }
})
</script>

<template>
  <StickyNavbar />
  <Header />
  <Swiper />
  <Info />
</template>
