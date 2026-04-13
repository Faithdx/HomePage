<template>
  <section id="projects" class="py-24 bg-white">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16" v-motion:initial="{ opacity: 0, y: 40 }"
        v-motion:enter="{ opacity: 1, y: 0, transition: { duration: 800, ease: [0.4, 0, 0.2, 1] } }">
        <h2 class="text-[clamp(1.5rem,3vw,2.5rem)] font-display font-bold mb-4">项目展示</h2>
        <div class="w-20 h-1 bg-gradient-to-r from-secondary to-accent mx-auto mb-6 rounded-full"></div>
        <p class="text-gray-600 max-w-2xl mx-auto text-base">
          精选项目案例，展示我的专业能力和技术栈
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="(project, index) in projectsList" :key="index"
          class="bg-white rounded-2xl overflow-hidden shadow-lg hover-scale border border-gray-100 group hover:border-secondary/30 transition-all duration-500"
          v-motion:initial="{ opacity: 0, y: 40 }"
          v-motion:enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: index * 150, ease: [0.4, 0, 0.2, 1] } }">
          <div class="h-60 overflow-hidden relative">
            <img :src="project.image" :alt="project.title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
            <div
              class="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
              <div
                class="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h4 class="text-lg font-bold mb-2">查看完整项目</h4>
                <p class="text-white/90 text-sm">点击了解更多详情</p>
              </div>
            </div>
            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div
                class="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-secondary hover:text-white transition-colors duration-300">
                <i class="i-fa-external-link text-sm"></i>
              </div>
            </div>
          </div>
          <div class="p-8">
            <div class="flex items-center mb-4 flex-wrap gap-2">
              <span v-for="(tag, tagIndex) in project.tags" :key="tagIndex" :class="tag.class"
                class="px-3 py-1 rounded-xl text-xs font-medium border hover:scale-105 transition-transform duration-300 cursor-default">
                {{ tag.name }}
              </span>
            </div>
            <h3 class="text-xl font-bold mb-3 group-hover:text-gradient transition-colors duration-300">{{ project.title
              }}</h3>
            <p class="text-gray-600 mb-6 leading-relaxed text-sm">{{ project.description }}</p>
            <div class="flex justify-between items-center">
              <span
                class="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-medium group-hover:bg-secondary/10 group-hover:text-secondary transition-colors duration-300">{{
                project.year }}</span>
              <a href="#" class="group/link text-secondary font-semibold flex items-center text-base">
                查看项目
                <i class="i-fa-arrow-right ml-2 group-hover/link:translate-x-2 transition-transform duration-300"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const projectsList = [
  {
    title: '电子商务网站',
    description: '现代化的电子商务平台，支持商品展示、购物车、支付等功能，采用响应式设计，适配各种设备',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20e-commerce%20website%20design%20warm%20colors&image_size=landscape_4_3',
    year: '2023年',
    tags: [
      { name: 'React', class: 'bg-gradient-to-r from-blue-500/10 to-blue-600/10 text-blue-700 border-blue-200/50' },
      { name: 'Node.js', class: 'bg-gradient-to-r from-green-500/10 to-green-600/10 text-green-700 border-green-200/50' },
      { name: 'MongoDB', class: 'bg-gradient-to-r from-purple-500/10 to-purple-600/10 text-purple-700 border-purple-200/50' }
    ]
  },
  {
    title: '企业官网',
    description: '现代化的企业官网，展示公司信息、产品服务和新闻动态，采用极简设计风格，提供良好的用户体验',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=corporate%20website%20design%20minimalist%20warm%20colors&image_size=landscape_4_3',
    year: '2022年',
    tags: [
      { name: 'Next.js', class: 'bg-gradient-to-r from-blue-500/10 to-blue-600/10 text-blue-700 border-blue-200/50' },
      { name: 'Tailwind CSS', class: 'bg-gradient-to-r from-secondary/10 to-accent/10 text-secondary border-secondary/20' },
      { name: 'GraphQL', class: 'bg-gradient-to-r from-red-500/10 to-red-600/10 text-red-700 border-red-200/50' }
    ]
  },
  {
    title: '数据仪表盘',
    description: '实时数据监控仪表盘，支持多种图表展示和数据筛选，帮助企业快速分析业务数据',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=data%20dashboard%20interface%20modern%20warm%20colors&image_size=landscape_4_3',
    year: '2021年',
    tags: [
      { name: 'Vue.js', class: 'bg-gradient-to-r from-green-500/10 to-green-600/10 text-green-700 border-green-200/50' },
      { name: 'ECharts', class: 'bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 text-yellow-700 border-yellow-200/50' },
      { name: 'Element UI', class: 'bg-gradient-to-r from-purple-500/10 to-purple-600/10 text-purple-700 border-purple-200/50' }
    ]
  },
  {
    title: '移动应用原型',
    description: '跨平台移动应用原型，实现了用户认证、数据同步和离线功能，提供流畅的移动用户体验',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mobile%20app%20prototype%20design%20warm%20colors&image_size=landscape_4_3',
    year: '2020年',
    tags: [
      { name: 'React Native', class: 'bg-gradient-to-r from-blue-500/10 to-blue-600/10 text-blue-700 border-blue-200/50' },
      { name: 'Redux', class: 'bg-gradient-to-r from-orange-500/10 to-orange-600/10 text-orange-700 border-orange-200/50' },
      { name: 'Firebase', class: 'bg-gradient-to-r from-red-500/10 to-red-600/10 text-red-700 border-red-200/50' }
    ]
  }
]

const revealConfig = {
  initial: { opacity: 0, y: 40 },
  enter: { opacity: 1, y: 0, transition: { duration: 800, ease: [0.4, 0, 0.2, 1] } }
}

const getRevealUpConfig = (index) => ({
  initial: { opacity: 0, y: 40 },
  enter: { opacity: 1, y: 0, transition: { duration: 800, delay: index * 100, ease: [0.4, 0, 0.2, 1] } }
})
</script>
