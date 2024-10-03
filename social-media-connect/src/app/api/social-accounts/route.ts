// app/api/social-accounts/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { PrismaClient } from "@prisma/client";
import { authOptions } from "../../../lib/authOptions";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const accounts = await prisma.socialAccount.findMany({
    where: { userId },
    select: { id: true, platform: true, provider: true },
  });

  return NextResponse.json(accounts, { status: 200 });
}
