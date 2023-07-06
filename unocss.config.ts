import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetScrollbar } from 'unocss-preset-scrollbar'

// @unocss-include
export default defineConfig({
  shortcuts: [
    ['n-link', 'op50 hover:(op100 text-primary) transition'],
    ['n-link-text', 'n-link underline'],
    ['n-tab', 'text-xl tracking-wide uppercase p3 border-b-2 border-transparent op20 transition'],
    ['n-tab-active', 'border-current op100'],
    ['border-base', 'border-gray-400/20'],
  ],
  rules: [
    [/^view-transition-([\w-]+)$/, ([, name]) => ({ 'view-transition-name': name, 'contain': 'layout' })],
    ['bg-muted-50', { 'background-color': 'rgb(248 250 252)' }],
    ['bg-muted-100', { 'background-color': 'rgb(241 245 249)' }],
    ['bg-muted-200', { 'background-color': 'rgb(226 232 240)' }],
    ['bg-muted-300', { 'background-color': 'rgb(203 213 225)' }],
    ['bg-muted-400', { 'background-color': 'rgb(148 163 184)' }],
    ['bg-muted-500', { 'background-color': 'rgb(100 116 139)' }],
    ['bg-muted-600', { 'background-color': 'rgb(71 85 105)' }],
    ['bg-muted-700', { 'background-color': 'rgb(51 65 85)' }],
    ['bg-muted-800', { 'background-color': 'rgb(30 41 59)' }],
    ['bg-muted-900', { 'background-color': 'rgb(15 23 42)' }],
    ['bg-muted-950', { 'background-color': 'rgb(2 6 23)' }],
  ],
  theme: {
    colors: {
      primary: '#41b883',
    },

  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.3,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
    presetScrollbar(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
