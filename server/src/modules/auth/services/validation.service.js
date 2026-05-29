const { z } = require("zod");

const registerSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(100, "Name must be less than 100 characters")
        .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces"),

    phone: z
        .string()
        .length(10, "Phone number must be exactly 10 digits")
        .regex(/^[6-9]\d{9}$/, "Enter a valid Indian phone number"),

    email: z
        .string()
        .email("Enter a valid email address"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password must be less than 100 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),

    role: z.enum([
        "patient",
        "phlebo",
        "doctor",
        "admin",
        "diagnostic",
        "consultancy",
        "pharmacy",
        "organization"
    ], { errorMap: () => ({ message: "Invalid role selected" }) }),

    gender: z
        .string()
        .max(20)
        .optional()
        .nullable(),

    dob: z
        .string()
        .optional()
        .nullable()
        .refine((val) => {
            if (!val) return true;
            const date = new Date(val);
            const today = new Date();
            return date < today;
        }, "Date of birth cannot be in the future"),

    address: z
        .string()
        .max(255, "Address must be less than 255 characters")
        .optional()
        .nullable(),

    city: z
        .string()
        .max(100, "City must be less than 100 characters")
        .optional()
        .nullable(),

    district: z
        .string()
        .max(100, "District must be less than 100 characters")
        .optional()
        .nullable(),

    state: z
        .string()
        .max(100, "State must be less than 100 characters")
        .optional()
        .nullable(),

    pincode: z
        .string()
        .length(6, "Pincode must be exactly 6 digits")
        .regex(/^\d{6}$/, "Pincode must contain only numbers")
        .optional()
        .nullable(),

    country: z
        .string()
        .max(100, "Country must be less than 100 characters")
        .optional()
        .nullable()
});

const verifyOtpSchema = z.object({
    userId: z.coerce.number().int().positive(),

    otp: z
        .string()
        .length(6, "OTP must be exactly 6 digits")
        .regex(/^\d{6}$/, "OTP must contain only numbers"),

    type: z.enum(["email", "phone"])
});

const loginSchema = z.object({
    email: z
        .string()
        .email("Enter a valid email address"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
});

const sanitizeInput = (data) => {
    return {
        ...data,
        name: data.name?.trim(),
        email: data.email?.trim().toLowerCase(),
        phone: data.phone?.trim()
    };
};

module.exports = {
    registerSchema,
    verifyOtpSchema,
    loginSchema,
    sanitizeInput
};