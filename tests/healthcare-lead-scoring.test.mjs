import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectDirectory = new URL("../app/work/healthcare-lead-scoring/", import.meta.url);

async function renderProject() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("care-signal", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/work/healthcare-lead-scoring", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("CareSignal renders a complete, accessible synthetic lead-scoring product", async () => {
  const response = await renderProject();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();

  assert.match(html, /CareSignal/);
  assert.match(html, /Healthcare lead-scoring system/i);
  assert.match(html, /Synthetic organization data only/i);
  assert.match(html, /No patient data, protected health information \(PHI\)/i);
  assert.match(html, /aria-label="Healthcare lead scoring workflow"/);
  assert.match(html, /Five bounded stages/);
  assert.match(html, /Change the evidence/);
  assert.match(html, /Organization type/);
  assert.match(html, /Employee count/);
  assert.match(html, /Technical readiness/);
  assert.match(html, /Qualified for human review/);
  assert.match(html, /70-point human-review threshold/);
  assert.match(html, /Suggested decision-maker functions/);
  assert.match(html, /Functions only—no names, profiles, emails, or inferred identities/);
  assert.match(html, /HubSpot company handoff \/ preview/);
  assert.match(html, /No external transmission/);
  assert.match(html, /Qualified-leads dashboard/);
  assert.match(html, /Expected-label agreement/);
  assert.match(html, /href="\/demos\/healthcare-lead-scoring\.mp4"|src="\/demos\/healthcare-lead-scoring\.mp4"/);
  assert.match(html, /Text walkthrough/);
  assert.match(html, /Technology/);
  assert.match(html, /Safeguards/);
  assert.match(html, /GitHub publishing pending/);
});

test("the deterministic model exposes weights, fixtures, threshold, and browser-local handoff boundaries", async () => {
  const [page, demo, css] = await Promise.all([
    readFile(new URL("page.tsx", projectDirectory), "utf8"),
    readFile(new URL("HealthcareLeadScoringDemo.tsx", projectDirectory), "utf8"),
    readFile(new URL("HealthcareLeadScoring.module.css", projectDirectory), "utf8"),
  ]);

  assert.doesNotMatch(page, /github\.com\/prasiddhakarki-coder\/healthcare-lead-scoring-system/);
  assert.match(page, /<ol className=\{styles\.workflow\} aria-label="Healthcare lead scoring workflow">/);
  assert.doesNotMatch(page, /<svg|<canvas/i);
  assert.match(page, /\/demos\/healthcare-lead-scoring\.mp4/);
  assert.match(page, /written walkthrough/i);

  assert.match(demo, /const QUALIFIED_THRESHOLD = 70/);
  const weights = [...demo.matchAll(/max:\s*(\d+)/g)].map((match) => Number(match[1]));
  assert.deepEqual(weights, [25, 20, 25, 15, 15]);
  assert.equal(weights.reduce((total, weight) => total + weight, 0), 100);
  assert.equal((demo.match(/expectedQualified:\s*(?:true|false)/g) ?? []).length, 6);
  assert.match(demo, /score >= QUALIFIED_THRESHOLD/);
  assert.match(demo, /expectedQualified === fixtureResult\.qualified/);
  assert.match(demo, /score_rationale/);
  assert.match(demo, /suggested_decision_maker_roles/);
  assert.match(demo, /VP of Patient Access/);
  assert.match(demo, /Chief Information Officer/);
  assert.doesNotMatch(demo, /type="email"|type="tel"/);
  assert.doesNotMatch(demo, /\bfetch\s*\(/);
  assert.match(demo, /new Blob/);
  assert.match(demo, /URL\.createObjectURL/);
  assert.match(demo, /URL\.revokeObjectURL/);
  assert.match(demo, /Nothing was transmitted to HubSpot/);
  assert.match(demo, /No contact records, patient data, or PHI/);

  assert.match(css, /:focus-visible/);
  assert.match(css, /@media \(max-width:/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /\.srOnly/);
});
