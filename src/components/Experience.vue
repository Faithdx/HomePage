<template>
  <section id="experience" class="py-24 bg-gradient-to-b from-white to-light">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16" v-motion:initial="{ opacity: 0, y: 40 }"
        v-motion:enter="{ opacity: 1, y: 0, transition: { duration: 800, ease: [0.4, 0, 0.2, 1] } }">
        <h2 class="text-[clamp(1.5rem,3vw,2.5rem)] font-display font-bold mb-4">工作经历</h2>
        <div class="w-20 h-1 bg-gradient-to-r from-secondary to-accent mx-auto mb-6 rounded-full"></div>
        <p class="text-gray-600 max-w-2xl mx-auto text-base">
          我的专业历程和成长轨迹
        </p>
      </div>
      <div class="max-w-5xl mx-auto">
        <div class="relative">
          <div
            class="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-secondary via-accent to-secondary transform md:-translate-x-1/2 rounded-full">
          </div>

          <div v-for="(item, index) in experienceList" :key="index"
            class="relative mb-16 flex flex-col md:flex-row last:mb-0" v-motion:initial="{ opacity: 0, y: 40 }"
            v-motion:enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: index * 200, ease: [0.4, 0, 0.2, 1] } }">

            <!-- 左侧卡片 -->
            <div v-if="index % 2 === 0" class="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
              <div
                class="bg-white p-6 rounded-2xl shadow-lg hover-lift border border-gray-100 group hover:border-secondary/30 transition-all duration-500">
                <div :class="item.colorClass"
                  class="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 group-hover:text-white transition-colors duration-300">
                  {{ item.period }}
                </div>
                <h3 class="text-xl font-bold mb-3 group-hover:text-gradient transition-colors duration-300">{{
                  item.title }}</h3>
                <p :class="item.textColorClass" class="font-semibold mb-4 text-base">{{ item.company }}</p>
                <p class="text-gray-600 leading-relaxed text-sm">{{ item.description }}</p>
              </div>
            </div>

            <!-- 右侧卡片 -->
            <div v-else class="md:w-1/2 md:pl-12">
              <div
                class="bg-white p-6 rounded-2xl shadow-lg hover-lift border border-gray-100 group hover:border-secondary/30 transition-all duration-500">
                <div :class="item.colorClass"
                  class="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 group-hover:text-white transition-colors duration-300">
                  {{ item.period }}
                </div>
                <h3 class="text-xl font-bold mb-3 group-hover:text-gradient transition-colors duration-300">{{
                  item.title }}</h3>
                <p :class="item.textColorClass" class="font-semibold mb-4 text-base">{{ item.company }}</p>
                <p class="text-gray-600 leading-relaxed text-sm">{{ item.description }}</p>
              </div>
            </div>

            <!-- 占位符 -->
            <div v-if="index % 2 === 0" class="md:w-1/2 md:pl-12 hidden md:block"></div>
            <div v-else class="md:w-1/2 md:pr-12 hidden md:block"></div>

            <!-- 时间线节点 -->
            <div
              class="absolute left-0 md:left-1/2 top-8 w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-full transform -translate-x-1/2 md:-translate-x-1/2 shadow-lg z-10 ring-4 ring-white group">
              <div
                class="absolute inset-0 bg-gradient-to-br from-secondary to-accent rounded-full animate-ping opacity-75">
              </div>
              <div
                class="relative w-full h-full bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
                <div class="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const experienceList = [
  {
    period: '2022 - 至今',
    title: '高级前端开发工程师',
    company: '科技公司',
    description: '负责公司核心产品的前端开发，带领团队实现现代化的用户界面和交互体验。主导技术选型和架构设计，优化应用性能。',
    colorClass: 'bg-secondary/10 text-secondary group-hover:bg-secondary',
    textColorClass: 'text-secondary'
  },
  {
    period: '2019 - 2022',
    title: '前端开发工程师',
    company: '互联网公司',
    description: '参与多个项目的前端开发，负责页面设计和交互实现，优化用户体验。与产品和设计团队紧密合作，确保产品质量。',
    colorClass: 'bg-accent/10 text-accent group-hover:bg-accent',
    textColorClass: 'text-accent'
  },
  {
    period: '2017 - 2019',
    title: '初级前端开发',
    company: '创业公司',
    description: '学习并实践前端开发技术，参与项目的页面构建和功能实现。快速成长，逐步承担更多责任。',
    colorClass: 'bg-secondary/10 text-secondary group-hover:bg-secondary',
    textColorClass: 'text-secondary'
  }
]

const revealConfig = {
  initial: { opacity: 0, y: 40 },
  enter: { opacity: 1, y: 0, transition: { duration: 800, ease: [0.4, 0, 0.2, 1] } }
}

const getRevealConfig = (index) => ({
  initial: { opacity: 0, y: 40 },
  enter: { opacity: 1, y: 0, transition: { duration: 800, delay: index * 200, ease: [0.4, 0, 0.2, 1] } }
})
</script>
