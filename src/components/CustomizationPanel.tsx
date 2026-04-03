import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";
import type { InviteData } from "@/lib/inviteStore";

interface Props {
  data: InviteData;
  onChange: (data: Partial<InviteData>) => void;
}

export default function CustomizationPanel({ data, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange({ photo: reader.result as string });
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-5 p-6 bg-card rounded-2xl shadow-card">
      <h2 className="font-serif-display text-lg font-semibold text-foreground">Customize your invite</h2>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="partnerA" className="text-sm text-muted-foreground">Partner A</Label>
        <Input id="partnerA" placeholder="e.g. Sarah" value={data.partnerA} onChange={(e) => onChange({ partnerA: e.target.value })} className="rounded-xl" />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="partnerB" className="text-sm text-muted-foreground">Partner B</Label>
        <Input id="partnerB" placeholder="e.g. James" value={data.partnerB} onChange={(e) => onChange({ partnerB: e.target.value })} className="rounded-xl" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="date" className="text-sm text-muted-foreground">Date</Label>
          <Input id="date" type="date" value={data.date} onChange={(e) => onChange({ date: e.target.value })} className="rounded-xl" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="time" className="text-sm text-muted-foreground">Time</Label>
          <Input id="time" type="time" value={data.time} onChange={(e) => onChange({ time: e.target.value })} className="rounded-xl" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="venue" className="text-sm text-muted-foreground">Venue</Label>
        <Input id="venue" placeholder="e.g. The Grand Ballroom" value={data.venue} onChange={(e) => onChange({ venue: e.target.value })} className="rounded-xl" />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-sm text-muted-foreground">Couple Photo</Label>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
        <button
          onClick={() => fileRef.current?.click()}
          className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border px-4 py-6 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
        >
          {data.photo ? (
            <img src={data.photo} alt="Couple" className="h-16 w-16 rounded-full object-cover" />
          ) : (
            <>
              <Camera className="h-5 w-5" />
              <span>Upload photo</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
