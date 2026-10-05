import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import type { CartItem } from "@/lib/cart";

export interface OrderDetails {
  email: string;
  phone: string;
  notes: string;
}

interface OrderSummaryProps {
  cart: CartItem[];
  defaultEmail?: string;
  submitting: boolean;
  error: string | null;
  onPlaceOrder: (details: OrderDetails) => void;
}

const labelClass = "text-xs font-inter font-medium text-muted-foreground mb-1.5 block";
const fieldClass =
  "w-full px-3 py-2 text-sm font-inter border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring";

function RequiredMark() {
  return (
    <span className="text-destructive" aria-hidden="true">
      *
    </span>
  );
}

/** Sticky summary card: per-course lines (priced "TBD") plus the contact details checkout form. */
export function OrderSummary({ cart, defaultEmail = "", submitting, error, onPlaceOrder }: OrderSummaryProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
      <h2 className="font-playfair font-bold text-foreground text-lg mb-5">Order Summary</h2>
      <ul className="space-y-2 mb-5 pb-5 border-b border-border">
        {cart.map((item) => (
          <li key={item.id} className="flex justify-between text-sm font-inter">
            <span className="text-muted-foreground truncate pr-2">
              {item.name} × {item.qty}
            </span>
            <span className="text-foreground font-medium whitespace-nowrap">TBD</span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-muted-foreground font-inter mb-5">
        Pricing will be confirmed by your Sales Advisor after they reach out to understand your needs.
      </p>

      <div className="mb-4">
        <label htmlFor="order-email" className={labelClass}>
          Email Address <RequiredMark />
        </label>
        <input
          id="order-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className={fieldClass}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="order-phone" className={labelClass}>
          Phone Number <RequiredMark />
        </label>
        <input
          id="order-phone"
          type="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+27 000 000 0000"
          className={fieldClass}
          required
        />
      </div>
      <div className="mb-5">
        <label htmlFor="order-notes" className={labelClass}>
          Additional notes (optional)
        </label>
        <Textarea
          id="order-notes"
          placeholder="Tell us about your goals or challenges..."
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="font-inter text-sm resize-none"
        />
      </div>

      <button
        onClick={() => onPlaceOrder({ email, phone, notes })}
        disabled={submitting || !email || !phone}
        className="w-full py-3.5 bg-accent text-white font-inter font-semibold rounded-xl hover:bg-accent/90 transition-all shadow-md shadow-accent/20 disabled:opacity-60"
      >
        {submitting ? "Placing Order..." : "Place Order"}
      </button>
      {error && (
        <p className="text-xs text-center text-destructive font-inter mt-3" role="alert">
          {error}
        </p>
      )}
      <p className="text-xs text-center text-muted-foreground font-inter mt-3">A Sales Advisor will contact you shortly</p>
    </div>
  );
}
