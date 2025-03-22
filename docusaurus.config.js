// @ts-nocheck
// Note: TypeScript annotations are for development purposes only
// and don't affect functionality

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Anytype Documentation",
  tagline: "Comprehensive documentation for the Anytype system",
  favicon: "img/favicon.ico",

  url: "https://konan69.github.io",
  baseUrl: "/anytype-docs/",

  // GitHub pages deployment config.
  organizationName: "konan69",
  projectName: "anytype-docs",
  trailingSlash: false,
  deploymentBranch: "gh-pages",

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/konan69/anytype-docs/tree/main/",
          routeBasePath: "docs",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/anytype-social-card.png",
      navbar: {
        title: "Anytype Documentation",
        logo: {
          alt: "Anytype Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            to: "/docs/anytype_documentation",
            position: "left",
            label: "Documentation",
          },
          {
            to: "/docs/frontend/stores",
            position: "left",
            label: "Frontend",
          },
          {
            to: "/docs/backend/block_service",
            position: "left",
            label: "Backend",
          },
          {
            to: "/docs/sync/crdt",
            position: "left",
            label: "Sync",
          },
          {
            to: "/docs/integration/frontend_backend",
            position: "left",
            label: "Integration",
          },
          {
            href: "https://github.com/anyproto/anytype-ts",
            label: "GitHub",
            position: "right",
          },
          {
            href: "https://anytype.io",
            label: "Official Website",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Main Documentation",
                to: "/docs/anytype_documentation",
              },
              {
                label: "Component Relationships",
                to: "/docs/anytype_component_relationships",
              },
              {
                label: "Project Analysis",
                to: "/docs/project_analysis_tracker",
              },
            ],
          },
          {
            title: "Components",
            items: [
              {
                label: "Frontend",
                to: "/docs/frontend/stores",
              },
              {
                label: "Backend",
                to: "/docs/backend/block_service",
              },
              {
                label: "Sync",
                to: "/docs/sync/crdt",
              },
              {
                label: "Integration",
                to: "/docs/integration/frontend_backend",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/anyproto",
              },
              {
                label: "Anytype.io",
                href: "https://anytype.io",
              },
            ],
          },
        ],
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ["go", "protobuf"],
      },
      colorMode: {
        defaultMode: "dark",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    }),
};

export default config;
