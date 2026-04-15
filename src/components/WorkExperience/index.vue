<script setup lang="ts">
import { onMounted } from 'vue'
import AOS from 'aos'

export interface WorkExperienceItem {
  id: number
  period: string
  company: string
  position: string
  description: string
  achievements: string[]
  technologies?: string[]
}

interface Props {
  items?: WorkExperienceItem[]
  title?: string
  subtitle?: string
}

withDefaults(defineProps<Props>(), {
  title: '工作经历',
  subtitle: '我的职业发展历程',
  items: () => [
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
  ]
})

onMounted(() => {
  setTimeout(() => AOS.refresh(), 100)
})
</script>

<template>
  <div class="work-experience-section">
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
            <h3 class="timeline-company">{{ item.company }}</h3>
            <div class="timeline-position">{{ item.position }}</div>
            <p class="timeline-description">{{ item.description }}</p>
            
            <div class="timeline-achievements">
              <div class="achievements-title">主要成就：</div>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.work-experience-section {
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
    rgba(83, 157, 253, 0.5) 10%,
    rgba(83, 157, 253, 0.5) 90%,
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
  background: rgba(83, 157, 253, 0.2);
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
  background: #539dfd;
  box-shadow: 0 0 10px rgba(83, 157, 253, 0.5);
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
  border: 2px solid rgba(83, 157, 253, 0.3);
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
  border-color: rgba(83, 157, 253, 0.3);
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.timeline-card:hover::before {
  opacity: 1;
}

.timeline-period {
  display: inline-block;
  padding: 6px 14px;
  background: rgba(83, 157, 253, 0.15);
  color: #539dfd;
  font-size: 14px;
  border-radius: 20px;
  margin-bottom: 12px;
  font-weight: 500;
}

.timeline-company {
  color: #fff;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 6px;
}

.timeline-position {
  color: #539dfd;
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
  background: #539dfd;
}

.timeline-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tag {
  padding: 4px 10px;
  background: rgba(83, 157, 253, 0.1);
  border: 1px solid rgba(83, 157, 253, 0.2);
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.tech-tag:hover {
  background: rgba(83, 157, 253, 0.2);
  border-color: rgba(83, 157, 253, 0.4);
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

  .timeline-company {
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
