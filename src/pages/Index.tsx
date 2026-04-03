import { useNavigate } from "react-router-dom";
import TemplateCard from "@/components/TemplateCard";
import type { TemplateName } from "@/lib/inviteStore";
import { Heart } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();

  const handleSelect = (template: TemplateName) => {
    navigate(`/customize?template=${template}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-background">
      {/* Hero */}
      <header className="flex flex-col items-center gap-3 pt-16 pb-12 px-4 text-center">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="h-6 w-6 text-primary" />
          <span className="font-serif-display text-2xl font-bold text-foreground tracking-wide">WedLink</span>
        </div>
        <h1 className="font-serif-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
          Create your dream<br />wedding invitation
        </h1>
        <p className="text-muted-foreground max-w-md text-base">
          Choose a template, customize the details, and share your beautiful invite in minutes.
        </p>
      </header>

      {/* Templates */}
      <main className="w-full pb-20 animate-fade-in">
        <TemplateCard onSelect={handleSelect} />
      </main>
    </div>
  );
}
