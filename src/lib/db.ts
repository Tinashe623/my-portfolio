import { neon, neonConfig } from "@neondatabase/serverless";
import { randomUUID } from "node:crypto";
import { neonFetch } from "@/lib/neon-fetch";

neonConfig.fetchFunction = neonFetch;

function createClient() {
  return neon(process.env.DATABASE_URL ?? "", { fullResults: true });
}

let neonClient: ReturnType<typeof createClient> | null = null;

function getSql(): ReturnType<typeof createClient> {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error("DATABASE_URL is not configured");
  }

  if (!neonClient) {
    neonClient = createClient();
  }

  return neonClient;
}

type RowLike = Record<string, unknown>;

export interface ProjectRow {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string | null;
  image: string | null;
  images: string[];
  tags: string[];
  category: string;
  status: string;
  featured: boolean;
  liveUrl: string | null;
  codeUrl: string | null;
  clientName: string | null;
  testimonial: string | null;
  testimonialAuthor: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPostRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  tags: string[];
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface MessageRow {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  replied: boolean;
  createdAt: string;
}

export interface AdminRow {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: string;
}

export interface CertificateRow {
  id: string;
  title: string;
  slug: string;
  issuer: string;
  issueDate: string;
  expiryDate: string | null;
  credentialId: string | null;
  credentialUrl: string | null;
  image: string | null;
  description: string | null;
  tags: string[];
  verified: boolean;
  createdAt: string;
}

export interface SkillRow {
  id: string;
  name: string;
  category: string;
  level: string;
  icon: string | null;
  description: string | null;
  featured: boolean;
  order: number;
}

export interface TestimonialRow {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string | null;
  rating: number;
  featured: boolean;
  createdAt: string;
}

function pgArray(values: unknown[]): string {
  const parts = values.map((v) => {
    const s = String(v).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    return `"${s}"`;
  });
  return `{${parts.join(",")}}`;
}

function mapRow(row: RowLike, list: string[]): RowLike {
  const out: RowLike = {};
  for (const key of list) out[key] = row[key] ?? null;
  return out;
}

const PROJECT_KEYS = [
  "id",
  "title",
  "slug",
  "description",
  "content",
  "image",
  "images",
  "tags",
  "category",
  "status",
  "featured",
  "liveUrl",
  "codeUrl",
  "clientName",
  "testimonial",
  "testimonialAuthor",
  "createdAt",
  "updatedAt",
] as const;

const BLOG_KEYS = [
  "id",
  "title",
  "slug",
  "excerpt",
  "content",
  "coverImage",
  "tags",
  "published",
  "publishedAt",
  "createdAt",
  "updatedAt",
] as const;

const MESSAGE_KEYS = [
  "id",
  "name",
  "email",
  "subject",
  "message",
  "read",
  "replied",
  "createdAt",
] as const;

const ADMIN_KEYS = ["id", "email", "password", "name", "createdAt"] as const;

const CERTIFICATE_KEYS = [
  "id",
  "title",
  "slug",
  "issuer",
  "issueDate",
  "expiryDate",
  "credentialId",
  "credentialUrl",
  "image",
  "description",
  "tags",
  "verified",
  "createdAt",
] as const;

const SKILL_KEYS = [
  "id",
  "name",
  "category",
  "level",
  "icon",
  "description",
  "featured",
  "order",
] as const;

const TESTIMONIAL_KEYS = [
  "id",
  "name",
  "role",
  "company",
  "content",
  "avatar",
  "rating",
  "featured",
  "createdAt",
] as const;

function projectFrom(db: RowLike): ProjectRow {
  return mapRow(db, [...PROJECT_KEYS]) as unknown as ProjectRow;
}

function blogFrom(db: RowLike): BlogPostRow {
  return mapRow(db, [...BLOG_KEYS]) as unknown as BlogPostRow;
}

function messageFrom(db: RowLike): MessageRow {
  return mapRow(db, [...MESSAGE_KEYS]) as unknown as MessageRow;
}

function adminFrom(db: RowLike): AdminRow {
  return mapRow(db, [...ADMIN_KEYS]) as unknown as AdminRow;
}

function certificateFrom(db: RowLike): CertificateRow {
  return mapRow(db, [...CERTIFICATE_KEYS]) as unknown as CertificateRow;
}

function skillFrom(db: RowLike): SkillRow {
  return mapRow(db, [...SKILL_KEYS]) as unknown as SkillRow;
}

function testimonialFrom(db: RowLike): TestimonialRow {
  return mapRow(db, [...TESTIMONIAL_KEYS]) as unknown as TestimonialRow;
}

async function rowsOf(query: { rows: RowLike[] }): Promise<RowLike[]> {
  return query.rows;
}

// ---- serialization helpers for writes ----

type WriteValue = string | number | boolean | null | string[];

function writableFields(
  data: Record<string, unknown>,
  allowed: readonly string[],
  defaults: Record<string, WriteValue>
): Array<[string, WriteValue]> {
  const fields: Array<[string, WriteValue]> = [];
  for (const key of allowed) {
    const value = data[key];
    if (value === undefined) {
      if (key in defaults) fields.push([key, defaults[key]]);
    } else if (typeof value === "string" || typeof value === "number" || typeof value === "boolean" || value === null) {
      fields.push([key, value as WriteValue]);
    } else if (Array.isArray(value)) {
      fields.push([key, value as string[]]);
    }
  }
  return fields;
}

function paramFor(field: [string, WriteValue]): { value: unknown; cast: boolean } {
  const value = field[1];
  if (Array.isArray(value)) {
    return { value: pgArray(value), cast: true };
  }
  return { value, cast: false };
}

function placeholders(fields: Array<[string, WriteValue]>) {
  return fields
    .map((field, i) => (paramFor(field).cast ? `$${i + 1}::text[]` : `$${i + 1}`))
    .join(", ");
}

function paramValues(fields: Array<[string, WriteValue]>): unknown[] {
  return fields.map((field) => paramFor(field).value);
}

function quotedColumns(fields: Array<[string, WriteValue]>) {
  return fields.map((f) => `"${f[0]}"`).join(", ");
}

// ---- projects ----

export async function listProjects(): Promise<ProjectRow[]> {
  const res = await getSql().query(
    `select ${PROJECT_KEYS.map((k) => `"${k}"`).join(", ")} from "projects" order by "createdAt" desc`
  );
  return (await rowsOf(res)).map(projectFrom);
}

export async function findProject(id: string): Promise<ProjectRow | null> {
  const res = await getSql().query(
    `select ${PROJECT_KEYS.map((k) => `"${k}"`).join(", ")} from "projects" where "id" = $1 limit 1`,
    [id]
  );
  const rows = await rowsOf(res);
  return rows.length ? projectFrom(rows[0]) : null;
}

export async function findProjectBySlug(slug: string): Promise<ProjectRow | null> {
  const res = await getSql().query(
    `select ${PROJECT_KEYS.map((k) => `"${k}"`).join(", ")} from "projects" where "slug" = $1 limit 1`,
    [slug]
  );
  const rows = await rowsOf(res);
  return rows.length ? projectFrom(rows[0]) : null;
}

export async function createProject(
  data: Record<string, unknown>
): Promise<ProjectRow> {
  const fields = writableFields(data, PROJECT_KEYS, {
    status: "completed",
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const id = typeof data.id === "string" ? data.id : randomUUID();
  const idFields: Array<[string, WriteValue]> = [["id", id]];
  const cols = [...idFields, ...fields];
  const res = await getSql().query(
    `insert into "projects" (${quotedColumns(cols)}) values (${placeholders(cols)}) returning *`,
    paramValues(cols)
  );
  const rows = await rowsOf(res);
  return projectFrom(rows[0]);
}

export async function updateProject(
  id: string,
  data: Record<string, unknown>
): Promise<ProjectRow | null> {
  const writable = writableFields(data, PROJECT_KEYS, {});
  const fields = [...writable, ["updatedAt", new Date().toISOString()] as [string, WriteValue]];
  const sets = fields.map((f, i) => (paramFor(f).cast ? `"${f[0]}" = $${i + 1}::text[]` : `"${f[0]}" = $${i + 1}`)).join(", ");
  const res = await getSql().query(
    `update "projects" set ${sets} where "id" = $${fields.length + 1} returning *`,
    [...paramValues(fields), id]
  );
  const rows = await rowsOf(res);
  return rows.length ? projectFrom(rows[0]) : null;
}

export async function deleteProject(id: string): Promise<boolean> {
  const res = await getSql().query(`delete from "projects" where "id" = $1`, [id]);
  const rows = await rowsOf(res);
  return rows.length > 0;
}

// ---- blog posts ----

export async function listPublishedPosts(): Promise<BlogPostRow[]> {
  const res = await getSql().query(
    `select ${BLOG_KEYS.map((k) => `"${k}"`).join(", ")} from "blog_posts" where "published" = true order by "publishedAt" desc`
  );
  return (await rowsOf(res)).map(blogFrom);
}

export async function listAllPosts(): Promise<BlogPostRow[]> {
  const res = await getSql().query(
    `select ${BLOG_KEYS.map((k) => `"${k}"`).join(", ")} from "blog_posts" order by "updatedAt" desc`
  );
  return (await rowsOf(res)).map(blogFrom);
}

export async function findBlogPostBySlug(slug: string): Promise<BlogPostRow | null> {
  const res = await getSql().query(
    `select ${BLOG_KEYS.map((k) => `"${k}"`).join(", ")} from "blog_posts" where "slug" = $1 and "published" = true limit 1`,
    [slug]
  );
  const rows = await rowsOf(res);
  return rows.length ? blogFrom(rows[0]) : null;
}

export async function findBlogPost(id: string): Promise<BlogPostRow | null> {
  const res = await getSql().query(
    `select ${BLOG_KEYS.map((k) => `"${k}"`).join(", ")} from "blog_posts" where "id" = $1 limit 1`,
    [id]
  );
  const rows = await rowsOf(res);
  return rows.length ? blogFrom(rows[0]) : null;
}

export async function createBlogPost(
  data: Record<string, unknown>
): Promise<BlogPostRow> {
  const published = data.published === true;
  const publishedAt =
    typeof data.publishedAt === "string" && data.publishedAt
      ? data.publishedAt
      : published
        ? new Date().toISOString()
        : null;
  const fields = writableFields(
    { ...data, publishedAt },
    BLOG_KEYS,
    {
      published: false,
      publishedAt,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  );
  const id = typeof data.id === "string" ? data.id : randomUUID();
  const idFields: Array<[string, WriteValue]> = [["id", id]];
  const cols = [...idFields, ...fields];
  const res = await getSql().query(
    `insert into "blog_posts" (${quotedColumns(cols)}) values (${placeholders(cols)}) returning *`,
    paramValues(cols)
  );
  const rows = await rowsOf(res);
  return blogFrom(rows[0]);
}

export async function updateBlogPost(
  id: string,
  data: Record<string, unknown>
): Promise<BlogPostRow | null> {
  const current = await findBlogPost(id);
  const published =
    typeof data.published === "boolean" ? data.published : (current?.published ?? false);

  let publishedAt: string | null = null;
  if (published) {
    publishedAt =
      typeof data.publishedAt === "string" && data.publishedAt
        ? data.publishedAt
        : (current?.publishedAt ?? new Date().toISOString());
  }

  const writable = writableFields({ ...data, publishedAt }, BLOG_KEYS, {});
  const fields = [...writable, ["updatedAt", new Date().toISOString()] as [string, WriteValue]];
  const sets = fields.map((f, i) => (paramFor(f).cast ? `"${f[0]}" = $${i + 1}::text[]` : `"${f[0]}" = $${i + 1}`)).join(", ");
  const res = await getSql().query(
    `update "blog_posts" set ${sets} where "id" = $${fields.length + 1} returning *`,
    [...paramValues(fields), id]
  );
  const rows = await rowsOf(res);
  return rows.length ? blogFrom(rows[0]) : null;
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const res = await getSql().query(`delete from "blog_posts" where "id" = $1`, [id]);
  const rows = await rowsOf(res);
  return rows.length > 0;
}

// ---- messages ----

export async function listMessages(): Promise<MessageRow[]> {
  const res = await getSql().query(
    `select ${MESSAGE_KEYS.map((k) => `"${k}"`).join(", ")} from "messages" order by "createdAt" desc`
  );
  return (await rowsOf(res)).map(messageFrom);
}

export async function createMessage(data: {
  name: string;
  email: string;
  subject?: string | null;
  message: string;
}): Promise<MessageRow> {
  const fields: Array<[string, WriteValue]> = [
    ["id", randomUUID()],
    ["name", data.name],
    ["email", data.email],
    ["subject", data.subject ?? "No subject"],
    ["message", data.message],
    ["read", false],
    ["replied", false],
    ["createdAt", new Date().toISOString()],
  ];
  const res = await getSql().query(
    `insert into "messages" (${quotedColumns(fields)}) values (${placeholders(fields)}) returning *`,
    paramValues(fields)
  );
  const rows = await rowsOf(res);
  return messageFrom(rows[0]);
}

export async function deleteMessage(id: string): Promise<boolean> {
  const res = await getSql().query(`delete from "messages" where "id" = $1`, [id]);
  const rows = await rowsOf(res);
  return rows.length > 0;
}

export async function updateMessage(
  id: string,
  data: { read?: boolean; replied?: boolean }
): Promise<MessageRow | null> {
  const set: Array<[string, WriteValue]> = [];
  if (typeof data.read === "boolean") set.push(["read", data.read]);
  if (typeof data.replied === "boolean") set.push(["replied", data.replied]);
  if (set.length === 0) return findMessage(id);

  const res = await getSql().query(
    `update "messages" set ${set
      .map((f, i) => `"${f[0]}" = $${i + 1}`)
      .join(", ")} where "id" = $${set.length + 1} returning *`,
    [...set.map((f) => f[1] as unknown), id]
  );
  const rows = await rowsOf(res);
  return rows.length ? messageFrom(rows[0]) : null;
}

export async function findMessage(id: string): Promise<MessageRow | null> {
  const res = await getSql().query(
    `select ${MESSAGE_KEYS.map((k) => `"${k}"`).join(", ")} from "messages" where "id" = $1 limit 1`,
    [id]
  );
  const rows = await rowsOf(res);
  return rows.length ? messageFrom(rows[0]) : null;
}

// ---- certificates ----

export async function listCertificates(): Promise<CertificateRow[]> {
  const res = await getSql().query(
    `select ${CERTIFICATE_KEYS.map((k) => `"${k}"`).join(", ")} from "certificates" order by "issueDate" desc`
  );
  return (await rowsOf(res)).map(certificateFrom);
}

export async function findCertificate(id: string): Promise<CertificateRow | null> {
  const res = await getSql().query(
    `select ${CERTIFICATE_KEYS.map((k) => `"${k}"`).join(", ")} from "certificates" where "id" = $1 limit 1`,
    [id]
  );
  const rows = await rowsOf(res);
  return rows.length ? certificateFrom(rows[0]) : null;
}

export async function createCertificate(
  data: Record<string, unknown>
): Promise<CertificateRow> {
  const fields = writableFields(data, CERTIFICATE_KEYS, {
    verified: true,
    createdAt: new Date().toISOString(),
  });
  const id = typeof data.id === "string" ? data.id : randomUUID();
  const idFields: Array<[string, WriteValue]> = [["id", id]];
  const cols = [...idFields, ...fields];
  const res = await getSql().query(
    `insert into "certificates" (${quotedColumns(cols)}) values (${placeholders(cols)}) returning *`,
    paramValues(cols)
  );
  const rows = await rowsOf(res);
  return certificateFrom(rows[0]);
}

export async function updateCertificate(
  id: string,
  data: Record<string, unknown>
): Promise<CertificateRow | null> {
  const writable = writableFields(data, CERTIFICATE_KEYS, {});
  const res = await getSql().query(
    `update "certificates" set ${writable
      .map((f, i) =>
        paramFor(f).cast
          ? `"${f[0]}" = $${i + 1}::text[]`
          : `"${f[0]}" = $${i + 1}`
      )
      .join(", ")} where "id" = $${writable.length + 1} returning *`,
    [...paramValues(writable), id]
  );
  const rows = await rowsOf(res);
  return rows.length ? certificateFrom(rows[0]) : null;
}

export async function deleteCertificate(id: string): Promise<boolean> {
  const res = await getSql().query(`delete from "certificates" where "id" = $1`, [id]);
  const rows = await rowsOf(res);
  return rows.length > 0;
}

// ---- skills ----

export async function listSkills(): Promise<SkillRow[]> {
  const res = await getSql().query(
    `select ${SKILL_KEYS.map((k) => `"${k}"`).join(", ")} from "skills" order by "order" asc, "name" asc`
  );
  return (await rowsOf(res)).map(skillFrom);
}

export async function findSkill(id: string): Promise<SkillRow | null> {
  const res = await getSql().query(
    `select ${SKILL_KEYS.map((k) => `"${k}"`).join(", ")} from "skills" where "id" = $1 limit 1`,
    [id]
  );
  const rows = await rowsOf(res);
  return rows.length ? skillFrom(rows[0]) : null;
}

export async function createSkill(
  data: Record<string, unknown>
): Promise<SkillRow> {
  const fields = writableFields(data, SKILL_KEYS, {
    level: "intermediate",
    featured: true,
    order: 0,
  });
  const id = typeof data.id === "string" ? data.id : randomUUID();
  const idFields: Array<[string, WriteValue]> = [["id", id]];
  const cols = [...idFields, ...fields];
  const res = await getSql().query(
    `insert into "skills" (${quotedColumns(cols)}) values (${placeholders(cols)}) returning *`,
    paramValues(cols)
  );
  const rows = await rowsOf(res);
  return skillFrom(rows[0]);
}

export async function updateSkill(
  id: string,
  data: Record<string, unknown>
): Promise<SkillRow | null> {
  const writable = writableFields(data, SKILL_KEYS, {});
  const res = await getSql().query(
    `update "skills" set ${writable
      .map((f, i) =>
        paramFor(f).cast
          ? `"${f[0]}" = $${i + 1}::text[]`
          : `"${f[0]}" = $${i + 1}`
      )
      .join(", ")} where "id" = $${writable.length + 1} returning *`,
    [...paramValues(writable), id]
  );
  const rows = await rowsOf(res);
  return rows.length ? skillFrom(rows[0]) : null;
}

export async function deleteSkill(id: string): Promise<boolean> {
  const res = await getSql().query(`delete from "skills" where "id" = $1`, [id]);
  const rows = await rowsOf(res);
  return rows.length > 0;
}

// ---- testimonials ----

export async function listTestimonials(): Promise<TestimonialRow[]> {
  const res = await getSql().query(
    `select ${TESTIMONIAL_KEYS.map((k) => `"${k}"`).join(", ")} from "testimonials" order by "featured" desc, "createdAt" desc`
  );
  return (await rowsOf(res)).map(testimonialFrom);
}

export async function findTestimonial(id: string): Promise<TestimonialRow | null> {
  const res = await getSql().query(
    `select ${TESTIMONIAL_KEYS.map((k) => `"${k}"`).join(", ")} from "testimonials" where "id" = $1 limit 1`,
    [id]
  );
  const rows = await rowsOf(res);
  return rows.length ? testimonialFrom(rows[0]) : null;
}

export async function createTestimonial(
  data: Record<string, unknown>
): Promise<TestimonialRow> {
  const fields = writableFields(data, TESTIMONIAL_KEYS, {
    rating: 5,
    featured: false,
    createdAt: new Date().toISOString(),
  });
  const id = typeof data.id === "string" ? data.id : randomUUID();
  const idFields: Array<[string, WriteValue]> = [["id", id]];
  const cols = [...idFields, ...fields];
  const res = await getSql().query(
    `insert into "testimonials" (${quotedColumns(cols)}) values (${placeholders(cols)}) returning *`,
    paramValues(cols)
  );
  const rows = await rowsOf(res);
  return testimonialFrom(rows[0]);
}

export async function updateTestimonial(
  id: string,
  data: Record<string, unknown>
): Promise<TestimonialRow | null> {
  const writable = writableFields(data, TESTIMONIAL_KEYS, {});
  const res = await getSql().query(
    `update "testimonials" set ${writable
      .map((f, i) =>
        paramFor(f).cast
          ? `"${f[0]}" = $${i + 1}::text[]`
          : `"${f[0]}" = $${i + 1}`
      )
      .join(", ")} where "id" = $${writable.length + 1} returning *`,
    [...paramValues(writable), id]
  );
  const rows = await rowsOf(res);
  return rows.length ? testimonialFrom(rows[0]) : null;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const res = await getSql().query(`delete from "testimonials" where "id" = $1`, [id]);
  const rows = await rowsOf(res);
  return rows.length > 0;
}

// ---- admin ----

export async function findAdminByEmail(email: string): Promise<AdminRow | null> {
  const res = await getSql().query(
    `select ${ADMIN_KEYS.map((k) => `"${k}"`).join(", ")} from "admins" where "email" = $1 limit 1`,
    [email]
  );
  const rows = await rowsOf(res);
  return rows.length ? adminFrom(rows[0]) : null;
}

// ---- counts ----

async function countRows(table: string, where?: string): Promise<number> {
  const res = await getSql().query(
    `select count(*)::int as n from "${table}"${where ? ` where ${where}` : ""}`
  );
  const rows = await rowsOf(res);
  return Number(rows[0].n ?? 0);
}

export async function countProjects(): Promise<number> {
  return countRows("projects");
}

export async function countBlogPosts(): Promise<number> {
  return countRows("blog_posts");
}

export async function countPublishedPosts(): Promise<number> {
  return countRows("blog_posts", `"published" = true`);
}

export async function countDraftPosts(): Promise<number> {
  return countRows("blog_posts", `"published" = false`);
}

export async function countMessages(): Promise<number> {
  return countRows("messages");
}

export async function countUnreadMessages(): Promise<number> {
  return countRows("messages", `"read" = false`);
}

export async function countCertificates(): Promise<number> {
  return countRows("certificates");
}

export async function countSkills(): Promise<number> {
  return countRows("skills");
}

export async function countTestimonials(): Promise<number> {
  return countRows("testimonials");
}