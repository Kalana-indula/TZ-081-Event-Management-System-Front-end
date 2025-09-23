import {z} from 'zod';

// Sri Lanka(ish) phone sample: +94XXXXXXXXX or 0XXXXXXXXX
const phoneRegex = /^(?:\+94\d{9}|0\d{9})$/;

// NIC/Passport examples (tweak to your rules):
// - Old NIC: 9 digits + V/X (e.g., 934218765V)
// - New NIC: 12 digits
// - Or passport: simple alnum 6–12
const nicPassportRegex = /^(?:\d{9}[VX]|[vx]|\d{12}|[A-Za-z0-9]{6,12})$/;

// Password: 8+ with upper, lower, number
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const registerOrganizerSchema = z
    .object({
        firstName: z.string().trim().min(1, "First name is required").max(100),
        lastName: z.string().trim().min(1, "Last name is required").max(100),
        nic: z
            .string()
            .trim()
            .min(1, "NIC/Passport is required")
            .regex(nicPassportRegex, "Enter a valid NIC/Passport"),
        companyName: z.string().trim().max(150).optional().or(z.literal("")),
        phone: z
            .string()
            .trim()
            .regex(phoneRegex, "Enter phone as +94XXXXXXXXX or 0XXXXXXXXX"),
        email: z.string().trim().email("Enter a valid email"),
        password: z
            .string()
            .regex(passwordRegex, "Min 8 chars, 1 upper, 1 lower, 1 number"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"], // error lands on confirm field
    });

// create a type
export type RegisterOrganizerForm = z.infer<typeof registerOrganizerSchema>;