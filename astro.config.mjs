// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap'; // ✅ Add this line
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [
    starlight({
      title: 'QuickTurn CBT',
      site: 'https://quickturncbt.com', // ✅ Required by sitemap plugin
      sidebar: [
        {
          label: 'All CBTs',
          items: [
            { label: 'Maintenance Cyber Discipline', slug: 'maintenance-cyber-discipline' },
            { label: 'Records Management', slug: 'records-management' },
          ]
        },
      ],
    }),
    react(),
    sitemap(), // ✅ Add this plugin here
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
