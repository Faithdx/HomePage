import { createApp, nextTick } from 'vue'
import App from './App.vue'
import 'virtual:uno.css'
import './styles/global.css'
import 'aos/dist/aos.css'
import AOS from 'aos'

const app = createApp(App)

app.mount('#app')

// 初始化 AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 50,
  delay: 0,
  easing: 'ease-out-cubic',
})

// 在 DOM 更新后刷新 AOS
app.config.globalProperties.$aos = AOS

// 监听滚动事件，定期刷新 AOS
let scrollTimeout: ReturnType<typeof setTimeout> | null = null
window.addEventListener('scroll', () => {
  if (scrollTimeout) clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(() => {
    AOS.refresh()
  }, 100)
}, { passive: true })

// 页面加载完成后刷新 AOS
window.addEventListener('load', () => {
  AOS.refresh()
})
