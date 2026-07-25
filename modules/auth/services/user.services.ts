import { UserRepository } from "../repositories/user.repository";
import { User } from "../types/user.interface";
import { hashPassword } from "@/utils/security.utils";
import { normalizeUsername } from "@/utils/username.utils";

export class UserService {
    // Fetch all users
    static async index() {
        const users = await UserRepository.index();
        return users;
    }

    // Store a new user
    static async store(user: User) 
    {
        // check if user already exists
        const existingUser = await UserRepository.findByEmail(user.user_email!);

        // if user already exists, return an error message
        if (Array.isArray(existingUser) && existingUser.length > 0)
        {
            return { message: "User already exists", status: 400 }
        }

        // hash password
        const hashedPassword = await hashPassword(user.password!);
        user.password = hashedPassword;

        // store user
        const newUser = await UserRepository.store(user);
        return newUser;
    }

    // Fetch specific user by ID
    static async show(user_id: number) {
        const user = await UserRepository.show(user_id);
        return user;
    }

    // Update an existing user
    static async update(user: User) {}

    // Soft delete a user by setting account_status to 'DELETED'
    static async delete(user_id: number) {
        const users = await UserRepository.delete(user_id);
        return users;
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