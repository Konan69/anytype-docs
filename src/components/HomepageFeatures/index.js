import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Frontend",
    description: (
      <>
        TypeScript frontend built with React and MobX for state management.
        Includes the UI components, state management, and integration with the
        backend.
      </>
    ),
    link: "/docs/frontend",
  },
  {
    title: "Backend",
    description: (
      <>
        Go backend with sophisticated object and block storage systems.
        Implements the core business logic, data storage, and synchronization
        services.
      </>
    ),
    link: "/docs/backend",
  },
  {
    title: "Sync",
    description: (
      <>
        CRDT-based synchronization for offline-first editing. Enables
        conflict-free updates in a distributed environment for seamless
        multi-device use.
      </>
    ),
    link: "/docs/sync",
  },
  {
    title: "Integration",
    description: (
      <>
        Frontend-backend integration via IPC and commands. Clear separation of
        concerns with well-defined interfaces between components.
      </>
    ),
    link: "/docs/integration",
  },
  {
    title: "Component Relationships",
    description: (
      <>
        Analysis of how the different components of Anytype interact and depend
        on each other, with detailed diagrams and implementation insights.
      </>
    ),
    link: "/docs/anytype_component_relationships",
  },
  {
    title: "Project Tracker",
    description: (
      <>
        Track the progress of the project analysis, including completed tasks,
        key findings, and technical architecture insights.
      </>
    ),
    link: "/docs/project_analysis_tracker",
  },
];

function Feature({ title, description, link }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="card margin-bottom--lg">
        <div className="card__header">
          <h3>{title}</h3>
        </div>
        <div className="card__body">
          <p>{description}</p>
        </div>
        <div className="card__footer">
          <a href={link} className="button button--primary button--block">
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
