import { NextRequest, NextResponse } from "next/server";
import { db } from "./utils/db";
import { create_access_token, verify_token } from "./utils/jwt";

const privateRoutes = ['/dashboard'];
const publicRoutes = ['/login', '/signup'];

export default async function middleware(req: NextRequest) {
    const { nextUrl } = req;
    const accessToken = req.cookies.get("accessToken");
    const refreshToken = req.cookies.get("refreshToken");

    async function handleInvalidTokens() {
        if (privateRoutes.includes(nextUrl.pathname)) {
            return NextResponse.redirect(new URL("/login", nextUrl));
        }
        return NextResponse.next();
    }

    async function generateNewAccessToken(userId: string, userName: string) {
        const newAccessToken = await create_access_token(userId, userName);
        const response = NextResponse.next();
        response.cookies.set("accessToken", newAccessToken);
        return response;
    }

    if (accessToken) {
        try {
            const isValidAccessToken = await verify_token(accessToken.value);
            if (isValidAccessToken) {
                if (publicRoutes.includes(nextUrl.pathname)) {
                    return NextResponse.redirect(new URL("/dashboard", nextUrl));
                }
                return NextResponse.next();
            }
        } catch (error) {
            console.error("Error validating access token:", error);
        }
    }

    if (refreshToken) {
        try {
            const isValidRefreshToken = await verify_token(refreshToken.value);
            if (isValidRefreshToken) {
                const userData = await db.user.findFirst({
                    where: { refreshToken: refreshToken.value }
                });

                if (userData) {
                    return generateNewAccessToken(userData.id, userData.name);
                }
            }
        } catch (error) {
            console.error("Error validating refresh token:", error);
        }
    }

    return handleInvalidTokens();
}