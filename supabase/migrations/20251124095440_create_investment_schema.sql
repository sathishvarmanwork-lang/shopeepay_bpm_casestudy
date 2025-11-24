/*
  # ShopeePay Investment App Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text)
      - `phone` (text)
      - `wallet_balance` (numeric, default 150.00)
      - `has_invested` (boolean, default false)
      - `onboarding_complete` (boolean, default false)
      - `ekyc_complete` (boolean, default false)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `onboarding_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `current_step` (integer, default 1)
      - `risk_profile` (jsonb)
      - `investment_preferences` (jsonb)
      - `personal_info` (jsonb)
      - `bank_verification_status` (text, default 'pending')
      - `completed_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `investments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `fund_name` (text)
      - `fund_category` (text)
      - `amount` (numeric)
      - `current_value` (numeric)
      - `status` (text, default 'active')
      - `reference_number` (text, unique)
      - `invested_at` (timestamptz)
      - `created_at` (timestamptz)
    
    - `user_activity`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `activity_type` (text)
      - `dismissed_prompts` (jsonb)
      - `last_prompt_dismiss_time` (jsonb)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  phone text,
  wallet_balance numeric DEFAULT 150.00,
  has_invested boolean DEFAULT false,
  onboarding_complete boolean DEFAULT false,
  ekyc_complete boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE TABLE IF NOT EXISTS onboarding_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  current_step integer DEFAULT 1,
  risk_profile jsonb DEFAULT '{}'::jsonb,
  investment_preferences jsonb DEFAULT '[]'::jsonb,
  personal_info jsonb DEFAULT '{}'::jsonb,
  bank_verification_status text DEFAULT 'pending',
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE onboarding_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own onboarding progress"
  ON onboarding_progress FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own onboarding progress"
  ON onboarding_progress FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own onboarding progress"
  ON onboarding_progress FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE TABLE IF NOT EXISTS investments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  fund_name text NOT NULL,
  fund_category text NOT NULL,
  amount numeric NOT NULL,
  current_value numeric NOT NULL,
  status text DEFAULT 'active',
  reference_number text UNIQUE NOT NULL,
  invested_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE investments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own investments"
  ON investments FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own investments"
  ON investments FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE TABLE IF NOT EXISTS user_activity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  activity_type text NOT NULL,
  dismissed_prompts jsonb DEFAULT '{}'::jsonb,
  last_prompt_dismiss_time jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own activity"
  ON user_activity FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own activity"
  ON user_activity FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own activity"
  ON user_activity FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());