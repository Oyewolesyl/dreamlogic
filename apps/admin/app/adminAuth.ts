import { createHash, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE = "dreamlogic_admin";

const hash = (value: string) => createHash("sha256").update(value).digest("hex");

export const configuredPassword = () => process.env.DREAMLOGIC_ADMIN_PASSWORD ?? "";

export const adminToken = () => {
  const password = configuredPassword();
  const secret = process.env.DREAMLOGIC_ADMIN_SECRET ?? password;
  return password ? hash(`${password}:${secret}`) : "";
};

export const passwordMatches = (candidate: string) => {
  const password = configuredPassword();
  if (!password || !candidate) return false;
  const expected = Buffer.from(hash(password));
  const received = Buffer.from(hash(candidate));
  return expected.length === received.length && timingSafeEqual(expected, received);
};
