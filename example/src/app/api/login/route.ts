import { db } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import * as bcrypt from "bcrypt";
import { create_access_token, create_refresh_token } from "@/utils/jwt";
import { cookies } from "next/headers";

const schema = z.object({
  email: z.string(),
  password: z.string(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const parsed_data = schema.parse(body);
      const data = await db.user.findFirst({
        where: {
          email: parsed_data.email,
        },
      });
      if (!data) {
        return NextResponse.json(
          {
            msg: "Invalid Creditnals",
          },
          {
            status: 401,
          }
        );
      }
      console.log(data?.password,parsed_data.password)
      const isValid = await bcrypt.compare(
          parsed_data.password,
          data?.password!
      );
      console.log(isValid)
      if (isValid) {
        // add resfresh token
        const refreshToken = await create_refresh_token(data.id, data.name);
        const accessToken = await create_access_token(data.id, data.name);

        await db.user.update({
          data: {
            refreshToken: refreshToken,
          },
          where: {
            email: parsed_data.email,
          },
        });
        cookies().set("accessToken", accessToken);
        return NextResponse.json(
          {
            msg: "Successful",
            data: data.name,
          },
          {
            headers: {
              "Set-Cookie": "handler=true; Path=/; HttpOnly; SameSite=Strict;",
            },
          }
        );
      } else {
        return NextResponse.json(
          {
            msg: "Invalid Creditnals",
          },
          {
            status: 401,
          }
        );
      }
  } catch (error) {
    return NextResponse.json(
      {
        msg: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
