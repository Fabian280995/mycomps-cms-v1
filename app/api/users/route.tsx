import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    const body = await req.json();
    const { firstName, lastName, email } = body;
    if (!firstName || !lastName || !email) {
      return new Response("Missing required fields", { status: 400 });
    }

    const user = await prismadb.user.create({
      data: {
        firstName,
        lastName,
        email,
        clerkId: userId,
        onboarded: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USERS_POST]::", error);
    return new NextResponse("Internal error!", { status: 500 });
  } finally {
    await prismadb.$disconnect();
  }
}

export async function GET(_req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    const users = await prismadb.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.log("[USERS_GET]::", error);
    return new NextResponse("Internal error!", { status: 500 });
  } finally {
    await prismadb.$disconnect();
  }
}
