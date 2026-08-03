import { NextRequest, NextResponse } from "next/server";
import { RoleServices } from "../services/role.services";

export class RoleControllers
{
    static async index()
    {
        try
        {
            const roles = await RoleServices.indexServices();

            return NextResponse.json(
                {
                    data: roles,
                    message: roles.length === 0
                    ? "No any records found"
                    : "Record fetched successfully"
                }
            );
        }
        catch (error)
        {
            console.log(error)

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

    static async store(request: NextRequest)
    {
        try
        {
            const body = await request.json();

            const role = await RoleServices.storeServices(
                body.role,
                body.rolePermissions
            );

            return NextResponse.json(
                {
                    success: true,
                    message: "Role created successfully",
                    role_id: role
                },
                {
                    status: 200
                }
            );
        }
        catch (error)
        {
            console.log(error)
            
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

    static async show(
        role_id: number
    )
    {
        try
        {
            const role = RoleServices.showServices(
                role_id
            );

            return NextResponse.json(
                {
                    success: true,
                    data: role
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

    static async update(
        role_id: number,
        request: NextRequest
    )
    {
        try
        {
            const body = await request.json();

            await RoleServices.updateServices(
                role_id,
                body.role,
                body.permissions
            );

            return NextResponse.json(
                {
                    success: true,
                    message: "Role updated successfully"
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

    // delete specific resource
    static async delete(
        role_id: number
    )
    {
        try
        {
            await RoleServices.deleteServices(
                role_id
            );

            return NextResponse.json(
                {
                    success: true,
                    message: "Role deleted successfully"
                },
                {
                    status: 200
                }
            );
        }
        catch(error)
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