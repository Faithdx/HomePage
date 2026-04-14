<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import * as simpleIcons from 'simple-icons'

interface Props {
  iconSlugs: string[]
}

const props = defineProps<Props>()

const containerRef = ref<HTMLDivElement>()
const iconsData = ref<Array<{
  slug: string
  svg: string
  hex: string
  x: number
  y: number
  z: number
  rx: number
  ry: number
  rz: number
  scale: number
  opacity: number
}>>([])

const getIconData = (slug: string) => {
  const iconKey = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}` as keyof typeof simpleIcons
  const icon = simpleIcons[iconKey]
  if (!icon) return null
  return {
    slug,
    svg: icon.svg,
    hex: icon.hex,
    title: icon.title
  }
}

// 云状球面分布 - 使用斐波那契球面算法
const createCloudDistribution = (count: number, index: number) => {
  const goldenRatio = (1 + Math.sqrt(5)) / 2
  const theta = 2 * Math.PI * index / goldenRatio
  const phi = Math.acos(1 - 2 * (index + 0.5) / count)

  return {
    x: Math.cos(theta) * Math.sin(phi),
    y: Math.sin(theta) * Math.sin(phi),
    z: Math.cos(phi)
  }
}

onMounted(() => {
  const icons: typeof iconsData.value = []

  for (let i = 0; i < props.iconSlugs.length; i++) {
    const slug = props.iconSlugs[i]
    const iconData = getIconData(slug)
    if (!iconData) continue

    const pos = createCloudDistribution(props.iconSlugs.length, i)

    icons.push({
      slug,
      svg: iconData.svg,
      hex: iconData.hex,
      x: pos.x,
      y: pos.y,
      z: pos.z,
      rx: pos.x,
      ry: pos.y,
      rz: pos.z,
      scale: 1,
      opacity: 1
    })
  }

  iconsData.value = icons

  if (!containerRef.value) return

  let rotationX = 0.1
  let rotationY = -0.1
  let targetRotationX = 0.1
  let targetRotationY = -0.1
  let isHovering = false
  let mouseX = 0
  let mouseY = 0

  // 动画参数 - 匹配原项目的 maxSpeed: 0.04, minSpeed: 0.02
  const maxSpeed = 0.04
  const minSpeed = 0.02
  let currentSpeed = minSpeed

  const handleMouseMove = (e: MouseEvent) => {
    const rect = containerRef.value!.getBoundingClientRect()
    mouseX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    mouseY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)

    // 目标旋转角度 - 匹配原项目 initial: [0.1, -0.1]
    targetRotationY = mouseX * 0.5 - 0.1
    targetRotationX = -mouseY * 0.5 + 0.1
  }

  const handleMouseEnter = () => {
    isHovering = true
  }

  const handleMouseLeave = () => {
    isHovering = false
    targetRotationX = 0.1
    targetRotationY = -0.1
  }

  containerRef.value.addEventListener('mousemove', handleMouseMove)
  containerRef.value.addEventListener('mouseenter', handleMouseEnter)
  containerRef.value.addEventListener('mouseleave', handleMouseLeave)

  let animationId: number

  const animate = () => {
    // 速度插值
    if (isHovering) {
      currentSpeed += (maxSpeed - currentSpeed) * 0.1
      rotationX += (targetRotationX - rotationX) * 0.08
      rotationY += (targetRotationY - rotationY) * 0.08
    } else {
      currentSpeed += (minSpeed - currentSpeed) * 0.05
      // 自动旋转 - reverse: true 表示反向旋转
      rotationY -= currentSpeed
      rotationX = rotationX * 0.98 + 0.1 * 0.02
    }

    const cosX = Math.cos(rotationX)
    const sinX = Math.sin(rotationX)
    const cosY = Math.cos(rotationY)
    const sinY = Math.sin(rotationY)

    // 更新每个图标的位置
    iconsData.value = iconsData.value.map(icon => {
      // 3D 旋转计算
      const y1 = icon.y * cosX - icon.z * sinX
      const z1 = icon.y * sinX + icon.z * cosX
      const x2 = icon.x * cosY - z1 * sinY
      const z2 = icon.x * sinY + z1 * cosY

      // 深度缩放 - 匹配原项目 depth: 1, imageScale: 2
      const depthScale = (z2 + 1) / 2
      const scale = 0.5 + depthScale * 0.8
      const opacity = 0.4 + depthScale * 0.6

      return {
        ...icon,
        rx: x2,
        ry: y1,
        rz: z2,
        scale,
        opacity
      }
    }).sort((a, b) => a.rz - b.rz)

    animationId = requestAnimationFrame(animate)
  }

  animate()

  return () => {
    cancelAnimationFrame(animationId)
    containerRef.value?.removeEventListener('mousemove', handleMouseMove)
    containerRef.value?.removeEventListener('mouseenter', handleMouseEnter)
    containerRef.value?.removeEventListener('mouseleave', handleMouseLeave)
  }
})

// 生成 SVG Data URL
const getSvgDataUrl = (svg: string, hex: string) => {
  const coloredSvg = svg.replace(/fill="[^"]*"/g, '').replace('<svg', `<svg fill="#${hex}"`)
  return `data:image/svg+xml;base64,${btoa(coloredSvg)}`
}
</script>

<template>
  <div
    ref="containerRef"
    class="icon-cloud-container"
  >
    <div class="icon-cloud-scene">
      <div
        v-for="icon in iconsData"
        :key="icon.slug"
        class="icon-item"
        :style="{
          transform: `translate(-50%, -50%) translate3d(${icon.rx * 180}px, ${icon.ry * 150}px, ${icon.rz * 100}px) scale(${icon.scale})`,
          opacity: icon.opacity,
          zIndex: Math.round((icon.rz + 1) * 50)
        }"
      >
        <img
          :src="getSvgDataUrl(icon.svg, icon.hex)"
          :alt="icon.slug"
          class="icon-image"
          width="42"
          height="42"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon-cloud-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 40px;
  min-height: 400px;
  cursor: default;
  user-select: none;
}

.icon-cloud-scene {
  position: relative;
  width: 400px;
  height: 350px;
  perspective: 800px;
  transform-style: preserve-3d;
}

.icon-item {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 42px;
  height: 42px;
  transition: none;
  will-change: transform, opacity;
  pointer-events: none;
}

.icon-image {
  width: 42px;
  height: 42px;
  display: block;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}
</style>
