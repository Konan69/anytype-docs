import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/anytype_documentation"
          >
            Read Documentation
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Comprehensive documentation for the Anytype system - a privacy-focused, offline-first personal knowledge management application."
    >
      <HomepageHeader />
      <main>
        <div className="container margin-top--lg">
          <div className="row">
            <div className="col col--12">
              <div className={styles.introduction}>
                <h2>About Anytype</h2>
                <p>
                  Anytype is a privacy-focused, offline-first personal knowledge
                  management system that allows users to create, connect, and
                  organize information using various object types and
                  relationships. The application is built with a distributed
                  architecture that supports local-first operation with optional
                  sync capabilities.
                </p>
                <p>
                  This documentation provides a comprehensive analysis of the
                  Anytype codebase, including its architecture, components, and
                  how they interact with each other.
                </p>
              </div>
            </div>
          </div>
        </div>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
