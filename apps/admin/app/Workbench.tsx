"use client";

import { useMemo, useState } from "react";
import { calculatePlacements, type BirthProfile } from "./chart";

const sections = [
  { id: "dashboard", label: "Dashboard", detail: "Workspace overview" },
  { id: "profile", label: "Birth Profile", detail: "Onboarding and certainty" },
  { id: "chart", label: "Chart Studio", detail: "Calculated placements" },
  { id: "timing", label: "Timing", detail: "Transit watch" },
  { id: "journal", label: "Journal", detail: "Lived experience" },
  { id: "clients", label: "Practice", detail: "Clients and notes" },
  { id: "reports", label: "Reports", detail: "Export-ready narrative" },
  { id: "privacy", label: "Privacy", detail: "Consent and export" }
] as const;

type SectionId = (typeof sections)[number]["id"];

const plans = [
  ["Free", "One profile / basic natal chart / limited journal"],
  ["Seeker", "Multiple profiles / transits / relationships / reports"],
  ["Depth", "Advanced timing / returns / profections / collections"],
  ["Practitioner", "Clients / intake / sessions / private notes / branded reports"],
  ["Practice", "Teams / shared clients / roles / analytics"],
  ["Research", "Datasets / bulk calculations / exports"]
] as const;

export function Workbench() {
  const [active, setActive] = useState<SectionId>("dashboard");
  const [profile, setProfile] = useState<BirthProfile>({
    name: "Primary chart",
    birthDate: "1994-06-17",
    birthTime: "09:30",
    birthTimeCertainty: "official_recorded",
    locationLabel: "Lagos, Nigeria"
  });
  const [journal, setJournal] = useState<Array<{ title: string; body: string }>>([
    { title: "Transit note", body: "Track the lived experience beside calculated timing." }
  ]);
  const [clients, setClients] = useState<Array<{ name: string; email: string }>>([
    { name: "Consultation client", email: "client@example.com" }
  ]);
  const [draft, setDraft] = useState({ title: "", body: "" });
  const [clientDraft, setClientDraft] = useState({ name: "", email: "" });

  const placements = useMemo(() => calculatePlacements(profile), [profile]);
  const elementCounts = useMemo(() => {
    return placements.reduce<Record<string, number>>((acc, placement) => {
      acc[placement.element] = (acc[placement.element] ?? 0) + 1;
      return acc;
    }, {});
  }, [placements]);

  const saveJournal = () => {
    if (!draft.title || !draft.body) return;
    setJournal([{ title: draft.title, body: draft.body }, ...journal]);
    setDraft({ title: "", body: "" });
  };

  const saveClient = () => {
    if (!clientDraft.name || !clientDraft.email) return;
    setClients([{ name: clientDraft.name, email: clientDraft.email }, ...clients]);
    setClientDraft({ name: "", email: "" });
  };

  return (
    <section className="product-shell">
      <aside className="product-nav" aria-label="Dream Logic workspace">
        <img alt="Dream Logic" src="/brand/logomain.svg" />
        {sections.map((section) => (
          <button key={section.id} className="nav-button" data-active={active === section.id} onClick={() => setActive(section.id)} type="button">
            <span>{section.label}</span>
            <small>{section.detail}</small>
          </button>
        ))}
      </aside>

      <section className="product-stage">
        {active === "dashboard" && (
          <div className="stage-grid">
            <Metric label="Birth profiles" value="1" />
            <Metric label="Calculated placements" value={String(placements.length)} />
            <Metric label="Journal entries" value={String(journal.length)} />
            <Metric label="Practice clients" value={String(clients.length)} />
            <article className="wide-panel">
              <p className="kicker">Current chart</p>
              <h2>{profile.name}</h2>
              <p>{profile.birthDate} / {profile.birthTime} / {profile.locationLabel}</p>
              <div className="balance-row">
                {Object.entries(elementCounts).map(([element, count]) => <span key={element}>{element}: {count}</span>)}
              </div>
            </article>
          </div>
        )}

        {active === "profile" && (
          <div className="form-panel">
            <PanelHeader title="Birth profile" eyebrow="Onboarding" />
            <Field label="Profile name" value={profile.name} onChange={(name) => setProfile({ ...profile, name })} />
            <Field label="Birth date" type="date" value={profile.birthDate} onChange={(birthDate) => setProfile({ ...profile, birthDate })} />
            <Field label="Birth time" type="time" value={profile.birthTime} onChange={(birthTime) => setProfile({ ...profile, birthTime })} />
            <label className="field">
              <span>Birth-time certainty</span>
              <select value={profile.birthTimeCertainty} onChange={(event) => setProfile({ ...profile, birthTimeCertainty: event.target.value as BirthProfile["birthTimeCertainty"] })}>
                <option value="official_recorded">Official recorded time</option>
                <option value="family_reported">Family-reported time</option>
                <option value="approximate">Approximate</option>
                <option value="rectified">Rectified</option>
                <option value="unknown">Unknown</option>
              </select>
            </label>
            <Field label="Birth location" value={profile.locationLabel} onChange={(locationLabel) => setProfile({ ...profile, locationLabel })} />
          </div>
        )}

        {active === "chart" && (
          <div className="stage-stack">
            <PanelHeader title="Chart Studio" eyebrow="Natal placements" />
            <div className="placement-table">
              {placements.map((placement) => (
                <article key={placement.body}>
                  <strong>{placement.body}</strong>
                  <span>{placement.degree} deg {placement.minute}' {placement.sign}</span>
                  <small>{placement.element} / {placement.modality}{placement.retrograde ? " / Rx" : ""}</small>
                </article>
              ))}
            </div>
          </div>
        )}

        {active === "timing" && (
          <div className="stage-grid">
            {placements.slice(0, 6).map((placement) => (
              <article className="panel" key={placement.body}>
                <p className="kicker">{placement.body}</p>
                <h2>{placement.sign} watch</h2>
                <p>Track exact transits to {placement.degree} deg {placement.sign} and link observations to the journal timeline.</p>
              </article>
            ))}
          </div>
        )}

        {active === "journal" && (
          <Composer title="Journal" first="Title" second="Reflection" values={draft} setValues={setDraft} onSave={saveJournal} items={journal} />
        )}

        {active === "clients" && (
          <Composer title="Practice workspace" first="Client name" second="Client email" values={clientDraft} setValues={setClientDraft} onSave={saveClient} items={clients.map((client) => ({ title: client.name, body: client.email }))} />
        )}

        {active === "reports" && (
          <article className="report-panel">
            <img alt="Dream Logic Astrology suite light brand direction" src="/brand/logo-direction-light.jpg" />
            <p className="kicker">Natal report</p>
            <h2>{profile.name}</h2>
            <p>{placements.length} calculated placements prepared for a branded PDF/web report.</p>
          </article>
        )}

        {active === "privacy" && (
          <div className="stage-grid">
            <Info title="Data export" body="Download profile, chart, journal, client, and report records." />
            <Info title="AI context" body="Private text stays out of AI context until explicit permission is granted." />
            <Info title="Practitioner access" body="Client-visible notes and practitioner-private notes remain separated." />
            <Info title="Subscriptions" body={plans.map(([name]) => name).join(" / ")} />
          </div>
        )}
      </section>
    </section>
  );
}

function PanelHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <header className="panel-header"><p className="kicker">{eyebrow}</p><h2>{title}</h2></header>;
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return <label className="field"><span>{label}</span><input type={type} value={value} onChange={(event) => onChange(event.target.value)} /></label>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return <article className="metric-card"><strong>{value}</strong><span>{label}</span></article>;
}

function Info({ title, body }: { title: string; body: string }) {
  return <article className="panel"><h2>{title}</h2><p>{body}</p></article>;
}

function Composer({
  title,
  first,
  second,
  values,
  setValues,
  onSave,
  items
}: {
  title: string;
  first: string;
  second: string;
  values: { title?: string; body?: string; name?: string; email?: string };
  setValues: (value: any) => void;
  onSave: () => void;
  items: Array<{ title: string; body: string }>;
}) {
  const firstKey = "title" in values ? "title" : "name";
  const secondKey = "body" in values ? "body" : "email";
  return (
    <div className="stage-stack">
      <div className="form-panel">
        <PanelHeader eyebrow="Workspace" title={title} />
        <Field label={first} value={String(values[firstKey] ?? "")} onChange={(value) => setValues({ ...values, [firstKey]: value })} />
        <label className="field">
          <span>{second}</span>
          <textarea value={String(values[secondKey] ?? "")} onChange={(event) => setValues({ ...values, [secondKey]: event.target.value })} />
        </label>
        <button className="primary-action" onClick={onSave} type="button">Save</button>
      </div>
      <div className="stage-grid">
        {items.map((item) => <article className="panel" key={`${item.title}-${item.body}`}><h2>{item.title}</h2><p>{item.body}</p></article>)}
      </div>
    </div>
  );
}
