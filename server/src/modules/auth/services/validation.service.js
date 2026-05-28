const { z } = require("zod");

const registerSchema = z.object({
    name : z.string().min(3).max(100),

    phone : z.string()
        .min(10)
        .max(20),

    email : z.email(),

    password : z.string()
        .min(8)
        .max(100),

    role : z.enum([
        "patient",
        "phlebo",
        "doctor",
        "admin",
        "diagnostic",
        "consultancy",
        "pharmacy",
        "organization"
    ]),

    gender : z.string().max(20).optional().nullable(),
    dob : z.string().optional().nullable(),
    address : z.string().max(255).optional().nullable(),
    city : z.string().max(100).optional().nullable(),
    district : z.string().max(100).optional().nullable(),
    state : z.string().max(100).optional().nullable(),
    pincode : z.string().max(20).optional().nullable(),
    country : z.string().max(100).optional().nullable()
});

const verifyOtpSchema = z.object({
    userId : z.coerce.number().int().positive(),

    otp : z.string()
        .length(6),

    type : z.enum([
        "email",
        "phone"
    ])
});

const loginSchema = z.object({
    email : z.email(),

    password : z.string()
        .min(8)
});

const sanitizeInput = (data) => {

    return {
        ...data,

        name : data.name?.trim(),

        email : data.email
            ?.trim()
            .toLowerCase(),

        phone : data.phone?.trim()
    };
};

module.exports = {
    registerSchema,
    verifyOtpSchema,
    loginSchema,
    sanitizeInput
};