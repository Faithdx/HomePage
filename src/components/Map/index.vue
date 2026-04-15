<script setup lang="ts">
import { ref, onMounted } from 'vue'

const mapContainer = ref<HTMLElement>()
const mapLoaded = ref(false)
const mapError = ref(false)



onMounted(() => {
  // 尝试加载高德地图
  import('@amap/amap-jsapi-loader').then((AMapLoader) => {
    AMapLoader.load({
      key: '', // 高德地图 key（为空时使用静态地图）
      version: '2.0',
      plugins: [],
    }).then((AMap: any) => {
      if (!mapContainer.value) return
      
      const map = new AMap.Map(mapContainer.value, {
        zoom: 11,
        center: [108.95, 34.27], // 西安坐标
        viewMode: '3D',
        mapStyle: 'amap://styles/dark', // 深色主题
      })
      
      // 添加标记
      const marker = new AMap.Marker({
        position: [108.95, 34.27],
        title: '陕西西安',
        animation: 'AMAP_ANIMATION_DROP',
      })
      
      // 添加信息窗体
      const infoWindow = new AMap.InfoWindow({
        content: '<div style="padding: 10px; color: #333;"><h4 style="margin: 0 0 5px 0;">陕西西安</h4><p style="margin: 0; font-size: 12px;">当前工作地点</p></div>',
        offset: new AMap.Pixel(0, -30)
      })
      
      marker.on('click', () => {
        infoWindow.open(map, marker.getPosition())
      })
      
      map.add(marker)
      mapLoaded.value = true
    }).catch(() => {
      mapError.value = true
    })
  }).catch(() => {
    mapError.value = true
  })
})
</script>

<template>
  <div class="relative w-full h-[400px] rounded-xl overflow-hidden bg-gray-900">
    <!-- 高德地图容器 -->
    <div ref="mapContainer" class="w-full h-full" />
    
    <!-- 加载状态 -->
    <div v-if="!mapLoaded && !mapError" class="absolute inset-0 flex items-center justify-center bg-gray-900">
      <div class="flex flex-col items-center">
        <div class="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p class="text-gray-400 mt-4 text-sm">地图加载中...</p>
      </div>
    </div>
    
    <!-- 错误状态 - 显示静态地图样式 -->
    <div v-if="mapError" class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
      <div class="text-center">
        <div class="text-6xl mb-4">📍</div>
        <h3 class="text-white text-xl font-semibold mb-2">陕西西安</h3>
        <p class="text-gray-400 text-sm">当前工作地点</p>
        <div class="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-500">
          <span>121.56°E</span>
          <span>|</span>
          <span>29.86°N</span>
        </div>
      </div>
    </div>
    
    <!-- 位置标签 -->
    <div class="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg">
      <div class="flex items-center space-x-2">
        <div class="w-2 h-2 bg-primary rounded-full animate-pulse" />
        <span class="text-white text-sm">陕西西安</span>
      </div>
    </div>
  </div>
</template>
