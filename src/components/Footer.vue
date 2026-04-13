<template>
  <footer class="bg-dark text-gray-400 py-16 border-t border-white/5">
    <div class="container mx-auto px-6">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-8 md:mb-0 text-center md:text-left">
          <a href="#" class="text-3xl font-display font-bold text-gradient">Portfolio</a>
          <p class="mt-4 text-lg">© 2024 个人作品集. 保留所有权利.</p>
        </div>
        <div class="flex flex-wrap justify-center gap-8">
          <a v-for="item in navItems" :key="item.href" :href="item.href" class="text-lg hover:text-white transition-colors duration-300 group">
            {{ item.text }}
            <span class="block h-0.5 bg-secondary w-0 group-hover:w-full transition-all duration-300"></span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const navItems = [
  { href: '#about', text: '关于我' },
  { href: '#experience', text: '工作经历' },
  { href: '#projects', text: '项目展示' },
  { href: '#works', text: '我的作品' },
  { href: '#contact', text: '联系我' }
]
</script>
