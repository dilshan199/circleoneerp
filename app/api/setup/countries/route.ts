import { NextRequest } from "next/server";
import { CountryControllers } from "@/modules/setup/controllers/country.controllers";

// GET: Fetch all countries
export async function GET() {
    return CountryControllers.index();
}

// POST: Create new country
export async function POST(request: NextRequest) {
    return CountryControllers.store(request);
}