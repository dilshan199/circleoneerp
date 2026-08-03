import { NextRequest, NextResponse } from "next/server";
import { CompanyServices } from "../services/company.services";

export class CompanyControllers {

    // GET: Fetch all companies
    static async index() {
        try {
            const companies = await CompanyServices.indexServices();
            return NextResponse.json(
                {
                    data: companies, message: companies.length === 0
                        ? "No companies found!" : "Companies fetched successfully!"
                },
                { status: 200 }
            );
        }
        catch (error) {
            console.log(error);
            return NextResponse.json(
                { success: false, message: "An unexpected error occurred!" },
                { status: 400 }
            );
        }
    }

    // POST: Create company
    static async store(request: NextRequest) {
        try {
            const body = await request.json();
            const company = await CompanyServices.storeServices(body.company);
            return NextResponse.json(
                { success: true, message: "Company created successfully!", company },
                { status: 200 }
            );
        }
        catch (error) {
            console.log(error);
            if (error instanceof Error) {
                return NextResponse.json(
                    { success: false, message: error.message },
                    { status: 400 }
                );
            }
            return NextResponse.json(
                { success: false, message: "An unexpected error occurred!" },
                { status: 400 }
            );
        }
    }

    // GET: Fetch specific company
    static async show(company_id: number) {
        try {
            const company = await CompanyServices.showServices(company_id);
            return NextResponse.json(
                { success: true, message: "Company fetched successfully!", data: company },
                { status: 200 }
            );
        }
        catch (error) {
            console.log(error);
            return NextResponse.json(
                { success: false, message: "An unexpected error occurred!" },
                { status: 400 }
            );
        }
    }

    // PUT: Update company
    static async update(company_id: number, request: NextRequest) {
        try {
            const body = await request.json();
            await CompanyServices.updateServices({ ...body.company, company_id });
            return NextResponse.json(
                { success: true, message: "Company updated successfully!" },
                { status: 200 }
            );
        }
        catch (error) {
            console.log(error);
            if (error instanceof Error) {
                return NextResponse.json(
                    { success: false, message: error.message },
                    { status: 400 }
                );
            }
            return NextResponse.json(
                { success: false, message: "An unexpected error occurred!" },
                { status: 400 }
            );
        }
    }
}