
<template>
  <nav
    class="sticky-navbar"
    :class="{
      'sticky-navbar--visible': isVisible,
      'sticky-navbar--sticky': isSticky,
      'sticky-navbar--mobile-open': isMobileMenuOpen
    }"
  >
    <div class="navbar-container">
      <div class="navbar-brand" @click="scrollToSection('#')">
        <span class="brand-text">何大新</span>
        <span class="brand-subtitle">个人介绍</span>
      </div>

      <ul class="navbar-menu">
        <li
          v-for="item in navItems"
          :key="item.id"
          class="navbar-item"
          :class="{ 'navbar-item--active': activeSection === item.id }"
          @click="scrollToSection(item.target)"
        >
          {{ item.label }}
          <span class="navbar-item-indicator"></span>
        </li>
      </ul>

      <button
        class="mobile-menu-btn"
        @click="toggleMobileMenu"
        :class="{ 'mobile-menu-btn--open': isMobileMenuOpen }"
        aria-label="切换菜单"
      >
        <span class="menu-line"></span>
        <span class="menu-line"></span>
        <span class="menu-line"></span>
      </button>
    </div>

    <div class="mobile-menu" :class="{ 'mobile-menu--open': isMobileMenuOpen }">
      <ul class="mobile-menu-list">
        <li
          v-for="item in navItems"
          :key="item.id"
          class="mobile-menu-item"
          :class="{ 'mobile-menu-item--active': activeSection === item.id }"
          @click="scrollToSection(item.target)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

interface NavItem {
  id: string
  label: string
  target: string
}

const navItems: NavItem[] = [
  { id: 'education', label: '教育经历', target: '#education' },
  { id: 'workExperience', label: '工作经历', target: '#workExperience' },
  { id: 'projectExperience', label: '项目经历', target: '#projectExperience' },
  { id: 'skills', label: '专业技能', target: '#skills' },
  { id: 'contact', label: '联系我', target: '#contact' },
]

const isSticky = ref(false)
const isVisible = ref(false)
const lastScrollY = ref(0)
const activeSection = ref('')
const isMobileMenuOpen = ref(false)
const isProgrammaticScroll = ref(false)
const navbarHeightCache = ref(70)
let programmaticScrollEndTime = 0

const SHOW_THRESHOLD = 100
const HIDE_THRESHOLD = 50
const SCROLL_DIRECTION_THRESHOLD = 5
const SCROLL_OFFSET = 16

const handleScroll = () => {
  if (isProgrammaticScroll.value) return

  const currentScrollY = window.scrollY
  const scrollDelta = currentScrollY - lastScrollY.value

  const isScrollingDown = scrollDelta > SCROLL_DIRECTION_THRESHOLD
  const isScrollingUp = scrollDelta < -SCROLL_DIRECTION_THRESHOLD

  if (currentScrollY > SHOW_THRESHOLD) {
    isVisible.value = true
    if (isScrollingDown) {
      isSticky.value = true
    } else if (isScrollingUp) {
      isSticky.value = false
    }
  } else if (currentScrollY < HIDE_THRESHOLD) {
    isVisible.value = false
    isSticky.value = false
  }

  lastScrollY.value = currentScrollY
  detectActiveSection()
}

const detectActiveSection = () => {
  if (isProgrammaticScroll.value) return
  if (Date.now() - programmaticScrollEndTime < 500) return

  const scrollY = window.scrollY
  const detectionLine = scrollY + navbarHeightCache.value + SCROLL_OFFSET + 2
  let matched = ''

  for (const item of navItems) {
    const el = document.getElementById(item.id)
    if (!el) continue
    const rect = el.getBoundingClientRect()
    const top = rect.top + scrollY
    const bottom = top + rect.height
    if (detectionLine >= top && detectionLine < bottom) {
      matched = item.id
      break
    }
  }

  if (!matched) {
    for (let i = navItems.length - 1; i >= 0; i--) {
      const el = document.getElementById(navItems[i].id)
      if (!el) continue
      const rect = el.getBoundingClientRect()
      const top = rect.top + scrollY
      if (detectionLine >= top) {
        matched = navItems[i].id
        break
      }
    }
  }

  if (matched) {
    activeSection.value = matched
  }
}

const updateNavbarHeight = () => {
  const navbar = document.querySelector('.sticky-navbar') as HTMLElement
  if (navbar) {
    navbarHeightCache.value = navbar.offsetHeight
  }
}

const waitForScrollEnd = (): Promise<void> => {
  return new Promise((resolve) => {
    let lastY = window.scrollY
    let stableFrames = 0
    const startTime = performance.now()

    const check = () => {
      const currentY = window.scrollY

      if (Math.abs(currentY - lastY) < 1) {
        stableFrames++
        if (stableFrames >= 10) {
          resolve()
          return
        }
      } else {
        stableFrames = 0
        lastY = currentY
      }

      if (performance.now() - startTime >= 2000) {
        resolve()
        return
      }

      requestAnimationFrame(check)
    }

    requestAnimationFrame(check)
  })
}

const scrollToSection = async (target: string) => {
  if (target === '#' || target === '') {
    isProgrammaticScroll.value = true
    window.__disableAosRefresh = true
    document.documentElement.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    document.documentElement.style.scrollBehavior = ''
    lastScrollY.value = 0
    isProgrammaticScroll.value = false
    activeSection.value = ''
    programmaticScrollEndTime = Date.now()
    window.__disableAosRefresh = false
    isMobileMenuOpen.value = false
    return
  }

  const elementId = target.replace('#', '')
  const element = document.getElementById(elementId)

  if (!element) {
    isMobileMenuOpen.value = false
    return
  }

  isProgrammaticScroll.value = true
  window.__disableAosRefresh = true
  updateNavbarHeight()

  element.style.scrollMarginTop = `${navbarHeightCache.value + SCROLL_OFFSET}px`
  element.scrollIntoView({ behavior: 'smooth', block: 'start' })

  await waitForScrollEnd()

  const rect = element.getBoundingClientRect()
  const expectedTop = navbarHeightCache.value + SCROLL_OFFSET
  const adjustment = rect.top - expectedTop
  if (adjustment !== 0) {
    document.documentElement.style.scrollBehavior = 'auto'
    window.scrollTo(0, Math.round(window.scrollY + adjustment))
    document.documentElement.style.scrollBehavior = ''
  }

  await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())))

  lastScrollY.value = window.scrollY
  activeSection.value = elementId
  programmaticScrollEndTime = Date.now()
  isProgrammaticScroll.value = false
  window.__disableAosRefresh = false
  window.dispatchEvent(new Event('scroll'))
  isMobileMenuOpen.value = false
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

let ticking = false
let resizeObserver: ResizeObserver | null = null

const throttledScrollHandler = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScroll()
      ticking = false
    })
    ticking = true
  }
}

onMounted(() => {
  nextTick(() => {
    updateNavbarHeight()
    window.addEventListener('scroll', throttledScrollHandler, { passive: true })
    handleScroll()
    resizeObserver = new ResizeObserver(() => {
      updateNavbarHeight()
    })
    resizeObserver.observe(document.body)
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', throttledScrollHandler)
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
})
</script>

<style scoped>
.sticky-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 16px 24px;
  background: rgba(15, 23, 42, 0);
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  border-bottom: 1px solid rgba(255, 255, 255, 0);
  transform: translateY(-100%);
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.sticky-navbar--visible {
  transform: translateY(0);
  opacity: 1;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sticky-navbar--sticky {
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-brand {
  display: flex;
  align-items: baseline;
  gap: 8px;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.navbar-brand:hover {
  opacity: 0.8;
}

.brand-text {
  font-size: 24px;
  font-weight: 700;
  color: #539dfd;
  letter-spacing: -0.5px;
}

.brand-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.navbar-menu {
  display: flex;
  align-items: center;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar-item {
  position: relative;
  padding: 10px 16px;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.navbar-item:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
}

.navbar-item--active {
  color: #539dfd;
  background: rgba(83, 157, 253, 0.1);
}

.navbar-item-indicator {
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 20px;
  height: 2px;
  background: #539dfd;
  border-radius: 2px;
  transition: transform 0.3s ease;
}

.navbar-item--active .navbar-item-indicator {
  transform: translateX(-50%) scaleX(1);
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
  gap: 6px;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.3s ease;
}

.mobile-menu-btn:hover {
  background: rgba(255, 255, 255, 0.05);
}

.menu-line {
  display: block;
  width: 24px;
  height: 2px;
  background: #fff;
  border-radius: 2px;
  transition: all 0.3s ease;
  transform-origin: center;
}

.mobile-menu-btn--open .menu-line:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.mobile-menu-btn--open .menu-line:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.mobile-menu-btn--open .menu-line:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-menu--open {
  max-height: 400px;
  opacity: 1;
}

.mobile-menu-list {
  list-style: none;
  margin: 0;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mobile-menu-item {
  padding: 14px 16px;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s ease;
  font-weight: 500;
  text-align: center;
}

.mobile-menu-item:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
}

.mobile-menu-item--active {
  color: #539dfd;
  background: rgba(83, 157, 253, 0.15);
}

@media (max-width: 768px) {
  .sticky-navbar {
    padding: 12px 16px;
  }

  .navbar-menu {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }

  .brand-text {
    font-size: 20px;
  }

  .brand-subtitle {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .sticky-navbar {
    padding: 10px 12px;
  }

  .brand-text {
    font-size: 18px;
  }

  .mobile-menu-list {
    padding: 12px 16px;
  }

  .mobile-menu-item {
    padding: 12px 14px;
    font-size: 15px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sticky-navbar,
  .navbar-item,
  .mobile-menu,
  .menu-line {
    transition: none;
  }
}
</style>
