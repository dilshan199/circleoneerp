import { RoleStatus } from "@/constants/role.constants";
import  z from "zod";

export const CreateRoleSchema = z.object({
    role_code: z.string().trim().transform(value => value.toUpperCase()),
    role_name: z.string().trim(),
    role_status: z.string().default(RoleStatus.ACTIVE)
});