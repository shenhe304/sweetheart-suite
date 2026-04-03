import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { PartyPopper } from "lucide-react";

interface Props {
  inviteId: string;
  onSubmitted: () => void;
}

export default function RSVPForm({ inviteId, onSubmitted }: Props) {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"yes" | "no" | "maybe" | "">("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !attendance) {
      toast.error("Please fill in your name and attendance.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("rsvp_responses").insert({
      invite_id: inviteId,
      guest_name: name,
      attendance,
      message: message || null,
    });
    setLoading(false);
    if (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
      return;
    }
    onSubmitted();
  };

  const attendanceOptions = [
    { value: "yes", label: "Joyfully Accept!", emoji: "🎉" },
    { value: "no", label: "Regretfully Decline", emoji: "😢" },
    { value: "maybe", label: "Maybe", emoji: "🤔" },
  ] as const;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 animate-fade-in">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="guestName" className="text-sm text-muted-foreground">Your Name</Label>
        <Input id="guestName" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl" required />
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-sm text-muted-foreground">Will you attend?</Label>
        <div className="grid grid-cols-3 gap-2">
          {attendanceOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setAttendance(opt.value)}
              className={`flex flex-col items-center gap-1 rounded-xl border-2 px-3 py-3 text-sm font-medium transition-all ${
                attendance === opt.value
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/30"
              }`}
            >
              <span className="text-xl">{opt.emoji}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="msg" className="text-sm text-muted-foreground">Message to the couple (optional)</Label>
        <Textarea id="msg" placeholder="Write a sweet note..." value={message} onChange={(e) => setMessage(e.target.value)} className="rounded-xl resize-none" rows={3} />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send RSVP"}
      </button>
    </form>
  );
}

export function RSVPConfirmation() {
  return (
    <div className="flex flex-col items-center gap-4 py-12 animate-scale-in text-center">
      <PartyPopper className="h-16 w-16 text-primary animate-float" />
      <h2 className="font-serif-display text-2xl font-semibold text-foreground">Thank you!</h2>
      <p className="text-muted-foreground max-w-xs">
        Can't wait to celebrate with you! 🎉
      </p>
    </div>
  );
}
