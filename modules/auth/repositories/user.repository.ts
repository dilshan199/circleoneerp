import db from "@/lib/db_config";
import { User } from "@/modules/auth/types/user.interface";
import { QueryResult, RowDataPacket } from "mysql2";

export class UserRepository 
{
    // Fetch all users
    static async index()
    {
        const [rows] = await db.query(
            `SELECT * FROM users WHERE account_status != 'DELETED'`
        );

        return rows;
    }

    // Store a new user
    static async store(user: User)
    {
        const [result] = await db.query(
            `INSERT INTO users (role_id, user_avater, first_name, last_name, user_email, user_name, password, password_expired_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
            [
                user.role_id,
                user.user_avater,
                user.first_name,
                user.last_name,
                user.user_email,
                user.user_name,
                user.password,
                user.password_expired_at
            ]
        );
        return result;
    }

    // Update an existing user
    static async update(user: User)
    {
        const [result] = await db.query(
            `UPDATE users SET role_id = ?, user_avater = ?, first_name = ?, last_name = ?, user_email = ?, user_name = ?, updated_at = NOW() WHERE user_id = ?`,
            [
                user.role_id,
                user.user_avater,
                user.first_name,
                user.last_name,
                user.user_email,
                user.user_name,
                user.user_id
            ]
        );

        return result;
    }

    // Soft delete a user by setting account_status to 'DELETED'
    static async delete(user_id: number)
    {
        const [result] = await db.query(
            `UPDATE users SET account_status = 'DELETED', updated_at = NOW() WHERE user_id = ?`,
            [user_id]
        );

        return result;
    }

    // Fetch a user by ID
    static async show(user_id: number)
    {
        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT * FROM users WHERE user_id = ?`,
            [user_id]
        );

        return rows[0];
    }

    // Fetch a user by email
    static async findByEmail(user_email: string)
    {
        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT * FROM users WHERE user_email = ? AND account_status != 'DELETED'`,
            [user_email]
        );

        return rows[0];
    }

    // Fetch a user by username
    static async findByUsername(user_name: string) {

        const [rows] = await db.query<RowDataPacket[]>(
            "SELECT * FROM users WHERE user_name LIKE ?",
            [`${user_name}%`]
        );

        return rows[0];
    }
}