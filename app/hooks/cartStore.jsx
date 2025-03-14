import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.id === item.id && i.color === item.color && i.storage === item.storage
          );

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id && i.color === item.color && i.storage === item.storage
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          } else {
            return { items: [...state.items, { ...item, quantity: 1, cartId: crypto.randomUUID() }] };
          }
        });
      },
      
      removeItem: (id, color,storage) => {
        set((state) => ({
          items: state.items.filter((item) => !(item.id === id && item.color === color && item.storage === storage)),
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);