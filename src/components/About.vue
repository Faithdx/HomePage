<template>
  <section id="about" class="py-32 bg-white">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16" v-motion:visible="revealConfig">
        <h2 class="text-[clamp(1.5rem,3vw,2.5rem)] font-display font-bold mb-4">关于我</h2>
        <div class="w-20 h-1 bg-gradient-to-r from-secondary to-accent mx-auto mb-6 rounded-full"></div>
        <p class="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
          了解更多关于我的背景、技能和当前所在城市
        </p>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div v-motion:visible="revealLeftConfig">
          <div class="relative group">
            <div
              class="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-secondary/15 to-accent/15 rounded-2xl group-hover:scale-105 transition-transform duration-700">
            </div>
            <div class="relative overflow-hidden rounded-2xl shadow-xl">
              <img
                src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20developer%20portrait%20minimalist%20warm%20lighting&image_size=square"
                alt="个人照片" class="w-full max-w-md mx-auto group-hover:scale-110 transition-transform duration-700">
              <div class="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent"></div>
            </div>
          </div>
        </div>
        <div v-motion:visible="revealRightConfig" class="space-y-8">
          <div>
            <div class="inline-block bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <i class="i-fa-user mr-2"></i>个人简介
            </div>
            <h3 class="text-2xl font-display font-bold mb-6">我是谁</h3>
            <p class="text-gray-600 mb-4 leading-relaxed text-base">
              我是一名拥有5年以上经验的前端开发工程师，专注于创建美观、高效且用户友好的Web应用。我热爱将复杂的问题转化为简洁优雅的解决方案，始终追求代码质量和用户体验的完美结合。
            </p>
            <p class="text-gray-600 leading-relaxed text-base">
              在我的职业生涯中，我有幸与多个行业的客户合作，从初创公司到大型企业，帮助他们实现数字化转型目标。
            </p>
          </div>

          <div
            class="bg-gradient-to-br from-secondary/5 to-accent/5 rounded-2xl p-8 border border-secondary/10 hover:border-secondary/30 transition-colors duration-500">
            <div class="flex items-center mb-8">
              <div
                class="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center mr-4 shadow-lg hover:scale-110 transition-transform duration-300">
                <i class="i-fa-map-marker text-white text-xl"></i>
              </div>
              <div>
                <h4 class="text-xl font-bold mb-1">当前工作城市</h4>
                <p class="text-gray-600 text-base">上海市，中国</p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="text-center bg-white p-6 rounded-xl shadow-sm hover-lift group cursor-default">
                <div
                  class="text-3xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">
                  {{ animatedStats.years }}+</div>
                <p class="text-gray-500 text-xs font-medium">工作年限</p>
              </div>
              <div class="text-center bg-white p-6 rounded-xl shadow-sm hover-lift group cursor-default">
                <div
                  class="text-3xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">
                  {{ animatedStats.projects }}+</div>
                <p class="text-gray-500 text-xs font-medium">完成项目</p>
              </div>
              <div class="text-center bg-white p-6 rounded-xl shadow-sm hover-lift group cursor-default">
                <div
                  class="text-3xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">
                  {{ animatedStats.clients }}+</div>
                <p class="text-gray-500 text-xs font-medium">合作客户</p>
              </div>
            </div>
          </div>

          <div>
            <h4 class="text-lg font-bold mb-6 flex items-center">
              <i class="i-fa-code text-secondary mr-3"></i>
              技术栈
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <span v-for="(tech, index) in techStack" :key="index" :class="tech.class"
                class="px-4 py-2 rounded-xl font-medium border transition-all duration-300 hover-lift text-center text-sm cursor-default">
                {{ tech.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

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

// 动画统计数据
const animatedStats = ref({
  years: 0,
  projects: 0,
  clients: 0
})

const techStack = [
  { name: 'React', class: 'bg-gradient-to-r from-blue-500/10 to-blue-600/10 text-blue-700 border-blue-200/50 hover:border-blue-400/50' },
  { name: 'Vue.js', class: 'bg-gradient-to-r from-green-500/10 to-green-600/10 text-green-700 border-green-200/50 hover:border-green-400/50' },
  { name: 'TypeScript', class: 'bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 text-yellow-700 border-yellow-200/50 hover:border-yellow-400/50' },
  { name: 'Node.js', class: 'bg-gradient-to-r from-purple-500/10 to-purple-600/10 text-purple-700 border-purple-200/50 hover:border-purple-400/50' },
  { name: 'Tailwind CSS', class: 'bg-gradient-to-r from-secondary/10 to-accent/10 text-secondary border-secondary/20 hover:border-secondary/40' },
  { name: 'Next.js', class: 'bg-gradient-to-r from-indigo-500/10 to-indigo-600/10 text-indigo-700 border-indigo-200/50 hover:border-indigo-400/50' }
]

// 数字计数动画
const animateNumber = (target, key, duration = 2000) => {
  const startTime = Date.now()
  const startValue = 0

  const updateNumber = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)

    // 使用缓动函数 (ease-out)
    const easedProgress = 1 - Math.pow(1 - progress, 3)
    const currentValue = Math.floor(startValue + (target - startValue) * easedProgress)

    animatedStats.value[key] = currentValue

    if (progress < 1) {
      requestAnimationFrame(updateNumber)
    }
  }

  requestAnimationFrame(updateNumber)
}

// 当组件挂载时启动数字动画
onMounted(() => {
  // 延迟启动动画，让用户看到计数过程
  setTimeout(() => {
    animateNumber(5, 'years', 2000)
    animateNumber(20, 'projects', 2000)
    animateNumber(10, 'clients', 2000)
  }, 800)
})
</script>
