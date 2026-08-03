import { NextRequest } from "next/server";
import { CompanyControllers } from "@/modules/setup/controllers/company.controllers";

// GET: Fetch all companies
export async function GET() {
    return CompanyControllers.index();
}

// POST: Create company
export async function POST(request: NextRequest) {
    return CompanyControllers.store(request);
}