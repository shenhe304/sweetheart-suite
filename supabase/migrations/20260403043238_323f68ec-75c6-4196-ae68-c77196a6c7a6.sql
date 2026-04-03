
CREATE TABLE public.rsvp_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invite_id TEXT NOT NULL,
  guest_name TEXT NOT NULL,
  attendance TEXT NOT NULL CHECK (attendance IN ('yes', 'no', 'maybe')),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.rsvp_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit RSVP" ON public.rsvp_responses
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Anyone can view RSVPs" ON public.rsvp_responses
  FOR SELECT TO anon, authenticated USING (true);
