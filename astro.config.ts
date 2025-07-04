import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://quickturncbt.com',
  integrations: [
    react(),
    tailwind(),
    sitemap(),
    starlight({
      title: 'QuickTurn CBT',
      sidebar: [
        {
          label: 'All CBTs',
          items: [
            { label: 'Cyber Awareness Challenge 2025', link: '/cyber-awareness-challenge-2025' },
            { label: 'Maintenance Cyber Discipline', link: '/maintenance-cyber-discipline' },
            { label: 'Records Management', link: '/records-management' },
          ],
        },
      ],
      components: './src/starlight/components.ts', // ✅ this is the missing link
    }),
  ],
});
