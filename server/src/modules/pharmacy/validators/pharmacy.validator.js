const { z } = require("zod");

const pharmacyOrderSchema = z.object({
  deliveryName: z
    .string()
    .min(3, "Delivery name is required")
    .max(100, "Delivery name is too long"),

  deliveryPhone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile number"),

  deliveryAddress: z
    .string()
    .min(5, "Delivery address is required")
    .max(1000, "Delivery address is too long"),

  city: z
    .string()
    .max(100, "City is too long")
    .optional()
    .nullable(),

  state: z
    .string()
    .max(100, "State is too long")
    .optional()
    .nullable(),

  pincode: z
    .string()
    .regex(/^\d{6}$/, "Enter valid 6-digit pincode")
    .optional()
    .nullable(),

  items: z
    .array(
      z.object({
        medicineId: z.coerce.number().int().positive(),
        quantity: z.coerce.number().int().min(1).max(20),
      })
    )
    .min(1, "Select at least one medicine")
    .max(10, "Maximum 10 medicines allowed per order"),
});

const sanitizeSearch = (value) => {
  return String(value || "")
    .trim()
    .replace(/[<>]/g, "")
    .slice(0, 100);
};

module.exports = {
  pharmacyOrderSchema,
  sanitizeSearch,
};