import { useState } from "react";
import { useParams } from "react-router-dom";
import { getInvite } from "@/lib/inviteStore";
import InvitePreview from "@/components/InvitePreview";
import RSVPForm, { RSVPConfirmation } from "@/components/RSVPForm";

export default function InvitePage() {
  const { id } = useParams<{ id: string }>();
  const invite = id ? getInvite(id) : null;
  const [submitted, setSubmitted] = useState(false);

  if (!invite) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center animate-fade-in">
          <h1 className="font-serif-display text-2xl font-semibold text-foreground mb-2">Invite not found</h1>
          <p className="text-muted-foreground">This invitation link may be invalid or expired.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8 px-4">
      <InvitePreview data={invite} />

      <div className="w-full max-w-md mt-10">
        <h2 className="font-serif-display text-xl font-semibold text-foreground text-center mb-6">RSVP</h2>
        {submitted ? <RSVPConfirmation /> : <RSVPForm inviteId={invite.id} onSubmitted={() => setSubmitted(true)} />}
      </div>
    </div>
  );
}
