require("dotenv").config();

const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

const migrationsPath = path.join(__dirname, "migrations");
const stateFilePath = path.join(
  __dirname,
  "migration_state.json"
);

const runMigrations = async () => {
  try {
    const connection = await mysql.createConnection(
  process.env.MYSQL_PUBLIC_URL
);


    const migrationFiles = fs
      .readdirSync(migrationsPath)
      .filter((file) => file.endsWith(".sql"))
      .sort();

    const rawState = fs.readFileSync(stateFilePath, "utf8").replace(/^\uFEFF/, "");

     const executedMigrations = JSON.parse(
  rawState || "[]"
);

    for (const file of migrationFiles) {
      if (executedMigrations.includes(file)) {
        continue;
      }

      console.log(`Running migration: ${file}`);

      const filePath = path.join(migrationsPath, file);

      const sql = fs.readFileSync(filePath, "utf8");

      await connection.query(sql);

      executedMigrations.push(file);
    }

    fs.writeFileSync(
      stateFilePath,
      JSON.stringify(executedMigrations, null, 2)
    );

    console.log("All migrations completed successfully.");

    await connection.end();
  } catch (error) {
    console.error("Migration failed:", error);
  }
};

runMigrations();