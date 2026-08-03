import { UserContrillers } from "@/modules/auth/controllers/user.controllers";
import { NextRequest } from "next/server";

// GET - api/users
export async function GET()
{
    return UserContrillers.index();
}

//POST - api/users
export async function POST(request: NextRequest)
{
    return UserContrillers.store(request);
}