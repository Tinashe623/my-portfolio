import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import GlassCard from "@/components/common/GlassCard";
import JsonLd from "@/components/seo/JsonLd";
import { FaCalendar, FaTag, FaArrowLeft } from "react-icons/fa";
import { findBlogPostBySlug, listPublishedPosts, type BlogPostRow } from "@/lib/db";
import { SITE_URL, AUTHOR, SITE_NAME, OG_IMAGE } from "@/lib/site";


export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await listPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let post: BlogPostRow | null = null;
  try {
    post = await findBlogPostBySlug(slug);
  } catch (error) {
    console.error("Failed to load post for metadata:", error);
  }

  if (!post) {
    return { title: "Article Not Found" };
  }

  const description = post.excerpt ?? post.content.slice(0, 160);

  return {
    title: post.title,
    description,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url: `${SITE_URL}/blog/${post.slug}`,
      siteName: SITE_NAME,
      images: post.coverImage
        ? [{ url: post.coverImage, alt: post.title }]
        : [{ url: OG_IMAGE, width: 1200, height: 630, alt: post.title }],
      publishedTime: post.publishedAt ?? undefined,
      tags: post.tags,
    },
    twitter: {
      title: post.title,
      description,
      images: post.coverImage ? [post.coverImage] : [OG_IMAGE],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  let post: BlogPostRow | null = null;
  try {
    post = await findBlogPostBySlug(slug);
  } catch (error) {
    console.error("Failed to load post:", error);
  }

  if (!post) {
    notFound();
  }

  const articleUrl = `${SITE_URL}/blog/${post.slug}`;
  const articleDescription = post.excerpt ?? post.content.slice(0, 160);

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: articleDescription,
    url: articleUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    image: post.coverImage ?? undefined,
    datePublished: post.publishedAt ?? post.createdAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: AUTHOR,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    keywords: post.tags.join(", "),
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <JsonLd data={blogPostingSchema} />
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-dark-400 hover:text-brand-400 transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>

        <article>
          <GlassCard className="overflow-hidden">
            {post.coverImage && (
              <div className="relative h-64 md:h-80 bg-dark-800 overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
              </div>
            )}

            <div className="p-6 md:p-10">
              <div className="flex items-center gap-4 text-sm text-dark-500 mb-4">
                {post.publishedAt && (
                  <span className="flex items-center gap-1">
                    <FaCalendar className="w-4 h-4" />
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>

              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 flex items-center gap-1"
                  >
                    <FaTag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="prose prose-invert max-w-none">
                {post.content.split("\n").map((paragraph, i) => (
                  <p key={i} className="text-dark-300 text-lg leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </GlassCard>
        </article>
      </div>
    </div>
  );
}