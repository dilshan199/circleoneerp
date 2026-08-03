import { RoleControllers } from "@/modules/setup/controllers/role.controllers"
import { NextRequest } from "next/server";

// GET - fetch all resources
export async function GET() 
{
    return RoleControllers.index();
}

// POST - store resources
export async function POST(request: NextRequest)
{
    return RoleControllers.store(request);
}