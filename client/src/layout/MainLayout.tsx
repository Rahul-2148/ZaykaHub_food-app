import { Outlet, useLocation } from "react-router-dom";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";
import BackToTop from "@/pages/TopToBottom";
// import GoogleTranslate from "@/pages/otherPages/GoogleTranslate";

const MainLayout = () => {
  const location = useLocation(); // Get the current route

  // Hide Navbar & Footer on login & signup pages
  const hideHeaderFooter = ["/login", "/signup", "/forgot-password", "/reset-password", "/verify-email"].includes(location.pathname);

  return (
    <div className="app-shell flex min-h-screen flex-col overflow-x-hidden">
      {/* Navbar (Only show if not on upper pages i given) */}
      {!hideHeaderFooter && (
        <header>
          <Navbar />
        </header>
      )}

      {/* Main Content */}
      <main className={`flex-1 ${hideHeaderFooter ? "" : "pt-16 md:pt-20"}`}>
        <Outlet />
      </main>

      {/* <GoogleTranslate /> */}

      <BackToTop />

      {/* Footer (Only show if not on upper pages i given) */}
      {!hideHeaderFooter && (
        <footer>
          <Footer />
        </footer>
      )}
        <Chatbot />
    </div>
  );
};

export default MainLayout;
