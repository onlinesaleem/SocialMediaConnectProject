// app/api/social-accounts/[id]/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { PrismaClient } from "@prisma/client";
import { authOptions } from "../../../../lib/authOptions";

const prisma = new PrismaClient();

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const accountId = parseInt(params.id, 10);
  if (isNaN(accountId)) {
    return NextResponse.json({ message: "Invalid account ID" }, { status: 400 });
  }

  const account = await prisma.socialAccount.findUnique({
    where: { id: accountId },
  });

  if (!account) {
    return NextResponse.json({ message: "Social account not found" }, { status: 404 });
  }

  if (account.userId !== session.user.id) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  try {
    await prisma.socialAccount.delete({
      where: { id: accountId },
    });

    return NextResponse.json({ message: "Social account disconnected" }, { status: 200 });
  } catch (error) {
    console.error("Error disconnecting social account:", error);
    return NextResponse.json({ message: "Failed to disconnect social account" }, { status: 500 });
  }
}
