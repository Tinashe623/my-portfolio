"use client";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "dots" | "pulse" | "glass";
  label?: string;
}

export default function LoadingSpinner({
  size = "md",
  variant = "default",
  label,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  const dotSizes = {
    sm: "w-1.5 h-1.5",
    md: "w-2.5 h-2.5",
    lg: "w-4 h-4",
  };

  if (variant === "dots") {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <div className={`flex items-center justify-center gap-2 ${sizeClasses[size]}`}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`${dotSizes[size]} bg-brand-400 rounded-full`}
              style={{
                animation: "dotPulse 1.4s ease-in-out infinite",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
        {label && (
          <p className="text-sm text-dark-400 animate-pulse">{label}</p>
        )}
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="relative">
          <div
            className={`${sizeClasses[size]} rounded-full bg-brand-500/20`}
            style={{ animation: "pulseRing 1.5s ease-out infinite" }}
          />
          <div
            className={`absolute inset-0 ${sizeClasses[size]} rounded-full bg-brand-500/30`}
            style={{ animation: "pulseRing 1.5s ease-out infinite", animationDelay: "0.5s" }}
          />
          <div
            className={`absolute inset-0 ${sizeClasses[size]} rounded-full bg-brand-400/40`}
            style={{ animation: "pulseRing 1.5s ease-out infinite", animationDelay: "1s" }}
          />
        </div>
        {label && (
          <p className="text-sm text-dark-400 animate-pulse">{label}</p>
        )}
      </div>
    );
  }

  if (variant === "glass") {
    return (
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <div
            className={`${sizeClasses[size]} rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10`}
            style={{ animation: "glassFloat 3s ease-in-out infinite" }}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 animate-gradient" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`${size === "lg" ? "w-8 h-8 border-3" : size === "md" ? "w-5 h-5 border-2" : "w-3.5 h-3.5 border-2"} border-brand-400 border-t-transparent rounded-full animate-spin`}
              />
            </div>
          </div>
          <div
            className="absolute -inset-4 rounded-3xl bg-brand-500/10 blur-xl"
            style={{ animation: "pulseGlow 2s ease-in-out infinite" }}
          />
        </div>
        {label && (
          <p className="text-sm text-dark-400 animate-pulse">{label}</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div
          className={`${sizeClasses[size]} border-[3px] border-dark-700 border-t-brand-400 border-r-brand-400 rounded-full animate-spin`}
          style={{ animationDuration: "0.8s" }}
        />
        <div
          className={`absolute inset-0 ${sizeClasses[size]} border-[3px] border-transparent border-b-accent-400 border-l-accent-400 rounded-full animate-spin`}
          style={{ animationDuration: "1.2s", animationDirection: "reverse" }}
        />
      </div>
      {label && (
        <p className="text-sm text-dark-400 animate-pulse">{label}</p>
      )}
    </div>
  );
}
