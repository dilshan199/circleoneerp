import { RoleRepository } from "../repositories/role.repository";
import { Role } from "../types/role.interface";
import { roleRoutePermission } from "../types/role-route-permission.interface";
import db from "@/lib/db_config";

export class RoleServices {
    // Fetch all resources
    static async indexServices() 
    {
        const roles = await RoleRepository.indexQuery();
        
        return roles;
    }

    // Store resource
    static async storeServices(
        role: Role,
        rolePermissions: roleRoutePermission[]
    )
    {
        const connection = await db.getConnection();

        try
        {
            await connection.beginTransaction();

            // Check role already exists
            const existingRole = await RoleRepository.findExistResourceQuery(
                role.role_name
            )

            if (existingRole)
            {
                throw new Error(
                    "Role already exists"
                );
            }

            const roleId = await RoleRepository.storeRoleQuery(
                connection,
                role
            );

            for (const permission of rolePermissions)
            {
                await RoleRepository.storePermissionQuery(
                    connection,
                    {
                        ...permission,
                        role_id: roleId
                    }
                )
            }

            await connection.commit();

            return roleId;
        }
        catch (error)
        {
            await connection.rollback();

            throw error;
        }
        finally
        {
            connection.release();
        }
    }

    // Fetch specific resources
    static async showServices(
        role_id: number
    )
    {
        const role = RoleRepository.findByIdQuery(
            role_id
        );

        const permissions = RoleRepository.getRolePermissionsQuery(
            role_id
        );

        return {
            ...role,
            permissions
        };
    }

    // Update specific resources
    static async updateServices(
        role_id: number,
        role: Role,
        permissions: roleRoutePermission[]
    )
    {
        const connection = await db.getConnection();

        try
        {
            await connection.beginTransaction();

            await RoleRepository.updateQuery(
                connection,
                role_id,
                role
            );

            await RoleRepository.deleteRolePermissionsQuery(
                connection,
                role_id
            );

            for (const permission of permissions)
            {
                await RoleRepository.storePermissionQuery(
                    connection,
                    {
                        ...permission,
                        role_id
                    }
                );
            }

            await connection.commit();

            return true;
        }
        catch (error)
        {
            await connection.rollback();

            console.log(error);

            throw error;
        }
        finally
        {
            connection.release();
        }
    }

    // Delete resource
    static async deleteServices(
        role_id: number
    )
    {
        await RoleRepository.deleteQuery(
            role_id
        );
    }
}