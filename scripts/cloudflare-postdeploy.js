const domain = process.env.SITE_DOMAIN;
const projectName = process.env.CLOUDFLARE_PAGES_PROJECT;
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const token = process.env.CLOUDFLARE_API_TOKEN;

if (!domain || !projectName || !accountId || !token) {
  throw new Error("SITE_DOMAIN, CLOUDFLARE_PAGES_PROJECT, CLOUDFLARE_ACCOUNT_ID, and CLOUDFLARE_API_TOKEN are required.");
}

const apiBase = "https://api.cloudflare.com/client/v4";
const pagesHost = `${projectName}.pages.dev`;

async function cf(path, options = {}) {
  const res = await fetch(`${apiBase}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false) {
    const message = data.errors?.map((error) => error.message).join("; ") || `HTTP ${res.status}`;
    const err = new Error(message);
    err.data = data;
    throw err;
  }
  return data.result;
}

async function getOrCreateZone() {
  const existing = await cf(`/zones?name=${encodeURIComponent(domain)}`);
  if (existing.length) return existing[0];
  return cf("/zones", {
    method: "POST",
    body: JSON.stringify({
      account: { id: accountId },
      name: domain,
      type: "full",
    }),
  });
}

async function upsertCname(zoneId, name) {
  const existing = await cf(`/zones/${zoneId}/dns_records?name=${encodeURIComponent(name)}`);
  const body = {
    type: "CNAME",
    name,
    content: pagesHost,
    ttl: 1,
    proxied: false,
  };
  const cname = existing.find((record) => record.type === "CNAME");
  if (cname) {
    return cf(`/zones/${zoneId}/dns_records/${cname.id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  }
  for (const record of existing.filter((item) => ["A", "AAAA"].includes(item.type))) {
    await cf(`/zones/${zoneId}/dns_records/${record.id}`, { method: "DELETE" });
  }
  return cf(`/zones/${zoneId}/dns_records`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

async function addPagesDomain(name) {
  try {
    await cf(`/accounts/${accountId}/pages/projects/${projectName}/domains`, {
      method: "POST",
      body: JSON.stringify({ name }),
    });
    return "added";
  } catch (error) {
    if (/already|exists|duplicate/i.test(error.message)) return "exists";
    throw error;
  }
}

(async () => {
  const directApex = await addPagesDomain(domain).catch((error) => `pending: ${error.message}`);
  const directWww = await addPagesDomain(`www.${domain}`).catch((error) => `pending: ${error.message}`);

  let zone;
  try {
    zone = await getOrCreateZone();
  } catch (error) {
    if (/zone\.create|create zones/i.test(error.message)) {
      console.log("Cloudflare DNS setup pending");
      console.log(`domain=${domain}`);
      console.log(`pages_project=${projectName}`);
      console.log(`pages_host=${pagesHost}`);
      console.log(`custom_domain_apex=${directApex}`);
      console.log(`custom_domain_www=${directWww}`);
      console.log('reason=API token lacks "account zone create" permission');
      console.log("next=Add the domain as a Cloudflare zone manually or update the token with zone create + DNS edit permissions, then rerun this workflow.");
      return;
    }
    throw error;
  }
  await upsertCname(zone.id, domain);
  await upsertCname(zone.id, `www.${domain}`);
  const apex = directApex;
  const www = directWww;

  console.log("Cloudflare setup complete");
  console.log(`domain=${domain}`);
  console.log(`zone_id=${zone.id}`);
  console.log(`zone_status=${zone.status}`);
  console.log(`pages_project=${projectName}`);
  console.log(`pages_host=${pagesHost}`);
  console.log(`custom_domain_apex=${apex}`);
  console.log(`custom_domain_www=${www}`);
  console.log(`name_servers=${(zone.name_servers || []).join(",")}`);
})();
