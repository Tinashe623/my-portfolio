import https from "node:https";
import { lookup } from "node:dns/promises";

const NEON_HOST_SUFFIX = ".neon.tech";

interface HttpsResult {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: Buffer;
}

function requestViaIp(
  hostname: string,
  ip: string,
  url: URL,
  init?: RequestInit,
  signal?: AbortSignal
): Promise<HttpsResult> {
  return new Promise((resolve, reject) => {
    const method = init?.method ?? "GET";
    const headers: Record<string, string> = {};

    if (init?.headers) {
      const h = init.headers as Record<string, string | number | readonly string[] | undefined> | Headers;
      if (typeof (h as Headers).forEach === "function") {
        (h as Headers).forEach((value, key) => {
          headers[key] = String(value);
        });
      } else {
        for (const [key, value] of Object.entries(h as Record<string, string | undefined>)) {
          if (value !== undefined) headers[key] = String(value);
        }
      }
    }

    if (!headers["content-length"] && init?.body && typeof init.body === "string") {
      headers["content-length"] = String(Buffer.byteLength(init.body));
    }

    const onAbort = () => req.destroy(new Error("The operation was aborted"));

    const req = https.request(
      {
        host: ip,
        port: url.port || 443,
        servername: hostname,
        path: `${url.pathname}${url.search}`,
        method,
        headers,
        timeout: 30000,
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (c: Buffer) => chunks.push(c));
        res.on("end", () => {
          const body = Buffer.concat(chunks);
          const statusText = res.statusMessage ?? "";
          const respHeaders: Record<string, string> = {};
          for (let i = 0; i < res.rawHeaders.length; i += 2) {
            respHeaders[res.rawHeaders[i].toLowerCase()] = res.rawHeaders[i + 1];
          }
          resolve({ status: res.statusCode ?? 500, statusText, headers: respHeaders, body });
        });
      }
    );

    req.on("timeout", () => req.destroy(new Error("The request timed out")));
    req.on("error", reject);
    signal?.addEventListener("abort", onAbort, { once: true });

    if (init?.body) {
      if (typeof init.body === "string") {
        req.write(init.body);
      } else if (init.body instanceof Uint8Array) {
        req.write(Buffer.from(init.body));
      } else if (init.body instanceof ArrayBuffer) {
        req.write(Buffer.from(init.body));
      } else {
        req.write(String(init.body));
      }
    }
    req.end();
  });
}

async function fetchNeon(url: URL, init?: RequestInit): Promise<Response> {
  const hostname = url.hostname;
  const records = await lookup(hostname, { all: true, family: 4 });

  if (records.length === 0) {
    return globalThis.fetch(url, init);
  }

  let lastError: Error | null = null;
  for (const record of records) {
    try {
      const result = await requestViaIp(hostname, record.address, url, init, init?.signal ?? undefined);

      if ([301, 302, 303, 307, 308].includes(result.status) && result.headers.location) {
        return globalThis.fetch(new URL(result.headers.location, url), init);
      }

      return new Response(new Uint8Array(result.body), {
        status: result.status,
        statusText: result.statusText,
        headers: {
          "content-type": result.headers["content-type"] ?? "application/json",
        },
      });
    } catch (error) {
      lastError = error as Error;
    }
  }

  throw lastError ?? new Error(`Failed to connect to ${hostname}`);
}

export async function neonFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  const url = input instanceof URL ? input : new URL(String(input));
  const usesNeonHost = url.hostname.endsWith(NEON_HOST_SUFFIX);

  if (!usesNeonHost || url.protocol !== "https:") {
    return globalThis.fetch(input, init);
  }

  return fetchNeon(url, init);
}