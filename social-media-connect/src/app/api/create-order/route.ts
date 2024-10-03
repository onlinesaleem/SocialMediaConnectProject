import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    // Amount in paisa (100 paisa = 1 INR). Example: 50000 paisa = 500 INR
    const amount = 50000;

    const options = {
      amount: amount, // 500 INR in paisa
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
      payment_capture: 1, // Auto capture payment
    };

    // Create a new Razorpay order
    const order = await razorpay.orders.create(options);
    if (!order || !order.id) {
      console.error("Failed to create Razorpay order:", order);
      return NextResponse.json({ error: "Failed to create Razorpay order" }, { status: 500 });
    }

    // Return the order details to the client
    return NextResponse.json({ id: order.id, amount: order.amount, currency: order.currency });
  } catch (err: any) {
    console.error("Error creating Razorpay order:", err.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
