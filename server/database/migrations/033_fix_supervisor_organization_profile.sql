-- 033_fix_supervisor_columns_no_default_branch.sql
-- Safe supervisor column fix.
-- This does NOT hardcode branch values.
-- It only makes sure required columns exist.

SET @has_users_branch := (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'users'
    AND COLUMN_NAME = 'branch'
);

SET @sql := IF(
  @has_users_branch = 0,
  'ALTER TABLE users ADD COLUMN branch VARCHAR(100) NULL AFTER country',
  'SELECT "users.branch already exists"'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;


SET @has_users_approval_status := (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'users'
    AND COLUMN_NAME = 'approval_status'
);

SET @sql := IF(
  @has_users_approval_status = 0,
  'ALTER TABLE users ADD COLUMN approval_status ENUM(''pending'', ''approved'', ''rejected'') DEFAULT ''pending'' AFTER branch',
  'SELECT "users.approval_status already exists"'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;


SET @has_org_profile_org_name := (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'organization_profiles'
    AND COLUMN_NAME = 'organization_name'
);

SET @sql := IF(
  @has_org_profile_org_name = 0,
  'ALTER TABLE organization_profiles ADD COLUMN organization_name VARCHAR(255) NULL AFTER user_id',
  'SELECT "organization_profiles.organization_name already exists"'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;


SET @has_phlebo_org_name := (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'phlebo_profiles'
    AND COLUMN_NAME = 'organization_name'
);

SET @sql := IF(
  @has_phlebo_org_name = 0,
  'ALTER TABLE phlebo_profiles ADD COLUMN organization_name VARCHAR(255) NULL AFTER user_id',
  'SELECT "phlebo_profiles.organization_name already exists"'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;