const adminAreas = [
  "Users",
  "Subscriptions",
  "Practitioner review",
  "Interpretation content",
  "Courses",
  "Glyph management",
  "Feature flags",
  "AI usage",
  "Calculation health",
  "Billing webhooks",
  "Support cases",
  "Reports",
  "Audits",
  "Incidents"
];

export default function AdminHome() {
  return (
    <main style={{ background: "#0d0d0e", color: "#f5f5f2", minHeight: "100vh", padding: 32 }}>
      <p style={{ color: "#f5c21c", textTransform: "uppercase", letterSpacing: "0.08em" }}>Dream Logic administration</p>
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: 64, letterSpacing: 0 }}>Operations console</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
        {adminAreas.map((area) => (
          <section key={area} style={{ border: "1px solid rgba(255,255,255,.14)", padding: 18 }}>
            <strong>{area}</strong>
          </section>
        ))}
      </div>
    </main>
  );
}
