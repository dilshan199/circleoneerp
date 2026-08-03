import { NextRequest } from "next/server";
import { RoleControllers } from "@/modules/setup/controllers/role.controllers"

// GET - fetch specific resource
export async function GET(
    request: Request,
    { params }: { params: Promise<{ role_id: string }> }
)
{
    const { role_id } = await params;

    return RoleControllers.show(
        Number(role_id)
    );
}

// PUT - update specific resource
export async function PUT(
    request: NextRequest,
    { params } : { params: Promise<{role_id: string}>}
)
{
    const { role_id } = await params;

    return RoleControllers.update(
        Number(role_id),
        request
    );
}

// DELETE - soft delete for specific resource
export async function DELETE(
    request: NextRequest,
    { params } : { params: Promise<{role_id: string}>} 
)
{
    const { role_id } = await params;

    return RoleControllers.delete(Number(role_id));
}