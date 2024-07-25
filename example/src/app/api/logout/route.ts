import { db } from "@/utils/db";
import { getIdfromjwt } from "@/utils/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const token = req.cookies.get('accessToken')?.value;
    if (!token) {
        return NextResponse.error();
    }

    const id = await getIdfromjwt(token);
    try {
        await db.user.update({
            where: {
                id: id
            },
            data: {
                refreshToken: null
            }
        });

        const response = new NextResponse(null, { status: 204 }); 
        response.cookies.delete('accessToken');
        return response;
    } catch (error) {
        return NextResponse.error();
    }
}
