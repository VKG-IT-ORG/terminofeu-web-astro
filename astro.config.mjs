// @ts-check
import { defineConfig } from 'astro/config'
import alpinejs from '@astrojs/alpinejs'
import tailwindcss from '@tailwindcss/vite'
import { i18n, filterSitemapByDefaultLocale } from 'astro-i18n-aut/integration'
import sitemap from '@astrojs/sitemap'
import { defaultLocale, locales } from './src/i18n/config.ts'

// https://astro.build/config
export default defineConfig({
  site: 'https://terminofeu.ch/',
  trailingSlash: 'always',
  compressHTML: false,
  build: {
    format: 'directory',
  },
  integrations: [
    alpinejs({ entrypoint: '/src/ts/alpine' }),
    i18n({
      locales,
      defaultLocale,
    }),
    sitemap({
      i18n: {
        locales,
        defaultLocale,
      },
      filter: filterSitemapByDefaultLocale({ defaultLocale }),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
