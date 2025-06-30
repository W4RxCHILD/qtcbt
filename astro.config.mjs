// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'QuickTurn CBT',
      sidebar: [
        {
          label: 'All CBTs',
		  items: [
			  { label: 'Maintenance Cyber Discipline', slug: 'maintenance-cyber-discipline' }
		  ]
        },
      ],
    }),
  ],
});
