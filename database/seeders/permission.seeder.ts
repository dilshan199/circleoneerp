import db from "@/lib/db_config";

const permissions = [
    { action: 'CREATE', level: 1},
    { action: 'READ', level: 2},
    { action: 'EDIT', level: 3},
    { action: 'DELETE', level: 4},
    { action: 'EXPORT', level: 5},
    { action: 'DOWNLOAD', level: 6},
    { action: 'PRINT', level: 7},
    { action: 'SHOW', level: 8}
];

export async function seedPermissions() {
    try
    {
        for (const permission of permissions)
        {
            await db.query(
                `INSERT IGNORE INTO permissions (action, level, created_at, updated_at) VALUES (?, ?, NOW(), NOW())`,
                [permission.action, permission.level]
            );
        }
    }
    catch (error)
    {
        console.log(error);
    }
}