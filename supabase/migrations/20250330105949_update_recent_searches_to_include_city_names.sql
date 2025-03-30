-- First drop the existing function
DROP FUNCTION IF EXISTS public.add_recent_search;
DROP FUNCTION IF EXISTS public.save_recent_search;

-- Create a function to add a new search and maintain only the most recent 2 searches
CREATE OR REPLACE FUNCTION public.add_recent_search(
    user_id UUID,
    from_id TEXT,
    to_id TEXT,
    from_city_name TEXT,
    to_city_name TEXT,
    departure_date TEXT,
    arrival_date TEXT,
    cabin_class TEXT,
    adults INTEGER
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER AS $$
DECLARE
    new_search JSONB;
    current_searches JSONB[];
BEGIN
    -- Create the new search JSON object
    new_search = jsonb_build_object(
        'fromId', from_id,
        'toId', to_id,
        'fromCityName', from_city_name,
        'toCityName', to_city_name,
        'departureDate', departure_date,
        'arrivalDate', arrival_date,
        'cabinClass', cabin_class,
        'adults', adults
    );
    
    -- Get current searches
    SELECT recent_searches INTO current_searches FROM public.user_profiles WHERE id = user_id;
    
    -- Add new search to the beginning and keep only last 2
    IF array_length(current_searches, 1) IS NULL THEN
        current_searches = ARRAY[new_search];
    ELSIF array_length(current_searches, 1) = 1 THEN
        current_searches = ARRAY[new_search, current_searches[1]];
    ELSE
        current_searches = ARRAY[new_search, current_searches[1]];
    END IF;
    
    -- Update the user profile
    UPDATE public.user_profiles
    SET recent_searches = current_searches, updated_at = NOW()
    WHERE id = user_id;
END;
$$;

-- Create a secure RPC function that users can call to add a search
CREATE OR REPLACE FUNCTION public.save_recent_search(
    from_id TEXT,
    to_id TEXT,
    from_city_name TEXT,
    to_city_name TEXT,
    departure_date TEXT,
    arrival_date TEXT,
    cabin_class TEXT,
    adults INTEGER
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Call the internal function with the current user's ID
    PERFORM public.add_recent_search(
        auth.uid(),
        from_id,
        to_id,
        from_city_name,
        to_city_name,
        departure_date,
        arrival_date,
        cabin_class,
        adults
    );
END;
$$;

-- Make sure the RPC function can only be executed by authenticated users
REVOKE EXECUTE ON FUNCTION public.save_recent_search FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.save_recent_search TO authenticated;