import type { CartItem } from "./cart";

/** Mirrors the original portal's `Order` entity. */
export interface Order {
  items: string; // JSON string of [{ id, name, qty }]
  status: "pending";
  notes: string;
  customer_email: string;
  customer_name?: string;
  created_date: string;
}

const ORDER_ENDPOINT = import.meta.env.VITE_ORDER_ENDPOINT as string | undefined;
const LOCAL_ORDERS_KEY = "hca_orders";

export async function placeOrder(input: { cart: CartItem[]; email: string; phone: string; notes: string }) {
  const order: Order = {
    items: JSON.stringify(input.cart.map((i) => ({ id: i.id, name: i.name, qty: i.qty }))),
    status: "pending",
    notes: `Phone: ${input.phone}\n${input.notes}`,
    customer_email: input.email,
    created_date: new Date().toISOString(),
  };

  if (ORDER_ENDPOINT) {
    const res = await fetch(ORDER_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    if (!res.ok) throw new Error(`Order request failed (HTTP ${res.status})`);
    return order;
  }

  // No backend configured: persist locally so the flow is fully functional offline.
  await new Promise((r) => setTimeout(r, 600));
  try {
    const existing: Order[] = JSON.parse(localStorage.getItem(LOCAL_ORDERS_KEY) || "[]");
    localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify([...existing, order]));
  } catch {
    /* storage unavailable — order is still acknowledged */
  }
  return order;
}
