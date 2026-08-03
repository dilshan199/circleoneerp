import { UserContrillers } from "@/modules/auth/controllers/user.controllers";
import { NextRequest } from "next/server";

// GET - api/users/[user_id]
export async function GET(
    request: NextRequest,
    { 
        params 
    }:{
        params: Promise<
            {
                user_id: string
            }
        >
    }
)
{
    const { user_id } = await params;

    return UserContrillers.show(
        Number(user_id)
    );
}

// PUT - api/users/[user_id]
export async function PUT(
    request: NextRequest,
    { 
        params 
    }:{
        params: Promise<
            {
                user_id: string
            }
        >
    }
)
{
    const { user_id } = await params;

    return UserContrillers.update(
        Number(user_id),
        request
    );
}

// DELETE - api/users/[user_id]
export async function DELETE(
    { 
        params 
    }:{
        params: Promise<
            {
                user_id: string
            }
        >
    }
)
{
    const { user_id } = await params;

    return UserContrillers.delete(
        Number(user_id),
    );
}