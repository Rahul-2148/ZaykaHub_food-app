import { Orders } from "@/types/orderType";
import { MenuItem, RestaurantState } from "@/types/restaurantType";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// const API_END_POINT = "http://localhost:8000/api/v1/restaurant";
const API_END_POINT = "https://zaykahub-food-app.onrender.com/api/v1/restaurant";
axios.defaults.withCredentials = true;

export const useRestaurantStore = create<RestaurantState>()(
  persist(
    (set, get) => ({
      loading: false,
      restaurant: null,
      searchedRestaurant: null,
      appliedFilter: [],
      singleRestaurant: null,
      restaurantOrder: [],
      resetRestaurantState: () => set({ restaurant: null, loading: false }),

      // create restaurant api implementation
      createRestaurant: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/create-restaurant`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              timeout: 120000,
            }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            console.log(response.data);
            set({ loading: false });
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
          console.log(error);
          set({ loading: false });
        }
      },

      // get restaurant api implementation
      getRestaurant: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_END_POINT}/get-restaurant`);
          if (response.data.success) {
            set({ loading: false, restaurant: response.data.restaurant });
          }
        } catch (error: any) {
          if (error.response.status === 404) {
            set({ restaurant: null });
          }
          set({ loading: false });
        }
      },

      // update restaurant
      updateRestaurant: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.patch(
            `${API_END_POINT}/update-restaurant`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }
      },

      // add menu item to restaurant (it is used in menu store add menu)
      addMenuToRestaurant: (menu: MenuItem) => {
        set((state: any) => ({
          restaurant: state.restaurant
            ? { ...state.restaurant, menus: [...state.restaurant.menus, menu] }
            : null,
        }));
      },

      // update menu item to restaurant state (it is used in menu store update menu)
      updateMenuToRestaurant: (updatedMenu: MenuItem) => {
        set((state: any) => {
          if (state.restaurant) {
            const updatedMenuList = state.restaurant.menus.map((menu: any) =>
              menu._id === updatedMenu._id ? updatedMenu : menu
            );
            return {
              restaurant: {
                ...state.restaurant,
                menus: updatedMenuList,
              },
            };
          }
          // if state.restaruant is undefined then return state
          return state;
        });
      },

      // search restaurant with filter and cuisine selection
      searchRestaurant: async (
        searchText: string,
        searchQuery: string,
        selectedCuisines: any
      ) => {
        try {
          set({ loading: true });

          const params = new URLSearchParams();
          params.set("searchQuery", searchQuery);
          params.set("selectedCuisines", selectedCuisines.join(","));

          // await new Promise((resolve) => setTimeout(resolve, 2000));
          const response = await axios.get(
            `${API_END_POINT}/search/${searchText}?${params.toString()}`
          );
          if (response.data.success) {
            // console.log(response.data);
            set({ loading: false, searchedRestaurant: response.data });
          }
        } catch (error) {
          set({ loading: false });
          console.log(error);
        }
      },

      // set applied filter to menu
      setAppliedFilter: (value: string) => {
        set((state) => {
          const updatedFilter = state.appliedFilter.includes(value)
            ? state.appliedFilter.filter((item) => item !== value)
            : [...state.appliedFilter, value];

          return { appliedFilter: updatedFilter };
        });
        // console.log("Updated Filters:", get().appliedFilter);
      },

      // reset applied filter to menu
      resetAppliedFilter: () => {
        set({ appliedFilter: [] });
      },

      // get single restaurant api implementation
      getSingleRestaurant: async (restaurantId: string) => {
        try {
          const response = await axios.get(
            `${API_END_POINT}/get-restaurant/${restaurantId}`
          );
          if (response.data.success) {
            set({ singleRestaurant: response.data.restaurant });
          }
        } catch (error) {}
      },

      // get restaurant orders api imlementation
      getRestaurantOrders: async () => {
        try {
          const response = await axios.get(`${API_END_POINT}/order`);
          if (response.data.success) {
            set({ restaurantOrder: response.data.orders });
          }
        } catch (error) {
          console.log(error);
        }
      },

      // update restaurant order api implementation
      updateRestaurantOrder: async (orderId: string, status: string) => {
        try {
          const response = await axios.put(
            `${API_END_POINT}/order/${orderId}/status`,
            { status },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            const updatedOrder = get().restaurantOrder.map((order: Orders) => {
              return order._id === orderId
                ? { ...order, status: response.data.status }
                : order;
            });
            set({ restaurantOrder: updatedOrder });
            toast.success(response.data.message);
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
        }
      },

      // delete single menu item from restaurant api implementation
      deleteMenuFromRestaurant: (menuId: string) => {
        set((state: any) => {
          if (state.restaurant) {
            const updatedMenuList = state.restaurant.menus.filter(
              (menu: any) => menu._id !== menuId
            );
            return {
              restaurant: {
                ...state.restaurant,
                menus: updatedMenuList,
              },
            };
          }
          return state;
        });
      },

      // delete all menu items from restaurant api implementation
      deleteAllMenuFromRestaurant: () => {
        set((state: any) => {
          if (state.restaurant) {
            return {
              restaurant: {
                ...state.restaurant,
                menus: [],
              },
            };
          }
          return state;
        });
      },
    }),
    {
      name: "restaurant-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
