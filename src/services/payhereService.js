const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const MERCHANT_ID = import.meta.env.VITE_PAYHERE_MERCHANT_ID || "1237483";
const IS_SANDBOX =
  (import.meta.env.VITE_PAYHERE_ENV || "sandbox").toLowerCase() !== "production";
const NOTIFY_URL =
  import.meta.env.VITE_PAYHERE_NOTIFY_URL || `${API_URL}/api/v1/payhere/notify`;

export async function getPayHereHash(orderId, amount, currency = "LKR") {
  const formattedAmount = Number(amount).toFixed(2);

  try {
    const response = await fetch(`${API_URL}/api/v1/payhere/hash`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_id: orderId,
        amount: formattedAmount,
        currency,
        merchant_id: MERCHANT_ID,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `Server responded with status ${response.status}`,
      );
    }

    const data = await response.json();
    if (!data.hash) {
      throw new Error("Backend did not return a security hash.");
    }

    return data.hash;
  } catch (error) {
    console.error("Error fetching PayHere hash:", error);
    throw error;
  }
}

export async function startPayHerePayment({
  orderId,
  amount,
  items = [],
  customer = {},
  onCompleted,
  onDismissed,
  onError,
}) {
  if (typeof window === "undefined" || !window.payhere) {
    throw new Error(
      "PayHere SDK is not loaded. Please verify your internet connection.",
    );
  }

  const formattedAmount = Number(amount).toFixed(2);

  const nameParts = (customer.name || "Valued Customer").trim().split(" ");
  const firstName = nameParts[0] || "Valued";
  const lastName = nameParts.slice(1).join(" ") || "Customer";

  const itemsDescription =
    items.map((i) => `${i.name} (${i.selectedSize || "L"}) x${i.quantity}`).join(", ") ||
    "Jaffna Bulls Merchandise";

  // Fetch MD5 security hash from backend
  const hash = await getPayHereHash(orderId, formattedAmount, "LKR");

  const payment = {
    sandbox: IS_SANDBOX,
    merchant_id: MERCHANT_ID,
    return_url: `${window.location.origin}/store`,
    cancel_url: `${window.location.origin}/store`,
    notify_url: NOTIFY_URL,
    order_id: orderId,
    items: itemsDescription,
    amount: formattedAmount,
    currency: "LKR",
    hash: hash,
    first_name: firstName,
    last_name: lastName,
    email: customer.email || "customer@example.com",
    phone: customer.phone || "0771234567",
    address: customer.address || "Main Street",
    city: customer.city || "Jaffna",
    country: "Sri Lanka",
    delivery_address: customer.address || "Main Street",
    delivery_city: customer.city || "Jaffna",
    delivery_country: "Sri Lanka",
    custom_1: customer.notes || "",
  };

  console.log("[PayHere] Starting payment with payload:", payment);

  window.payhere.onCompleted = function handleCompleted(completedOrderId) {
    console.log("[PayHere] Payment Completed. Order ID:", completedOrderId);
    if (onCompleted) {
      onCompleted(completedOrderId || orderId);
    }
  };

  window.payhere.onDismissed = function handleDismissed() {
    console.log("[PayHere] Payment Dismissed / Closed by user.");
    if (onDismissed) {
      onDismissed();
    }
  };

  window.payhere.onError = function handleError(error) {
    console.error("[PayHere] Payment Error:", error);
    if (onError) {
      onError(error || "Payment process encountered an error.");
    }
  };

  window.payhere.startPayment(payment);
}

