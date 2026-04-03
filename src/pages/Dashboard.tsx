import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RSVPResponse {
  id: string;
  invite_id: string;
  guest_name: string;
  attendance: string;
  message: string | null;
  created_at: string;
}

export default function Dashboard() {
  const [responses, setResponses] = useState<RSVPResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase
      .from("rsvp_responses")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setResponses(data || []);
        setLoading(false);
      });
  }, []);

  const badge = (att: string) => {
    const map: Record<string, string> = {
      yes: "bg-green-100 text-green-700",
      no: "bg-red-100 text-red-700",
      maybe: "bg-yellow-100 text-yellow-700",
    };
    return map[att] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => navigate("/")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <h1 className="font-serif-display text-3xl font-bold text-foreground mb-6">RSVP Responses</h1>

        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : responses.length === 0 ? (
          <p className="text-muted-foreground">No responses yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {responses.map((r) => (
              <div key={r.id} className="rounded-2xl bg-card shadow-soft p-5 animate-fade-in">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{r.guest_name}</span>
                  <span className={`rounded-lg px-3 py-1 text-xs font-medium capitalize ${badge(r.attendance)}`}>
                    {r.attendance}
                  </span>
                </div>
                {r.message && <p className="text-sm text-muted-foreground">{r.message}</p>}
                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(r.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
