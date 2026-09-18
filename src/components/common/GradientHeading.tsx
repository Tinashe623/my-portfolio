"use client";

interface GradientHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
  gradient?: boolean;
}

export default function GradientHeading({
  children,
  className = "",
  as = "h2",
  gradient = false,
}: GradientHeadingProps) {
  const Tag = as;

  return (
    <Tag
      className={`
        text-3xl md:text-4xl lg:text-5xl font-bold font-heading
        ${gradient
          ? "bg-gradient-to-r from-brand-400 via-brand-300 to-accent-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient"
          : "text-dark-100"}
        ${className}
      `}
    >
      {children}
    </Tag>
  );
}
