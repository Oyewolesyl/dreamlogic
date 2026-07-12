"use client";

import { useMemo, useState } from "react";
import { calculatePlacements, type BirthProfile } from "./chart";

const tabs = ["Dashboard", "Onboarding", "Chart", "Journal", "Clients", "Reports", "Subscriptions", "Privacy"] as const;
type Tab = (typeof tabs)[number];

export function Workbench() {
  const [tab, setTab] = useState<Tab>("Dashboard");
  const [profile, setProfile] = useState<BirthProfile>({
    name: "Primary chart",
    birthDate: "1994-06-17",
    birthTime: "09:30",
    birthTimeCertainty: "official_recorded",
    locationLabel: "Lagos, Nigeria"
  });
  const [journal, setJournal] = useState<Array<{ title: string; body: string }>>([]);
  const [clients, setClients] = useState<Array<{ name: string; email: string }>>([]);
  const placements = useMemo(() => calculatePlacements(profile), [profile]);

  return (
    <section className="workbench">
      <nav className="tabbar" aria-label="Dream Logic sections">
        {tabs.map((item) => (
          <button className="tab" data-active={tab === item} key={item} onClick={() => setTab(item)} type="button">{item}</button>
        ))}
      </nav>

      {tab === "Dashboard" && (
        <div className="metric-grid">
          <Metric label="Profiles" value="1" />
          <Metric label="Placements" value={String(placements.length)} />
          <Metric label="Journal" value={String(journal.length)} />
          <Metric label="Clients" value={String(clients.length)} />
        </div>
      )}

      {tab === "Onboarding" && (
        <div className="form-grid">
          <Field label="Profile name" value={profile.name} onChange={(name) => setProfile({ ...profile, name })} />
          <Field label="Birth date" type="date" value={profile.birthDate} onChange={(birthDate) => setProfile({ ...profile, birthDate })} />
          <Field label="Birth time" type="time" value={profile.birthTime} onChange={(birthTime) => setProfile({ ...profile, birthTime })} />
          <Field label="Birth location" value={profile.locationLabel} onChange={(locationLabel) => setProfile({ ...profile, locationLabel })} />
        </div>
      )}

      {tab === "Chart" && (
        <div className="placement-board">
          {placements.map((placement) => (
            <article className="placement-block" key={placement.body}>
              <strong>{placement.body}</strong>
              <span>{placement.degree} deg {placement.minute}' {placement.sign}</span>
              <small>{placement.element} / {placement.modality}{placement.retrograde ? " / Rx" : ""}</small>
            </article>
          ))}
        </div>
      )}

      {tab === "Journal" && <Composer label="Journal entry" onSave={(title, body) => setJournal([{ title, body }, ...journal])} items={journal} />}
      {tab === "Clients" && <Composer label="Client" firstLabel="Name" secondLabel="Email" onSave={(name, email) => setClients([{ name, email }, ...clients])} items={clients.map((client) => ({ title: client.name, body: client.email }))} />}
      {tab === "Reports" && <Report profile={profile} placements={placements} />}
      {tab === "Subscriptions" && <Cards items={["Free", "Seeker", "Depth", "Practitioner", "Practice", "Research"]} />}
      {tab === "Privacy" && <Cards items={["Export data", "AI context permissions", "Practitioner access", "Session revocation"]} />}
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <article className="panel metric"><strong>{value}</strong><span>{label}</span></article>;
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return <label className="field"><span>{label}</span><input type={type} value={value} onChange={(event) => onChange(event.target.value)} /></label>;
}

function Composer({ label, firstLabel = "Title", secondLabel = "Body", onSave, items }: { label: string; firstLabel?: string; secondLabel?: string; onSave: (first: string, second: string) => void; items: Array<{ title: string; body: string }> }) {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  return <div className="stack"><div className="form-grid"><Field label={firstLabel} value={first} onChange={setFirst} /><Field label={secondLabel} value={second} onChange={setSecond} /><button className="primary" onClick={() => { if (first && second) { onSave(first, second); setFirst(""); setSecond(""); } }} type="button">Save {label}</button></div><div className="metric-grid">{items.map((item) => <article className="panel" key={`${item.title}-${item.body}`}><h2>{item.title}</h2><p>{item.body}</p></article>)}</div></div>;
}

function Cards({ items }: { items: string[] }) {
  return <div className="metric-grid">{items.map((item) => <article className="panel" key={item}><h2>{item}</h2></article>)}</div>;
}

function Report({ profile, placements }: { profile: BirthProfile; placements: ReturnType<typeof calculatePlacements> }) {
  return <article className="report"><img alt="Dream Logic Astrology suite" src="/brand/fulllitelogo.svg" /><p>Natal report</p><h2>{profile.name}</h2><span>{placements.length} calculated placements</span></article>;
}
