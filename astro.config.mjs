import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import AutoImport from 'astro-auto-import'; // ← добавить

export default defineConfig({
  site: 'https://yourblog.com',
  output: 'static',
  trailingSlash: 'never',

  integrations: [
    AutoImport({
      imports: [
        './src/components/Image.astro', // ← одна строка
      ],
    }),
    mdx(), // ← ВАЖНО: AutoImport ДО mdx()
    sitemap(),
    partytown({ config: { forward: ['dataLayer.push'] } }),
  ],
});
