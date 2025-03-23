import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useRestaurantStore } from "./useRestaurantStore";

const API_END_POINT = "http://localhost:8000/api/v1/menu";
axios.defaults.withCredentials = true;

type MenuState = {
  loading: boolean;
  menu: null;
  resetMenuState: () => void;
  createMenu: (formData: FormData) => Promise<void>;
  editMenu: (menuId: string, formData: FormData) => Promise<void>;
  deleteMenu: (menuId: string) => Promise<void>;
  deleteAllMenus: () => Promise<void>;
};

export const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      loading: false,
      menu: null,
      resetMenuState: () => set({ menu: null, loading: false }),

      // create menu api implementation
      createMenu: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/add-menu`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, menu: response.data.menu });
          }
          // update restaurant
          useRestaurantStore.getState().addMenuToRestaurant(response.data.menu);
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }
      },

      // edit menu api implementation
      editMenu: async (menuId:string,formData: FormData) => {
        try {
            set({ loading: true });
            const response = await axios.put(`${API_END_POINT}/${menuId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if(response.data.success){
             toast.success(response.data.message);
             set({loading:false, menu:response.data.menu});
            }
            // update restaurant menu
            useRestaurantStore.getState().updateMenuToRestaurant(response.data.menu);
        } catch (error: any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },

      // delete single menu api implementation
      deleteMenu: async (menuId: string) => {
        try {
          set({ loading: true });
          const response = await axios.delete(
            `${API_END_POINT}/delete-menu/${menuId}`
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, menu: null });
          }
          // update restaurant menu
          useRestaurantStore.getState().deleteMenuFromRestaurant(menuId);
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }
      },

      // delete all menu api implementation
      deleteAllMenus: async () => {
        try {
          set({ loading: true });
          const response = await axios.delete(`${API_END_POINT}/delete/menus`);
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, menu: null });
          }
          // update restaurant menu
          useRestaurantStore.getState().deleteAllMenuFromRestaurant();
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }
      },
    }),
    {
      name: "menu-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
