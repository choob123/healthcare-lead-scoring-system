"use client";

import { FormEvent, useMemo, useState } from "react";
import styles from "./HealthcareLeadScoring.module.css";

type OrganizationType = "health-system" | "clinic-network" | "independent-practice" | "digital-health" | "payer";
type OperationalPriority = "patient-access" | "revenue-cycle" | "clinical-operations" | "analytics" | "exploring";
type TechnicalReadiness = "api-ready" | "modern-ehr" | "mixed-systems" | "manual";
type BuyingTimeline = "zero-three" | "three-six" | "six-twelve" | "exploring";

type LeadInput = {
  fixtureId: string;
  organizationName: string;
  organizationType: OrganizationType;
  employeeCount: number;
  locationCount: number;
  priority: OperationalPriority;
  readiness: TechnicalReadiness;
  timeline: BuyingTimeline;
};

type ScoredFactor = {
  key: string;
  label: string;
  score: number;
  max: number;
  explanation: string;
};

type ScoredLead = {
  score: number;
  qualified: boolean;
  factors: ScoredFactor[];
  suggestedRoles: string[];
};

const QUALIFIED_THRESHOLD = 70;

const organizationTypeOptions: Array<{ value: OrganizationType; label: string }> = [
  { value: "health-system", label: "Health system" },
  { value: "clinic-network", label: "Multi-site clinic network" },
  { value: "independent-practice", label: "Independent practice" },
  { value: "digital-health", label: "Digital health company" },
  { value: "payer", label: "Health plan / payer" },
];

const priorityOptions: Array<{ value: OperationalPriority; label: string }> = [
  { value: "patient-access", label: "Patient access operations" },
  { value: "revenue-cycle", label: "Revenue cycle efficiency" },
  { value: "clinical-operations", label: "Clinical operations" },
  { value: "analytics", label: "Data and analytics" },
  { value: "exploring", label: "Exploring / no defined priority" },
];

const readinessOptions: Array<{ value: TechnicalReadiness; label: string }> = [
  { value: "api-ready", label: "API-ready systems and integration owner" },
  { value: "modern-ehr", label: "Modern EHR with integration pathway" },
  { value: "mixed-systems", label: "Mixed legacy and modern systems" },
  { value: "manual", label: "Mostly manual workflow" },
];

const timelineOptions: Array<{ value: BuyingTimeline; label: string }> = [
  { value: "zero-three", label: "0–3 months" },
  { value: "three-six", label: "3–6 months" },
  { value: "six-twelve", label: "6–12 months" },
  { value: "exploring", label: "Exploring; no committed timeline" },
];

const SYNTHETIC_FIXTURES: Array<LeadInput & { expectedQualified: boolean }> = [
  {
    fixtureId: "northstar",
    organizationName: "Northstar Community Health — Synthetic",
    organizationType: "health-system",
    employeeCount: 3200,
    locationCount: 35,
    priority: "patient-access",
    readiness: "api-ready",
    timeline: "zero-three",
    expectedQualified: true,
  },
  {
    fixtureId: "meridian",
    organizationName: "Meridian Specialty Network — Synthetic",
    organizationType: "clinic-network",
    employeeCount: 420,
    locationCount: 12,
    priority: "revenue-cycle",
    readiness: "modern-ehr",
    timeline: "three-six",
    expectedQualified: true,
  },
  {
    fixtureId: "harbor",
    organizationName: "Harbor Rural Alliance — Synthetic",
    organizationType: "clinic-network",
    employeeCount: 115,
    locationCount: 6,
    priority: "clinical-operations",
    readiness: "mixed-systems",
    timeline: "six-twelve",
    expectedQualified: false,
  },
  {
    fixtureId: "brightpath",
    organizationName: "BrightPath Digital Health — Synthetic",
    organizationType: "digital-health",
    employeeCount: 150,
    locationCount: 1,
    priority: "analytics",
    readiness: "api-ready",
    timeline: "three-six",
    expectedQualified: true,
  },
  {
    fixtureId: "willow",
    organizationName: "Willow Independent Clinic — Synthetic",
    organizationType: "independent-practice",
    employeeCount: 18,
    locationCount: 1,
    priority: "patient-access",
    readiness: "manual",
    timeline: "exploring",
    expectedQualified: false,
  },
  {
    fixtureId: "atlas",
    organizationName: "Atlas Regional Plan — Synthetic",
    organizationType: "payer",
    employeeCount: 700,
    locationCount: 9,
    priority: "exploring",
    readiness: "mixed-systems",
    timeline: "six-twelve",
    expectedQualified: false,
  },
];

const organizationFit: Record<OrganizationType, { score: number; copy: string }> = {
  "health-system": { score: 25, copy: "Multi-site health systems match the primary organization profile." },
  "clinic-network": { score: 22, copy: "Clinic networks have strong multi-location workflow potential." },
  "independent-practice": { score: 12, copy: "Independent practices fit, but usually have a smaller expansion surface." },
  "digital-health": { score: 18, copy: "Digital health organizations fit the partnership and integration profile." },
  payer: { score: 20, copy: "Health plans fit the operational scale profile with a different buying motion." },
};

const priorityFit: Record<OperationalPriority, { score: number; copy: string }> = {
  "patient-access": { score: 25, copy: "Patient access is a high-value operational use case for this synthetic ICP." },
  "revenue-cycle": { score: 22, copy: "Revenue-cycle efficiency maps to a measurable operational problem." },
  "clinical-operations": { score: 20, copy: "Clinical operations is relevant, with additional workflow validation required." },
  analytics: { score: 18, copy: "Analytics need is relevant, but value depends on implementation scope." },
  exploring: { score: 5, copy: "No defined operational priority creates a weak problem signal." },
};

const readinessFit: Record<TechnicalReadiness, { score: number; copy: string }> = {
  "api-ready": { score: 15, copy: "An integration owner and API pathway reduce implementation uncertainty." },
  "modern-ehr": { score: 12, copy: "A modern EHR suggests a viable integration path that still needs discovery." },
  "mixed-systems": { score: 8, copy: "Mixed systems may work, but increase integration and change-management effort." },
  manual: { score: 3, copy: "Manual workflows indicate need while also increasing delivery risk." },
};

const timelineFit: Record<BuyingTimeline, { score: number; copy: string }> = {
  "zero-three": { score: 15, copy: "A 0–3 month window is a strong near-term intent signal." },
  "three-six": { score: 12, copy: "A 3–6 month window supports active qualification." },
  "six-twelve": { score: 7, copy: "A 6–12 month window is better suited to structured nurture." },
  exploring: { score: 3, copy: "No committed timeline is a low-confidence intent signal." },
};

function scaleScore(employeeCount: number, locationCount: number) {
  const employees = employeeCount >= 1000 ? 12 : employeeCount >= 250 ? 10 : employeeCount >= 100 ? 8 : employeeCount >= 25 ? 5 : 2;
  const locations = locationCount >= 25 ? 8 : locationCount >= 10 ? 6 : locationCount >= 3 ? 4 : 1;
  return {
    score: employees + locations,
    copy: `${employeeCount.toLocaleString()} employees and ${locationCount.toLocaleString()} location${locationCount === 1 ? "" : "s"} contribute ${employees} + ${locations} scale points.`,
  };
}

function suggestedRoles(lead: LeadInput) {
  const roles = new Set<string>();
  if (lead.priority === "patient-access") roles.add("VP of Patient Access");
  if (lead.priority === "revenue-cycle") roles.add("VP of Revenue Cycle");
  if (lead.priority === "clinical-operations") roles.add("VP of Clinical Operations");
  if (lead.priority === "analytics") roles.add("Chief Data & Analytics Officer");
  if (lead.readiness === "api-ready" || lead.readiness === "modern-ehr") roles.add("Chief Information Officer");
  if (lead.organizationType === "independent-practice" || lead.employeeCount < 100) roles.add("Practice Administrator");
  else roles.add("Chief Operating Officer");
  if (lead.organizationType === "digital-health") roles.add("VP of Partnerships");
  if (roles.size < 3) roles.add("Director of Digital Transformation");
  return [...roles].slice(0, 3);
}

function scoreLead(lead: LeadInput): ScoredLead {
  const organization = organizationFit[lead.organizationType];
  const scale = scaleScore(lead.employeeCount, lead.locationCount);
  const priority = priorityFit[lead.priority];
  const readiness = readinessFit[lead.readiness];
  const timeline = timelineFit[lead.timeline];
  const factors: ScoredFactor[] = [
    { key: "organization", label: "Organization fit", score: organization.score, max: 25, explanation: organization.copy },
    { key: "scale", label: "Operating scale", score: scale.score, max: 20, explanation: scale.copy },
    { key: "priority", label: "Operational need", score: priority.score, max: 25, explanation: priority.copy },
    { key: "readiness", label: "Technical readiness", score: readiness.score, max: 15, explanation: readiness.copy },
    { key: "timeline", label: "Buying intent", score: timeline.score, max: 15, explanation: timeline.copy },
  ];
  const score = factors.reduce((total, factor) => total + factor.score, 0);
  return { score, qualified: score >= QUALIFIED_THRESHOLD, factors, suggestedRoles: suggestedRoles(lead) };
}

const FIXTURE_EVALUATIONS = SYNTHETIC_FIXTURES.map((fixture) => ({
  fixture,
  result: scoreLead(fixture),
}));

function withoutExpectation(fixture: LeadInput & { expectedQualified: boolean }): LeadInput {
  const { expectedQualified: _expectedQualified, ...lead } = fixture;
  void _expectedQualified;
  return lead;
}

function labelFor<T extends string>(options: Array<{ value: T; label: string }>, value: T) {
  return options.find((option) => option.value === value)?.label ?? value;
}

function sanitizeFilename(value: string) {
  return value.toLowerCase().replace(/— synthetic/gi, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || "synthetic-lead";
}

export default function HealthcareLeadScoringDemo() {
  const initialLead = withoutExpectation(SYNTHETIC_FIXTURES[0]);
  const [draft, setDraft] = useState<LeadInput>(initialLead);
  const [evaluatedLead, setEvaluatedLead] = useState<LeadInput>(initialLead);
  const [evaluationMessage, setEvaluationMessage] = useState("Northstar synthetic fixture scored.");
  const [downloadMessage, setDownloadMessage] = useState("");
  const result = useMemo(() => scoreLead(evaluatedLead), [evaluatedLead]);

  const qualifiedFixtures = FIXTURE_EVALUATIONS.filter(({ result: fixtureResult }) => fixtureResult.qualified);
  const expectedAgreement = FIXTURE_EVALUATIONS.filter(({ fixture, result: fixtureResult }) => fixture.expectedQualified === fixtureResult.qualified).length;
  const agreementPercent = Math.round(expectedAgreement / FIXTURE_EVALUATIONS.length * 100);

  const handoffPreview = useMemo(() => ({
    object: "companies",
    mode: "demo_preview_only",
    properties: {
      name: evaluatedLead.organizationName,
      healthcare_organization_type: labelFor(organizationTypeOptions, evaluatedLead.organizationType),
      numberofemployees: evaluatedLead.employeeCount,
      location_count: evaluatedLead.locationCount,
      operational_priority: labelFor(priorityOptions, evaluatedLead.priority),
      technical_readiness: labelFor(readinessOptions, evaluatedLead.readiness),
      buying_timeline: labelFor(timelineOptions, evaluatedLead.timeline),
      icp_score: result.score,
      qualification_status: result.qualified ? "QUALIFIED_FOR_HUMAN_REVIEW" : "NURTURE",
      score_version: "deterministic-fixture-v1",
      score_rationale: result.factors.map((factor) => `${factor.label}: ${factor.score}/${factor.max}`).join(" | "),
      suggested_decision_maker_roles: result.suggestedRoles.join(" | "),
    },
    privacy: "Synthetic organization attributes only. No contact records, patient data, or PHI.",
    transmission: "None. Browser-local preview and download only.",
  }), [evaluatedLead, result]);

  function updateDraft<Key extends keyof LeadInput>(key: Key, value: LeadInput[Key]) {
    setDraft((current) => ({ ...current, [key]: value, fixtureId: key === "fixtureId" ? String(value) : "custom" }));
    setDownloadMessage("");
  }

  function loadFixture(fixture: LeadInput & { expectedQualified: boolean }) {
    const lead = withoutExpectation(fixture);
    setDraft(lead);
    setEvaluatedLead(lead);
    setEvaluationMessage(`${fixture.organizationName} loaded and scored.`);
    setDownloadMessage("");
  }

  function submitScore(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = {
      ...draft,
      organizationName: draft.organizationName.trim() || "Untitled synthetic organization",
      employeeCount: Math.max(1, Math.round(draft.employeeCount || 1)),
      locationCount: Math.max(1, Math.round(draft.locationCount || 1)),
    };
    setDraft(normalized);
    setEvaluatedLead(normalized);
    setEvaluationMessage(`${normalized.organizationName} scored with deterministic fixture-v1 rules.`);
    setDownloadMessage("");
  }

  function downloadHandoff() {
    const blob = new Blob([JSON.stringify(handoffPreview, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${sanitizeFilename(evaluatedLead.organizationName)}-hubspot-demo-preview.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    setDownloadMessage("Demo handoff JSON downloaded locally. Nothing was transmitted to HubSpot.");
  }

  return (
    <>
      <section className={styles.demoSection} id="interactive-demo" aria-labelledby="interactive-demo-title">
        <div className={styles.sectionHeading}>
          <div><p>02 / Interactive scoring lab</p><h2 id="interactive-demo-title">Change the evidence.<br />Watch the score explain itself.</h2></div>
          <p>Choose a synthetic fixture or edit the organization-level fields. The same five weighted rules always produce the same 0–100 result.</p>
        </div>

        <div className={styles.demoShell}>
          <aside className={styles.fixtureRail} aria-labelledby="fixture-title">
            <div><span>Synthetic dataset</span><h3 id="fixture-title">Organization fixtures</h3><p>Invented records for demonstration and repeatable evaluation.</p></div>
            <div className={styles.fixtureButtons}>
              {SYNTHETIC_FIXTURES.map((fixture) => {
                const fixtureResult = scoreLead(fixture);
                return (
                  <button
                    type="button"
                    className={draft.fixtureId === fixture.fixtureId ? styles.activeFixture : undefined}
                    aria-pressed={draft.fixtureId === fixture.fixtureId}
                    onClick={() => loadFixture(fixture)}
                    key={fixture.fixtureId}
                  >
                    <span>{fixture.organizationName.replace(" — Synthetic", "")}</span>
                    <small>{fixtureResult.score} / 100 · {fixtureResult.qualified ? "Qualified" : "Nurture"}</small>
                  </button>
                );
              })}
            </div>
            <p className={styles.dataBoundary}>Synthetic organizations only. Do not enter patient names, health records, contact details, or PHI.</p>
          </aside>

          <form className={styles.scoreForm} onSubmit={submitScore} aria-describedby="input-boundary">
            <div className={styles.formHeader}><span>Editable organization profile</span><strong>Organization data only</strong></div>
            <p id="input-boundary" className={styles.formBoundary}>This browser-local demo has no person, email, phone, patient, diagnosis, claim, or medical-record fields.</p>
            <div className={styles.inputGrid}>
              <label className={styles.wideField}>
                <span>Synthetic organization name</span>
                <input value={draft.organizationName} maxLength={90} onChange={(event) => updateDraft("organizationName", event.target.value)} required />
              </label>
              <label>
                <span>Organization type</span>
                <select value={draft.organizationType} onChange={(event) => updateDraft("organizationType", event.target.value as OrganizationType)}>
                  {organizationTypeOptions.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
                </select>
              </label>
              <label>
                <span>Employee count</span>
                <input type="number" min="1" max="1000000" inputMode="numeric" value={draft.employeeCount} onChange={(event) => updateDraft("employeeCount", Number(event.target.value))} />
              </label>
              <label>
                <span>Location count</span>
                <input type="number" min="1" max="10000" inputMode="numeric" value={draft.locationCount} onChange={(event) => updateDraft("locationCount", Number(event.target.value))} />
              </label>
              <label>
                <span>Operational priority</span>
                <select value={draft.priority} onChange={(event) => updateDraft("priority", event.target.value as OperationalPriority)}>
                  {priorityOptions.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
                </select>
              </label>
              <label>
                <span>Technical readiness</span>
                <select value={draft.readiness} onChange={(event) => updateDraft("readiness", event.target.value as TechnicalReadiness)}>
                  {readinessOptions.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
                </select>
              </label>
              <label>
                <span>Buying timeline</span>
                <select value={draft.timeline} onChange={(event) => updateDraft("timeline", event.target.value as BuyingTimeline)}>
                  {timelineOptions.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
                </select>
              </label>
            </div>
            <button className={styles.scoreButton} type="submit">Score synthetic lead <span aria-hidden="true">→</span></button>
          </form>

          <section className={styles.scoreResult} aria-labelledby="score-result-title">
            <div className={styles.scoreTopline}><span>Deterministic ICP score</span><strong>Threshold {QUALIFIED_THRESHOLD}</strong></div>
            <div className={styles.scoreHero}>
              <div className={styles.scoreDial} style={{ "--score": `${result.score * 3.6}deg` } as React.CSSProperties}>
                <div><strong>{result.score}</strong><span>/ 100</span></div>
              </div>
              <div><p className={result.qualified ? styles.qualifiedStatus : styles.nurtureStatus}>{result.qualified ? "Qualified for human review" : "Nurture / not qualified"}</p><h3 id="score-result-title">{evaluatedLead.organizationName}</h3><p>Every point is accounted for below. Qualification starts at {QUALIFIED_THRESHOLD}; it does not trigger outreach automatically.</p></div>
            </div>
            <p className={styles.srOnly} role="status">{evaluationMessage}</p>
            <div className={styles.factorList}>
              {result.factors.map((factor) => (
                <article key={factor.key}>
                  <div><span>{factor.label}</span><strong>{factor.score} / {factor.max}</strong></div>
                  <div className={styles.factorTrack} aria-hidden="true"><i style={{ width: `${factor.score / factor.max * 100}%` }} /></div>
                  <p>{factor.explanation}</p>
                </article>
              ))}
            </div>
            <div className={styles.rolePanel}>
              <div><span>Role-based next step</span><h4>Suggested decision-maker functions</h4><p>Functions only—no names, profiles, emails, or inferred identities.</p></div>
              <ul>{result.suggestedRoles.map((role) => <li key={role}>{role}</li>)}</ul>
            </div>
          </section>
        </div>
      </section>

      <section className={styles.handoffSection} id="handoff-preview" aria-labelledby="handoff-title">
        <div className={styles.sectionHeading}>
          <div><p>03 / Explicit handoff</p><h2 id="handoff-title">Preview the CRM payload.<br />Transmit nothing.</h2></div>
          <p>This demonstration maps the evaluated organization into a HubSpot-style company property object. It never authenticates, calls HubSpot, creates a contact, or sends data off the page.</p>
        </div>
        <div className={styles.handoffGrid}>
          <div className={styles.handoffExplanation}>
            <span>Demo boundary</span>
            <h3>Human review stays between scoring and outreach.</h3>
            <ol>
              <li><b>01</b><div><strong>Review</strong><p>Confirm organization facts and score rationale.</p></div></li>
              <li><b>02</b><div><strong>Approve</strong><p>A person decides whether a CRM handoff is appropriate.</p></div></li>
              <li><b>03</b><div><strong>Download</strong><p>Export a local JSON preview for discussion or implementation planning.</p></div></li>
            </ol>
            <button type="button" onClick={downloadHandoff}>Download demo handoff (.json) <span aria-hidden="true">↓</span></button>
            <p className={styles.downloadStatus} role="status">{downloadMessage || "No external transmission. The download is created in this browser."}</p>
          </div>
          <div className={styles.payloadPreview}>
            <header><span>HubSpot company handoff / preview</span><strong>Local only</strong></header>
            <pre tabIndex={0} aria-label="HubSpot demo handoff JSON preview">{JSON.stringify(handoffPreview, null, 2)}</pre>
          </div>
        </div>
      </section>

      <section className={styles.dashboardSection} id="qualified-dashboard" aria-labelledby="dashboard-title">
        <div className={styles.sectionHeading}>
          <div><p>04 / Qualified-leads dashboard</p><h2 id="dashboard-title">A queue built for review,<br />not automated pursuit.</h2></div>
          <p>Only fixtures at or above {QUALIFIED_THRESHOLD} appear in the qualified queue. Scores prioritize investigation; they are not evidence that an organization wants contact.</p>
        </div>
        <div className={styles.dashboardMetrics}>
          <article><span>Fixture set</span><strong>{FIXTURE_EVALUATIONS.length}</strong><p>Invented organizations</p></article>
          <article><span>Qualified</span><strong>{qualifiedFixtures.length}</strong><p>Score ≥ {QUALIFIED_THRESHOLD}</p></article>
          <article><span>Expected-label agreement</span><strong>{agreementPercent}%</strong><p>{expectedAgreement} of {FIXTURE_EVALUATIONS.length} fixtures</p></article>
          <article><span>Personal / patient fields</span><strong>0</strong><p>Organization attributes only</p></article>
        </div>
        <div className={styles.tableWrap}>
          <table>
            <caption>Qualified synthetic organizations sorted by ICP score</caption>
            <thead><tr><th scope="col">Synthetic organization</th><th scope="col">Score</th><th scope="col">Strongest signal</th><th scope="col">Suggested role</th><th scope="col">Decision</th></tr></thead>
            <tbody>
              {[...qualifiedFixtures].sort((a, b) => b.result.score - a.result.score).map(({ fixture, result: fixtureResult }) => {
                const strongest = [...fixtureResult.factors].sort((a, b) => b.score / b.max - a.score / a.max)[0];
                return <tr key={fixture.fixtureId}><th scope="row">{fixture.organizationName}</th><td><strong>{fixtureResult.score}</strong> / 100</td><td>{strongest.label}</td><td>{fixtureResult.suggestedRoles[0]}</td><td><span>Human review</span></td></tr>;
              })}
            </tbody>
          </table>
        </div>
        <div className={styles.evaluationNote}>
          <span>Fixture evaluation outcome</span>
          <p>{expectedAgreement} of {FIXTURE_EVALUATIONS.length} synthetic fixtures match their predeclared qualified-or-nurture expectation at the {QUALIFIED_THRESHOLD}-point threshold. This measures deterministic rule consistency on a tiny invented fixture set—not predictive accuracy, production lift, or fairness across real organizations.</p>
        </div>
      </section>
    </>
  );
}
