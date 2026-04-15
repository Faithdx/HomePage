<script setup lang="ts">
import { onMounted } from 'vue'
import AOS from 'aos'

export interface ProjectExperienceItem {
  id: number
  period: string
  name: string
  role: string
  description: string
  achievements: string[]
  technologies?: string[]
  link?: string
}

interface Props {
  items?: ProjectExperienceItem[]
  title?: string
  subtitle?: string
}

withDefaults(defineProps<Props>(), {
  title: '项目经历',
  subtitle: '我参与和主导的项目',
  items: () => [
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
  ]
})

onMounted(() => {
  setTimeout(() => AOS.refresh(), 100)
})
</script>

<template>
  <div class="project-experience-section">
    <div class="max-w-5xl mx-auto px-4">
      <div class="text-center mb-20" data-aos="fade-up" data-aos-duration="1000">
        <h2 class="text-yellow-300 text-4xl md:text-5xl font-semibold mb-6">{{ title }}</h2>
        <p class="text-gray-400 text-xl">{{ subtitle }}</p>
      </div>

      <div class="timeline-wrapper">
        <div class="timeline-line"></div>
        
        <div
          v-for="(item, index) in items"
          :key="item.id"
          class="timeline-item"
          :class="{ 'timeline-item-right': index % 2 === 1 }"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
          data-aos-duration="800"
        >
          <div class="timeline-dot">
            <div class="timeline-dot-inner"></div>
          </div>
          
          <div class="timeline-card">
            <div class="timeline-period">{{ item.period }}</div>
            <h3 class="timeline-name">{{ item.name }}</h3>
            <div class="timeline-role">{{ item.role }}</div>
            <p class="timeline-description">{{ item.description }}</p>
            
            <div class="timeline-achievements">
              <div class="achievements-title">项目亮点：</div>
              <ul>
                <li v-for="(achievement, i) in item.achievements" :key="i">
                  {{ achievement }}
                </li>
              </ul>
            </div>
            
            <div v-if="item.technologies" class="timeline-tech">
              <span
                v-for="tech in item.technologies"
                :key="tech"
                class="tech-tag"
              >
                {{ tech }}
              </span>
            </div>
            
            <a
              v-if="item.link"
              :href="item.link"
              target="_blank"
              class="timeline-link"
            >
              查看项目
              <svg class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-experience-section {
  padding: 100px 0;
  position: relative;
}

.timeline-wrapper {
  position: relative;
  padding: 20px 0;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(250, 204, 21, 0.5) 10%,
    rgba(250, 204, 21, 0.5) 90%,
    transparent 100%
  );
  transform: translateX(-50%);
}

.timeline-item {
  position: relative;
  width: 50%;
  padding: 0 40px 60px 0;
  box-sizing: border-box;
}

.timeline-item-right {
  margin-left: 50%;
  padding: 0 0 60px 40px;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-dot {
  position: absolute;
  right: -10px;
  top: 10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(250, 204, 21, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.timeline-item-right .timeline-dot {
  right: auto;
  left: -10px;
}

.timeline-dot-inner {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #facc15;
  box-shadow: 0 0 10px rgba(250, 204, 21, 0.5);
}

.timeline-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
  position: relative;
  text-align: left;
}

.timeline-card::before {
  content: '';
  position: absolute;
  left: -46px;
  top: 20px;
  width: 12px;
  height: 12px;
  border: 2px solid rgba(250, 204, 21, 0.3);
  border-right: none;
  border-bottom: none;
  transform: rotate(-45deg);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.timeline-item-right .timeline-card::before {
  left: auto;
  right: -46px;
  transform: rotate(135deg);
}

.timeline-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(250, 204, 21, 0.3);
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.timeline-card:hover::before {
  opacity: 1;
}

.timeline-period {
  display: inline-block;
  padding: 6px 14px;
  background: rgba(250, 204, 21, 0.15);
  color: #facc15;
  font-size: 14px;
  border-radius: 20px;
  margin-bottom: 12px;
  font-weight: 500;
}

.timeline-name {
  color: #fff;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 6px;
}

.timeline-role {
  color: #facc15;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 12px;
}

.timeline-description {
  color: rgba(255, 255, 255, 0.7);
  font-size: 15px;
  line-height: 1.7;
  margin-bottom: 16px;
}

.timeline-achievements {
  margin-bottom: 16px;
}

.achievements-title {
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
}

.timeline-achievements ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.timeline-achievements li {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  line-height: 1.8;
  padding-left: 16px;
  position: relative;
}

.timeline-achievements li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #facc15;
}

.timeline-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.tech-tag {
  padding: 4px 10px;
  background: rgba(250, 204, 21, 0.1);
  border: 1px solid rgba(250, 204, 21, 0.2);
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.tech-tag:hover {
  background: rgba(250, 204, 21, 0.2);
  border-color: rgba(250, 204, 21, 0.4);
}

.timeline-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #facc15;
  font-size: 14px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.timeline-link:hover {
  gap: 10px;
}

.link-icon {
  width: 16px;
  height: 16px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .timeline-line {
    left: 20px;
  }

  .timeline-item,
  .timeline-item-right {
    width: 100%;
    margin-left: 0;
    padding-left: 50px;
    padding-right: 0;
  }

  .timeline-dot,
  .timeline-item-right .timeline-dot {
    left: 10px;
    right: auto;
  }

  .timeline-card::before,
  .timeline-item-right .timeline-card::before {
    display: none;
  }
}

@media (max-width: 480px) {
  .timeline-card {
    padding: 18px;
  }

  .timeline-name {
    font-size: 18px;
  }

  .timeline-description {
    font-size: 14px;
  }

  .timeline-achievements li {
    font-size: 13px;
  }
}
</style>
