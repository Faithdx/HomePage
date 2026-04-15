<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, type Ref } from 'vue'

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
const isScrolling = ref(false)
const scrollCompleted = ref(false)
const scrollTimeout: Ref<number | null> = ref(null)
const scrollCompleteTimeout: Ref<number | null> = ref(null)

// 配置常量 - 优化后的阈值
const SHOW_THRESHOLD = 100 // 显示阈值：滚动超过100px时显示
const HIDE_THRESHOLD = 50  // 隐藏阈值：滚动小于50px时隐藏
const SCROLL_DIRECTION_THRESHOLD = 5 // 滚动方向判断阈值（像素）
const NAVBAR_HEIGHT = 70 // 导航栏高度估计值

// 获取元素相对于文档顶部的精确位置
const getElementOffsetTop = (element: HTMLElement): number => {
  let offsetTop = 0
  let currentElement: HTMLElement | null = element

  while (currentElement) {
    offsetTop += currentElement.offsetTop
    currentElement = currentElement.offsetParent as HTMLElement | null
  }

  return offsetTop
}

const handleScroll = () => {
  const currentScrollY = window.scrollY
  const scrollDelta = currentScrollY - lastScrollY.value

  // 判断滚动方向（超过阈值才判定为有效滚动）
  const isScrollingDown = scrollDelta > SCROLL_DIRECTION_THRESHOLD
  const isScrollingUp = scrollDelta < -SCROLL_DIRECTION_THRESHOLD

  // 显示/隐藏逻辑优化：
  // 1. 当滚动超过 SHOW_THRESHOLD 时显示导航栏
  // 2. 当滚动小于 HIDE_THRESHOLD 时隐藏导航栏
  // 3. 使用独立的阈值避免频繁切换
  if (currentScrollY > SHOW_THRESHOLD) {
    isVisible.value = true

    // 根据滚动方向设置阴影效果
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

  // 检测当前活跃板块
  detectActiveSection()
}

const detectActiveSection = () => {
  const scrollPosition = window.scrollY + NAVBAR_HEIGHT + 50

  // 查找当前可见的板块
  for (const item of navItems) {
    const element = document.getElementById(item.id)
    if (element) {
      const offsetTop = getElementOffsetTop(element)
      const offsetHeight = element.offsetHeight

      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        activeSection.value = item.id
        return
      }
    }
  }

  // 如果没有找到匹配的板块，检查是否在最后一个板块之后
  const lastItem = navItems[navItems.length - 1]
  const lastElement = document.getElementById(lastItem.id)
  if (lastElement) {
    const lastOffsetTop = getElementOffsetTop(lastElement)
    if (scrollPosition >= lastOffsetTop + lastElement.offsetHeight) {
      activeSection.value = lastItem.id
    }
  }
}



// 获取导航栏实际高度
const getNavbarHeight = (): number => {
  const navbar = document.querySelector('.sticky-navbar') as HTMLElement
  return navbar ? navbar.offsetHeight : NAVBAR_HEIGHT
}

// 获取元素相对于文档顶部的精确位置（包含所有偏移父元素）
const getElementAbsoluteTop = (element: HTMLElement): number => {
  let top = 0
  let current: HTMLElement | null = element
  
  while (current) {
    top += current.offsetTop
    current = current.offsetParent as HTMLElement | null
  }
  
  return top
}

// 平滑滚动到指定位置
const smoothScrollTo = (targetPosition: number, duration: number = 500): Promise<void> => {
  return new Promise((resolve) => {
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    const startTime = performance.now()

    isScrolling.value = true
    scrollCompleted.value = false

    // 清除之前的完成状态超时
    if (scrollCompleteTimeout.value) {
      clearTimeout(scrollCompleteTimeout.value)
    }

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    }

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeInOutCubic(progress)

      window.scrollTo(0, startPosition + distance * easedProgress)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        isScrolling.value = false
        scrollCompleted.value = true

        // 1.5秒后清除完成状态
        scrollCompleteTimeout.value = window.setTimeout(() => {
          scrollCompleted.value = false
        }, 1500)

        resolve()
      }
    }

    requestAnimationFrame(animate)
  })
}

const scrollToSection = async (target: string) => {
  // 清除之前的滚动超时
  if (scrollTimeout.value) {
    clearTimeout(scrollTimeout.value)
    scrollTimeout.value = null
  }
  
  // 处理返回顶部的特殊情况
  if (target === '#' || target === '') {
    await smoothScrollTo(0, 600)
    isMobileMenuOpen.value = false
    return
  }

  const elementId = target.replace('#', '')
  const element = document.getElementById(elementId)

  if (element) {
    // 获取导航栏实际高度（考虑响应式变化）
    const navbarHeight = getNavbarHeight()
    
    // 获取目标元素的精确位置
    const elementTop = getElementAbsoluteTop(element)
    
    // 计算目标滚动位置：元素顶部 - 导航栏高度 - 额外间距
    // 使用 16px 间距，确保内容与导航栏之间有适当留白
    const targetPosition = Math.max(0, elementTop - navbarHeight - 16)
    
    // 执行平滑滚动
    await smoothScrollTo(targetPosition, 600)
    
    // 滚动完成后，再次微调位置（处理可能的布局偏移）
    scrollTimeout.value = window.setTimeout(() => {
      const currentElement = document.getElementById(elementId)
      if (currentElement) {
        const currentTop = currentElement.getBoundingClientRect().top
        const navbarHeight = getNavbarHeight()
        
        // 如果位置有偏差（超过 5px），进行微调
        if (Math.abs(currentTop - navbarHeight - 16) > 5) {
          const adjustment = currentTop - navbarHeight - 16
          window.scrollBy({ top: adjustment, behavior: 'smooth' })
        }
      }
    }, 100)
    
    // 更新活跃板块
    activeSection.value = elementId
  } else {
    console.warn(`[StickyNavbar] 未找到目标元素: ${elementId}`)
  }

  // 关闭移动端菜单
  isMobileMenuOpen.value = false
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// 滚动节流控制
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
  // 使用 nextTick 确保 DOM 已渲染
  nextTick(() => {
    // 添加滚动监听（使用节流优化）
    window.addEventListener('scroll', throttledScrollHandler, { passive: true })

    // 初始检测
    handleScroll()

    // 监听窗口大小变化，重新计算
    resizeObserver = new ResizeObserver(() => {
      handleScroll()
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

  // 清除所有超时
  if (scrollTimeout.value) {
    clearTimeout(scrollTimeout.value)
  }
  if (scrollCompleteTimeout.value) {
    clearTimeout(scrollCompleteTimeout.value)
  }
})
</script>

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
      <!-- Logo/品牌名 -->
      <div class="navbar-brand" @click="scrollToSection('#')">
        <span class="brand-text">何大新</span>
        <span class="brand-subtitle">个人简历</span>
      </div>

      <!-- 桌面端导航菜单 -->
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

      <!-- 移动端菜单按钮 -->
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

    <!-- 移动端菜单 -->
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

/* 移动端菜单按钮 */
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

/* 移动端菜单 */
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

/* 响应式设计 */
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

/* 减少动画偏好 */
@media (prefers-reduced-motion: reduce) {
  .sticky-navbar,
  .navbar-item,
  .mobile-menu,
  .menu-line {
    transition: none;
  }
}
</style>
