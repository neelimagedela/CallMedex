-- Migration: Add morning/evening slot columns to phlebo_profiles
-- Run this on your MySQL database before deploying the server changes.

ALTER TABLE phlebo_profiles
  ADD COLUMN morning_start VARCHAR(10) NULL AFTER available_days,
  ADD COLUMN morning_end   VARCHAR(10) NULL AFTER morning_start,
  ADD COLUMN evening_start VARCHAR(10) NULL AFTER morning_end,
  ADD COLUMN evening_end   VARCHAR(10) NULL AFTER evening_start;