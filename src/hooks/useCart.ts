import { useState, useEffect } from "react";
import { cartStore } from "@/store/cartStore";
import { CartItem } from "@/types/product";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const updateCart = () => {
      setItems(cartStore.getItems());
      setTotal(cartStore.getTotal());
      setItemCount(cartStore.getItemCount());
    };

    updateCart();
    const unsubscribe = cartStore.subscribe(updateCart);

    return unsubscribe;
  }, []);

  return {
    items,
    total,
    itemCount,
    addItem: cartStore.addItem.bind(cartStore),
    removeItem: cartStore.removeItem.bind(cartStore),
    updateQuantity: cartStore.updateQuantity.bind(cartStore),
    clear: cartStore.clear.bind(cartStore),
  };
}
