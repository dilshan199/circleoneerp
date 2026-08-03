import { UserStatus } from "@/constants/role.constants";
import db from "@/lib/db_config"
import { ResultSetHeader, RowDataPacket } from "mysql2"
import { User } from "../types/user.interface";

export class UserRepository
{
    // Fetch all resources
    static async indexQuery()
    {
        const [userRows] = await db.query<RowDataPacket[]>(
            `SELECT * FROM users INNER JOIN roles USING(role_id) WHERE account_status != ? ORDER BY users.created_at DESC`,
            [
                UserStatus.DELETED
            ]
        );

        return userRows;
    }

    // Store new resources
    static async storeQuery(
        user: User
    )
    {
        const [result] = await db.query<ResultSetHeader>(
            `INSERT INTO users (role_id, user_avater first_name, last_name, user_email, user_name, password, password_expiry_at, account_status, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,NOW(),NOW())`,
            [
                user.role_id,
                user.user_avater,
                user.first_name,
                user.last_name,
                user.user_email,
                user.user_name,
                user.password,
                user.password_expired_at,
                user.account_status
            ]
        );

        return result.insertId;
    }

    // Find specific resource
    static async findByIdQuery(
        user_id: number
    )
    {
        const [userRow] = await db.query<RowDataPacket[]>(
            `SELECT * FROM users WHERE user_id = ? LIMIT 1`,
            [
                user_id
            ]
        );

        return userRow[0];
    }

    // update specific resource with out image
    static async updateWithoutImageQuery(
        user_id: number,
        user: User
    )
    {
        const [result] = await db.query<ResultSetHeader>(
            `UPDATE users SET role_id = ?, first_name = ?, last_name = ?, user_email = ?, user_name = ?, account_status = ?, updated_at = NOW() WHERE user_id = ?`,
            [
                user.role_id,
                user.first_name,
                user.last_name,
                user.user_email,
                user.user_name,
                user.account_status,
                user_id
            ]
        );

        return result;
    }

    // Update specific resource with image
    static async updateWithImageQuery(
        user_id: number,
        user:User
    )
    {
        const [result] = await db.query<ResultSetHeader>(
            `UPDATE users SET role_id = ?, user_avater = ?, first_name = ?, last_name = ?, user_email = ?, user_name = ?, account_status = ?, updated_at = NOW() WHERE user_id = ?`,
            [
                user.role_id,
                user.user_avater,
                user.first_name,
                user.last_name,
                user.user_email,
                user.user_name,
                user.account_status,
                user_id
            ]
        );

        return result;
    }

    // Delete specific resource
    static async deleteQuery(
        user_id: number
    )
    {
        const [result] = await db.query<ResultSetHeader>(
            `UPDATE users SET account_status = ?, updated_at = NOW()  WHERE user_id = ?`,
            [
                UserStatus.DELETED,
                user_id
            ]
        );

        return result;
    }

    // Find Exists resoures
    static async findByUsername(user_name: string) {

        const [rows] = await db.query<RowDataPacket[]>(
            "SELECT * FROM users WHERE user_name LIKE ?",
            [`${user_name}%`]
        );

        return rows[0];
    }
}