<template>
  <nav :class="navClasses" class="fixed top-0 left-0 w-full z-50 transition-all duration-500">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <a href="#"
        class="text-2xl font-display font-bold text-gradient text-shadow-soft hover:scale-105 transition-transform duration-300">Portfolio</a>
      <div class="hidden md:flex items-center space-x-1">
        <a v-for="item in navItems" :key="item.href" :href="item.href"
          :class="['px-4 py-2 font-medium transition-all duration-300 rounded-full',
            activeSection === item.href.slice(1) ? 'text-secondary bg-secondary/10' : 'text-gray-700 hover:text-secondary hover:bg-secondary/5']" @click="handleNavClick">
          {{ item.text }}
        </a>
        <a href="#contact"
          class="px-5 py-2 font-medium bg-gradient-to-r from-secondary to-accent text-white rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ml-2">联系我</a>
      </div>
      <button class="md:hidden text-2xl hover:text-secondary transition-colors duration-300" @click="toggleMobileMenu">
        <i :class="mobileMenuOpen ? 'i-fa-times' : 'i-fa-bars'"></i>
      </button>
    </div>
    <!-- 移动端菜单 -->
    <transition name="slide-down">
      <div v-if="mobileMenuOpen"
        class="md:hidden bg-glass-dark text-white absolute w-full left-0 top-full py-4 px-4 shadow-xl">
        <div class="flex flex-col space-y-2">
          <a v-for="item in navItems" :key="item.href" :href="item.href"
            :class="['px-4 py-3 font-medium transition-colors duration-300 rounded-lg',
              activeSection === item.href.slice(1) ? 'text-secondary bg-secondary/10' : 'hover:text-accent hover:bg-white/5']" @click="closeMobileMenu">
            {{ item.text }}
          </a>
          <a href="#contact" @click="closeMobileMenu"
            class="px-4 py-3 font-medium bg-gradient-to-r from-secondary to-accent rounded-lg hover:shadow-lg transition-colors duration-300">联系我</a>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const mobileMenuOpen = ref(false)
const scrolled = ref(false)
const activeSection = ref('hero')

const navItems = [
  { href: '#about', text: '关于我' },
  { href: '#experience', text: '工作经历' },
  { href: '#projects', text: '项目展示' },
  { href: '#works', text: '我的作品' }
]

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const handleNavClick = (e) => {
  // 平滑滚动
  e.preventDefault()
  const href = e.currentTarget.getAttribute('href')
  const target = document.querySelector(href)
  if (target) {
    const offsetTop = target.offsetTop - 80
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    })
  }
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 50

  // 检测当前活跃的区段
  const sections = ['hero', 'about', 'experience', 'projects', 'works', 'contact']
  let currentSection = 'hero'

  for (const section of sections) {
    const element = document.getElementById(section)
    if (element) {
      const rect = element.getBoundingClientRect()
      if (rect.top <= 150 && rect.bottom >= 150) {
        currentSection = section
        break
      }
    }
  }

  activeSection.value = currentSection
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // 初始化检测
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const navClasses = computed(() => ({
  'bg-glass shadow-lg': scrolled.value,
  'py-5': !scrolled.value,
  'py-3': scrolled.value
}))
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
