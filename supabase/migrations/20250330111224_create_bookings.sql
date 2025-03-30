-- Create required ENUM types first
CREATE TYPE ticket_type AS ENUM ('one_way', 'round_trip');
CREATE TYPE cabin_class AS ENUM ('economy', 'premium economy', 'business', 'first');

-- Airports
CREATE TABLE IF NOT EXISTS public.airports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    city TEXT NOT NULL,
    city_name TEXT NOT NULL,
    country TEXT NOT NULL,
    country_name TEXT NOT NULL,
    province TEXT
);

-- Carriers
CREATE TABLE IF NOT EXISTS public.carriers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    logo TEXT
);

-- Bookings (consistent singular naming: booking)
CREATE TABLE IF NOT EXISTS public.booking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id),
    number_of_travellers INTEGER NOT NULL
        CHECK (number_of_travellers > 0),
    ticket_type ticket_type NOT NULL,
    token TEXT NOT NULL UNIQUE,
    total_price TEXT NOT NULL,
    base_fare TEXT NOT NULL,
    tax TEXT NOT NULL,
    currency_code TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security for bookings
ALTER TABLE public.booking ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own bookings"
ON public.booking FOR ALL
USING (auth.uid() = user_id);

-- Booking Traveller table
CREATE TABLE IF NOT EXISTS public.booking_traveller (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES public.booking(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    gender gender NOT NULL
);

-- Enable Row Level Security for booking travellers
ALTER TABLE public.booking_traveller ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage travellers in their bookings"
ON public.booking_traveller FOR ALL
USING (EXISTS (
    SELECT 1
    FROM public.booking
    WHERE booking.id = booking_traveller.booking_id
    AND booking.user_id = auth.uid()
));

-- Booking Segment table
CREATE TABLE IF NOT EXISTS public.booking_segment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES public.booking(id) ON DELETE CASCADE,
    departure_time TIMESTAMPTZ NOT NULL,
    arrival_time TIMESTAMPTZ NOT NULL,
    departure_airport_id UUID REFERENCES public.airports(id), 
    arrival_airport_id UUID REFERENCES public.airports(id),   
    total_time INTEGER NOT NULL
        CHECK (total_time > 0),
    cabin_class cabin_class NOT NULL,
    flight_number TEXT NOT NULL,
    carrier_id UUID REFERENCES public.carriers(id)
);

ALTER TABLE public.booking_segment ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view segments in their bookings"
ON public.booking_segment FOR ALL
USING (EXISTS (
    SELECT 1
    FROM public.booking
    WHERE booking.id = booking_segment.booking_id
    AND booking.user_id = auth.uid()
));

-- Booking Segment Luggage table
CREATE TABLE IF NOT EXISTS public.booking_segment_luggage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    segment_id UUID REFERENCES public.booking_segment(id) ON DELETE CASCADE,
    traveller_reference TEXT NOT NULL,
    luggage_type TEXT NOT NULL,
    rule_type TEXT,
    max_piece INTEGER,
    max_weight_per_piece NUMERIC(5, 2),
    mass_unit TEXT,
    is_checked_luggage BOOLEAN,
    size_max_length NUMERIC(5, 2),
    size_max_width NUMERIC(5, 2),
    size_max_height NUMERIC(5, 2),
    size_unit TEXT
);

-- Enable Row Level Security for booking segment luggage
ALTER TABLE public.booking_segment_luggage ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view luggage in their booking segments"
ON public.booking_segment_luggage FOR ALL
USING (EXISTS (
    SELECT 1
    FROM public.booking_segment
    JOIN public.booking ON booking_segment.booking_id = booking.id
    WHERE booking_segment.id = booking_segment_luggage.segment_id
    AND booking.user_id = auth.uid()
));