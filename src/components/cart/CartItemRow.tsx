import { motion } from "framer-motion";
import { GraduationCap, Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem } from "@/lib/cart";

interface CartItemRowProps {
  item: CartItem;
  onQtyChange: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}

const qtyButtonClass =
  "w-7 h-7 rounded-lg bg-muted flex items-center justify-center hover:bg-accent/10 transition-colors";

export function CartItemRow({ item, onQtyChange, onRemove }: CartItemRowProps) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-card rounded-2xl border border-border p-5 flex gap-4"
    >
      <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted flex-shrink-0">
        {item.image_url ? (
          <img src={item.image_url} alt={item.name} width={80} height={80} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-muted-foreground/40" aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-inter font-semibold text-foreground text-sm leading-snug mb-1 line-clamp-2">{item.name}</h3>
        <p className="text-xs text-accent font-inter font-medium mb-3">Contact for Pricing</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2" role="group" aria-label={`Quantity of ${item.name}`}>
            <button
              onClick={() => onQtyChange(item.id, item.qty - 1)}
              aria-label={item.qty === 1 ? `Remove ${item.name}` : "Decrease quantity"}
              className={qtyButtonClass}
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-6 text-center font-inter text-sm font-medium" aria-live="polite">
              {item.qty}
            </span>
            <button onClick={() => onQtyChange(item.id, item.qty + 1)} aria-label="Increase quantity" className={qtyButtonClass}>
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            aria-label={`Remove ${item.name} from cart`}
            className="text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.li>
  );
}
