<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import AOS from 'aos'
import IconCloud from '@/ui/IconCloud/index.vue'
import Work from '../Work/index.vue'
import Map from '../Map/index.vue'
import ScrollAnimatedHeading from '../ScrollAnimatedHeading/index.vue'
import WorkExperience from '../WorkExperience/index.vue'
import ProjectExperience from '../ProjectExperience/index.vue'
import type { WorkExperienceItem } from '../WorkExperience/index.vue'
import type { ProjectExperienceItem } from '../ProjectExperience/index.vue'
import {
  defaultSectionConfig,
  type SectionId,
  type SectionConfig
} from '@/config/resumeSections'

const techIcons = [
  'harmonyos', 'tauri', 'scss', 'css', 'html', 'unocss', 'axios', 'fetch', 'vue', 'vuex', 'redux',
  'element-plus', 'naive-ui', 'typescript', 'javascript', 'antdesign', 'motion',
  'pinia', 'echarts', '.net', 'c#', '.net core', 'asp.net core', 'signalr', 'wpf', 'xaml', 'mvvm', 'maui',
  'mysql', 'redis', 'sqlserver', 'mongodb',
  'webpack', 'vite', 'nodedotjs', 'nextdotjs', 'prisma', 'express',
  'python', 'flask', 'nginx', 'vercel', 'docker', 'git', 'github',
  'visualstudiocode', 'intellijidea', 'visualstudio', 'cursor', 'trae', 'codebuddy', 'qcoder', 'apifox', 'postman',
  'webstorm', 'navicat', 'hbuilder', 'hbuilderx',
  'macos', 'windows', 'linux', 'wechat',
]

// 板块配置状态
const sectionConfig = ref<SectionConfig[]>([...defaultSectionConfig])



// 检查板块是否可见
const isSectionVisible = (sectionId: SectionId): boolean => {
  return sectionConfig.value.find(s => s.id === sectionId)?.visible ?? false
}

// 获取板块顺序
const getSectionOrder = (sectionId: SectionId): number => {
  return sectionConfig.value.find(s => s.id === sectionId)?.order ?? 999
}



// 工作经历数据
const workExperienceData = ref<WorkExperienceItem[]>([
  {
    id: 1,
    period: '2023.06 - 至今',
    company: '某科技公司',
    position: '高级全栈工程师',
    description: '负责公司核心产品的前后端架构设计与开发，带领团队完成多个重要项目交付。',
    achievements: [
      '主导重构了公司核心系统，性能提升 40%',
      '建立了前端工程化体系，提升团队开发效率 30%',
      '设计并实现了微服务架构，支撑百万级用户访问'
    ],
    technologies: ['Vue 3', '.NET Core', 'PostgreSQL', 'Redis', 'Docker']
  },
  {
    id: 2,
    period: '2021.03 - 2023.05',
    company: '某互联网公司',
    position: '前端开发工程师',
    description: '参与公司电商平台的前端开发，负责多个业务模块的设计与实现。',
    achievements: [
      '独立完成了移动端 H5 商城的开发，日活用户 10w+',
      '优化了首屏加载速度，从 3s 降至 1.2s',
      '开发了通用组件库，被多个项目复用'
    ],
    technologies: ['Vue 2/3', 'TypeScript', 'Webpack', 'Element UI']
  },
  {
    id: 3,
    period: '2020.06 - 2021.02',
    company: '某软件公司',
    position: '.NET 开发工程师',
    description: '负责企业级管理系统的后端开发，参与数据库设计和 API 开发。',
    achievements: [
      '完成了 3 个企业级管理系统的后端开发',
      '设计了高效的数据库结构，查询性能提升 50%',
      '编写了完整的 API 文档和开发规范'
    ],
    technologies: ['.NET Core', 'SQL Server', 'Entity Framework', 'Redis']
  }
])

// 项目经历数据
const projectExperienceData = ref<ProjectExperienceItem[]>([
  {
    id: 1,
    period: '2024.01 - 至今',
    name: 'NotePin 便笺应用',
    role: '独立开发者',
    description: '一款跨平台的便笺应用，支持 Web、桌面端和移动端，致力于提供简洁高效的笔记体验。',
    achievements: [
      '独立完成全栈开发，包括 Web 端、桌面端和移动端',
      '实现了实时同步功能，支持多设备数据同步',
      '用户量突破 5000+，获得良好口碑'
    ],
    technologies: ['Vue 3', 'Tauri', 'TypeScript', '.NET Core', 'PostgreSQL'],
    link: 'https://clipnotre.com'
  },
  {
    id: 2,
    period: '2023.08 - 2023.12',
    name: 'ThriveX 博客管理系统',
    role: '开源贡献者',
    description: '一个现代化的博客管理系统，包含前端展示和控制端管理，支持多种内容类型。',
    achievements: [
      '参与了控制端的开发，实现了文章管理和用户权限模块',
      '优化了前端性能，提升了页面加载速度',
      '获得 GitHub 500+ Stars'
    ],
    technologies: ['Vue 3', 'TypeScript', 'Vite', 'Naive UI'],
    link: 'https://github.com/LiuYuYang01/Thrive-Admin'
  },
  {
    id: 3,
    period: '2023.03 - 2023.07',
    name: '智能教育平台',
    role: '全栈开发',
    description: '为教育机构开发的一站式管理平台，包含家长端、用户端和管理后台三个子系统。',
    achievements: [
      '独立完成了三个子系统的架构设计和开发',
      '实现了多端数据互通和实时通知功能',
      '系统稳定运行，服务 1000+ 家庭用户'
    ],
    technologies: ['Vue 3', '.NET Core', 'SignalR', 'MySQL', 'Redis']
  }
])

onMounted(() => {
  // 刷新 AOS 以确保动态内容也能触发动画
  setTimeout(() => AOS.refresh(), 100)
})

// 监听配置变化，刷新 AOS
watch(sectionConfig, () => {
  setTimeout(() => AOS.refresh(), 100)
}, { deep: true })
</script>

<template>
  <div class="mb-36 text-center">
    <!-- 工作地点板块 -->
    <div v-if="isSectionVisible('location')" class="max-w-5xl mx-auto" :style="{ order: getSectionOrder('location') }">
      <div data-aos="fade-up" data-aos-duration="1000">
        <p class="text-white text-3xl leading-14">
          目前我在 <b class="text-primary">陕西</b> <b class="text-yellow-300">西安</b> 从事全栈开发工程师岗位
        </p>
      </div>

      <div data-aos="fade-up" data-aos-duration="1000" class="mt-16">
        <Map />
      </div>

    </div>
    <!-- 教育背景板块 -->
    <div id="education" v-if="isSectionVisible('education')" class="max-w-5xl mx-auto mt-[300px]"
      :style="{ order: getSectionOrder('education') }">
      <div data-aos="fade-up" data-aos-duration="1000">
        <p class="text-white text-3xl leading-14 mt-6">本科毕业于甘肃的一所本科院校</p>
      </div>

      <div data-aos="fade-up" data-aos-duration="1000">
        <p class="text-3xl leading-14 mt-6 text-yellow-300">"兰州交通大学"</p>
      </div>

      <div data-aos="fade-up" data-aos-duration="1000">
        <img
          src="https://miaobi-lite.bj.bcebos.com/miaobi/5mao/b%275YWw5bee6ZOB6YGT5a2m6ZmiXzE3MjY3MjI2NzcuMTI2NQ%3D%3D%27/0.png"
          alt="" class="min-h-[200px] w-full mt-16 mb-36 rounded-2xl" />
      </div>

      <div data-aos="fade-up" data-aos-duration="1000">
        <p class="text-white text-3xl leading-14 mt-6">
          它并不是专业的计算学院
        </p>
      </div>

      <div data-aos="fade-up" data-aos-duration="1000">
        <p class="text-white text-3xl leading-14 mt-6">
          所以毕业后，我选择了一所专业的培训机构
        </p>
      </div>

      <div data-aos="fade-up" data-aos-duration="1000">
        <p class="text-white text-3xl leading-14 mt-6">系统性的进行了为期 <b class="text-green-400">一年</b> 的
          <b class="text-primary">前端工程师</b> 学习
        </p>
      </div>

      <div data-aos="fade-up" data-aos-duration="1000">
        <p class="text-white text-3xl leading-14 mt-6">由此，我正式踏上了编程开发之路</p>
      </div>

      <div data-aos="fade-up" data-aos-duration="1000">
        <img src="https://bu.dusays.com/2025/08/03/688f2ada193ab.jpg" alt=""
          class="min-h-[576px] w-full mt-10 mb-36 rounded-2xl" />
      </div>
    </div>

    <!-- 工作经历板块 -->
    <div id="workExperience" v-if="isSectionVisible('workExperience')" class="mt-[200px]"
      :style="{ order: getSectionOrder('workExperience') }">
      <WorkExperience :items="workExperienceData" />
    </div>

    <!-- 热爱板块 -->
    <div v-if="isSectionVisible('passion')" class="mt-[300px]" :style="{ order: getSectionOrder('passion') }">
      <div class="my-[500px]">
        <ScrollAnimatedHeading :min-font-size="20" :max-font-size="96">
          <h1 class="text-yellow-300">"热爱" 是所有的理由与解释</h1>
        </ScrollAnimatedHeading>
      </div>

      <ScrollAnimatedHeading :min-font-size="16" :max-font-size="30">
        <div class="text-white max-w-5xl mx-auto">
          <p class="text-white leading-14">
            对于很多人来说写代码是一件 <b class="text-red-500">痛苦不堪</b> 的事情
          </p>
          <p class="text-white leading-14">
            而我不一样，这正是我的 <b class="text-yellow-300">爱好</b>
          </p>
          <p class="text-white leading-14">每天工作做着自己喜欢的事情还那么挣钱</p>
          <p class="text-white leading-14">
            简直占据了 <b class="text-green-400">天时地利人和</b>
          </p>
        </div>
      </ScrollAnimatedHeading>
    </div>

    <!-- 项目经历板块 -->
    <div id="projectExperience" v-if="isSectionVisible('projectExperience')" class="mt-[300px]"
      :style="{ order: getSectionOrder('projectExperience') }">
      <ProjectExperience :items="projectExperienceData" />
    </div>

    <!-- 全局板块 -->
    <div v-if="isSectionVisible('global')" class="max-w-5xl mx-auto mt-[800px]"
      :style="{ order: getSectionOrder('global') }">
      <div class="my-[500px]">
        <ScrollAnimatedHeading :min-font-size="20" :max-font-size="96">
          <h1 class="text-yellow-300">所谓："不谋全局者，不足谋一域"</h1>
        </ScrollAnimatedHeading>
      </div>

      <ScrollAnimatedHeading :min-font-size="16" :max-font-size="30">
        <div class="text-white max-w-5xl mx-auto">
          <p class="text-white mt-6">
            我认为只专注一个领域是无法做出一个 <b class="text-green-400">完整的项目</b>
          </p>
          <p class="text-white mt-6">因为如果只会前端那么做出来的项目是一个没有灵魂的项目</p>
          <p class="text-white mt-6">但只会后端连界面都看不到又能有什么意义呢</p>
          <p class="text-white mt-6">我想具备的是能够一个人完成整个项目的研发的能力</p>
          <p class="text-white mt-6">
            因此，我踏入了 <b class="text-primary">全栈工程师</b> 的探索之路
          </p>
        </div>
      </ScrollAnimatedHeading>
    </div>   

    <!-- 开源项目板块 -->
    <div v-if="isSectionVisible('openSource')" :style="{ order: getSectionOrder('openSource') }">
      <div class="max-w-5xl mx-auto mt-[400px] space-y-[50px]">
        <div class="my-[500px]">
          <ScrollAnimatedHeading :min-font-size="20" :max-font-size="96">
            <h1 class="text-yellow-300">对了，我还有一个 <b class="text-yellow-300">身份</b></h1>
          </ScrollAnimatedHeading>
        </div>

        <div data-aos="fade-up" data-aos-duration="1000">
          <p class="text-white text-3xl leading-14">
            我还是一名 <b class="text-primary">独立开发者</b>
          </p>
        </div>        

        <div data-aos="fade-up" data-aos-duration="1000">
          <p class="text-white text-3xl leading-14 mt-6">
            👨‍💻 目前正在全力投入 <b class="text-primary">NotePin </b> 项目的研发
          </p>
        </div>

        <div data-aos="fade-up" data-aos-duration="1000">
          <p class="text-white text-3xl leading-14 mt-6">这是我迄今为止投入精力最多的项目。</p>
        </div>

        <div data-aos="fade-up" data-aos-duration="1000">
          <p class="text-white text-3xl leading-14 mt-6">我希望它能够成为一个真正有用且独特的产物</p>
        </div>

        <div data-aos="fade-up" data-aos-duration="1000">
          <p class="text-white text-3xl leading-14 mt-6">同时保持简洁易用</p>
        </div>
      </div>

      <div data-aos="fade-up" data-aos-duration="1000" class="mt-10">
        <Work />

        <div class="ml-[-350px]">
          <Work
            :images="[
              { src: 'https://bu.dusays.com/2025/08/09/689623fc681f2.jpg', alt: 'Image 1' },
              { src: 'https://bu.dusays.com/2025/08/09/68962457e423c.jpg', alt: 'Image 3' },
              { src: 'https://bu.dusays.com/2025/08/09/6896245875d65.jpg', alt: 'Image 4' },
              { src: 'https://bu.dusays.com/2025/08/09/689624592b4bf.jpg', alt: 'Image 5' },
              { src: 'https://bu.dusays.com/2025/08/09/6896246546c88.jpg', alt: 'Image 7' },
              { src: 'https://bu.dusays.com/2025/08/09/689624670f0f7.jpg', alt: 'Image 8' },
              { src: 'https://bu.dusays.com/2025/08/09/6896240e1153a.jpg', alt: 'Image 9' },
              { src: 'https://bu.dusays.com/2025/08/09/6896247f92f1f.jpg', alt: 'Image 10' },
              { src: 'https://bu.dusays.com/2025/08/09/689624cac990f.jpg', alt: 'Image 11' },
              { src: 'https://bu.dusays.com/2025/08/09/689624d0475a5.jpg', alt: 'Image 12' },
              { src: 'https://bu.dusays.com/2025/08/09/6896246086c01.jpg', alt: 'Image 6' },
              { src: 'https://bu.dusays.com/2025/08/09/689623fe118af.jpg', alt: 'Image 2' },
              { src: 'https://bu.dusays.com/2025/08/09/6896247e7aaf6.jpg', alt: 'Image 13' },
              { src: 'https://bu.dusays.com/2025/08/09/689624f3698af.jpg', alt: 'Image 14' },
            ]"
          />
        </div>
      </div>
    </div>

    <!-- 技能板块 -->
    <div id="skills" v-if="isSectionVisible('skills')" class="max-w-5xl mx-auto mt-[400px] space-y-[50px]" :style="{ order: getSectionOrder('skills') }">
      <div data-aos="fade-up" data-aos-duration="1000">
        <p class="text-white text-3xl leading-14">
          下面是我的 <b class="text-yellow-300">毕生所学</b>
        </p>
      </div>

      <div data-aos="fade-up" data-aos-duration="1000">
        <p class="text-white text-3xl leading-14 mt-6 mb-[100px]">
          其中我最喜欢的一套组合是：<b class="text-[#8DD5F8]">Vue</b> <span class="px-1">+</span>
          <b class="text-primary">.NET Core</b>
        </p>
      </div>

      <IconCloud :icon-slugs="techIcons" />
    </div>

    <!-- 联系我板块 -->
    <div id="contact" class="max-w-5xl mx-auto mt-[300px] mb-[200px]">
      <div class="text-center" data-aos="fade-up" data-aos-duration="1000">
        <h2 class="text-yellow-300 text-4xl md:text-5xl font-semibold mb-6">联系我</h2>
        <p class="text-gray-400 text-xl mb-12">期待与您的交流与合作</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
        <!-- 邮箱 -->
        <a href="mailto:3311118881@qq.com" class="contact-card group">
          <div class="contact-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-8 h-8">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3 class="contact-title">邮箱</h3>
          <p class="contact-info">3311118881@qq.com</p>
        </a>

        <!-- GitHub -->
        <a href="https://github.com/Faithdx" target="_blank" class="contact-card group">
          <div class="contact-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
          <h3 class="contact-title">GitHub</h3>
          <p class="contact-info">Faithdx</p>
        </a>

        <!-- 博客 -->
        <a href="https://hedaxin.top" target="_blank" class="contact-card group">
          <div class="contact-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-8 h-8">
              <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3 class="contact-title">个人站点</h3>
          <p class="contact-info">hedaxin.top</p>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 联系我板块样式 */
.contact-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 24px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.contact-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(83, 157, 253, 0.3);
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.contact-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: rgba(83, 157, 253, 0.1);
  border: 1px solid rgba(83, 157, 253, 0.2);
  border-radius: 16px;
  color: #539dfd;
  margin-bottom: 16px;
  transition: all 0.3s ease;
}

.contact-card:hover .contact-icon {
  background: rgba(83, 157, 253, 0.2);
  border-color: rgba(83, 157, 253, 0.4);
  transform: scale(1.05);
}

.contact-title {
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.contact-info {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  text-align: center;
  word-break: break-all;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .mb-36 > div {
    margin-top: 150px !important;
  }

  .contact-card {
    padding: 24px 16px;
  }

  .contact-icon {
    width: 56px;
    height: 56px;
  }

  .contact-title {
    font-size: 16px;
  }

  .contact-info {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .mb-36 > div {
    margin-top: 100px !important;
  }

  .contact-card {
    padding: 20px 14px;
  }
}
</style>
