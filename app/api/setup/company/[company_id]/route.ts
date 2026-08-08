import { NextRequest } from "next/server";
import { CompanyControllers } from "@/modules/setup/controllers/company.controllers";

// GET: Fetch specific company
export async function GET(request: NextRequest,
    { params }: { params: Promise<{ company_id: string }> }) {

    const { company_id } = await params;
    return CompanyControllers.show(Number(company_id));
}

// PUT: Update company
export async function PUT(request: NextRequest,
    { params }: { params: Promise<{ company_id: string }> }) {

    const { company_id } = await params;
    return CompanyControllers.update(Number(company_id), request);
}