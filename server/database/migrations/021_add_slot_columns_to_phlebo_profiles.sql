ALTER TABLE phlebo_profiles
ADD COLUMN IF NOT EXISTS morning_start VARCHAR(10) NULL AFTER available_days,
ADD COLUMN IF NOT EXISTS morning_end VARCHAR(10) NULL AFTER morning_start,
ADD COLUMN IF NOT EXISTS evening_start VARCHAR(10) NULL AFTER morning_end,
ADD COLUMN IF NOT EXISTS evening_end VARCHAR(10) NULL AFTER evening_start;