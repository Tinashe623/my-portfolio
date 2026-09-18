import type { Metadata } from "next";
import Link from "next/link";
import GlassCard from "@/components/common/GlassCard";
import GradientHeading from "@/components/common/GradientHeading";
import JsonLd from "@/components/seo/JsonLd";
import { FaCalendar, FaTag, FaArrowRight } from "react-icons/fa";
import { listPublishedPosts, type BlogPostRow } from "@/lib/db";
import { SITE_URL, SITE_NAME, OG_IMAGE } from "@/lib/site";


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog",
    description:
      "Thoughts, tutorials, and insights on full-stack development with Next.js, Prisma, PostgreSQL, and modern web technologies.",
    alternates: { canonical: `${SITE_URL}/blog` },
    openGraph: {
      title: "Blog",
      description:
        "Thoughts, tutorials, and insights on full-stack development with Next.js, Prisma, PostgreSQL, and modern web technologies.",
      url: `${SITE_URL}/blog`,
      siteName: SITE_NAME,
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog | Tinashe Mundieta",
      description:
        "Thoughts, tutorials, and insights on full-stack development with Next.js, Prisma, PostgreSQL, and modern web technologies.",
      images: [OG_IMAGE],
    },
  };
}

export default async function BlogPage() {
  let posts: BlogPostRow[] = [];
  try {
    posts = await listPublishedPosts();
  } catch (error) {
    console.error("Failed to load posts:", error);
  }

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog | Tinashe Mundieta",
    url: `${SITE_URL}/blog`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: post.title,
        url: `${SITE_URL}/blog/${post.slug}`,
      })),
    },
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <JsonLd data={collectionSchema} />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <GradientHeading className="pb-2">Blog</GradientHeading>
          <p className="mt-4 text-dark-400 max-w-2xl mx-auto text-balance">
            Thoughts, tutorials, and insights on full-stack development with Next.js,
            Prisma, PostgreSQL, and modern web technologies.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center">
            <p className="text-dark-400">No articles published yet. Check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.id}>
                <GlassCard className="p-6 md:p-8 h-full flex flex-col group cursor-pointer">
                  <div className="flex items-center gap-4 text-sm text-dark-500 mb-4">
                    {post.publishedAt && (
                      <span className="flex items-center gap-1">
                        <FaCalendar className="w-4 h-4" />
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-brand-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-dark-400 text-sm mb-6 flex-grow">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-dark-800 text-dark-300 flex items-center gap-1"
                        >
                          <FaTag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-brand-400 group-hover:translate-x-1 transition-transform">
                      <FaArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}