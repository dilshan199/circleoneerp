import { z } from "zod";

// Company Validator
export const CreateCompanySchema = z.object({
    company_logo: z.string().optional(),
    company_name: z.string().trim().min(2, "Company name is required!").max(255),
    company_address: z.string().trim().min(2, "Company address is required!").max(255),
    contact_land: z.string().trim().min(7, "Invalid land phone number!").max(15),
    contact_mobile: z.string().trim().max(15).optional().or(z.literal("")),
    contact_whatsapp: z.string().trim().max(15).optional().or(z.literal("")),
    contact_fax: z.string().trim().max(15).optional().or(z.literal("")),
    company_email: z.email("Invalid email address!").max(255).optional().or(z.literal("")),
    register_number: z.string().trim().max(255).optional().or(z.literal("")),
    tax_number: z.string().trim().max(255).optional().or(z.literal(""))
});

export const UpdateCompanySchema = CreateCompanySchema.extend({
    company_id: z.number()
});