import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import AutoImport from 'astro-auto-import';

export default defineConfig({
  site: 'https://yourblog.com',
  output: 'static',
  trailingSlash: 'never',

  integrations: [
    AutoImport({
      imports: [
        // ← было 'components', стало 'imports'
        './src/components/Image.astro',
        // можно добавить другие компоненты или объекты с именованными экспортами
      ],
    }),
    mdx(), // ← важно: после AutoImport
    sitemap(),
    partytown({ config: { forward: ['dataLayer.push'] } }),
  ],
});
