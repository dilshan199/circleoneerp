import { NextRequest, NextResponse } from "next/server";
import { UserServices } from "../services/user.services";

export class UserContrillers
{
    static async index ()
    {
        try
        {
            const users = await UserServices.indexServices();

            return NextResponse.json(
                {
                    data: users,
                    message: users.length === 0
                    ? "No any records found"
                    : "Record fetched successfully"
                }
            );
        }
        catch (error)
        {
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

    static async store (
        request: NextRequest
    )
    {
        try
        {
            const body = await request.json();
            
            const userId = await UserServices.storeServices(body);

            return NextResponse.json(
                {
                    success: true,
                    user_id: userId,
                    message: "User register successfully"
                },
                {
                    status: 201
                }
            )
        }
        catch (error)
        {
            console.log(error);

            if (error instanceof Error)
            {
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

    // Fetch specific resources
    static async show(
        user_id: number
    )
    {
        try
        {
            const user = await UserServices.showServices(
                user_id
            );

            return NextResponse.json(
                {
                    success: true,
                    data: user
                },
                {
                    status: 200
                }
            );
        }
        catch (error)
        {
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

    // Update specific resources
    static async update(
        user_id: number,
        request: NextRequest
    )
    {
        try
        {
            const body = await request.json();

            const result = await UserServices.updateServices(
                user_id,
                body.user,
            );

            if(result.affectedRows > 0)
            {
                return NextResponse.json(
                    {
                        success: true,
                        message: "User update successfully"
                    },
                    {
                        status: 200
                    }
                );
            }
        }
        catch (error)
        {
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

    // Delete resources
    static async delete(
        user_id: number
    )
    {
       try
       {
            const result = await UserServices.deleteServices(
                user_id
            );

            if (result)
            {
                return NextResponse.json(
                    {
                        success: true,
                        message: "User deleted successfully"
                    },
                    {
                        status: 200
                    }
                );
            }
            else
            {
                return NextResponse.json(
                    {
                        success: true,
                        message: "User deleted failed"
                    },
                    {
                        status: 400
                    }
                );
            }
       }
       catch (error)
       {
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