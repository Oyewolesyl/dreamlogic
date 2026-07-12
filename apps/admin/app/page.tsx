import { cookies } from "next/headers";
import { ADMIN_COOKIE, adminToken, configuredPassword } from "./adminAuth";
import { AdminGate } from "./AdminGate";
import { Workbench } from "./Workbench";

export default async function DreamLogicApp() {
  const token = adminToken();
  const cookieStore = await cookies();
  const isAuthed = Boolean(token) && cookieStore.get(ADMIN_COOKIE)?.value === token;

  if (!isAuthed) {
    return <AdminGate configured={Boolean(configuredPassword())} />;
  }

  return (
    <main className="app-shell">
      <Workbench />
    </main>
  );
}
