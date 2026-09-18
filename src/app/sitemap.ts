import type { MetadataRoute } from "next";
import { listProjects, listPublishedPosts } from "@/lib/db";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "about",
    "portfolio",
    "resume",
    "services",
    "certificates",
    "blog",
    "contact",
    "home",
  ].map((path) => ({
    url: `${SITE_URL}/${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  let projects: Awaited<ReturnType<typeof listProjects>> = [];
  let posts: Awaited<ReturnType<typeof listPublishedPosts>> = [];
  try {
    [projects, posts] = await Promise.all([listProjects(), listPublishedPosts()]);
  } catch (error) {
    console.error("Failed to load dynamic routes for sitemap:", error);
  }

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/portfolio/${project.slug}`,
    lastModified: new Date(project.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(post.updatedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}