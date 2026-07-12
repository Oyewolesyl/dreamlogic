"use client";

import { FormEvent, useState } from "react";

export function AdminGate({ configured }: { configured: boolean }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError("");

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password })
    });

    setBusy(false);

    if (response.ok) {
      window.location.reload();
      return;
    }

    setError(configured ? "password not accepted" : "set DREAMLOGIC_ADMIN_PASSWORD in vercel first");
  };

  return (
    <main className="app-shell">
      <section className="admin-login">
        <img src="/brand/logomain.svg" alt="dream logic" />
        <p>private admin dashboard</p>
        <h1>sign in</h1>
        <form onSubmit={submit}>
          <label>
            password
            <input
              autoComplete="current-password"
              disabled={!configured || busy}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              value={password}
            />
          </label>
          <button disabled={!configured || busy} type="submit">{busy ? "checking" : "enter admin"}</button>
        </form>
        {error && <p className="login-error">{error}</p>}
      </section>
    </main>
  );
}
