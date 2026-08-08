import { NextRequest, NextResponse } from "next/server";
import { CountryServices } from "../services/country.services";

export class CountryControllers {
    // GET: Fetch all countries
    static async index() {
        try {
            const countries = await CountryServices.indexServices();
            return NextResponse.json(
                {
                    data: countries, message: countries.length === 0
                        ? "No countries found!" : "Countries fetched successfully!"
                },
                { status: 200 }
            );
        }
        catch (error) {
            console.log(error);

            return NextResponse.json(
                {
                    success: false,
                    message: "An unexpected error occurred"
                },
                {
                    status: 400
                }
            );
        }
    }

    // POST - Store country
    static async store(
        request: NextRequest
    ) {
        try {
            const body = await request.json();

            const country =
                await CountryServices.storeServices(
                    body.country
                );

            return NextResponse.json(
                {
                    success: true,
                    message: "Country created successfully",
                    country
                },
                {
                    status: 200
                }
            );
        }
        catch (error) {
            console.log(error);

            if (error instanceof Error) {
                return NextResponse.json(
                    {
                        success: false,
                        message: error.message
                    },
                    {
                        status: 400
                    }
                );
            }

            return NextResponse.json(
                {
                    success: false,
                    message: "An unexpected error occurred"
                },
                {
                    status: 400
                }
            );
        }
    }

    // GET - Fetch specific country
    static async show(
        country_id: number
    ) {
        try {
            const country =
                await CountryServices.showServices(
                    country_id
                );

            return NextResponse.json(
                {
                    success: true,
                    data: country
                },
                {
                    status: 200
                }
            );
        }
        catch (error) {
            console.log(error);

            return NextResponse.json(
                {
                    success: false,
                    message: "An unexpected error occurred"
                },
                {
                    status: 400
                }
            );
        }
    }

    // PUT - Update country
    static async update(
        country_id: number,
        request: NextRequest
    ) {
        try {
            const body = await request.json();

            await CountryServices.updateServices(
                {
                    ...body.country,
                    country_id
                }
            );

            return NextResponse.json(
                {
                    success: true,
                    message: "Country updated successfully"
                },
                {
                    status: 200
                }
            );
        }
        catch (error) {
            console.log(error);

            if (error instanceof Error) {
                return NextResponse.json(
                    {
                        success: false,
                        message: error.message
                    },
                    {
                        status: 400
                    }
                );
            }

            return NextResponse.json(
                {
                    success: false,
                    message: "An unexpected error occurred"
                },
                {
                    status: 400
                }
            );
        }
    }

    // DELETE - Soft delete country
    static async delete(
        country_id: number
    ) {
        try {
            await CountryServices.deleteServices(
                country_id
            );

            return NextResponse.json(
                {
                    success: true,
                    message: "Country deleted successfully"
                },
                {
                    status: 200
                }
            );
        }
        catch (error) {
            console.log(error);

            return NextResponse.json(
                {
                    success: false,
                    message: "An unexpected error occurred"
                },
                {
                    status: 400
                }
            );
        }
    }
}