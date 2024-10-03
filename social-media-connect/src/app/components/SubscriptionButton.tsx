import { useState } from "react";
import { useSession } from "next-auth/react";
import Script from "next/script";

const SubscriptionButton = ({ onSubscriptionSuccess }: { onSubscriptionSuccess: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  const handleSubscribe = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create Razorpay order");
      }

      const order = await response.json();
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: order.amount,
        currency: order.currency,
        name: "Your SaaS Platform",
        description: "Subscription Payment",
        order_id: order.id,
        handler: async (response: any) => {
          console.log("Razorpay response:", response);

          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: session?.user?.id, // Ensure userId is passed here
            }),
          });

          const verifyData = await verifyRes.json();
          console.log("Verification data:", verifyData);

          if (verifyData.status === "Payment verified successfully") {
            alert("Payment successful!");
            onSubscriptionSuccess(); // Trigger the subscription status update
          } else {
            alert("Payment verification failed. Please try again.");
            setError("Payment verification failed. Please try again.");
          }
        },
        prefill: {
          name: session?.user?.name || "User",
          email: session?.user?.email || "user@example.com",
        },
        theme: {
          color: "#F37254",
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();

      razorpay.on("payment.failed", function (response: any) {
        console.error("Payment failed:", response.error);
        setError("Payment failed. Please try again.");
      });
    } catch (err: any) {
      console.error("Subscription Error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <button
        onClick={handleSubscribe}
        disabled={loading}
        className="btn bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
      >
        {loading ? "Processing..." : "Subscribe"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </>
  );
};

export default SubscriptionButton;
