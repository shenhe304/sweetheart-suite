import { type TemplateName } from "@/lib/inviteStore";
import bloomPreview from "@/assets/bloom-preview.jpg";
import confettiPreview from "@/assets/confetti-preview.jpg";
import goldenPreview from "@/assets/golden-hour-preview.jpg";

const templates: { name: TemplateName; label: string; description: string; image: string }[] = [
  {
    name: "bloom",
    label: "Bloom",
    description: "Pastel pink & lilac with floral illustrated accents",
    image: bloomPreview,
  },
  {
    name: "confetti",
    label: "Confetti",
    description: "Playful pastel confetti with bold, fun typography",
    image: confettiPreview,
  },
  {
    name: "golden-hour",
    label: "Golden Hour",
    description: "Warm ivory & peach tones with elegant script",
    image: goldenPreview,
  },
];

interface TemplateCardProps {
  onSelect: (template: TemplateName) => void;
}

export default function TemplateCard({ onSelect }: TemplateCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mx-auto px-4">
      {templates.map((t) => (
        <button
          key={t.name}
          onClick={() => onSelect(t.name)}
          className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-card transition-all duration-300 hover:shadow-lift hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={t.image}
              alt={`${t.label} template preview`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col items-center gap-2 p-5">
            <h3 className="font-serif-display text-xl font-semibold text-foreground">{t.label}</h3>
            <p className="text-sm text-muted-foreground text-center leading-relaxed">{t.description}</p>
            <span className="mt-2 inline-block rounded-xl bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors group-hover:bg-primary/90">
              Use this template
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
