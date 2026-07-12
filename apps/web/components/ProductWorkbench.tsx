"use client";

import { useEffect, useMemo, useState } from "react";
import { subscriptionPlans } from "@dream-logic/subscriptions";
import { calculateNatalChart, type BirthProfile } from "../lib/chart";
import { DreamGlyph } from "./DreamGlyph";

type Entry = { id: string; title: string; body: string; type: string; createdAt: string };
type Client = { id: string; name: string; email: string; status: string; note: string };
type Account = { email: string; role: string; plan: string };

type Store = {
  account: Account;
  profiles: BirthProfile[];
  journal: Entry[];
  clients: Client[];
};

const defaultStore: Store = {
  account: { email: "founder@dreamlogic.local", role: "practitioner", plan: "practitioner" },
  profiles: [
    {
      id: "primary",
      name: "Primary chart",
      birthDate: "1994-06-17",
      birthTime: "09:30",
      birthTimeCertainty: "official_recorded",
      locationLabel: "Lagos, Nigeria",
      latitude: 6.5244,
      longitude: 3.3792,
      timeZone: "Africa/Lagos",
      houseSystem: "placidus",
      zodiacMode: "tropical"
    }
  ],
  journal: [],
  clients: []
};

const tabs = ["Dashboard", "Onboarding", "Charts", "Transits", "Journal", "Relationships", "Clients", "Reports", "Subscriptions", "Privacy"] as const;
type Tab = (typeof tabs)[number];

const uid = () => crypto.randomUUID();

const loadStore = (): Store => {
  const raw = window.localStorage.getItem("dream-logic-store");
  return raw ? (JSON.parse(raw) as Store) : defaultStore;
};

export function ProductWorkbench({ initialTab = "Dashboard" }: { initialTab?: Tab }) {
  const [store, setStore] = useState<Store>(defaultStore);
  const [tab, setTab] = useState<Tab>(initialTab);
  const [profileDraft, setProfileDraft] = useState<BirthProfile>(defaultStore.profiles[0]);
  const [journalDraft, setJournalDraft] = useState({ title: "", body: "", type: "daily_reflection" });
  const [clientDraft, setClientDraft] = useState({ name: "", email: "", note: "" });

  useEffect(() => {
    const loaded = loadStore();
    setStore(loaded);
    setProfileDraft(loaded.profiles[0] ?? defaultStore.profiles[0]);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("dream-logic-store", JSON.stringify(store));
  }, [store]);

  const activeProfile = store.profiles[0];
  const chart = useMemo(() => activeProfile ? calculateNatalChart(activeProfile) : null, [activeProfile]);

  const saveProfile = () => {
    setStore((current) => ({
      ...current,
      profiles: [profileDraft, ...current.profiles.filter((profile) => profile.id !== profileDraft.id)]
    }));
    setTab("Charts");
  };

  const addJournal = () => {
    if (!journalDraft.title || !journalDraft.body) return;
    setStore((current) => ({
      ...current,
      journal: [{ id: uid(), createdAt: new Date().toISOString(), ...journalDraft }, ...current.journal]
    }));
    setJournalDraft({ title: "", body: "", type: "daily_reflection" });
  };

  const addClient = () => {
    if (!clientDraft.name || !clientDraft.email) return;
    setStore((current) => ({
      ...current,
      clients: [{ id: uid(), status: "invited", ...clientDraft }, ...current.clients]
    }));
    setClientDraft({ name: "", email: "", note: "" });
  };

  const exportData = () => {
    const payload = JSON.stringify(store, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "dream-logic-export.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="workbench" aria-label="Dream Logic product workbench">
      <div className="brand-lock-panel">
        <img alt="Dream Logic Astrology suite" className="brand-lock-panel__logo" src="/brand/fulldarklogo.svg" />
        <div className="symbol-row" aria-hidden="true">
          <DreamGlyph name="origin-cross" />
          <DreamGlyph name="woven-diamond" />
          <DreamGlyph name="logic-flower" />
          <DreamGlyph name="research-lattice" />
          <DreamGlyph name="relationship-knot" />
        </div>
      </div>

      <div className="tabbar">
        {tabs.map((item) => (
          <button className="tab" data-active={tab === item} key={item} onClick={() => setTab(item)} type="button">
            {item}
          </button>
        ))}
      </div>

      {tab === "Dashboard" && (
        <div className="metric-grid">
          <Metric glyph="birth-profile" label="Birth profiles" value={store.profiles.length} />
          <Metric glyph="aspects" label="Aspects found" value={chart?.aspects.length ?? 0} />
          <Metric glyph="journal" label="Journal entries" value={store.journal.length} />
          <Metric glyph="client" label="Clients" value={store.clients.length} />
        </div>
      )}

      {tab === "Onboarding" && (
        <div className="form-grid">
          <Field label="Profile name" value={profileDraft.name} onChange={(value) => setProfileDraft({ ...profileDraft, name: value })} />
          <Field label="Birth date" type="date" value={profileDraft.birthDate} onChange={(value) => setProfileDraft({ ...profileDraft, birthDate: value })} />
          <Field label="Birth time" type="time" value={profileDraft.birthTime} onChange={(value) => setProfileDraft({ ...profileDraft, birthTime: value })} />
          <label className="field">
            <span>Birth-time certainty</span>
            <select value={profileDraft.birthTimeCertainty} onChange={(event) => setProfileDraft({ ...profileDraft, birthTimeCertainty: event.target.value as BirthProfile["birthTimeCertainty"] })}>
              <option value="official_recorded">Official recorded time</option>
              <option value="family_reported">Family-reported time</option>
              <option value="approximate">Approximate</option>
              <option value="rectified">Rectified</option>
              <option value="unknown">Unknown</option>
            </select>
          </label>
          <Field label="Location" value={profileDraft.locationLabel} onChange={(value) => setProfileDraft({ ...profileDraft, locationLabel: value })} />
          <button className="button" onClick={saveProfile} type="button">Save birth profile and calculate</button>
        </div>
      )}

      {tab === "Charts" && chart && (
        <div className="stack">
          <div className="placement-board" aria-label="Natal chart placement board">
            {chart.placements.map((placement) => (
              <article className="placement-block" key={placement.body}>
                <strong>{placement.body}</strong>
                <span>{placement.degree} deg {placement.minute}' {placement.sign}</span>
                <small>{placement.element} / {placement.modality}{placement.retrograde ? " / Rx" : ""}</small>
              </article>
            ))}
          </div>
          <div className="data-table" role="table" aria-label="Calculated placements">
            {chart.placements.map((placement) => (
              <div className="data-row" role="row" key={placement.body}>
                <strong>{placement.body}</strong>
                <span>{placement.degree} deg {placement.minute}' {placement.sign}</span>
                <span>{placement.retrograde ? "Retrograde" : "Direct"}</span>
              </div>
            ))}
          </div>
          {chart.warnings.map((warning) => <p className="notice" key={warning}>{warning}</p>)}
        </div>
      )}

      {tab === "Transits" && (
        <div className="metric-grid">
          {chart?.placements.slice(0, 6).map((placement) => (
            <article className="panel" key={placement.body}>
              <DreamGlyph name="transits" size={32} />
              <h3>{placement.body} timing watch</h3>
              <p>Track exact aspects to natal {placement.body} at {placement.degree} deg {placement.sign}.</p>
            </article>
          ))}
        </div>
      )}

      {tab === "Journal" && (
        <div className="stack">
          <div className="form-grid">
            <Field label="Title" value={journalDraft.title} onChange={(value) => setJournalDraft({ ...journalDraft, title: value })} />
            <label className="field">
              <span>Body</span>
              <textarea value={journalDraft.body} onChange={(event) => setJournalDraft({ ...journalDraft, body: event.target.value })} />
            </label>
            <button className="button" onClick={addJournal} type="button">Save journal entry</button>
          </div>
          <div className="metric-grid">{store.journal.map((entry) => <article className="panel" key={entry.id}><h3>{entry.title}</h3><p>{entry.body}</p></article>)}</div>
        </div>
      )}

      {tab === "Relationships" && <ModuleCards labels={["Synastry", "Composite chart", "Consent", "Relationship report"]} glyph="relationship" />}

      {tab === "Clients" && (
        <div className="stack">
          <div className="form-grid">
            <Field label="Client name" value={clientDraft.name} onChange={(value) => setClientDraft({ ...clientDraft, name: value })} />
            <Field label="Client email" value={clientDraft.email} onChange={(value) => setClientDraft({ ...clientDraft, email: value })} />
            <Field label="Private note" value={clientDraft.note} onChange={(value) => setClientDraft({ ...clientDraft, note: value })} />
            <button className="button" onClick={addClient} type="button">Invite client</button>
          </div>
          <div className="metric-grid">{store.clients.map((client) => <article className="panel" key={client.id}><h3>{client.name}</h3><p>{client.email} / {client.status}</p></article>)}</div>
        </div>
      )}

      {tab === "Reports" && chart && (
        <article className="report-preview">
          <img alt="Dream Logic Astrology suite" className="report-logo" src="/brand/fulllitelogo.svg" />
          <p className="eyebrow">Natal report</p>
          <h2>{activeProfile.name}</h2>
          <p>{chart.placements.length} calculated placements / {chart.aspects.length} major aspects</p>
          <h3>Opening synthesis</h3>
          <p>{chart.placements[0].body} in {chart.placements[0].sign} anchors this report section from verified chart data.</p>
        </article>
      )}

      {tab === "Subscriptions" && <div className="metric-grid">{subscriptionPlans.map((plan) => <article className="panel" key={plan.code}><h3>{plan.label}</h3><p>{plan.entitlements.join(" / ")}</p></article>)}</div>}

      {tab === "Privacy" && (
        <div className="metric-grid">
          <article className="panel"><h3>Data export</h3><p>Download browser-persisted Dream Logic data as JSON.</p><button className="button secondary" onClick={exportData} type="button">Export data</button></article>
          <article className="panel"><h3>AI context</h3><p>Off until explicit consent is recorded.</p></article>
          <article className="panel"><h3>Practitioner notes</h3><p>Private notes are separated from client-visible notes.</p></article>
        </div>
      )}
    </section>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return <label className="field"><span>{label}</span><input type={type} value={value} onChange={(event) => onChange(event.target.value)} /></label>;
}

function Metric({ glyph, label, value }: { glyph: Parameters<typeof DreamGlyph>[0]["name"]; label: string; value: number }) {
  return <article className="panel metric"><DreamGlyph name={glyph} size={36} /><h3>{value}</h3><p>{label}</p></article>;
}

function ModuleCards({ labels, glyph }: { labels: string[]; glyph: Parameters<typeof DreamGlyph>[0]["name"] }) {
  return <div className="metric-grid">{labels.map((label) => <article className="panel" key={label}><DreamGlyph name={glyph} size={32} /><h3>{label}</h3></article>)}</div>;
}
