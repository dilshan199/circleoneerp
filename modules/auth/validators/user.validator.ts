import { UserStatus } from "@/constants/role.constants";
import z from "zod";

export const CreateUserSchema = z.object
(
    {
        role_id: z.number().min(1),
        first_name: z.string().trim().min(1, "First name is required"),
        last_name: z.string().trim().min(1, "Last name is required"),
        user_email: z.string().trim().min(1, "Email is required").email("Invalid email address"),
        user_name: z.string().trim().min(1, "Username is required"),
        password: z.string().trim().min(1, "Password is required"),
        account_status: z.string().default(UserStatus.ACTIVE),
        user_avater: z.instanceof(File).optional()
        .refine(
            (file) =>
                !file ||
                [
                    "image/jpeg",
                    "image/png"
                ].includes(file.type),
            {
                message:
                    "Avatar must be JPG or PNG"
            }
        )
        .refine(
            (file) =>
                !file ||
                file.size <=
                    2 * 1024 * 1024,
            {
                message:
                    "Avatar size cannot exceed 2MB"
            }
        )
    }
)