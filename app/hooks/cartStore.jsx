import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isHydrated: false,
      
      addItem: (item) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (i) => i.id === item.id && i.color === item.color
          );

          if (existingItemIndex >= 0) {
            // Incrementar cantidad
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + 1,
            };
            return { items: updatedItems };
          } else {
            // Agregar nuevo item
            return { items: [...state.items, { ...item, quantity: 1 }] };
          }
        });
      },
      
      removeItem: (id, color) => {
        set((state) => ({
          items: state.items.filter((item) => !(item.id === id && item.color === color)),
        }));
      },
      
      updateQuantity: (id, color, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((item) => !(item.id === id && item.color === color)),
            };
          }
          return {
            items: state.items.map((item) =>
              item.id === id && item.color === color ? { ...item, quantity } : item
            ),
          };
        });
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);