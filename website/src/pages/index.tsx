import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div className="col col--6">
            <Heading as="h1" className="hero__title">
              {siteConfig.title}
            </Heading>
            <p className="hero__subtitle padding-bottom--lg">{siteConfig.tagline}</p>
            <div className={styles.flexContainer}>
                <Link to="/docs/welcome" className={clsx("button button--primary button--lg shadow--md", styles.actionButton)}>Read the documentation</Link>
                <Link to="/model-reference/reading-this-documentation" className={clsx("button button--outline button--primary button--lg", styles.actionButton)}>Data model reference</Link>
            </div>
          </div>
        <div className="col col--6">
          <img src='img/CEM-system-1536x864.png' alt='S2-system'></img>
        </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="The place to learn everything about creating interoperable energy management solutions.">
      <HomepageHeader />
      <main>
      </main>
    </Layout>
  );
}
