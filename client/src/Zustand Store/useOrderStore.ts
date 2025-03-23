import { CheckoutSessionRequest, OrderState } from "@/types/orderType";
import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// const API_END_POINT: string = "http://localhost:8000/api/v1/order";
const API_END_POINT: string = "https://zaykahub-food-app.onrender.com/api/v1/order";
axios.defaults.withCredentials = true;

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      loading: false,
      orders: [],
      // create checkout session api implementation
      createCheckoutSession: async (
        checkoutSession: CheckoutSessionRequest
      ) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/checkout/create-checkout-session`,
            checkoutSession,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          window.location.href = response.data.session.url;
          console.log(response.data.session.url);
          set({ loading: false });
        } catch (error) {
          set({ loading: false });
        }
      },

      // get order details api implementation
      getOrderDetails: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_END_POINT}/orders`);

          if (response.data.success) {
            set({ loading: false, orders: response.data.orders });
            console.log(response.data.orders);
          }
        } catch (error: any) {
          if (error.response.status === 404) {
            set({ orders: undefined });
          }
          set({ loading: false });
        }
      },
    }),
    {
      name: "order-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
