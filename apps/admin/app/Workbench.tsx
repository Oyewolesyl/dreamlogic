"use client";

import { useMemo, useState } from "react";
import { calculatePlacements, type BirthProfile, type Placement } from "./chart";

const sections = [
  { id: "dashboard", label: "Overview", detail: "Today, profiles, and next work" },
  { id: "profile", label: "Birth Profile", detail: "Onboarding and time certainty" },
  { id: "chart", label: "Chart Studio", detail: "Calculated natal placements" },
  { id: "timing", label: "Timing", detail: "Transits, stations, and notes" },
  { id: "journal", label: "Journal", detail: "Reflections tied to chart context" },
  { id: "clients", label: "Practice", detail: "Clients, consent, and prep" },
  { id: "reports", label: "Reports", detail: "Export-ready interpretation" },
  { id: "privacy", label: "Privacy", detail: "Control access and data" }
] as const;

type SectionId = (typeof sections)[number]["id"];
type NoteDraft = { title: string; body: string };
type ClientDraft = { name: string; email: string };

const plans = [
  ["Free", "Single chart, basic natal placements, private journal"],
  ["Seeker", "Multiple charts, timing watch, relationship comparison"],
  ["Depth", "Returns, profections, collections, saved interpretations"],
  ["Practitioner", "Clients, session prep, consent, branded reports"],
  ["Practice", "Team roles, shared client library, reporting"],
  ["Research", "Datasets, bulk calculations, structured exports"]
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
  const [journal, setJournal] = useState<NoteDraft[]>([
    { title: "Transit note", body: "Track what happened beside the calculated timing so the reading keeps its human context." }
  ]);
  const [clients, setClients] = useState<ClientDraft[]>([
    { name: "Consultation client", email: "client@example.com" }
  ]);
  const [draft, setDraft] = useState<NoteDraft>({ title: "", body: "" });
  const [clientDraft, setClientDraft] = useState<ClientDraft>({ name: "", email: "" });

  const placements = useMemo(() => calculatePlacements(profile), [profile]);
  const activeSection = sections.find((section) => section.id === active) ?? sections[0];
  const elementCounts = useMemo(() => getCounts(placements, "element"), [placements]);
  const modalityCounts = useMemo(() => getCounts(placements, "modality"), [placements]);
  const topAspects = useMemo(() => getTopAspects(placements), [placements]);
  const moon = placements.find((placement) => placement.body === "Moon");
  const mercury = placements.find((placement) => placement.body === "Mercury");

  const saveJournal = () => {
    if (!draft.title.trim() || !draft.body.trim()) return;
    setJournal([{ title: draft.title.trim(), body: draft.body.trim() }, ...journal]);
    setDraft({ title: "", body: "" });
  };

  const saveClient = () => {
    if (!clientDraft.name.trim() || !clientDraft.email.trim()) return;
    setClients([{ name: clientDraft.name.trim(), email: clientDraft.email.trim() }, ...clients]);
    setClientDraft({ name: "", email: "" });
  };

  return (
    <section className="product-shell" id="workspace">
      <aside className="product-nav" aria-label="Dream Logic workspace sections">
        <a className="nav-logo" href="#workspace" aria-label="Dream Logic workspace">
          <img alt="Dream Logic" src="/brand/logomain.svg" />
        </a>
        <div className="nav-list">
          {sections.map((section) => (
            <button
              key={section.id}
              className="nav-button"
              data-active={active === section.id}
              onClick={() => setActive(section.id)}
              type="button"
            >
              <strong>{section.label}</strong>
              <small>{section.detail}</small>
            </button>
          ))}
        </div>
      </aside>

      <section className="product-stage" aria-live="polite">
        <header className="stage-heading">
          <p className="kicker">{activeSection.detail}</p>
          <h2>{activeSection.label}</h2>
        </header>

        {active === "dashboard" && (
          <div className="dashboard-grid">
            <Metric label="Profiles" value="1" body="The active chart is ready for natal reading and report generation." />
            <Metric label="Placements" value={String(placements.length)} body="Sun through Pluto are calculated from the current birth profile." />
            <Metric label="Journal" value={String(journal.length)} body="Notes can be kept beside timing and consultation work." />
            <Metric label="Clients" value={String(clients.length)} body="Practice records stay separate from private chart notes." />
            <article className="feature-panel chart-summary">
              <div>
                <p className="kicker">Current chart</p>
                <h3>{profile.name}</h3>
                <p>{profile.birthDate} at {profile.birthTime} in {profile.locationLabel}</p>
              </div>
              <div className="summary-rows">
                <SummaryRow label="Moon" value={moon ? formatPlacement(moon) : "Calculating"} />
                <SummaryRow label="Mercury" value={mercury ? formatPlacement(mercury) : "Calculating"} />
                <SummaryRow label="Time certainty" value={profile.birthTimeCertainty.replaceAll("_", " ")} />
              </div>
            </article>
            <article className="feature-panel constellation-card">
              <img alt="Gemini constellation on a star field" src="/brand/gemini-constellation.jpg" />
              <div>
                <p className="kicker">Reading flow</p>
                <h3>Calculate, observe, interpret, export.</h3>
                <p>Every section supports the same client journey instead of scattering chart work across separate tools.</p>
              </div>
            </article>
          </div>
        )}

        {active === "profile" && (
          <div className="form-panel">
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
            <div className="certainty-panel">
              <strong>Unknown-time safeguard</strong>
              <p>When birth time is unknown, Dream Logic calculates from noon and keeps time-sensitive interpretation clearly separated.</p>
            </div>
          </div>
        )}

        {active === "chart" && (
          <div className="stage-stack">
            <div className="chart-layout">
              <article className="feature-panel">
                <p className="kicker">Element balance</p>
                <Balance counts={elementCounts} />
              </article>
              <article className="feature-panel">
                <p className="kicker">Modality balance</p>
                <Balance counts={modalityCounts} />
              </article>
            </div>
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
          <div className="dashboard-grid">
            <article className="feature-panel wide">
              <p className="kicker">Major aspects</p>
              <div className="aspect-list">
                {topAspects.map((aspect) => (
                  <span key={`${aspect.from}-${aspect.to}-${aspect.type}`}>{aspect.from} {aspect.type} {aspect.to} / {aspect.orb} orb</span>
                ))}
              </div>
            </article>
            {placements.slice(0, 6).map((placement) => (
              <Info
                key={placement.body}
                title={`${placement.body} in ${placement.sign}`}
                body={`Watch exact contacts to ${placement.degree} deg ${placement.sign}, then connect dates to journal notes and client sessions.`}
              />
            ))}
          </div>
        )}

        {active === "journal" && (
          <NoteComposer title="Journal entry" first="Title" second="Reflection" values={draft} setValues={setDraft} onSave={saveJournal} items={journal} />
        )}

        {active === "clients" && (
          <ClientComposer
            title="Client record"
            first="Client name"
            second="Email"
            values={clientDraft}
            setValues={setClientDraft}
            onSave={saveClient}
            items={clients.map((client) => ({ title: client.name, body: client.email }))}
          />
        )}

        {active === "reports" && (
          <article className="report-panel" id="report">
            <div className="report-cover">
              <img alt="Dream Logic Astrology suite" src="/brand/fulllitelogo.svg" />
            </div>
            <div className="report-body">
              <p className="kicker">Natal report</p>
              <h3>{profile.name}</h3>
              <p>{placements.length} placements, element balance, aspect highlights, journal context, and practitioner notes are ready for a polished report.</p>
              <div className="report-actions">
                <span>Birth profile</span>
                <span>Interpretation</span>
                <span>Practice notes</span>
              </div>
              <img className="report-specimen" alt="Approved Dream Logic light report direction" src="/brand/logo-direction-primary-light.jpg" />
            </div>
          </article>
        )}

        {active === "privacy" && (
          <div className="dashboard-grid">
            <Info title="Data export" body="Download chart, journal, client, and report records from the workspace." />
            <Info title="Context permissions" body="Private text stays out of generated interpretation until permission is granted." />
            <Info title="Practitioner access" body="Client-visible notes and practitioner-private notes remain separated." />
            <Info title="Subscriptions" body={plans.map(([name]) => name).join(" / ")} />
          </div>
        )}
      </section>
    </section>
  );
}

const zodiacOffset = (sign: string): number => {
  const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
  return signs.indexOf(sign) * 30;
};

function getCounts(placements: Placement[], key: "element" | "modality") {
  return placements.reduce<Record<string, number>>((acc, placement) => {
    acc[placement[key]] = (acc[placement[key]] ?? 0) + 1;
    return acc;
  }, {});
}

function getTopAspects(placements: Placement[]) {
  const pairs: Array<{ from: string; to: string; type: string; orb: string }> = [];
  const aspectAngles = [
    ["Conjunction", 0, 8],
    ["Sextile", 60, 4],
    ["Square", 90, 6],
    ["Trine", 120, 6],
    ["Opposition", 180, 8]
  ] as const;

  for (let i = 0; i < placements.length; i += 1) {
    for (let j = i + 1; j < placements.length; j += 1) {
      const a = placements[i];
      const b = placements[j];
      const separation = Math.abs(180 - Math.abs(Math.abs(a.degree + zodiacOffset(a.sign) - (b.degree + zodiacOffset(b.sign))) - 180));
      for (const [type, angle, maxOrb] of aspectAngles) {
        const orb = Math.abs(separation - angle);
        if (orb <= maxOrb) pairs.push({ from: a.body, to: b.body, type, orb: orb.toFixed(1) });
      }
    }
  }
  return pairs.slice(0, 6);
}

function formatPlacement(placement: Placement) {
  return `${placement.degree} deg ${placement.minute}' ${placement.sign}`;
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return <p><span>{label}</span><strong>{value}</strong></p>;
}

function Balance({ counts }: { counts: Record<string, number> }) {
  return (
    <div className="balance-row">
      {Object.entries(counts).map(([name, count]) => (
        <span key={name}><strong>{count}</strong>{name}</span>
      ))}
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return <label className="field"><span>{label}</span><input type={type} value={value} onChange={(event) => onChange(event.target.value)} /></label>;
}

function Metric({ label, value, body }: { label: string; value: string; body: string }) {
  return <article className="metric-card"><strong>{value}</strong><span>{label}</span><p>{body}</p></article>;
}

function Info({ title, body }: { title: string; body: string }) {
  return <article className="feature-panel"><h3>{title}</h3><p>{body}</p></article>;
}

function NoteComposer({
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
  values: NoteDraft;
  setValues: (value: NoteDraft) => void;
  onSave: () => void;
  items: NoteDraft[];
}) {
  return (
    <div className="stage-stack">
      <div className="form-panel">
        <h3>{title}</h3>
        <Field label={first} value={values.title} onChange={(value) => setValues({ ...values, title: value })} />
        <label className="field">
          <span>{second}</span>
          <textarea value={values.body} onChange={(event) => setValues({ ...values, body: event.target.value })} />
        </label>
        <button className="primary-action" onClick={onSave} type="button">Save</button>
      </div>
      <div className="dashboard-grid">
        {items.map((item) => <article className="feature-panel" key={`${item.title}-${item.body}`}><h3>{item.title}</h3><p>{item.body}</p></article>)}
      </div>
    </div>
  );
}

function ClientComposer({
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
  values: ClientDraft;
  setValues: (value: ClientDraft) => void;
  onSave: () => void;
  items: NoteDraft[];
}) {
  return (
    <div className="stage-stack">
      <div className="form-panel">
        <h3>{title}</h3>
        <Field label={first} value={values.name} onChange={(value) => setValues({ ...values, name: value })} />
        <Field label={second} value={values.email} onChange={(value) => setValues({ ...values, email: value })} />
        <button className="primary-action" onClick={onSave} type="button">Save</button>
      </div>
      <div className="dashboard-grid">
        {items.map((item) => <article className="feature-panel" key={`${item.title}-${item.body}`}><h3>{item.title}</h3><p>{item.body}</p></article>)}
      </div>
    </div>
  );
}
