import { defineConfig } from '@astrojs/starlight/config';

export default defineConfig({
  title: 'QuickTurn CBT',
  site: 'https://quickturncbt.com',
  sitemap: true,
  description: 'CBTs',
  components: {
    docFooter: './src/components/BuyMeACoffee.astro',
  },
  sidebar: [
    {
      label: 'All CBTs',
      items: [
        { label: 'Maintenance Cyber Discipline', link: '/docs/maintenance-cyber-discipline' },
        { label: 'Records Management', link: '/docs/records-management' },
        // etc.
      ]
    }
  ]
});
