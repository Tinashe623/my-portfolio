"use client";

/* eslint-disable @next/next/no-img-element -- admin-provided remote avatar images */

import { useState, useEffect } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import GlassCard from "@/components/common/GlassCard";
import GradientHeading from "@/components/common/GradientHeading";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string | null;
  rating: number;
  featured: boolean;
}

export type { Testimonial };

interface TestimonialsSectionProps {
  initialTestimonials?: Testimonial[];
}

export default function TestimonialsSection({
  initialTestimonials = [],
}: TestimonialsSectionProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);

  useEffect(() => {
    if (initialTestimonials.length > 0) return;

    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        const list: Testimonial[] = (data.testimonials || [])
          .filter((t: Testimonial) => t.featured)
          .sort((a: Testimonial, b: Testimonial) => b.rating - a.rating);
        setTestimonials(list.slice(0, 6));
      })
      .catch(() => setTestimonials([]));
  }, [initialTestimonials]);

  if (testimonials.length === 0) return null;

  const initials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <GradientHeading>What Clients Say</GradientHeading>
          <p className="mt-4 text-dark-400 max-w-2xl mx-auto">
            Testimonials from clients and collaborators I&apos;ve worked with
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <GlassCard key={t.id} className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <FaQuoteLeft className="w-6 h-6 text-brand-400/60" />
                <span className="flex items-center gap-0.5 text-yellow-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <FaStar key={i} className="w-3.5 h-3.5" />
                  ))}
                </span>
              </div>
              <p className="text-dark-300 text-sm leading-relaxed flex-grow mb-6">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                {t.avatar ? (
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border border-dark-700"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white text-sm font-bold">
                    {initials(t.name)}
                  </div>
                )}
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-dark-500">
                    {t.role} at {t.company}
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}