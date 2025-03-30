-- Step 2: Alter the table(s) that use the old enum type to use the new enum type
-- Assuming there is a table called 'tickets' with a column 'ticket_type' that uses the old enum type
ALTER TABLE public.booking
  ALTER COLUMN ticket_type TYPE text;

ALTER TABLE public.booking_segment
  ALTER COLUMN cabin_class TYPE text;


DROP TYPE ticket_type;
DROP TYPE cabin_class;