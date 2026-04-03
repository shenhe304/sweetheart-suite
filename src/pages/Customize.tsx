import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import CustomizationPanel from "@/components/CustomizationPanel";
import InvitePreview from "@/components/InvitePreview";
import { saveInvite, generateId, type InviteData, type TemplateName } from "@/lib/inviteStore";
import { ArrowLeft, Share2, Check } from "lucide-react";
import { toast } from "sonner";

export default function Customize() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const template = (params.get("template") || "bloom") as TemplateName;
  const [copied, setCopied] = useState(false);

  const [data, setData] = useState<InviteData>({
    id: generateId(),
    template,
    partnerA: "",
    partnerB: "",
    date: "",
    time: "",
    venue: "",
    photo: null,
  });

  const update = (partial: Partial<InviteData>) => setData((prev) => ({ ...prev, ...partial }));

  const handleShare = () => {
    saveInvite(data);
    const url = `${window.location.origin}/invite/${data.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      toast.success("Invite link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="sticky top-0 z-10 flex items-center gap-3 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3">
        <button onClick={() => navigate("/")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Templates
        </button>
        <div className="flex-1" />
        <button
          onClick={handleShare}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.97]"
        >
          {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
          {copied ? "Copied!" : "Share Invite"}
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-8 max-w-6xl mx-auto">
        {/* Panel */}
        <div className="w-full lg:w-80 shrink-0">
          <CustomizationPanel data={data} onChange={update} />
        </div>

        {/* Preview */}
        <div className="flex-1 flex items-start justify-center py-4">
          <InvitePreview data={data} />
        </div>
      </div>
    </div>
  );
}
