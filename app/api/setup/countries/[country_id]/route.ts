import { NextRequest } from "next/server";
import { CountryControllers } from "@/modules/setup/controllers/country.controllers";

// GET: Fetch specific country
export async function GET(request: NextRequest,
    { params }: { params: Promise<{ country_id: string }> }) {

    const { country_id } = await params;
    return CountryControllers.show(Number(country_id));
}

// PUT: Update specific country
export async function PUT(request: NextRequest,
    { params }: { params: Promise<{ country_id: string }> }) {

    const { country_id } = await params;
    return CountryControllers.update(Number(country_id), request);
}

// DELETE: Soft delete specific country
export async function DELETE(request: NextRequest,
    { params }: { params: Promise<{ country_id: string }> }) {

    const { country_id } = await params;
    return CountryControllers.delete(Number(country_id));
}