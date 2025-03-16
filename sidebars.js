// @ts-nocheck
/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    {
      type: "doc",
      id: "anytype_documentation",
      label: "Anytype Documentation",
    },
    {
      type: "doc",
      id: "anytype_component_relationships",
      label: "Component Relationships",
    },
    {
      type: "doc",
      id: "project_analysis_tracker",
      label: "Project Analysis Tracker",
    },
    {
      type: "category",
      label: "Frontend",
      link: {
        type: "doc",
        id: "frontend/index",
      },
      items: ["frontend/stores"],
    },
    {
      type: "category",
      label: "Backend",
      link: {
        type: "doc",
        id: "backend/index",
      },
      items: ["backend/block_service"],
    },
    {
      type: "category",
      label: "Sync",
      link: {
        type: "doc",
        id: "sync/index",
      },
      items: ["sync/crdt"],
    },
    {
      type: "category",
      label: "Integration",
      link: {
        type: "doc",
        id: "integration/index",
      },
      items: ["integration/frontend_backend"],
    },
  ],
};

export default sidebars;
