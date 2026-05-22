import { CartState } from "@/types/cartType";
import { MenuItem } from "@/types/restaurantType";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      restaurantId: undefined,

      addToCart: (item: MenuItem) => {
        set((state) => {
          const restaurantId = item.restaurantId || state.restaurantId;
          const existingItem = state.cart.find((cartItem) => cartItem._id === item._id);

          if (existingItem) {
            return {
              restaurantId,
              cart: state.cart.map((cartItem) =>
                cartItem._id === item._id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              ),
            };
          }

          return {
            restaurantId,
            cart: [...state.cart, { ...item, restaurantId, quantity: 1 }],
          };
        });
      },

      clearCart: () => {
        set({ cart: [], restaurantId: undefined });
        localStorage.removeItem("cart-name");
      },

      removeFromTheCart: (id: string) => {
        set((state) => ({
          cart: state.cart.filter((item) => item._id !== id),
        }));
      },

      incrementQuantity: (id: string) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item._id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        }));
      },

      decrementQuantity: (id: string) => {
        set((state) => ({
          cart: state.cart
            .map((item) => {
              if (item._id !== id) {
                return item;
              }

              if (item.quantity <= 1) {
                return null;
              }

              return { ...item, quantity: item.quantity - 1 };
            })
            .filter((item): item is NonNullable<typeof item> => item !== null),
        }));
      },
    }),
    {
      name: "cart-name",
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState: any) => {
        if (!persistedState) return persistedState;

        const restaurantId =
          persistedState.restaurantId ||
          persistedState.cart?.find((item: any) => item.restaurantId)?.restaurantId;

        return {
          ...persistedState,
          restaurantId,
          cart: (persistedState.cart || []).map((item: any) => ({
            ...item,
            restaurantId: item.restaurantId || restaurantId,
          })),
        };
      },
    }
  )
);