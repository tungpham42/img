import { headers } from "next/headers";

export async function getHostUrl(): Promise<string> {
  const headersList = await headers(); // ⬅️ await this
  const host = headersList.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const hostUrl = `${protocol}://${host}` || "http://localhost:3000";
  return hostUrl.replace(/\/$/, "");
}
