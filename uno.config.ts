import { defineConfig, presetWind, presetIcons, presetTypography, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [
    presetWind(),
    presetIcons({
      collections: {
        carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
      },
    }),
    presetTypography(),
  ],
  transformers: [
    transformerDirectives(),
  ],
  theme: {
    colors: {
      primary: '#539dfd',
    },
  },
  shortcuts: {
    'flex-center': 'flex items-center justify-center',
    'absolute-center': 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  },
})
