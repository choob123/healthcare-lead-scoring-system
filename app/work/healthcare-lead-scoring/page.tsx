import type { Metadata } from "next";
import Link from "next/link";
import HealthcareLeadScoringDemo from "./HealthcareLeadScoringDemo";
import styles from "./HealthcareLeadScoring.module.css";

export const metadata: Metadata = {
  title: "CareSignal — Healthcare Lead-Scoring System | Prasiddha Karki",
  description: "An explainable, deterministic healthcare organization lead-scoring demonstration with synthetic fixtures, role-based routing, and a browser-local CRM handoff preview.",
  alternates: { canonical: "https://prasiddhakarki.online/work/healthcare-lead-scoring" },
  openGraph: {
    title: "CareSignal — Explainable Healthcare Lead Qualification",
    description: "A 0–100 deterministic ICP scoring workflow built around synthetic organization data, visible weights, human review, and no PHI.",
    type: "article",
    url: "https://prasiddhakarki.online/work/healthcare-lead-scoring",
    images: [{ url: "https://prasiddhakarki.online/og-live-products.png", width: 1200, height: 630, alt: "Prasiddha Karki AI systems portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CareSignal — Explainable Healthcare Lead Qualification",
    description: "Synthetic organization fixtures, visible deterministic weights, role-based routing, and a local CRM handoff preview.",
    images: ["https://prasiddhakarki.online/og-live-products.png"],
  },
};

const workflow = [
  { title: "Capture organization context", copy: "Collect bounded company-level attributes—never patient, clinical, or personal contact data." },
  { title: "Apply visible ICP weights", copy: "Five deterministic factors contribute a documented maximum of 100 points." },
  { title: "Explain qualification", copy: "Show every subscore, rationale, and the 70-point human-review threshold." },
  { title: "Suggest role functions", copy: "Recommend decision-maker roles without identifying or inferring individual people." },
  { title: "Preview the handoff", copy: "Create a browser-local HubSpot-style JSON preview; a person decides what happens next." },
];

const technologies = [
  ["React 19", "Interactive fixture selection, editable organization inputs, and browser-local state."],
  ["TypeScript", "Typed inputs, scoring factors, qualification results, and CRM-preview structure."],
  ["Deterministic scoring", "Five inspectable weighted rules; no model inference and no hidden coefficients."],
  ["CSS Modules", "Responsive product interface, accessible focus states, and an isolated visual system."],
  ["Browser Blob API", "Local JSON handoff download without a server request or third-party transmission."],
  ["Node test runner", "Source and rendered-route checks for weights, boundaries, semantics, and export behavior."],
];

const safeguards = [
  { title: "Synthetic by construction", copy: "Every bundled organization is invented and explicitly labeled synthetic. Fixture outcomes are evaluation artifacts, not market claims." },
  { title: "No patient or PHI surface", copy: "The interface accepts organization context only. There are no patient, diagnosis, treatment, claim, medical-record, or health-outcome fields." },
  { title: "No personal prospecting", copy: "The system suggests role functions such as VP of Patient Access. It never supplies names, profiles, emails, phone numbers, or inferred identities." },
  { title: "Human-gated qualification", copy: "A score above 70 creates a review priority—not permission to contact, evidence of intent, or an automated sales action." },
  { title: "Local handoff preview", copy: "The HubSpot-style payload is displayed and downloaded in the browser. This demo has no HubSpot credential and performs no external transmission." },
  { title: "Bounded evaluation claim", copy: "Fixture agreement checks deterministic consistency on six invented records. It is not predictive accuracy, conversion lift, or a fairness audit." },
];

export default function HealthcareLeadScoringPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CareSignal",
    alternateName: "Healthcare lead-scoring system",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web browser",
    description: "A deterministic healthcare organization ICP scoring demonstration using synthetic fixtures and no patient data or PHI.",
    author: { "@type": "Person", name: "Prasiddha Karki", url: "https://prasiddhakarki.online" },
    url: "https://prasiddhakarki.online/work/healthcare-lead-scoring",
  };

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <a className={styles.skipLink} href="#main-content">Skip to project</a>

      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Return to Prasiddha Karki portfolio">PK® <span>/ CareSignal</span></Link>
        <nav aria-label="Project navigation">
          <a href="#interactive-demo">Live system</a>
          <a href="#architecture">Workflow</a>
          <span className={styles.repoPending}>GitHub · publishing</span>
        </nav>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="page-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><i aria-hidden="true" />AI-assisted sales operations / explainable by design</p>
            <p className={styles.productName}>CareSignal / Healthcare lead-scoring system</p>
            <h1 id="page-title">Turn fit signals into a reasoned review queue.</h1>
            <p className={styles.heroSummary}>A deterministic 0–100 ICP scoring product for healthcare organizations—built with synthetic fixtures, visible weights, role-based routing, and a human-gated CRM handoff.</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryAction} href="#interactive-demo">Run the scoring lab <span aria-hidden="true">↓</span></a>
              <span className={`${styles.secondaryAction} ${styles.repoPending}`}>Repository publishing pending</span>
            </div>
            <ul className={styles.heroBoundary} aria-label="Project data boundaries">
              <li><strong>100%</strong><span>Inspectable scoring</span></li>
              <li><strong>0</strong><span>Patient / PHI fields</span></li>
              <li><strong>Human</strong><span>Final review gate</span></li>
            </ul>
          </div>

          <div className={styles.heroSystem} aria-label="System summary">
            <div className={styles.orbit} aria-hidden="true"><i /><i /><i /></div>
            <div className={styles.heroScore}><span>ICP</span><strong>70</strong><small>Qualified threshold</small></div>
            <div className={styles.heroSignals}>
              <span>Org fit / 25</span><span>Scale / 20</span><span>Need / 25</span><span>Readiness / 15</span><span>Intent / 15</span>
            </div>
            <p><i aria-hidden="true" />Deterministic rules online</p>
          </div>
        </section>

        <section className={styles.boundaryBanner} aria-label="Healthcare data boundary">
          <strong>Synthetic organization data only</strong>
          <p>No patient data, protected health information (PHI), contact enrichment, or automated outreach is used anywhere in this project.</p>
        </section>

        <section className={styles.workflowSection} id="architecture" aria-labelledby="workflow-title">
          <div className={styles.sectionHeading}>
            <div><p>01 / Accessible system workflow</p><h2 id="workflow-title">Five bounded stages.<br />One human decision.</h2></div>
            <p>The interface turns a sales-operations process into readable HTML, so the architecture remains understandable without animation, canvas, or an image.</p>
          </div>
          <ol className={styles.workflow} aria-label="Healthcare lead scoring workflow">
            {workflow.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{step.title}</h3><p>{step.copy}</p></div>
              </li>
            ))}
          </ol>
          <div className={styles.weightBar} aria-label="Scoring weights total 100 points">
            <span style={{ flex: 25 }}>Organization fit <b>25</b></span>
            <span style={{ flex: 20 }}>Scale <b>20</b></span>
            <span style={{ flex: 25 }}>Need <b>25</b></span>
            <span style={{ flex: 15 }}>Readiness <b>15</b></span>
            <span style={{ flex: 15 }}>Intent <b>15</b></span>
          </div>
        </section>

        <HealthcareLeadScoringDemo />

        <section className={styles.videoSection} aria-labelledby="video-title">
          <div className={styles.sectionHeading}>
            <div><p>05 / Product walkthrough</p><h2 id="video-title">See the scoring decision<br />from input to handoff.</h2></div>
            <p>The 13-second walkthrough moves from the system overview through scoring, handoff, and the qualified-account dashboard. The text sequence beside it provides the same essential narrative.</p>
          </div>
          <div className={styles.videoGrid}>
            <div className={styles.videoFrame}>
              <video controls preload="metadata" playsInline poster="https://prasiddhakarki.online/demos/healthcare-lead-scoring-poster.png" aria-label="CareSignal product walkthrough" aria-describedby="video-transcript">
                <source src="https://prasiddhakarki.online/demos/healthcare-lead-scoring.mp4" type="video/mp4" />
                Your browser does not support embedded video. Use the written walkthrough beside it.
              </video>
              <span>CareSignal / healthcare lead-scoring walkthrough</span>
            </div>
            <div className={styles.transcript} id="video-transcript">
              <span>Text walkthrough</span>
              <ol>
                <li><b>00:00</b><p>Read the product boundary and 70-point qualification threshold.</p></li>
                <li><b>00:03</b><p>Follow the five-stage scoring and review architecture.</p></li>
                <li><b>00:05</b><p>Inspect a 69/100 nurture result and every weighted explanation.</p></li>
                <li><b>00:08</b><p>Preview the browser-local, no-transmission CRM handoff.</p></li>
                <li><b>00:11</b><p>Review the synthetic qualified-account dashboard and fixture outcome.</p></li>
              </ol>
            </div>
          </div>
        </section>

        <section className={styles.technologySection} aria-labelledby="technology-title">
          <div className={styles.sectionHeading}>
            <div><p>06 / Technology</p><h2 id="technology-title">A small stack with<br />an explicit job for every layer.</h2></div>
            <p>No generative model is used in the score. AI-assisted engineering supported product framing, implementation, adversarial review, and evaluation design.</p>
          </div>
          <div className={styles.technologyGrid}>
            {technologies.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </section>

        <section className={styles.safeguardSection} aria-labelledby="safeguards-title">
          <div className={styles.sectionHeading}>
            <div><p>07 / Safeguards</p><h2 id="safeguards-title">What this system<br />refuses to pretend.</h2></div>
            <p>Healthcare-adjacent software earns trust by making its exclusions as concrete as its capabilities.</p>
          </div>
          <div className={styles.safeguardGrid}>
            {safeguards.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.copy}</p></div></article>)}
          </div>
        </section>

        <section className={styles.closing} aria-label="Project actions">
          <div><p>Explainable qualification / human controlled</p><h2>Score a synthetic lead.</h2></div>
          <div><a href="#interactive-demo">Open scoring lab ↑</a><span className={styles.repoPending}>GitHub publishing pending</span></div>
        </section>
      </main>

      <footer className={styles.footer}><span>© Prasiddha K. 2026</span><span>Independent product demonstration</span><Link href="/">Return to portfolio ↑</Link></footer>
    </div>
  );
}
import type { Metadata } from "next";
import Link from "next/link";
import HealthcareLeadScoringDemo from "./HealthcareLeadScoringDemo";
import styles from "./HealthcareLeadScoring.module.css";

export const metadata: Metadata = {
  title: "CareSignal — Healthcare Lead-Scoring System | Prasiddha Karki",
  description: "An explainable, deterministic healthcare organization lead-scoring demonstration with synthetic fixtures, role-based routing, and a browser-local CRM handoff preview.",
  alternates: { canonical: "https://prasiddhakarki.online/work/healthcare-lead-scoring" },
  openGraph: {
    title: "CareSignal — Explainable Healthcare Lead Qualification",
    description: "A 0–100 deterministic ICP scoring workflow built around synthetic organization data, visible weights, human review, and no PHI.",
    type: "article",
    url: "https://prasiddhakarki.online/work/healthcare-lead-scoring",
    images: [{ url: "https://prasiddhakarki.online/og-live-products.png", width: 1200, height: 630, alt: "Prasiddha Karki AI systems portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CareSignal — Explainable Healthcare Lead Qualification",
    description: "Synthetic organization fixtures, visible deterministic weights, role-based routing, and a local CRM handoff preview.",
    images: ["https://prasiddhakarki.online/og-live-products.png"],
  },
};

const workflow = [
  { title: "Capture organization context", copy: "Collect bounded company-level attributes—never patient, clinical, or personal contact data." },
  { title: "Apply visible ICP weights", copy: "Five deterministic factors contribute a documented maximum of 100 points." },
  { title: "Explain qualification", copy: "Show every subscore, rationale, and the 70-point human-review threshold." },
  { title: "Suggest role functions", copy: "Recommend decision-maker roles without identifying or inferring individual people." },
  { title: "Preview the handoff", copy: "Create a browser-local HubSpot-style JSON preview; a person decides what happens next." },
];

const technologies = [
  ["React 19", "Interactive fixture selection, editable organization inputs, and browser-local state."],
  ["TypeScript", "Typed inputs, scoring factors, qualification results, and CRM-preview structure."],
  ["Deterministic scoring", "Five inspectable weighted rules; no model inference and no hidden coefficients."],
  ["CSS Modules", "Responsive product interface, accessible focus states, and an isolated visual system."],
  ["Browser Blob API", "Local JSON handoff download without a server request or third-party transmission."],
  ["Node test runner", "Source and rendered-route checks for weights, boundaries, semantics, and export behavior."],
];

const safeguards = [
  { title: "Synthetic by construction", copy: "Every bundled organization is invented and explicitly labeled synthetic. Fixture outcomes are evaluation artifacts, not market claims." },
  { title: "No patient or PHI surface", copy: "The interface accepts organization context only. There are no patient, diagnosis, treatment, claim, medical-record, or health-outcome fields." },
  { title: "No personal prospecting", copy: "The system suggests role functions such as VP of Patient Access. It never supplies names, profiles, emails, phone numbers, or inferred identities." },
  { title: "Human-gated qualification", copy: "A score above 70 creates a review priority—not permission to contact, evidence of intent, or an automated sales action." },
  { title: "Local handoff preview", copy: "The HubSpot-style payload is displayed and downloaded in the browser. This demo has no HubSpot credential and performs no external transmission." },
  { title: "Bounded evaluation claim", copy: "Fixture agreement checks deterministic consistency on six invented records. It is not predictive accuracy, conversion lift, or a fairness audit." },
];

export default function HealthcareLeadScoringPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CareSignal",
    alternateName: "Healthcare lead-scoring system",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web browser",
    description: "A deterministic healthcare organization ICP scoring demonstration using synthetic fixtures and no patient data or PHI.",
    author: { "@type": "Person", name: "Prasiddha Karki", url: "https://prasiddhakarki.online" },
    url: "https://prasiddhakarki.online/work/healthcare-lead-scoring",
  };

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <a className={styles.skipLink} href="#main-content">Skip to project</a>

      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Return to Prasiddha Karki portfolio">PK® <span>/ CareSignal</span></Link>
        <nav aria-label="Project navigation">
          <a href="#interactive-demo">Live system</a>
          <a href="#architecture">Workflow</a>
          <span className={styles.repoPending}>GitHub · publishing</span>
        </nav>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="page-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><i aria-hidden="true" />AI-assisted sales operations / explainable by design</p>
            <p className={styles.productName}>CareSignal / Healthcare lead-scoring system</p>
            <h1 id="page-title">Turn fit signals into a reasoned review queue.</h1>
            <p className={styles.heroSummary}>A deterministic 0–100 ICP scoring product for healthcare organizations—built with synthetic fixtures, visible weights, role-based routing, and a human-gated CRM handoff.</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryAction} href="#interactive-demo">Run the scoring lab <span aria-hidden="true">↓</span></a>
              <span className={`${styles.secondaryAction} ${styles.repoPending}`}>Repository publishing pending</span>
            </div>
            <ul className={styles.heroBoundary} aria-label="Project data boundaries">
              <li><strong>100%</strong><span>Inspectable scoring</span></li>
              <li><strong>0</strong><span>Patient / PHI fields</span></li>
              <li><strong>Human</strong><span>Final review gate</span></li>
            </ul>
          </div>

          <div className={styles.heroSystem} aria-label="System summary">
            <div className={styles.orbit} aria-hidden="true"><i /><i /><i /></div>
            <div className={styles.heroScore}><span>ICP</span><strong>70</strong><small>Qualified threshold</small></div>
            <div className={styles.heroSignals}>
              <span>Org fit / 25</span><span>Scale / 20</span><span>Need / 25</span><span>Readiness / 15</span><span>Intent / 15</span>
            </div>
            <p><i aria-hidden="true" />Deterministic rules online</p>
          </div>
        </section>

        <section className={styles.boundaryBanner} aria-label="Healthcare data boundary">
          <strong>Synthetic organization data only</strong>
          <p>No patient data, protected health information (PHI), contact enrichment, or automated outreach is used anywhere in this project.</p>
        </section>

        <section className={styles.workflowSection} id="architecture" aria-labelledby="workflow-title">
          <div className={styles.sectionHeading}>
            <div><p>01 / Accessible system workflow</p><h2 id="workflow-title">Five bounded stages.<br />One human decision.</h2></div>
            <p>The interface turns a sales-operations process into readable HTML, so the architecture remains understandable without animation, canvas, or an image.</p>
          </div>
          <ol className={styles.workflow} aria-label="Healthcare lead scoring workflow">
            {workflow.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{step.title}</h3><p>{step.copy}</p></div>
              </li>
            ))}
          </ol>
          <div className={styles.weightBar} aria-label="Scoring weights total 100 points">
            <span style={{ flex: 25 }}>Organization fit <b>25</b></span>
            <span style={{ flex: 20 }}>Scale <b>20</b></span>
            <span style={{ flex: 25 }}>Need <b>25</b></span>
            <span style={{ flex: 15 }}>Readiness <b>15</b></span>
            <span style={{ flex: 15 }}>Intent <b>15</b></span>
          </div>
        </section>

        <HealthcareLeadScoringDemo />

        <section className={styles.videoSection} aria-labelledby="video-title">
          <div className={styles.sectionHeading}>
            <div><p>05 / Product walkthrough</p><h2 id="video-title">See the scoring decision<br />from input to handoff.</h2></div>
            <p>The 13-second walkthrough moves from the system overview through scoring, handoff, and the qualified-account dashboard. The text sequence beside it provides the same essential narrative.</p>
          </div>
          <div className={styles.videoGrid}>
            <div className={styles.videoFrame}>
              <video controls preload="metadata" playsInline poster="/demos/healthcare-lead-scoring-poster.png" aria-label="CareSignal product walkthrough" aria-describedby="video-transcript">
                <source src="/demos/healthcare-lead-scoring.mp4" type="video/mp4" />
                Your browser does not support embedded video. Use the written walkthrough beside it.
              </video>
              <span>CareSignal / healthcare lead-scoring walkthrough</span>
            </div>
            <div className={styles.transcript} id="video-transcript">
              <span>Text walkthrough</span>
              <ol>
                <li><b>00:00</b><p>Read the product boundary and 70-point qualification threshold.</p></li>
                <li><b>00:03</b><p>Follow the five-stage scoring and review architecture.</p></li>
                <li><b>00:05</b><p>Inspect a 69/100 nurture result and every weighted explanation.</p></li>
                <li><b>00:08</b><p>Preview the browser-local, no-transmission CRM handoff.</p></li>
                <li><b>00:11</b><p>Review the synthetic qualified-account dashboard and fixture outcome.</p></li>
              </ol>
            </div>
          </div>
        </section>

        <section className={styles.technologySection} aria-labelledby="technology-title">
          <div className={styles.sectionHeading}>
            <div><p>06 / Technology</p><h2 id="technology-title">A small stack with<br />an explicit job for every layer.</h2></div>
            <p>No generative model is used in the score. AI-assisted engineering supported product framing, implementation, adversarial review, and evaluation design.</p>
          </div>
          <div className={styles.technologyGrid}>
            {technologies.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </section>

        <section className={styles.safeguardSection} aria-labelledby="safeguards-title">
          <div className={styles.sectionHeading}>
            <div><p>07 / Safeguards</p><h2 id="safeguards-title">What this system<br />refuses to pretend.</h2></div>
            <p>Healthcare-adjacent software earns trust by making its exclusions as concrete as its capabilities.</p>
          </div>
          <div className={styles.safeguardGrid}>
            {safeguards.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.copy}</p></div></article>)}
          </div>
        </section>

        <section className={styles.closing} aria-label="Project actions">
          <div><p>Explainable qualification / human controlled</p><h2>Score a synthetic lead.</h2></div>
          <div><a href="#interactive-demo">Open scoring lab ↑</a><span className={styles.repoPending}>GitHub publishing pending</span></div>
        </section>
      </main>

      <footer className={styles.footer}><span>© Prasiddha K. 2026</span><span>Independent product demonstration</span><Link href="/">Return to portfolio ↑</Link></footer>
    </div>
  );
}
