import { Link, useNavigate } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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

const navLinkClass = "rounded-full px-4 py-2 text-sm font-semibold text-white/90 transition-all duration-200 hover:bg-white/10 hover:text-white";

const Navbar = () => {
  const { user, loading, logout, isAuthenticated } = useUserStore();
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
    <div className="flowing-water-gradient header-ambient star-sky" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60, borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'white', boxShadow: '0 8px 24px rgba(6,8,20,0.45)' }}>
      <div className="header-glass" style={{ position: 'relative', zIndex: 1, paddingTop: 4, paddingBottom: 4 }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="group flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-black transition-transform duration-200 group-hover:scale-105" style={{ backgroundColor: 'rgba(255,255,255,0.16)', color: 'white', border: '1px solid rgba(255,255,255,0.20)' }}>
                ZH
              </div>
              <div className="leading-tight" style={{ color: 'white' }}>
                <h1 className="text-lg font-extrabold tracking-tight md:text-xl">
                  Zayka<span style={{ color: '#c4b5fd' }}>Hub</span>
                </h1>
                <p className="text-xs text-white/75">Taste that feels premium</p>
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-4">
              <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 lg:flex">
                <Link to="/" className={navLinkClass}>Home</Link>
                <Link to="/about" className={navLinkClass}>About</Link>
                <Link to="/blogs" className={navLinkClass}>Blogs</Link>
                <Link to="/contact" className={navLinkClass}>Contact</Link>
                <Link to="/profile" className={navLinkClass}>Profile</Link>
                <Link to="/order/status" className={navLinkClass}>Order</Link>

                {user?.admin && (
                  <Menubar>
                    <MenubarMenu>
                      <MenubarTrigger className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-white hover:bg-white/15">
                        Dashboard
                      </MenubarTrigger>
                      <MenubarContent>
                        <Link to="/admin/restaurant">
                          <MenubarItem>
                            <UtensilsCrossed /> <span>Restaurant</span>
                          </MenubarItem>
                        </Link>
                        <Link to="/admin/menu">
                          <MenubarItem>
                            <SquareMenu /> <span>Menu</span>
                          </MenubarItem>
                        </Link>
                        <Link to="/admin/orders">
                          <MenubarItem>
                            <HandPlatter /> <span>Orders</span>
                          </MenubarItem>
                        </Link>
                        <Link to="/admin/users">
                          <MenubarItem>
                            <Users /> <span>Users</span>
                          </MenubarItem>
                        </Link>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                )}
              </div>

              <div>
                <button
                  onClick={() => navigate("/language")}
                  className="flex items-center space-x-2 rounded-full px-3 py-2 transition-transform duration-200 hover:scale-105"
                  style={{ border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }}
                >
                  <Globe className="w-6 h-6" />
                </button>
              </div>

              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="border-white/15 bg-white/10 text-white hover:bg-white/15 hover:text-white">
                      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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

                <Link to="/cart" className="relative cursor-pointer">
                  <ShoppingCart className="h-6 w-6 text-white" />
                  {cartCount > 0 && (
                    <Button
                      size={"icon"}
                      className="absolute -inset-y-3 left-2.5 h-5 w-5 rounded-full border-2 text-[10px]"
                      style={{ borderColor: '#0f172a', backgroundColor: '#8b5cf6', color: 'white' }}
                    >
                      {cartCount}
                    </Button>
                  )}
                </Link>

                <Avatar className="size-10 cursor-pointer ring-2 ring-white/20">
                  <AvatarImage
                    src={
                      (user && user.profilePicture) ||
                      "https://github.com/shadcn.png"
                    }
                    alt="User"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                {loading ? (
                  <Button className="px-4 py-2 rounded-md" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
                  </Button>
                ) : isAuthenticated && user ? (
                  <Button onClick={handleLogout} className="px-4 py-2 rounded-md" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}>
                    Logout
                  </Button>
                ) : (
                  <Button onClick={() => navigate("/login")} className="px-4 py-2 rounded-md" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}>
                    Login
                  </Button>
                )}
              </div>
            </div>

            {/* Mobile Responsive */}
            <div className="md:hidden lg:hidden xl:hidden">
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
        <Button className="mr-6 rounded-full bg-gray-200 hover:bg-gray-500 text-black p-3">
          <Menu size={"18"} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
          <SheetHeader className="flex flex-row items-center justify-between mt-6">
          <SheetTitle>
            Zayka<span style={{ color: 'var(--color-accent)' }}>Hub</span>
          </SheetTitle>
          <SheetDescription>Luxury & Comfort with Every Stay</SheetDescription>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="w-12">
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
        </SheetHeader>
        <Separator className="" />
        <SheetDescription className="flex-1">
          <Link to="/" className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer font-medium" style={{ color: 'var(--color-sidebar-foreground)' }}>
            <User className="mr-2" />
            <span>Home</span>
          </Link>

          <Link to="/profile" className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer font-medium" style={{ color: 'var(--color-sidebar-foreground)' }}>
            <User className="mr-2" />
            <span>Profile</span>
          </Link>

          <Link to="/order/status" className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer font-medium" style={{ color: 'var(--color-sidebar-foreground)' }}>
            <HandPlatter className="mr-2" />
            <span>Order</span>
          </Link>

          <Link to="/cart" className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer font-medium" style={{ color: 'var(--color-sidebar-foreground)' }}>
            <ShoppingCart className="mr-2" />
            <span>{cartCount}</span>
          </Link>

          {user?.admin && (
            <>
              <Link to="/admin/menu" className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer font-medium" style={{ color: 'var(--color-sidebar-foreground)' }}>
                <SquareMenu className="mr-2" />
                <span>Menu</span>
              </Link>

              <Link to="/admin/restaurant" className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer font-medium" style={{ color: 'var(--color-sidebar-foreground)' }}>
                <UtensilsCrossed className="mr-2" />
                <span>Restaurant</span>
              </Link>

              <Link to="/admin/orders" className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer font-medium" style={{ color: 'var(--color-sidebar-foreground)' }}>
                <PackageCheck className="mr-2" />
                <span>Restaurant Orders</span>
              </Link>

              <Link to="/admin/users" className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer font-medium" style={{ color: 'var(--color-sidebar-foreground)' }}>
                <Users className="mr-2" />
                <span>Users</span>
              </Link>
            </>
          )}
        </SheetDescription>
        <SheetFooter className="flex flex-col gap-4">
          <>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage
                    src={
                      (user && user.profilePicture) ||
                      "https://github.com/shadcn.png"
                    }
                    alt="User"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className="font-bold">{user && user.fullname}</h1>
              </div>

              <div>
                <button
                  onClick={() => navigate("/language")}
                  className="flex items-center space-x-2 hover:scale-110 hover:shadow-lg transition-transform duration-200"
                >
                  <Globe className="w-6 h-6" />
                </button>
              </div>
            </div>
          </>
          <SheetClose asChild>
            {loading ? (
                  <Button className="rounded-full bg-orange-500 hover:bg-orange-600">
                <Loader2 className="text-white mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </Button>
            ) : isAuthenticated && user ? (
              <Button
                onClick={handleLogout}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Logout
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Login
              </Button>
            )}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
