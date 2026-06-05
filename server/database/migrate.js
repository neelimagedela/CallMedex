require("dotenv").config();

const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
const migrationsPath = path.join(__dirname, "migrations");
const stateFilePath = path.join(__dirname, "migration_state.json");

const loadState = () => {
  try {
    if (!fs.existsSync(stateFilePath)) {
      fs.writeFileSync(stateFilePath, JSON.stringify([], null, 2));
      return [];
    }

    const raw = fs.readFileSync(stateFilePath, "utf8").replace(/^\uFEFF/, "").trim();

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);

    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Could not read migration_state.json, starting fresh:", err.message);
    return [];
  }
};

const saveState = (executedMigrations) => {
  fs.writeFileSync(stateFilePath, JSON.stringify(executedMigrations, null, 2));
};

const runMigrations = async () => {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER,
      password: String(process.env.DB_PASSWORD),
      multipleStatements: true,
    });

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``
    );

    await connection.query(`USE \`${process.env.DB_NAME}\``);

    const migrationFiles = fs
      .readdirSync(migrationsPath)
      .filter((file) => file.endsWith(".sql"))
      .sort();

    // Load state ONCE before the loop
    const executedMigrations = loadState();

    console.log(`Found ${migrationFiles.length} migration file(s).`);
    console.log(`Already executed: ${executedMigrations.length} migration(s).`);

    let ranCount = 0;

    for (const file of migrationFiles) {
      if (executedMigrations.includes(file)) {
        console.log(`Skipping (already ran): ${file}`);
        continue;
      }

      console.log(`Running migration: ${file}`);

      const filePath = path.join(migrationsPath, file);
      const sql = fs.readFileSync(filePath, "utf8");

      await connection.query(sql);

      // Save state immediately after EACH migration succeeds
      // so if the next one fails, we don't re-run this one
      executedMigrations.push(file);
      saveState(executedMigrations);

      console.log(`Completed: ${file}`);
      ranCount++;
    }

    if (ranCount === 0) {
      console.log("No new migrations to run.");
    } else {
      console.log(`Successfully ran ${ranCount} new migration(s).`);
    }

    console.log("All migrations completed successfully.");
  } catch (error) {
    console.error("Migration failed:", error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

runMigrations();