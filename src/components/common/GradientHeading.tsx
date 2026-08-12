"use client";

interface GradientHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
}

export default function GradientHeading({
  children,
  className = "",
  as = "h2",
}: GradientHeadingProps) {
  const Tag = as;

  return (
    <Tag
      className={`
        text-3xl md:text-4xl lg:text-5xl font-bold font-heading
        bg-gradient-to-r from-brand-400 via-brand-300 to-accent-400
        bg-clip-text text-transparent
        bg-[length:200%_auto]
        animate-gradient
        ${className}
      `}
    >
      {children}
    </Tag>
  );
}
