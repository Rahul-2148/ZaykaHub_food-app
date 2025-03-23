import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { LoginInputState, SignupInputState } from "@/zod schema/userSchema";
import { toast } from "sonner";

const API_END_POINT = "http://localhost:8000/api/v1/user";
axios.defaults.withCredentials = true;

export type User = {
  _id: number;
  fullname: string;
  email: string;
  contact: number;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  profilePicture: string;
  admin: boolean;
  isVerified: boolean;
  lastLogin: Date;
  lastUpdated: Date;
};

type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  loading: boolean;
  users: User[]; // ✅ Ensure users array exists
  signup: (input: SignupInputState) => Promise<void>;
  login: (input: LoginInputState) => Promise<void>;
  verifyEmail: (verificationCode: string) => Promise<void>;
  checkAuthentication: () => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateProfile: (input: any) => Promise<void>;
  getAllUsers: () => Promise<User[]>; // ✅ Return an array
  searchUsers: (query: string) => Promise<User[]>; // ✅ Return an array
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      loading: false,
      users: [],
      // resetUserState: () => set({ user: null, loading: false }),

      // signup api implementation
      signup: async (input: SignupInputState) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/signup`, input, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.data.success) {
            console.log(response.data);
            toast.success(response.data.message);
            set({
              loading: false,
              user: response.data.user,
              isAuthenticated: true,
            });
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }
      },

      // login api implementation
      login: async (input: LoginInputState) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/login`, input, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.data.success) {
            console.log(response.data);
            toast.success(response.data.message);
            set({
              loading: false,
              user: response.data.user,
              isAuthenticated: true,
            });
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }
      },

      // get all users
      getAllUsers: async () => {
        try {
          const response = await axios.get(`${API_END_POINT}/all-users`);
          if (response.data.success) {
            console.log(response.data.users);
            set({ users: response.data.users });
            return response.data.users;
          }
        } catch (error) {
          console.error("Error fetching users:", error);
          return []; // ✅ Always return an array
        }
      },

      // Search users
      searchUsers: async (query: string) => {
        try {
          set({ loading: true });
          const response = await axios.get(
            `${API_END_POINT}/search?query=${query}`
          );
          if (response.data) {
            set({ users: response.data });
            return response.data;
          }
        } catch (error) {
          console.error("Error searching users:", error);
          return [];
        } finally {
          set({ loading: false });
        }
      },

      // verify email api implementation
      verifyEmail: async (verificationCode: string) => {
        try {
          const formattedToken = verificationCode.replace(/\s+/g, ""); // ✅ Spaces remove karne ke liye
          // console.log("🔍 Formatted Verification Code:", formattedToken);

          set({ loading: true });

          const response = await axios.post(
            `${API_END_POINT}/verify-email`,
            { verificationCode: formattedToken },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data.success) {
            console.log("Verification Success:", response.data);
            toast.success(response.data.message);
            set({
              loading: false,
              user: response.data.user,
              isAuthenticated: true,
            });
          }
        } catch (error: any) {
          console.error("Verification Error:", error.response?.data);
          toast.error(error.response?.data?.message || "Verification failed");
          set({ loading: false });
        }
      },

      // check authentication api implementation
      checkAuthentication: async () => {
        try {
          set({ isCheckingAuth: true });
          const response = await axios.get(`${API_END_POINT}/check-auth`);
          if (response.data.success) {
            set({
              user: response.data.user,
              isAuthenticated: true,
              isCheckingAuth: false,
            });
            // console.log("User authenticated:", response.data.user);
          }
        } catch (error) {
          set({ isAuthenticated: false, isCheckingAuth: false });
          // console.log("User is not authenticated");
        }
      },

      // logout api implementation
      logout: async () => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/logout`);
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, user: null, isAuthenticated: false });
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
          console.log(error);
        }
      },

      // forgot password api implementation
      forgotPassword: async (email: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/forgot-password`,
            { email }
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

      // reset password api implementation
      resetPassword: async (token: string, newPassword: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/reset-password/${token}`,
            { newPassword }
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

      // update profile api implementation
      updateProfile: async (input: any) => {
        try {
          const response = await axios.patch(
            `${API_END_POINT}/profile/update`,
            input,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({ user: response.data.user, isAuthenticated: true });
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }
      },
    }),
    {
      /* The code snippet `name: 'user-name', storage: createJSONStorage(() => localStorage)` is
        configuring the persistence settings for the user store using the `persist` middleware
        provided by Zustand library. */
      name: "user-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
