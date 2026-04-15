/**
 * 简历板块配置
 * 用于控制各板块的显示/隐藏以及显示顺序
 */

export type SectionId = 'workExperience' | 'projectExperience' | 'location' | 'passion' | 'global' | 'education' | 'openSource' | 'skills'

export interface SectionConfig {
  id: SectionId
  name: string
  visible: boolean
  order: number
}

/**
 * 默认板块配置
 * 可以通过修改此配置来调整板块的显示顺序和可见性
 */
export const defaultSectionConfig: SectionConfig[] = [
  {
    id: 'location',
    name: '工作地点',
    visible: true,
    order: 1
  },
  {
    id: 'workExperience',
    name: '工作经历',
    visible: true,
    order: 2
  },
  {
    id: 'projectExperience',
    name: '项目经历',
    visible: true,
    order: 3
  },
  {
    id: 'passion',
    name: '热爱',
    visible: true,
    order: 4
  },
  {
    id: 'global',
    name: '全局',
    visible: true,
    order: 5
  },
  {
    id: 'education',
    name: '教育背景',
    visible: true,
    order: 6
  },
  {
    id: 'openSource',
    name: '开源项目',
    visible: true,
    order: 7
  },
  {
    id: 'skills',
    name: '技能',
    visible: true,
    order: 8
  }
]

/**
 * 获取排序后的板块配置
 * @param config 板块配置数组
 * @returns 按 order 排序的可见板块数组
 */
export function getSortedVisibleSections(config: SectionConfig[] = defaultSectionConfig): SectionConfig[] {
  return config
    .filter(section => section.visible)
    .sort((a, b) => a.order - b.order)
}

/**
 * 获取板块顺序映射
 * 用于快速查找某个板块的顺序
 */
export function getSectionOrderMap(config: SectionConfig[] = defaultSectionConfig): Map<SectionId, number> {
  const map = new Map<SectionId, number>()
  config.forEach(section => {
    map.set(section.id, section.order)
  })
  return map
}

/**
 * 切换板块显示状态
 * @param config 当前配置
 * @param sectionId 板块ID
 * @returns 更新后的配置
 */
export function toggleSectionVisibility(config: SectionConfig[], sectionId: SectionId): SectionConfig[] {
  return config.map(section =>
    section.id === sectionId
      ? { ...section, visible: !section.visible }
      : section
  )
}

/**
 * 更新板块顺序
 * @param config 当前配置
 * @param sectionId 板块ID
 * @param newOrder 新顺序
 * @returns 更新后的配置
 */
export function updateSectionOrder(config: SectionConfig[], sectionId: SectionId, newOrder: number): SectionConfig[] {
  return config.map(section =>
    section.id === sectionId
      ? { ...section, order: newOrder }
      : section
  )
}

/**
 * 移动板块位置（交换两个板块的顺序）
 * @param config 当前配置
 * @param sectionId 要移动的板块ID
 * @param direction 移动方向：'up' | 'down'
 * @returns 更新后的配置
 */
export function moveSection(config: SectionConfig[], sectionId: SectionId, direction: 'up' | 'down'): SectionConfig[] {
  const sortedSections = getSortedVisibleSections(config)
  const currentIndex = sortedSections.findIndex(s => s.id === sectionId)
  
  if (currentIndex === -1) return config
  
  const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
  
  if (targetIndex < 0 || targetIndex >= sortedSections.length) return config
  
  const currentOrder = sortedSections[currentIndex].order
  const targetOrder = sortedSections[targetIndex].order
  
  return config.map(section => {
    if (section.id === sectionId) {
      return { ...section, order: targetOrder }
    }
    if (section.id === sortedSections[targetIndex].id) {
      return { ...section, order: currentOrder }
    }
    return section
  })
}
