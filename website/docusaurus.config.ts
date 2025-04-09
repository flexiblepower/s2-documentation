import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'S2 Documentation',
  tagline: 'The place to learn everthing about creating interoperable energy management solutions',
  favicon: 'img/logo-s2-no-text.svg',

  // Set the production url of your site here
  url: 'https://docs.s2standard.org/',
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'flexiblepower', // Usually your GitHub org/user name.
  projectName: 's2-documentation', // Usually your repo name.
  deploymentBranch: 'deployment',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  trailingSlash: true,

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          breadcrumbs: false,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'The S2 Standard',
      logo: {
        alt: 'S2 Standard',
        src: 'img/Logo-S2-no-text.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/flexiblepower/s2-documentation',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Language-specific tooling',
          items: [
            {
              label: 'Rust crate',
              href: 'https://crates.io/crates/s2energy',
            },
            {
              label: 'Python library',
              href: 'https://pypi.org/project/s2-python/',
            }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Flexiblepower Alliance Network (FAN).`,
    },
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      }
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
