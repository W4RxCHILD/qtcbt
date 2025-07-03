// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://quickturncbt.com',  // ✅ Move it here (top level)
  integrations: [
    starlight({
      title: 'QuickTurn CBT',
      sidebar: [
        {
          label: 'All CBTs',
          items: [
            { label: 'Cyber Awareness Challenge 2025', slug: 'cyber-awareness-challenge-2025' },
            { label: 'Maintenance Cyber Discipline', slug: 'maintenance-cyber-discipline' },
            { label: 'Records Management', slug: 'records-management' },
          ]
        },
      ],
    }),
    react(),
    sitemap(), // ✅ Sitemap will now build properly
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
