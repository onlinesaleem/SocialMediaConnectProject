import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !userId) {
      console.log("Missing payment information");
      return NextResponse.json({ error: "Missing payment information" }, { status: 400 });
    }

    // Verify signature
    const secret = process.env.RAZORPAY_KEY_SECRET;
    const generatedSignature = crypto
      .createHmac("sha256", secret!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      console.log("Signature verification failed");
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // If payment is verified, proceed with database updates
    const payment = await prisma.payment.create({
      data: {
        transactionId: razorpay_payment_id,
        amount: 50000, // Example amount, change accordingly
        currency: "INR",
        status: "captured",
        subscriptionId: razorpay_order_id,
      },
    });

    console.log("Payment verified successfully:", payment);

    // Update subscription status for the user
    const subscription = await prisma.subscription.upsert({
      where: { userId: userId },
      update: {
        status: "ACTIVE",
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Example: 30 days
      },
      create: {
        userId: userId,
        razorpaySubscriptionId: razorpay_order_id,
        status: "ACTIVE",
        plan: "PRO", // Adjust as necessary
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    console.log("Subscription created/updated successfully:", subscription);

    return NextResponse.json({ status: "Payment verified successfully" });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
