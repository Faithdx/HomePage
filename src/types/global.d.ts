declare interface Wall {
  id: number
  name: string
  content: string
  createTime?: string
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
