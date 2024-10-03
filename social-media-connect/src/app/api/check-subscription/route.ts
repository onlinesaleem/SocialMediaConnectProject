// check-subscription/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is missing" }, { status: 400 });
  }

  try {
    const subscription = await prisma.subscription.findUnique({
      where: {
        userId: String(userId),
      },
    });

    return NextResponse.json({ subscriptionStatus: subscription?.status || "NONE" });
  } catch (error) {
    console.error("Error fetching subscription status:", error);
    return NextResponse.json({ error: "Unable to fetch subscription status" }, { status: 500 });
  }
}
