import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false, // Disable default body parser
  },
};

// Convert ReadableStream to a string
async function readStreamAsString(stream: ReadableStream) {
  const reader = stream.getReader();
  const chunks = [];
  let done = false;

  while (!done) {
    const { value, done: readerDone } = await reader.read();
    done = readerDone;
    if (value) {
      chunks.push(new TextDecoder().decode(value));
    }
  }

  return chunks.join("");
}

export async function POST(req: Request) {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // Read the raw request body
    const bodyString = await readStreamAsString(req.body as unknown as ReadableStream);
    const body = JSON.parse(bodyString);

    const signature = req.headers.get("x-razorpay-signature");

    // Verify the signature
    const expectedSignature = crypto.createHmac("sha256", secret!)
      .update(bodyString)
      .digest("hex");

    if (signature !== expectedSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
    }

    // Extract Razorpay subscription ID and event details
    const event = body.event;
    const payment = body.payload?.payment?.entity || {};
    const razorpaySubscriptionId = payment.subscription_id;

    if (!razorpaySubscriptionId) {
      return NextResponse.json({ message: "Missing Razorpay subscription ID" }, { status: 400 });
    }

    switch (event) {
      case "payment.captured": {
        // Update the user's subscription in the database
        await prisma.subscription.update({
          where: { razorpaySubscriptionId: razorpaySubscriptionId },
          data: {
            status: "ACTIVE",
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Assume 30 days for example
          },
        });

        // Save payment details in the database
        await prisma.payment.create({
          data: {
            transactionId: payment.id,
            amount: payment.amount,
            currency: payment.currency,
            status: payment.status,
            subscriptionId: razorpaySubscriptionId,
          },
        });

        break;
      }

      case "subscription.cancelled": {
        // Update the subscription status to "CANCELED"
        const subscriptionId = body.payload.subscription.entity.id;
        await prisma.subscription.update({
          where: { razorpaySubscriptionId: subscriptionId },
          data: {
            status: "CANCELED",
          },
        });

        break;
      }

      default:
        console.log(`Unhandled event: ${event}`);
    }

    return NextResponse.json({ status: "ok" });
  } catch (error: any) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ status: "error", message: "Internal Server Error" }, { status: 500 });
  }
}
