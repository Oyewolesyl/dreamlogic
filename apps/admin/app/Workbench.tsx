"use client";

import { useEffect, useMemo, useState } from "react";

type Surface = {
  name: string;
  role: string;
  url: string;
  repo: string;
  vercel: string;
};

type AdminSection = "overview" | "surfaces" | "billing" | "analytics" | "users" | "pricing" | "content" | "events";
type BillingSummary = {
  connected: boolean;
  currency: string;
  customers: Array<{ id: string; name: string; email: string; created: number }>;
  subscriptions: Array<{ id: string; customer: string; status: string; created: number; currentPeriodEnd: number | null; amount: number; interval: string }>;
  payments: Array<{ id: string; status: string; amount: number; created: number; customer: string }>;
  totals: { customers: number; activeSubscriptions: number; monthlyRecurring: number; paidVolume: number };
};

const sections: Array<[AdminSection, string, string]> = [
  ["overview", "overview", "status across the business"],
  ["surfaces", "sites", "live urls, repos, deployments"],
  ["billing", "buyers", "customers, payments, subscriptions"],
  ["analytics", "analytics", "traffic and conversion checks"],
  ["users", "users", "accounts and plan access"],
  ["pricing", "pricing", "tiers and feature limits"],
  ["content", "content", "brand, glossary, report copy"],
  ["events", "events", "product actions to track"]
];

const plans = [
  ["free", "$0", "one chart, saved basics, beginner glossary"],
  ["seeker", "$9/mo", "multiple charts, timing, journal, relationship notes"],
  ["depth", "$19/mo", "returns, profections, collections, deeper timing"],
  ["practitioner", "$39/mo", "clients, private notes, branded reports"],
  ["practice", "$89/mo", "team access, shared clients, practice analytics"],
  ["research", "$149/mo", "bulk calculations, datasets, exports"]
];

const events = [
  ["landing_view", "visitor opens landing page"],
  ["open_app_click", "visitor moves from landing to web app"],
  ["birth_profile_saved", "user saves birth data"],
  ["chart_opened", "user opens calculated chart"],
  ["mode_changed", "user changes beginner or expert mode"],
  ["plan_selected", "user chooses a subscription tier"],
  ["report_prepared", "user prepares a report"]
];

const contentAreas = [
  ["brand assets", "logos, videos, constellation imagery, report preview"],
  ["glossary", "natal chart, element balance, modality balance, retrograde, time certainty"],
  ["report copy", "birth profile, interpretation, practice notes, exports"],
  ["pricing copy", "plan names, price points, and feature access"],
  ["media order", "ad one stands alone; ad two opens when paired"]
];

const setupChecks = [
  ["database", "supabase", "accounts, profiles, chart snapshots, journals, reports, and workspace restore"],
  ["payments", "stripe", "buyers, subscriptions, invoices, price ids, and webhook events"],
  ["hypnos ai", "openai", "chart/report explanation layer for the web app"],
  ["analytics", "vercel", "landing traffic, app opens, pricing clicks, and product usage"]
];

export function Workbench() {
  const [active, setActive] = useState<AdminSection>("overview");
  const [billing, setBilling] = useState<BillingSummary | null>(null);
  const [billingError, setBillingError] = useState("");
  const landingUrl = process.env.NEXT_PUBLIC_LANDING_URL ?? "https://dreamlogic-landingpage.vercel.app";
  const webappUrl = process.env.NEXT_PUBLIC_WEBAPP_URL ?? "https://dreamlogic-webapp.vercel.app";
  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL ?? "https://dreamlogic-admin.vercel.app";

  const surfaces = useMemo<Surface[]>(() => [
    {
      name: "landing",
      role: "public pitch, pricing, media, investors",
      url: landingUrl,
      repo: "https://github.com/Oyewolesyl/dreamlogic-landingpage",
      vercel: "https://vercel.com/dashboard"
    },
    {
      name: "web app",
      role: "user astrology workspace",
      url: webappUrl,
      repo: "https://github.com/Oyewolesyl/dreamlogic-webapp",
      vercel: "https://vercel.com/dashboard"
    },
    {
      name: "admin",
      role: "private management dashboard",
      url: adminUrl,
      repo: "https://github.com/Oyewolesyl/dreamlogic",
      vercel: "https://vercel.com/dashboard"
    }
  ], [adminUrl, landingUrl, webappUrl]);

  const activeLabel = sections.find(([key]) => key === active)?.[1] ?? "overview";

  useEffect(() => {
    let cancelled = false;
    fetch("/api/billing/summary")
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("billing unavailable")))
      .then((data: BillingSummary) => {
        if (!cancelled) setBilling(data);
      })
      .catch(() => {
        if (!cancelled) setBillingError("billing data could not be loaded");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="admin-frame">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <img src="/brand/logomain.svg" alt="dream logic" />
          <p>private admin</p>
        </div>
        <nav aria-label="admin sections">
          {sections.map(([key, label, detail]) => (
            <button className={active === key ? "active" : ""} key={key} onClick={() => setActive(key)} type="button">
              <span>{label}</span>
              <small>{detail}</small>
            </button>
          ))}
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <p>private operations</p>
            <h1>{activeLabel}</h1>
          </div>
          <div className="admin-actions">
            <a href={landingUrl}>open landing</a>
            <a href={webappUrl}>open app</a>
          </div>
        </header>

        {active === "overview" && (
          <div className="admin-grid">
            <Metric value="3" label="surfaces" body="landing, web app, and private admin are split." />
            <Metric value="6" label="plans" body="free through research pricing is represented." />
            <Metric value={String(billing?.totals.activeSubscriptions ?? 0)} label="active subs" body={billing?.connected ? "live stripe subscription count." : "connect stripe to load real buyers."} />
            <article className="admin-card wide">
              <p className="eyebrow">status</p>
              <h2>manage the business side without opening the public product</h2>
              <p>use this private console to check live surfaces, buyer activity, subscription health, pricing, event tracking, and setup gaps. the landing and web app link to each other; this admin stays separate.</p>
            </article>
            <article className="admin-card wide setup-card">
              <p className="eyebrow">launch checklist</p>
              <div className="setup-list">
                {setupChecks.map(([name, provider, detail]) => (
                  <div key={name}>
                    <strong>{name}</strong>
                    <span>{provider}</span>
                    <p>{detail}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        )}

        {active === "surfaces" && (
          <div className="surface-list">
            {surfaces.map((surface) => (
              <article className="admin-card surface-card" key={surface.name}>
                <p className="eyebrow">{surface.name}</p>
                <h2>{surface.role}</h2>
                <div className="link-row">
                  <a href={surface.url}>open site</a>
                  <a href={surface.repo}>github</a>
                  <a href={surface.vercel}>vercel</a>
                </div>
                <small>{surface.url}</small>
              </article>
            ))}
          </div>
        )}

        {active === "billing" && (
          <div className="admin-grid">
            <Metric value={String(billing?.totals.customers ?? 0)} label="buyers" body={billing?.connected ? "customers loaded from stripe." : "set STRIPE_SECRET_KEY in vercel."} />
            <Metric value={String(billing?.totals.activeSubscriptions ?? 0)} label="active subscriptions" body="paid plans currently active." />
            <Metric value={money(billing?.totals.monthlyRecurring ?? 0)} label="monthly recurring" body="active subscription value from stripe prices." />
            <Metric value={money(billing?.totals.paidVolume ?? 0)} label="paid volume" body="succeeded payment volume in latest stripe window." />
            <article className="admin-card wide">
              <p className="eyebrow">billing connection</p>
              <h2>{billing?.connected ? "stripe is connected" : "stripe is not connected yet"}</h2>
              <p>{billing?.connected ? "customers, subscriptions, and payments below are live stripe records." : "add stripe_secret_key to the admin vercel project to show actual buyers, purchases, and subscriptions here."}</p>
              {billingError && <p>{billingError}</p>}
            </article>
            <DataTable
              title="subscriptions"
              rows={(billing?.subscriptions ?? []).map((subscription) => [
                subscription.status,
                money(subscription.amount),
                subscription.interval,
                subscription.customer
              ])}
              empty="no subscriptions loaded"
            />
            <DataTable
              title="payments"
              rows={(billing?.payments ?? []).map((payment) => [
                payment.status,
                money(payment.amount),
                date(payment.created),
                payment.customer
              ])}
              empty="no payments loaded"
            />
            <DataTable
              title="customers"
              rows={(billing?.customers ?? []).map((customer) => [
                customer.name,
                customer.email,
                date(customer.created),
                customer.id
              ])}
              empty="no customers loaded"
            />
          </div>
        )}

        {active === "analytics" && (
          <div className="admin-grid">
            <article className="admin-card wide">
              <p className="eyebrow">measurement</p>
              <h2>watch the path from visitor to paid workspace</h2>
              <p>read traffic by surface: landing visits, app opens, pricing clicks, saved birth data, chart opens, hypnos asks, report preparation, account attempts, and plan selection.</p>
              <div className="link-row">
                <a href="https://vercel.com/dashboard">open vercel analytics</a>
                <button type="button" onClick={() => setActive("events")}>view event map</button>
              </div>
            </article>
            <Metric value="landing" label="first question" body="are people moving from pitch to app?" />
            <Metric value="app" label="second question" body="are people saving birth data and opening charts?" />
            <Metric value="pricing" label="third question" body="which plan gets selected most often?" />
          </div>
        )}

        {active === "users" && (
          <div className="admin-grid">
            <Metric value="free" label="default access" body="one chart and beginner glossary." />
            <Metric value="seeker" label="first paid tier" body="multiple charts, timing, and journal links." />
            <Metric value="practice" label="team tier" body="client records and shared workflows." />
            <article className="admin-card wide">
              <p className="eyebrow">access model</p>
              <h2>review who can use what, then resolve support issues fast</h2>
              <p>this panel is organized for account lookup, plan status, subscription changes, support checks, and access review. the live account table appears here once the production database is connected.</p>
            </article>
          </div>
        )}

        {active === "pricing" && (
          <div className="plan-grid">
            {plans.map(([name, price, detail]) => (
              <article className="admin-card" key={name}>
                <p className="eyebrow">{name}</p>
                <h2>{price}</h2>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        )}

        {active === "content" && (
          <div className="surface-list">
            {contentAreas.map(([name, detail]) => (
              <article className="admin-card" key={name}>
                <p className="eyebrow">{name}</p>
                <h2>{detail}</h2>
              </article>
            ))}
          </div>
        )}

        {active === "events" && (
          <div className="surface-list">
            {events.map(([name, detail]) => (
              <article className="admin-card event-card" key={name}>
                <strong>{name}</strong>
                <span>{detail}</span>
              </article>
            ))}
          </div>
        )}
      </main>
    </section>
  );
}

function Metric({ value, label, body }: { value: string; label: string; body: string }) {
  return (
    <article className="admin-card metric">
      <strong>{value}</strong>
      <span>{label}</span>
      <p>{body}</p>
    </article>
  );
}

function DataTable({ title, rows, empty }: { title: string; rows: string[][]; empty: string }) {
  return (
    <article className="admin-card data-card wide">
      <p className="eyebrow">{title}</p>
      {rows.length === 0 ? <p>{empty}</p> : (
        <div className="data-list">
          {rows.map((row) => (
            <div className="data-row" key={row.join("-")}>
              {row.map((cell) => <span key={cell}>{cell}</span>)}
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

function money(cents: number) {
  return `$${(cents / 100).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

function date(seconds: number) {
  return new Date(seconds * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toLowerCase();
}
