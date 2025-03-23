import { CartState } from "@/types/cartType";
import { MenuItem } from "@/types/restaurantType";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      // add to cart
      addToCart: (item: MenuItem) => {
        set((state) => {
          const exisitingItem = state.cart.find(
            (cartItem) => cartItem._id === item._id
          );
          if (exisitingItem) {
            // already added in cart then increase qty
            return {
              cart: state?.cart.map((cartItem) =>
                cartItem._id === item._id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              ),
            };
          } else {
            // add cart
            return {
              cart: [...state.cart, { ...item, quantity: 1 }],
            };
          }
        });
      },

      // clear cart
      clearCart: () => {
        set({ cart: [] });
      },

      // remove from cart
      removeFromTheCart: (id: string) => {
        set((state) => ({
          cart: state.cart.filter((item) => item._id !== id),
        }));
      },

      // increment quantity of item
      incrementQuantity: (id: string) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item._id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        }));
      },

      // decrement quantity of item
      decrementQuantity: (id: string) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item._id === id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        }));
      },
    }),
    {
      name: "cart-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
