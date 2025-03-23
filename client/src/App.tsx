import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/VerifyEmail";
import HeroSection from "./components/HeroSection";
import MainLayout from "./layout/MainLayout";
import About from "./pages/otherPages/About";
import Profile from "./pages/Profile";
import SearchPage from "./pages/SearchPage";
import RestaurantDetails from "./pages/RestaurantDetails";
import Cart from "./pages/Cart";
import Restaurant from "./pages/admin/Restaurant";
import AddMenu from "./pages/admin/AddMenu";
import NotFound from "./components/NotFound";
import Orders from "./pages/admin/Orders";
import Users from "./pages/admin/Users";
import CancelDeletion from "./pages/CancelDeletion";
import { useUserStore } from "./Zustand Store/useUserStore";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import Loading from "./components/Loading";
import { useThemeStore } from "./Zustand Store/useThemeStore";
import Contact from "./pages/otherPages/Contact";
import BlogPage from "./pages/otherPages/Blogs";
import SuccessOrder from "./pages/SuccessOrder";
import TermsAndConditions from "./pages/Terms";
import LanguageSelector from "./pages/otherPages/LanguageSelector";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated && user?.isVerified === false) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (isAuthenticated && user?.isVerified === true) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user?.admin) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/",
        element: <HeroSection />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/search/:text",
        element: <SearchPage />,
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantDetails />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/status",
        element: <SuccessOrder />,
      },
      {
        path: "/cancel-deletion",
        element: <CancelDeletion />,
      },
      // other routes
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/blogs",
        element: <BlogPage />,
      },

      // Admin services routes start here
      {
        path: "/admin/restaurant",
        element: (
          <AdminRoute>
            <Restaurant />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/menu",
        element: (
          <AdminRoute>
            <AddMenu />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/orders",
        element: (
          <AdminRoute>
            <Orders />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/users",
        element: (
          <AdminRoute>
            <Users />
          </AdminRoute>
        ),
      },
    ],
  },

  // Auth routes
  {
    path: "/login",
    element: (
      <AuthenticatedUser>
        <Login />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthenticatedUser>
        <Signup />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <AuthenticatedUser>
        <ForgotPassword />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
  {
    path: "/verify-email",
    element: (
      <AuthenticatedUser>
        <VerifyEmail />
      </AuthenticatedUser>
    ),
  },

  // Not found route
  {
    path: "*",
    element: <NotFound />,
  },

    // ✅ Public Routes (Accessible without authentication)
    {
      path: "/terms",
      element: <TermsAndConditions />, // ✅ Now it's a public page
    },
    {
      path: "/language",
      element:<LanguageSelector />

    }
]);

function App() {
  const initializeTheme = useThemeStore((state: any) => state.initializeTheme);
  const { checkAuthentication, isCheckingAuth } = useUserStore();
  // checking auth every time when page is loaded
  useEffect(() => {
    checkAuthentication();
    initializeTheme();
  }, [checkAuthentication]);

  if (isCheckingAuth) return <Loading />;
  return (
    <main>
      {/* <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme"> */}
      <RouterProvider router={appRouter}></RouterProvider>
      {/* </ThemeProvider> */}
    </main>
  );
}

export default App;
