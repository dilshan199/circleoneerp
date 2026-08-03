import db from "@/lib/db_config";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { Role } from "../types/role.interface";
import { roleRoutePermission } from "../types/role-route-permission.interface";
import { RoleStatus } from "@/constants/role.constants";
import { PoolConnection } from "mysql2/promise";

export class RoleRepository
{
    // Fetch All Resources
    static async indexQuery()
    {
        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT * FROM roles WHERE role_status != ?`,
            [RoleStatus.DELETED]
        );

        return rows;
    }

    // Store new resource
    static async storeRoleQuery(connection: PoolConnection, role: Role)
    {
        const [result] = await connection.query<ResultSetHeader>(
            `INSERT INTO roles (role_code, role_name, role_status, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())`,
            [role.role_code, role.role_name, role.role_status]
        );

        return result.insertId;
    }

    // Store role permissions
    static async storePermissionQuery(connection: PoolConnection, rolePermission: roleRoutePermission)
    {
        await connection.query(
            `INSERT INTO role_route_permissions (role_id, route_id, permission_id, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())`,
            [rolePermission.role_id, rolePermission.route_id, rolePermission.permission_id]
        );
    }

    // Update specific resource
    static async updateQuery(
        connection: PoolConnection,
        role_id: number,
        role: Role
    )
    {
        await connection.query(
            `UPDATE roles SET role_code = ?, role_name = ?, role_status = ? WHERE role_id = ?`,
            [
                role.role_code,
                role.role_name,
                role.role_status,
                role_id
            ]
        );
    }

    // Delete specific resources
    static async deleteQuery(role_id: number)
    {
        const [result] = await db.query<ResultSetHeader>(
            `UPDATE roles SET role_status = ? WHERE role_id = ?`,
            [RoleStatus.DELETED,role_id]
        );
        
        return result;
    }

    // Find exist resource
    static async findExistResourceQuery(role_name: string)
    {
        const [result] = await db.query<RowDataPacket[]>(
            `SELECT role_name FROM roles WHERE role_name = ? LIMIT 1`,
            [role_name]
        );

        return result[0];
    }

    // Find specific resource
    static async findByIdQuery(
        role_id: number
    )
    {
        const [result] = await db.query<RowDataPacket[]>(
            'SELECT * FROM roles WHERE role_id = ? LIMIT 1',
            [role_id]
        );

        return result[0];
    }

    // Get role related permissions
    static async getRolePermissionsQuery(role_id: number)
    {
        const [permissions] = await db.query<RowDataPacket[]>(
            `SELECT * FROM role_route_permissions WHERE role_id = ?`,
            [role_id]
        );

        return permissions;
    }

    // delete exsisting permission
    static async deleteRolePermissionsQuery(
        connection: PoolConnection,
        role_id: number
    )
    {
        await connection.query(
            `DELETE FROM role_route_permissions WHERE role_id = ?`,
            [role_id]
        );
    }
}
