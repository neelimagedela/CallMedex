// d:\callmedex\CallMedex\server\database\migrations\20260612_add_statuses_home_service_bookings.js
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const db = require("../../src/config/db");

const runMigration = async () => {
  console.log("Running migration 20260612_add_statuses_home_service_bookings.js...");
  const sql = `
    -- Always include ALL existing values + new ones. Never drop existing values.
    ALTER TABLE home_service_bookings
    MODIFY COLUMN status ENUM(
      'pending', 'assigned', 'accepted', 'sample_collected', 'submitted_to_lab',
      'sample_rejected', 'processing', 'received_by_lab', 'report_ready', 'completed', 'cancelled'
    ) NOT NULL DEFAULT 'pending';
  `;
  try {
    await db.query(sql);
    console.log("Migration executed successfully.");
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  } finally {
    process.exit(0);
  }
};

if (require.main === module) {
  runMigration();
}
