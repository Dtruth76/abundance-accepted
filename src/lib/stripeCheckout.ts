export type MembershipTier = "abundance-plus" | "vip-circle";

export async function startCheckout(tier: MembershipTier, billing: "monthly" | "annual" = "monthly") {
  try {
    const response = await fetch("/.netlify/functions/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tier, billing }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || "Failed to start checkout");
    }

    const { url } = await response.json();

    if (url) {
      window.location.href = url;
    } else {
      throw new Error("No checkout url returned");
    }
  } catch (err) {
    console.error("Checkout error:", err);
    alert("Something went wrong starting checkout. Please try again in a moment.");
  }
}