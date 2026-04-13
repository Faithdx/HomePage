<template>
  <section id="contact" class="py-24 bg-primary text-white relative overflow-hidden">
    <div class="absolute inset-0 z-0">
      <div class="absolute top-10 left-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed"></div>
      <div class="absolute top-1/2 left-1/3 w-48 h-48 bg-secondary/5 rounded-full blur-2xl animate-bounce-slow"></div>
    </div>
    <div class="container mx-auto px-6 relative z-10">
      <div class="text-center mb-16" v-motion:initial="{ opacity: 0, y: 40 }"
        v-motion:enter="{ opacity: 1, y: 0, transition: { duration: 800, ease: [0.4, 0, 0.2, 1] } }">
        <h2 class="text-[clamp(1.5rem,3vw,2.5rem)] font-display font-bold mb-4">联系我</h2>
        <div class="w-20 h-1 bg-gradient-to-r from-secondary to-accent mx-auto mb-6 rounded-full"></div>
        <p class="text-gray-300 max-w-2xl mx-auto text-base">
          如果您对我的作品感兴趣，或者有任何合作机会，欢迎随时联系我
        </p>
      </div>
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            class="bg-dark/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-secondary/30 transition-all duration-500"
            v-motion:initial="{ opacity: 0, x: -40 }"
            v-motion:enter="{ opacity: 1, x: 0, transition: { duration: 800, ease: [0.4, 0, 0.2, 1] } }">
            <h3 class="text-xl font-bold mb-8 flex items-center">
              <i class="i-fa-address-book mr-3 text-secondary"></i>
              联系方式
            </h3>
            <div class="space-y-6">
              <div class="flex items-center group">
                <div
                  class="w-12 h-12 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <i class="i-fa-envelope text-secondary text-xl"></i>
                </div>
                <div>
                  <p class="text-gray-400 text-xs mb-1">邮箱</p>
                  <p class="font-medium text-base group-hover:text-secondary transition-colors">contact@example.com</p>
                </div>
              </div>
              <div class="flex items-center group">
                <div
                  class="w-12 h-12 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <i class="i-fa-phone text-secondary text-xl"></i>
                </div>
                <div>
                  <p class="text-gray-400 text-xs mb-1">电话</p>
                  <p class="font-medium text-base group-hover:text-secondary transition-colors">+86 123 4567 8910</p>
                </div>
              </div>
              <div class="flex items-center group">
                <div
                  class="w-12 h-12 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <i class="i-fa-map-marker text-secondary text-xl"></i>
                </div>
                <div>
                  <p class="text-gray-400 text-xs mb-1">地址</p>
                  <p class="font-medium text-base group-hover:text-secondary transition-colors">上海市浦东新区</p>
                </div>
              </div>
            </div>
            <div class="mt-10">
              <h4 class="text-lg font-bold mb-6 flex items-center">
                <i class="i-fa-link mr-3 text-secondary"></i>
                社交媒体
              </h4>
              <div class="flex space-x-4">
                <a href="#"
                  class="w-12 h-12 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-secondary hover:to-accent transition-all duration-500 hover:-translate-y-2 hover:shadow-lg group">
                  <i class="i-fa-github text-white text-lg group-hover:scale-125 transition-transform"></i>
                </a>
                <a href="#"
                  class="w-12 h-12 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-secondary hover:to-accent transition-all duration-500 hover:-translate-y-2 hover:shadow-lg group">
                  <i class="i-fa-linkedin text-white text-lg group-hover:scale-125 transition-transform"></i>
                </a>
                <a href="#"
                  class="w-12 h-12 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-secondary hover:to-accent transition-all duration-500 hover:-translate-y-2 hover:shadow-lg group">
                  <i class="i-fa-twitter text-white text-lg group-hover:scale-125 transition-transform"></i>
                </a>
                <a href="#"
                  class="w-12 h-12 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-secondary hover:to-accent transition-all duration-500 hover:-translate-y-2 hover:shadow-lg group">
                  <i class="i-fa-instagram text-white text-lg group-hover:scale-125 transition-transform"></i>
                </a>
              </div>
            </div>
          </div>

          <div
            class="bg-dark/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-secondary/30 transition-all duration-500"
            v-motion:initial="{ opacity: 0, x: 40 }"
            v-motion:enter="{ opacity: 1, x: 0, transition: { duration: 800, ease: [0.4, 0, 0.2, 1] } }">
            <h3 class="text-xl font-bold mb-8 flex items-center">
              <i class="i-fa-envelope-o mr-3 text-secondary"></i>
              发送消息
            </h3>
            <form @submit.prevent="handleSubmit">
              <div class="mb-6 group">
                <label for="name"
                  class="block text-gray-300 mb-2 font-medium text-sm group-focus-within:text-secondary transition-colors duration-300">姓名</label>
                <input type="text" id="name" v-model="form.name"
                  class="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary focus:bg-white/10 transition-all duration-300 placeholder-gray-500"
                  placeholder="请输入您的姓名">
              </div>
              <div class="mb-6 group">
                <label for="email"
                  class="block text-gray-300 mb-2 font-medium text-sm group-focus-within:text-secondary transition-colors duration-300">邮箱</label>
                <input type="email" id="email" v-model="form.email"
                  class="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary focus:bg-white/10 transition-all duration-300 placeholder-gray-500"
                  placeholder="请输入您的邮箱">
              </div>
              <div class="mb-6 group">
                <label for="subject"
                  class="block text-gray-300 mb-2 font-medium text-sm group-focus-within:text-secondary transition-colors duration-300">主题</label>
                <input type="text" id="subject" v-model="form.subject"
                  class="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary focus:bg-white/10 transition-all duration-300 placeholder-gray-500"
                  placeholder="请输入消息主题">
              </div>
              <div class="mb-8 group">
                <label for="message"
                  class="block text-gray-300 mb-2 font-medium text-sm group-focus-within:text-secondary transition-colors duration-300">消息</label>
                <textarea id="message" v-model="form.message" rows="5"
                  class="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary focus:bg-white/10 transition-all duration-300 resize-none placeholder-gray-500"
                  placeholder="请输入您的消息..."></textarea>
              </div>
              <button type="submit"
                class="w-full bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-white font-semibold py-4 rounded-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl group disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="isSubmitting">
                <span class="flex items-center justify-center">
                  <template v-if="!isSubmitting">
                    发送消息
                    <i
                      class="i-fa-paper-plane ml-3 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform duration-300"></i>
                  </template>
                  <template v-else>
                    <i class="i-fa-spinner animate-spin mr-2"></i>
                    发送中...
                  </template>
                </span>
              </button>

              <transition name="fade">
                <div v-if="showSuccess"
                  class="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-300 text-center">
                  <i class="i-fa-check-circle mr-2"></i>
                  消息已发送成功！
                </div>
              </transition>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true

  await new Promise(resolve => setTimeout(resolve, 1500))

  isSubmitting.value = false
  showSuccess.value = true

  form.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }

  setTimeout(() => {
    showSuccess.value = false
  }, 3000)
}

const revealConfig = {
  initial: { opacity: 0, y: 40 },
  enter: { opacity: 1, y: 0, transition: { duration: 800, ease: [0.4, 0, 0.2, 1] } }
}

const revealLeftConfig = {
  initial: { opacity: 0, x: -40 },
  enter: { opacity: 1, x: 0, transition: { duration: 800, ease: [0.4, 0, 0.2, 1] } }
}

const revealRightConfig = {
  initial: { opacity: 0, x: 40 },
  enter: { opacity: 1, x: 0, transition: { duration: 800, ease: [0.4, 0, 0.2, 1] } }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
