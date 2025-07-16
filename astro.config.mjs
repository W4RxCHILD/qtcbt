import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind'; // ✅ Use this, not @tailwindcss/vite

export default defineConfig({
  site: 'https://quickturncbt.com',
  integrations: [
    starlight({
      title: 'QuickTurn CBT',
      sidebar: [
        {
          label: 'All CBTs',
          items: [
            {
              label: 'Cyber Awareness Challenge 2025 (Standard Challenge)',
              slug: 'cyber-awareness-challenge-2025-standard-challenge',
            },
            {
              label: 'Maintenance Cyber Discipline',
              slug: 'maintenance-cyber-discipline',
            },
            {
              label: 'Records Management',
              slug: 'records-management',
            },
            {
              label: 'Survival, Evasion, Resistance, and Escape',
              slug: 'survival-evasion-resistance-and-escape',
            },
          ],
        },
        {
          label: 'Coming Soon',
          items: [
            {
              label: 'Cyber Awareness Challenge 2025 (Knowledge Check Option)',
              slug: 'cyber-awareness-challenge-2025-knowledge-check-option',
            },
            { label: 'Force Protection', slug: 'force-protection' },
          ],
        },
      ],
    }),
    react(),
    tailwind(), // ✅ Correct Tailwind integration
    sitemap(),
  ],
});
