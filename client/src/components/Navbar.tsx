import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  Globe,
  HandPlatter,
  Loader2,
  Menu,
  Moon,
  PackageCheck,
  ShoppingCart,
  SquareMenu,
  Sun,
  User,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
// import { useTheme } from "@/components/theme-provider";
import { useUserStore } from "@/Zustand Store/useUserStore";
import { useThemeStore } from "@/Zustand Store/useThemeStore";
import { useCartStore } from "@/Zustand Store/useCartStore";

const navLinkBaseClass = "rounded-full px-3 py-1.5 text-sm font-semibold transition-all duration-200";
const actionButtonClass = "navbar-action-chip navbar-theme-toggle h-9 w-9 transition hover:translate-y-[-0.5px]";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/blogs", label: "Blogs" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const { user, loading, logout, isAuthenticated } = useUserStore();
  const { cart } = useCartStore();
  const { setTheme } = useThemeStore();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout(); // api call to logout
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className={`navbar-shell ${isScrolled ? "navbar-shell-scrolled" : ""}`} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <div className={`navbar-glass-panel ${isScrolled ? "navbar-glass-panel-scrolled" : ""}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-6">
          <div className={`navbar-grid ${isScrolled ? "navbar-grid-scrolled" : ""}`}>
            <Link to="/" className="group flex items-center gap-2.5 pr-1.5 lg:pr-2.5">
              <div className="navbar-brand-mark text-[0.72rem] font-black navbar-foreground transition-transform duration-200 group-hover:scale-105">
                ZH
              </div>
              <div className="leading-tight navbar-foreground">
                <h1 className="text-[1rem] font-extrabold tracking-[0.02em] md:text-[1.05rem]">
                  Zayka<span className="navbar-brand-accent">Hub</span>
                </h1>
                <p className="hidden text-xs navbar-muted sm:block">Taste that feels premium</p>
              </div>
            </Link>
            <nav className="hidden min-w-0 lg:flex items-center justify-center gap-1.5">
              {navItems.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`${navLinkBaseClass} navbar-link ${
                      isActive
                        ? "bg-white/10 navbar-foreground shadow-sm ring-1 ring-white/10"
                        : "navbar-muted hover:bg-white/8 hover:text-[color:var(--navbar-foreground)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden md:flex navbar-action-cluster justify-self-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className={actionButtonClass}>
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 navbar-foreground" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 navbar-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

                <Link to="/cart" className="navbar-action-chip relative h-10 w-10 cursor-pointer">
                <ShoppingCart className="h-6 w-6 navbar-foreground" />
                {cartCount > 0 && (
                  <Button
                    size={"icon"}
                    className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full border-2 text-[10px]"
                    style={{ borderColor: '#0f172a', backgroundColor: '#8b5cf6', color: 'white' }}
                  >
                    {cartCount}
                  </Button>
                )}
              </Link>

              {loading ? (
                <Button className="navbar-primary-button" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
                </Button>
              ) : isAuthenticated && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <button className="navbar-action-chip flex items-center gap-2.5 px-2 py-1 text-left">
                        <Avatar className="size-8 ring-2 ring-white/20">
                        <AvatarImage
                          src={
                            (user && user.profilePicture) ||
                            "https://github.com/shadcn.png"
                          }
                          alt="User"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                        <div className="hidden xl:block pr-1">
                        <p className="text-xs navbar-muted">Profile</p>
                        <p className="max-w-20 truncate text-sm font-semibold navbar-foreground">
                          {user.fullname}
                        </p>
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-semibold">{user.fullname}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      <User className="mr-2 h-4 w-4" /> Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/order/status")}>
                      <HandPlatter className="mr-2 h-4 w-4" /> Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/cart")}>
                      <ShoppingCart className="mr-2 h-4 w-4" /> Cart
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/language")}>
                      <Globe className="mr-2 h-4 w-4" /> Language
                    </DropdownMenuItem>
                    {user.admin && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
                          Admin tools
                        </DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigate("/admin/restaurant")}>
                          <UtensilsCrossed className="mr-2 h-4 w-4" /> Restaurant <span className="ml-auto text-[10px] uppercase tracking-[0.2em] text-amber-600">Admin</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate("/admin/menu")}>
                          <SquareMenu className="mr-2 h-4 w-4" /> Menu <span className="ml-auto text-[10px] uppercase tracking-[0.2em] text-amber-600">Admin</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate("/admin/orders")}>
                          <HandPlatter className="mr-2 h-4 w-4" /> Orders <span className="ml-auto text-[10px] uppercase tracking-[0.2em] text-amber-600">Admin</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate("/admin/users")}>
                          <Users className="mr-2 h-4 w-4" /> Users <span className="ml-auto text-[10px] uppercase tracking-[0.2em] text-amber-600">Admin</span>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={() => navigate("/login")} className="navbar-primary-button" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}>
                  Login
                </Button>
              )}
            </div>

            {/* Mobile Responsive */}
            <div className="md:hidden lg:hidden xl:hidden justify-self-end">
              <MobileNavbar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  // const { setTheme } = useTheme();
  const { user, logout, loading, isAuthenticated } = useUserStore();
  const { cart } = useCartStore();
  const { setTheme } = useThemeStore();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // api call to logout
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="navbar-mobile-trigger p-0">
          <Menu size={"18"} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-5 bg-background/95 sm:max-w-sm">
          <SheetHeader className="mt-4 gap-4">
              <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-muted/40 px-4 py-3">
            <div>
              <SheetTitle className="text-xl font-extrabold tracking-tight">
                Zayka<span style={{ color: 'var(--color-accent)' }}>Hub</span>
              </SheetTitle>
              <SheetDescription className="text-sm">Luxury & Comfort with Every Stay</SheetDescription>
            </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </SheetHeader>
        <Separator />
        <SheetDescription className="flex-1 space-y-1">
          <Link to="/" className="flex items-center gap-3 rounded-xl px-3 py-3 font-medium transition hover:bg-muted" style={{ color: 'var(--color-sidebar-foreground)' }}>
            <User className="h-4 w-4" />
            <span>Home</span>
          </Link>

          <Link to="/profile" className="flex items-center gap-3 rounded-xl px-3 py-3 font-medium transition hover:bg-muted" style={{ color: 'var(--color-sidebar-foreground)' }}>
            <User className="h-4 w-4" />
            <span>Profile</span>
          </Link>

          <Link to="/order/status" className="flex items-center gap-3 rounded-xl px-3 py-3 font-medium transition hover:bg-muted" style={{ color: 'var(--color-sidebar-foreground)' }}>
            <HandPlatter className="h-4 w-4" />
            <span>Order</span>
          </Link>

          <Link to="/cart" className="flex items-center gap-3 rounded-xl px-3 py-3 font-medium transition hover:bg-muted" style={{ color: 'var(--color-sidebar-foreground)' }}>
            <ShoppingCart className="h-4 w-4" />
            <span>{cartCount}</span>
          </Link>

          {user?.admin && (
            <div className="mt-4 rounded-2xl border border-amber-200/60 bg-amber-50/80 p-3 dark:border-amber-900/40 dark:bg-amber-950/35">
              <div className="mb-2 flex items-center justify-between px-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">
                <span>Admin tools</span>
                <span>Restricted</span>
              </div>
              <div className="space-y-1">
                <Link to="/admin/menu" className="flex items-center gap-3 rounded-xl px-3 py-3 font-medium transition hover:bg-white/70 dark:hover:bg-white/5" style={{ color: 'var(--color-sidebar-foreground)' }}>
                  <SquareMenu className="h-4 w-4" />
                  <span>Menu</span>
                  <span className="ml-auto text-[10px] uppercase tracking-[0.2em] text-amber-600 dark:text-amber-300">Admin</span>
                </Link>

                <Link to="/admin/restaurant" className="flex items-center gap-3 rounded-xl px-3 py-3 font-medium transition hover:bg-white/70 dark:hover:bg-white/5" style={{ color: 'var(--color-sidebar-foreground)' }}>
                  <UtensilsCrossed className="h-4 w-4" />
                  <span>Restaurant</span>
                  <span className="ml-auto text-[10px] uppercase tracking-[0.2em] text-amber-600 dark:text-amber-300">Admin</span>
                </Link>

                <Link to="/admin/orders" className="flex items-center gap-3 rounded-xl px-3 py-3 font-medium transition hover:bg-white/70 dark:hover:bg-white/5" style={{ color: 'var(--color-sidebar-foreground)' }}>
                  <HandPlatter className="h-4 w-4" />
                  <span>Orders</span>
                  <span className="ml-auto text-[10px] uppercase tracking-[0.2em] text-amber-600 dark:text-amber-300">Admin</span>
                </Link>

                <Link to="/admin/users" className="flex items-center gap-3 rounded-xl px-3 py-3 font-medium transition hover:bg-white/70 dark:hover:bg-white/5" style={{ color: 'var(--color-sidebar-foreground)' }}>
                  <Users className="h-4 w-4" />
                  <span>Users</span>
                  <span className="ml-auto text-[10px] uppercase tracking-[0.2em] text-amber-600 dark:text-amber-300">Admin</span>
                </Link>
              </div>
            </div>
          )}
        </SheetDescription>
        <SheetFooter className="mt-auto flex flex-col gap-3">
          <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-muted/40 px-3 py-3">
            <Avatar className="size-11">
              <AvatarImage
                src={
                  (user && user.profilePicture) ||
                  "https://github.com/shadcn.png"
                }
                alt="User"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{user && user.fullname ? user.fullname : "Guest user"}</p>
              <p className="truncate text-xs text-muted-foreground">{user && user.email ? user.email : "Sign in to manage your account"}</p>
            </div>
          </div>

          {!isAuthenticated ? (
            <SheetClose asChild>
              {loading ? (
                <Button className="navbar-primary-button w-full" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}>
                  <Loader2 className="text-white mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </Button>
              ) : (
                <Button onClick={() => navigate("/login")} className="navbar-primary-button w-full" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}>
                  Login
                </Button>
              )}
            </SheetClose>
          ) : (
            <Button onClick={handleLogout} className="navbar-primary-button w-full bg-red-500 hover:bg-red-600">
              Logout
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
