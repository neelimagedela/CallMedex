const db = require("../../../config/db");

function parseJsonArray(value) {
  if (!value) return [];

  if (Array.isArray(value)) return value;

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const getHomeServiceTests = async () => {
  const [rows] = await db.execute(
    `
    SELECT
      c.id AS category_id,
      c.category_name,
      c.category_code,
      c.icon AS category_icon,

      t.id AS test_id,
      t.test_code,
      t.test_name,
      t.subtitle,
      t.sample_type,
      t.icon AS test_icon,
      t.price,
      t.old_price,
      t.features,
      t.instructions,
      t.is_prescription_required,
      t.fasting_required,
      t.fasting_hours
    FROM home_service_categories c
    INNER JOIN home_service_tests t
      ON t.category_id = c.id
    WHERE c.is_active = TRUE
      AND t.is_active = TRUE
      AND t.is_home_collection_available = TRUE
    ORDER BY c.id ASC, t.test_name ASC
    `
  );

  const grouped = new Map();

  rows.forEach((row) => {
    if (!grouped.has(row.category_id)) {
      grouped.set(row.category_id, {
        category_id: row.category_id,
        category_name: row.category_name,
        category_code: row.category_code,
        icon: row.category_icon,
        tests: [],
      });
    }

    grouped.get(row.category_id).tests.push({
      id: row.test_id,
      code: row.test_code,
      name: row.test_name,
      subtitle: row.subtitle || "",
      sample_type: row.sample_type || "Blood",
      icon: row.test_icon || "🧪",
      price: Number(row.price || 0),
      old_price: Number(row.old_price || 0),
      features: parseJsonArray(row.features),
      instructions: parseJsonArray(row.instructions),
      is_prescription_required: Boolean(row.is_prescription_required),
      fasting_required: Boolean(row.fasting_required),
      fasting_hours: Number(row.fasting_hours || 0),
    });
  });

  return Array.from(grouped.values());
};

const getActiveHomeServiceTestsByIds = async (testIds) => {
  if (!Array.isArray(testIds) || testIds.length === 0) return [];

  const cleanIds = testIds
    .map((id) => Number(id))
    .filter((id) => Number.isInteger(id) && id > 0);

  if (cleanIds.length === 0) return [];

  const placeholders = cleanIds.map(() => "?").join(",");

  const [rows] = await db.execute(
    `
    SELECT
      c.category_name,

      t.id AS test_id,
      t.test_code,
      t.test_name,
      t.subtitle,
      t.sample_type,
      t.icon AS test_icon,
      t.price,
      t.old_price,
      t.features,
      t.instructions,
      t.is_prescription_required,
      t.fasting_required,
      t.fasting_hours
    FROM home_service_tests t
    INNER JOIN home_service_categories c
      ON c.id = t.category_id
    WHERE t.id IN (${placeholders})
      AND t.is_active = TRUE
      AND c.is_active = TRUE
      AND t.is_home_collection_available = TRUE
    `,
    cleanIds
  );

  return rows.map((row) => ({
    id: row.test_id,
    code: row.test_code,
    name: row.test_name,
    subtitle: row.subtitle || "",
    sampleType: row.sample_type || "Blood",
    category: row.category_name,
    icon: row.test_icon || "🧪",
    price: Number(row.price || 0),
    oldPrice: Number(row.old_price || 0),
    features: parseJsonArray(row.features),
    instructions: parseJsonArray(row.instructions),
    isPrescriptionRequired: Boolean(row.is_prescription_required),
    fastingRequired: Boolean(row.fasting_required),
    fastingHours: Number(row.fasting_hours || 0),
  }));
};

module.exports = {
  getHomeServiceTests,
  getActiveHomeServiceTestsByIds,
};