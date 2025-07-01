import { defineConfig } from '@astrojs/starlight/config';

export default defineConfig({
  title: 'QuickTurn CBT',
  description: 'CBTs',
  components: {
    layout: './src/components/GlobalLayout.astro',
  },
  sidebar: [
    {
      label: 'All CBTs',
      items: [
        { label: 'Maintenance Cyber Discipline', link: '/docs/maintenance-cyber-discipline' },
        { label: 'Test2', link: '/docs/test2' },
        { label: 'Test3', link: '/docs/test3' },
        { label: 'Test4', link: '/docs/test4' },
        { label: 'Test5', link: '/docs/test5' },
        { label: 'Test6', link: '/docs/test6' },
        { label: 'Test7', link: '/docs/test7' },
      ]
    }
  ]
});
