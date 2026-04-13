<template>
  <div class="bg-light text-primary font-sans overflow-x-hidden">
    <!-- 导航栏 -->
    <Navbar />
    <!-- 英雄区域 -->
    <Hero />
    <!-- 关于我 -->
    <About />
    <!-- 工作经历 -->
    <Experience />
    <!-- 项目展示 -->
    <Projects />
    <!-- 我的作品 -->
    <Works />
    <!-- 联系我 -->
    <Contact />
    <!-- 页脚 -->
    <Footer />

    <!-- 回到顶部按钮 -->
    <transition name="fade">
      <button v-if="showBackToTop" @click="scrollToTop"
        class="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-secondary to-accent text-white rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 z-50 flex items-center justify-center group">
        <i class="i-fa-arrow-up text-xl group-hover:-translate-y-1 transition-transform duration-300"></i>
      </button>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Experience from './components/Experience.vue'
import Projects from './components/Projects.vue'
import Works from './components/Works.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'

const showBackToTop = ref(false)

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 500
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
