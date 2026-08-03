import { generateTemporaryPassword } from "@/utils/password.utils";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../types/user.interface";
import { CreateUserSchema } from "../validators/user.validator";
import { generatePasswordExpiryDate } from "@/utils/password-expiry.utils";
import { normalizeUsername } from "@/utils/username.utils";
import { UserStatus } from "@/constants/role.constants";

export class UserServices {
    // Fetch all resources
    static async indexServices() 
    {
        const users = await UserRepository.indexQuery();

        return users;
    }

    // Store resources
    static async storeServices(
        user: User
    )
    {
        const validate = CreateUserSchema.parse(user);

        const temporaryPassword = generateTemporaryPassword();

        const newUser : User = {
            role_id: validate.role_id,
            user_avater: validate.user_avater ?? null,
            first_name: validate.first_name,
            last_name: validate.last_name,
            user_email: validate.user_email,
            user_name: validate.user_name,
            password: temporaryPassword,
            password_expired_at: generatePasswordExpiryDate(6),
            account_status: UserStatus.ACTIVE
        }

        // Check user already exists
        const existingUser = await UserRepository.findByUsername(user.user_name);

        if (existingUser)
        {
            throw new Error(
                "User name already exists"
            );
        }

        const userId = await UserRepository.storeQuery(newUser);

        return userId;
    }

    // fetch specific resources
    static async showServices(
        user_id: number
    )
    {
        const user = UserRepository.findByIdQuery(
            user_id
        );

        return user;
    }

    // Update specific resources
    static async updateServices(
        user_id: number,
        user: User
    )
    {
        const validate = CreateUserSchema.parse(user);

        const newUser : User = {
            role_id: validate.role_id,
            user_avater: validate.user_avater ?? null,
            first_name: validate.first_name,
            last_name: validate.last_name,
            user_email: validate.user_email,
            account_status: UserStatus.ACTIVE
        }

        if (newUser.user_avater)
        {
            const result = await UserRepository.updateWithImageQuery(user_id, newUser);

            return result;
        }

        const result = await UserRepository.updateWithoutImageQuery(user_id, newUser);

        return result;
    }

    // Delete resources
    static async deleteServices(
        user_id: number
    )
    {
        const result = await UserRepository.deleteQuery(
            user_id
        );

        return result;
    }

    // Generate unique username based on first name
    static async generateUniqueUsername(firstName: string) {
        const baseUserName = normalizeUsername(firstName);

        const existingUsernames = await UserRepository.findByUsername(baseUserName);

        if (Array.isArray(existingUsernames) && existingUsernames.length === 0) 
        {
            return baseUserName;
        }

        let counter = 1;

        while (true)
        {
            const userName = `${baseUserName}${counter}`;

            const exists = existingUsernames.some((user: User) => user.user_name === userName);

            if (!exists)
            {
                return userName;
            }

            counter++;
        }
    }
}