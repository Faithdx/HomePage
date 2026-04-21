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
        <p class="text-white text-3xl leading-14 mt-6">
          机械设计制造及其自动化专业
        </p>
      </div>

      <div data-aos="fade-up" data-aos-duration="1000">
        <img
          src="https://miaobi-lite.bj.bcebos.com/miaobi/5mao/b%275YWw5bee6ZOB6YGT5a2m6ZmiXzE3MjY3MjI2NzcuMTI2NQ%3D%3D%27/0.png"
          alt="" class="min-h-[200px] w-full mt-16 mb-36 rounded-2xl" />
      </div>

      <div data-aos="fade-up" data-aos-duration="1000">
        <p class="text-white text-3xl leading-14 mt-6">
          它并不是专业的计算机学院
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
              { src: '/images/notePin-web.png', alt: 'Image 1' },
              { src: '/images/notePin-web-2.png', alt: 'Image 2' },
              { src: '/images/notePin-web-3.png', alt: 'Image 3' },
              { src: '/images/notePin-web-4.png', alt: 'Image 4' },                           
              { src: '/images/notePin-web-5.png', alt: 'Image 5' },
              { src: '/images/notePin-web-3.png', alt: 'Image 6' },
              { src: '/images/notePin-web-4.png', alt: 'Image 7' },   
              { src: '/images/notePin-web-5.png', alt: 'Image 8' }, 
              { src: '/images/notePin客户端.png', alt: 'Image 9' },
            ]"
          />
        </div>
      </div>
    </div>

    <!-- 技能板块 -->
    <div id="skills" v-if="isSectionVisible('skills')" class="max-w-5xl mx-auto mt-[400px] space-y-[50px]" :style="{ order: getSectionOrder('skills') }">
      <div data-aos="fade-up" data-aos-duration="1000">
        <p class="text-white text-3xl leading-14">
          下面是我的 <b class="text-yellow-300">专业技能</b>
        </p>
      </div>

      <div data-aos="fade-up" data-aos-duration="1000">
        <p class="text-white text-3xl leading-14 mt-6 mb-[100px]">
          6年以上IT开发经验，精通 <b class="text-[#8DD5F8]">Vue</b> <span class="px-1">+</span>
          <b class="text-primary">.NET Core</b> 全栈开发
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
        <a href="mailto:daxin.he@qq.com" class="contact-card group">
          <div class="contact-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-8 h-8">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3 class="contact-title">邮箱</h3>
          <p class="contact-info">daxin.he@qq.com</p>
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
  'harmonyos', 'tauri', 'scss', 'css', 'html', 'sass', 'axios', 'fetch', 'vue', 'vuex',
  'element-plus', 'naive-ui', 'typescript', 'javascript', 'antdesign', 'motion',
  'pinia', 'echarts', '.net', 'c#', '.net core', 'asp.net core', 'signalr', 'wpf', 'blazor', 'maui',
  'mysql', 'redis', 'sqlserver', 'mongodb',
  'webpack', 'vite', 'nodedotjs', 'jquery', 'bootstrap', 'layui',
  'git', 'github',
  'visualstudiocode', 'intellijidea', 'visualstudio', 'cursor', 'trae', 'apifox', 'postman',
  'webstorm', 'navicat',
  'macos', 'windows', 'linux',
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
    period: '2025.04 - 2026.03',
    company: '陕西京创科技',
    position: '全栈开发工程师',
    description: '参与需求评审、接口方案设计、前后端编码、联调测试全流程，配合团队完成业务系统的功能迭代与上线。',
    achievements: [
      '系统性学习 Vue3.x、.NET10、鸿蒙应用开发、大模型应用开发等前沿技术',
      '基于 Tauri2.x + Vue3 独立完成跨平台客户端应用开发，覆盖 Windows、MacOS 多端适配',
      '搭建个人技术储备体系，支撑跨场景开发需求响应'
    ],
    technologies: ['Vue 3', 'Tauri', '.NET', 'HarmonyOS']
  },
  {
    id: 2,
    period: '2019.10 - 2025.03',
    company: '天津市大光软件科技有限公司',
    position: '.NET开发工程师',
    description: '基于 ASP.NET Core、WebApi、EFCore 技术栈进行业务系统的后端接口开发与维护，负责多端开发和系统重构优化。',
    achievements: [
      '负责 PC 端、移动端 Web 页面及移动 App 的开发、打包与发布',
      '系统代码重构，优化数据库查询逻辑与接口响应速度',
      '负责系统的日常维护、Bug 修复与版本迭代'
    ],
    technologies: ['ASP.NET Core', 'EF Core', 'Vue', 'WPF', 'SignalR']
  },
  {
    id: 3,
    period: '2018.09 - 2019.09',
    company: '北京环球中联投资咨询有限公司',
    position: '前端开发工程师',
    description: '负责 Web 产品的 PC 端、移动端页面开发，与 UI 团队配合实现响应式布局，完成页面动态效果与前后端数据交互。',
    achievements: [
      '实现页面动态效果与前后端数据交互，对接后端接口',
      '完成图片上传、表单提交等核心功能的开发与调试',
      '完成页面兼容性测试与适配，覆盖 Chrome、Firefox、IE11 等主流浏览器'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'LayUI']
  }
])

// 项目经历数据
const projectExperienceData = ref<ProjectExperienceItem[]>([
  {
    id: 1,
    period: '2024.04 - 2025.03',
    name: 'AI赛马竞猜平台',
    role: '.NET开发工程师',
    description: '集赛马赛事直播、AI赛果预测、投注交易、社区互动于一体的综合型竞猜平台，面向赛马爱好者提供一站式赛事参与服务。',
    achievements: [
      '独立完成PC端、移动端落地页开发，实现全端响应式布局适配',
      '负责登录注册、个人信息管理、赛事信息展示、投注交易、论坛互动等核心模块开发',
      '基于ML.NET搭建赛马结果预测模型，整合历史赛事数据完成模型训练与调优'
    ],
    technologies: ['Vue 3', 'Layui-vue', 'ASP.NET Core', 'EFCore', 'SignalR', 'ML.NET']
  },
  {
    id: 2,
    period: '2023.03 - 2024.03',
    name: '韩国股票交易平台',
    role: '.NET开发工程师',
    description: '面向韩国C端用户的标准化股票交易系统，核心覆盖实时行情查询、在线交易下单、全生命周期订单管理等业务功能。',
    achievements: [
      '负责个人信息管理、钱包模块、交易页面、订单管理等模块的页面布局与交互逻辑开发',
      '对接股票行情数据源，完成高并发场景下的接口与查询逻辑调优',
      '重构数据库慢查询逻辑，新增接口限流、事务锁机制，解决高并发下的订单超卖问题'
    ],
    technologies: ['Vue 3', 'Vuetify', 'ASP.NET Core', 'EFCore', 'SignalR', 'MySQL']
  },
  {
    id: 3,
    period: '2022.08 - 2023.02',
    name: '在线营销短信平台',
    role: '.NET开发工程师',
    description: '面向企业客户的SaaS类在线营销短信服务平台，支持文本短信、多媒体短信、国际短信三类发送场景。',
    achievements: [
      '负责第三方短信服务商的接口对接及核心功能开发，保障短信链路的稳定性',
      '适配阿里云、云片等5家主流第三方短信服务商接口，实现短信发送、状态回调、计费统计全链路功能',
      '基于WPF + HandyControl开发Windows桌面客户端，实现登录注册、短信批量发送、发送记录查询等功能'
    ],
    technologies: ['Vue 2', 'Bootstrap', 'ASP.NET Core', 'EFCore', 'SignalR', 'WPF']
  },
  {
    id: 4,
    period: '2021.11 - 2022.07',
    name: '漫画在线阅读平台',
    role: '.NET开发工程师',
    description: '面向韩国年轻用户群体的漫画在线阅读社区，涵盖漫画阅读、评论收藏、社区互动等核心功能。',
    achievements: [
      '负责项目前端技术架构搭建，完成登录注册、漫画阅读、个人中心、论坛模块等核心业务页面开发',
      '设计并实现帖子分类、发布、编辑、评论、多级权限管理等全链路论坛功能',
      '搭建后台管理系统的用户管理、漫画资源管理、论坛内容审核模块'
    ],
    technologies: ['Vue 2', 'Bootstrap', 'ASP.NET Core MVC', 'MySQL']
  },
  {
    id: 5,
    period: '2020.11 - 2021.10',
    name: '虚拟币交易平台',
    role: '.NET开发工程师',
    description: '面向韩国市场的多币种虚拟币交易平台，支持中、英、韩三种语言，提供安全、稳定、低延迟的交易服务。',
    achievements: [
      '负责用户中心、钱包管理等核心业务模块的功能设计与代码实现',
      '基于SignalR实现实时行情推送、交易记录实时同步，通过消息队列削峰、增量数据推送降低传输延迟',
      '开发钱包管理全链路功能，覆盖钱包开通、充值提现、贷款还款等12个核心场景',
      '基于Blazor + MudBlazor搭建定制化加密币行情展示模块'
    ],
    technologies: ['Vue', 'Vuetify', 'Blazor', 'MudBlazor', 'ASP.NET Core', 'EFCore', 'MySQL', 'SignalR']
  },
  {
    id: 6,
    period: '2019.10 - 2020.10',
    name: '韩国期货交易平台',
    role: '前端开发工程师',
    description: '面向韩国中小期货投资者的专业交易平台，覆盖Web端、WinForm客户端，包含期货实时行情查看、在线交易下单等功能。',
    achievements: [
      '负责Web端交易平台的页面开发与交互逻辑落地，对接后端服务接口',
      '承担Web端与WinForm客户端的性能优化、问题修复工作',
      '负责公司官方网站的开发工作，适配PC、移动端不同尺寸完成多端适配',
      '负责移动端APK的打包、测试、上线发布及后续维护'
    ],
    technologies: ['Vue 2', 'Bootstrap', 'ASP.NET Core', 'EF Core', 'SignalR']
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
