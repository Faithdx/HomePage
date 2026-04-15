<script setup lang="ts">
import { onMounted } from 'vue'
import AOS from 'aos'
import IconCloud from '@/ui/IconCloud/index.vue'
import Work from '../Work/index.vue'
import Map from '../Map/index.vue'
import ScrollAnimatedHeading from '../ScrollAnimatedHeading/index.vue'

const techIcons = [
  'harmonyos', 'tauri', 'scss', 'css', 'html', 'unocss', 'axios', 'fetch', 'vue', 'vuex', 'redux',
  'element-plus', 'naive-ui','typescript', 'javascript', 'antdesign', 'motion',
  'pinia', 'echarts', '.net', 'c#', '.net core', 'asp.net core','signalr','wpf','xaml','mvvm','maui',
  'mysql', 'redis', 'sqlserver', 'mongodb',
  'webpack', 'vite', 'nodedotjs', 'nextdotjs', 'prisma', 'express',
  'python', 'flask', 'nginx', 'vercel', 'docker', 'git', 'github',
  'visualstudiocode', 'intellijidea', 'visualstudio','cursor','trae','codebuddy','qcoder','apifox', 'postman',
  'webstorm', 'navicat', 'hbuilder', 'hbuilderx',
  'macos', 'windows', 'linux', 'wechat',
]

onMounted(() => {
  // 刷新 AOS 以确保动态内容也能触发动画
  setTimeout(() => AOS.refresh(), 100)
})
</script>

<template>
  <div class="mb-36 text-center">
    <!-- 工作地点板块 -->
    <div class="max-w-5xl mx-auto">
      <div data-aos="fade-up" data-aos-duration="1000">
        <p class="text-white text-3xl leading-14">
          目前我在 <b class="text-primary">陕西</b> <b class="text-yellow-300">西安</b> 从事全栈开发工程师岗位
        </p>
      </div>

      <div data-aos="fade-up" data-aos-duration="1000" class="mt-16">
        <Map />
      </div>
    </div>

    <!-- 热爱板块 -->
    <div class="mt-[300px]">
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

    <!-- 全局板块 -->
    <div class="max-w-5xl mx-auto mt-[800px]">
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

    <!-- 教育背景板块 -->
    <div class="max-w-5xl mx-auto mt-[600px]">
      <div data-aos="fade-up" data-aos-duration="1000">
        <p class="text-white text-3xl leading-14 mt-6">本科毕业于一所普通的本科院校</p>
      </div>

      <div data-aos="fade-up" data-aos-duration="1000">
        <p class="text-3xl leading-14 mt-6 text-yellow-300">"兰州交通大学"</p>
      </div>

      <div data-aos="fade-up" data-aos-duration="1000">
        <img src="https://miaobi-lite.bj.bcebos.com/miaobi/5mao/b%275YWw5bee6ZOB6YGT5a2m6ZmiXzE3MjY3MjI2NzcuMTI2NQ%3D%3D%27/0.png" alt="" class="min-h-[200px] w-full mt-16 mb-36 rounded-2xl" />
      </div>

      <div data-aos="fade-up" data-aos-duration="1000">
        <p class="text-white text-3xl leading-14 mt-6">
          它并不是专业的计算学院
        </p>
      </div>

      <div data-aos="fade-up" data-aos-duration="1000">
        <p class="text-white text-3xl leading-14 mt-6">
          所以毕业后，我选择了一所培训机构
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
        <img src="https://bu.dusays.com/2025/08/03/688f2ada193ab.jpg" alt="" class="min-h-[576px] w-full mt-10 mb-36 rounded-2xl" />
      </div>
    </div>

    <!-- 开源项目板块 -->
    <div>
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
    <div class="max-w-5xl mx-auto mt-[400px] space-y-[50px]">
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
  </div>
</template>
