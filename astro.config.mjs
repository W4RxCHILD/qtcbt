// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [starlight({
    title: 'QuickTurn CBT',
    sidebar: [
      {
        label: 'All CBTs',
        items: [
            { label: 'Maintenance Cyber Discipline', slug: 'maintenance-cyber-discipline' },
      { label: 'Test 2', slug: 'test2' },

        ]
      },
    ],
  }), react()],

  vite: {
    plugins: [tailwindcss()],
  },
});