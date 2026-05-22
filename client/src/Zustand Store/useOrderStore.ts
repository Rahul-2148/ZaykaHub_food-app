import { CheckoutSessionRequest, OrderState } from "@/types/orderType";
import { getErrorMessage } from "@/lib/getErrorMessage";
import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/apiBaseUrl";

const API_END_POINT: string = `${API_BASE_URL}/order`;
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
          const sessionUrl = response.data?.session?.url;

          if (!sessionUrl) {
            throw new Error("Payment link was not returned by the server.");
          }

          window.location.assign(sessionUrl);
        } catch (error) {
          toast.error(getErrorMessage(error, "Failed to start payment"));
          throw error;
        } finally {
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
          if (error.response?.status === 404) {
            set({ orders: [] });
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
