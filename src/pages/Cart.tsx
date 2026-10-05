import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CircleCheckBig, ShoppingCart } from "lucide-react";
import { PortalHeader } from "@/components/layout/PortalHeader";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { OrderSummary, type OrderDetails } from "@/components/cart/OrderSummary";
import { useSeo } from "@/hooks/useSeo";
import { useUser } from "@/lib/auth";
import { useCart } from "@/lib/cart";
import { placeOrder } from "@/lib/orders";
import { SITE_NAME } from "@/lib/site";

export default function Cart() {
  const user = useUser();
  const { cart, removeFromCart, updateQty, clearCart, totalItems } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [placed, setPlaced] = useState(false);
  const navigate = useNavigate();

  useSeo({ title: `Cart Page | ${SITE_NAME}`, path: "/cart", noindex: true });

  const handlePlaceOrder = async ({ email, phone, notes }: OrderDetails) => {
    setSubmitting(true);
    setError(null);
    try {
      await placeOrder({
        cart,
        email: email || user?.email || "",
        phone,
        notes,
        name: user?.full_name || user?.email,
      });
      clearCart();
      setPlaced(true);
    } catch (err) {
      console.error("Order failed:", err);
      setError("Something went wrong placing your order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (placed) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
          role="status"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CircleCheckBig className="w-10 h-10 text-green-500" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-playfair font-bold text-foreground mb-3">Order Placed!</h1>
          <p className="text-muted-foreground font-inter mb-2">
            Thank you, <strong>{user?.full_name || user?.email}</strong>!
          </p>
          <p className="text-muted-foreground font-inter text-sm leading-relaxed mb-8">
            A Sales Advisor will reach out to you soon to understand your goals and recommend the best courses for you.
          </p>
          <button
            onClick={() => navigate("/courses")}
            className="px-6 py-3 bg-accent text-white font-inter font-semibold rounded-xl hover:bg-accent/90 transition-all"
          >
            Browse More Courses
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PortalHeader>
        <Link
          to="/courses"
          className="flex items-center gap-2 text-white/70 hover:text-white font-inter text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Back to Courses
        </Link>
      </PortalHeader>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-playfair font-bold text-foreground mb-2">Your Cart</h1>
        <p className="text-muted-foreground font-inter mb-8" aria-live="polite">
          {totalItems === 0 ? "Your cart is empty." : `${totalItems} item${totalItems !== 1 ? "s" : ""} selected`}
        </p>

        {cart.length === 0 ? (
          <div className="text-center py-24">
            <ShoppingCart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" aria-hidden="true" />
            <p className="text-muted-foreground font-inter mb-6">No courses in your cart yet.</p>
            <Link
              to="/courses"
              className="px-6 py-3 bg-accent text-white font-inter font-semibold rounded-xl hover:bg-accent/90 transition-all"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <ul className="lg:col-span-2 space-y-4" aria-label="Courses in your cart">
              {cart.map((item) => (
                <CartItemRow key={item.id} item={item} onQtyChange={updateQty} onRemove={removeFromCart} />
              ))}
            </ul>
            <div className="lg:col-span-1">
              <OrderSummary
                cart={cart}
                defaultEmail={user?.email}
                submitting={submitting}
                error={error}
                onPlaceOrder={handlePlaceOrder}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
