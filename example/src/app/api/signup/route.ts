import { db } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import * as bcrypt from "bcrypt";

const schema = z.object({
  email: z.string(),
  username: z.string(),
  password: z.string(),
});

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log(data);
  try {
      const parsed_data = schema.parse(data);
      const hashedPassword = await bcrypt.hash(parsed_data.password,10);
      const resp = await db.user.create({
    data: {
        email: parsed_data.email,
        name: parsed_data.username,
        password: hashedPassword

    }
   })
   return NextResponse.json({
    data: {
        msg: "Successfully Registered"
    }
   })
  } catch (error) {
    return NextResponse.error();
  }
}
