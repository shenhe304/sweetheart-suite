import type { InviteData } from "@/lib/inviteStore";
import { format } from "date-fns";
import { Heart } from "lucide-react";

interface Props {
  data: InviteData;
  compact?: boolean;
}

function formatDate(d: string) {
  try {
    return format(new Date(d), "MMMM d, yyyy");
  } catch {
    return d;
  }
}

function formatTime(t: string) {
  if (!t) return "";
  const [h, m] = t.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 || 12;
  return `${h12}:${m} ${ampm}`;
}

const templateStyles = {
  bloom: {
    wrapper: "bg-bloom-bg",
    accent: "text-primary",
    names: "font-serif-display text-primary",
    border: "border-bloom-pink/40",
    badge: "bg-bloom-lilac/30 text-secondary-foreground",
  },
  confetti: {
    wrapper: "bg-confetti-bg",
    accent: "text-foreground",
    names: "font-body font-bold text-foreground",
    border: "border-confetti-pink/40",
    badge: "bg-confetti-yellow/40 text-foreground",
  },
  "golden-hour": {
    wrapper: "bg-golden-bg bg-gradient-to-b from-golden-ivory to-golden-peach/30",
    accent: "text-golden-warm",
    names: "font-script text-golden-warm",
    border: "border-golden-warm/30",
    badge: "bg-golden-peach/40 text-accent-foreground",
  },
};

export default function InvitePreview({ data, compact }: Props) {
  const s = templateStyles[data.template];
  const nameA = data.partnerA || "Partner A";
  const nameB = data.partnerB || "Partner B";

  return (
    <div className={`animate-fade-in flex flex-col items-center rounded-2xl p-8 md:p-12 ${s.wrapper} ${compact ? "max-w-md" : "max-w-lg"} mx-auto w-full shadow-card`}>
      {/* Photo */}
      {data.photo && (
        <div className={`mb-6 h-28 w-28 overflow-hidden rounded-full border-4 ${s.border} shadow-soft`}>
          <img src={data.photo} alt="Couple" className="h-full w-full object-cover" />
        </div>
      )}

      {/* Header */}
      <p className={`text-sm uppercase tracking-[0.2em] ${s.accent} mb-2 font-body`}>
        {data.template === "confetti" ? "We're getting married!" : "Together with their families"}
      </p>

      {/* Names */}
      <h1 className={`${s.names} ${data.template === "golden-hour" ? "text-5xl md:text-6xl" : "text-3xl md:text-4xl"} text-center leading-tight`}>
        {nameA}
        <span className="mx-2 inline-block">
          <Heart className={`inline h-5 w-5 ${s.accent} animate-float`} />
        </span>
        {nameB}
      </h1>

      {/* Divider */}
      <div className={`my-6 h-px w-24 ${s.border} border-t`} />

      {/* Date & Time */}
      {data.date && (
        <p className={`font-serif-display text-lg ${s.accent}`}>
          {formatDate(data.date)}
          {data.time && ` · ${formatTime(data.time)}`}
        </p>
      )}

      {/* Venue */}
      {data.venue && (
        <p className="mt-2 text-sm text-muted-foreground font-body">{data.venue}</p>
      )}

      {/* Template-specific decorations */}
      {data.template === "confetti" && (
        <div className="mt-6 flex gap-2">
          {["bg-confetti-blue", "bg-confetti-pink", "bg-confetti-yellow", "bg-confetti-green"].map((c, i) => (
            <span key={i} className={`h-3 w-3 rounded-full ${c}`} />
          ))}
        </div>
      )}
    </div>
  );
}
