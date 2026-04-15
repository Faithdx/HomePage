import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:uno.css'
import './styles/global.css'
import 'aos/dist/aos.css'
import AOS from 'aos'

declare global {
  interface Window {
    __disableAosRefresh: boolean
  }
}

const app = createApp(App)

app.mount('#app')

AOS.init({
  duration: 1000,
  once: true,
  offset: 50,
  delay: 0,
  easing: 'ease-out-cubic',
})

app.config.globalProperties.$aos = AOS

window.__disableAosRefresh = false

let scrollTimeout: ReturnType<typeof setTimeout> | null = null
window.addEventListener('scroll', () => {
  if (window.__disableAosRefresh) return
  if (scrollTimeout) clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(() => {
    AOS.refresh()
  }, 100)
}, { passive: true })

window.addEventListener('load', () => {
  AOS.refresh()
})
