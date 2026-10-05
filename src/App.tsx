import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { CartProvider } from "@/lib/cart";
import Home from "@/pages/Home";

const Courses = lazy(() => import("@/pages/Courses"));
const Cart = lazy(() => import("@/pages/Cart"));
const NotFound = lazy(() => import("@/pages/NotFound"));

/** Full-screen loader, same as the original app shell's. */
function PageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
    </div>
  );
}

/** Route changes start at the top of the page (in-page hash links are handled separately). */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <CartProvider>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </CartProvider>
    </MotionConfig>
  );
}
