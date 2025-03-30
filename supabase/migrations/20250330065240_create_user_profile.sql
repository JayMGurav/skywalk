-- Step 1: Create the gender enum type if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'gender') THEN
    CREATE TYPE public.gender AS ENUM ('male', 'female', 'other');
  END IF;
END $$;

-- Step 2: Create the user_profiles table
CREATE TABLE public.user_profiles (
   id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
   first_name text,
   last_name text,
   gender public.gender, -- Use the created enum type
   created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
   updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
   PRIMARY KEY (id)
);

-- Step 3: Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Step 4: Create Policies
CREATE POLICY "Can only view own profile data."
  ON public.user_profiles
  FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = id);

CREATE POLICY "Can only update own profile data."
  ON public.user_profiles
  FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = id)
  WITH CHECK ((SELECT auth.uid()) = id);

-- Step 5: Create the function to auto-insert user profiles
CREATE OR REPLACE FUNCTION public.create_profile() RETURNS TRIGGER AS $$ 
BEGIN
  INSERT INTO public.user_profiles (id, first_name, last_name, gender, created_at, updated_at) 
  VALUES 
    (
      NEW.id,
      NEW.raw_user_meta_data ->> 'first_name', 
      NEW.raw_user_meta_data ->> 'last_name',
      (NEW.raw_user_meta_data ->> 'gender')::public.gender,
      NOW(),
      NOW()
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 6: Create Trigger
CREATE TRIGGER create_profile_trigger 
AFTER 
  INSERT ON auth.users FOR EACH ROW 
  WHEN (NEW.raw_user_meta_data IS NOT NULL) 
  EXECUTE FUNCTION public.create_profile();
