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

const Navbar = () => {
  const { user, loading, logout } = useUserStore();
  const { cart } = useCartStore();
  const { setTheme } = useThemeStore();

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
    <div className="md:fixed md:top-0 md:left-0 md:w-full md:z-50 md:shadow-md">
      <div className="flowing-water-gradient">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="text-2xl font-bold">
              <h1 className="text-2xl font-bold md:font-extrabold ml-6">
                Zayka<span className="text-orange-600">Hub</span>
              </h1>
            </Link>
            <div className="hidden md:flex items-center gap-10 mr-4">
              <div className="hidden md:flex items-center gap-6 mr-20">
                <Link
                  to="/"
                  className="hover:text-red-500 dark:hover:text-indigo-600"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="hover:text-red-500 dark:hover:text-indigo-600"
                >
                  About
                </Link>
                <Link
                  to="/blogs"
                  className="hover:text-red-500 dark:hover:text-indigo-600"
                >
                  Blogs
                </Link>
                <Link
                  to="/contact"
                  className="hover:text-red-500 dark:hover:text-indigo-6000"
                >
                  Contact
                </Link>
                <Link
                  to="/profile"
                  className="hover:text-red-500 dark:hover:text-indigo-600"
                >
                  Profile
                </Link>
                <Link
                  to="/order/status"
                  className="hover:text-red-500 dark:hover:text-indigo-600"
                >
                  Order
                </Link>

                {user?.admin && (
                  <Menubar>
                    <MenubarMenu>
                      <MenubarTrigger className="bg-gray-200 dark:bg-gray-800">
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
                  className="flex items-center space-x-2 hover:scale-110 hover:shadow-lg transition-transform duration-200"
                >
                  <Globe className="w-6 h-6" />
                </button>
              </div>

              <div className="flex items-center gap-6">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
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
                  {cart.length > 0 && (
                    <Button
                      size={"icon"}
                      className="absolute -inset-y-3 left-2.5 text-xs rounded-full h-4 w-4 bg-red-500 hover:bg-red-500"
                    >
                      {cart.length}
                    </Button>
                  )}
                </Link>

                <Avatar className="size-10 cursor-pointer">
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
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <Loader2 className="text-white mr-2 h-4 w-4 animate-spin" />{" "}
                    Please wait...
                  </Button>
                ) : (
                  <Button
                    onClick={handleLogout}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    Logout
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
  const { user, logout, loading } = useUserStore();
  const { cart } = useCartStore();
  const { setTheme } = useThemeStore();
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
            Zayka<span className="text-orange-600">Hub</span>
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
          <Link
            to="/"
            className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 hover:text-gray-900 font-medium"
          >
            <User className="mr-2" />
            <span>Home</span>
          </Link>

          <Link
            to="/profile"
            className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 hover:text-gray-900 font-medium"
          >
            <User className="mr-2" />
            <span>Profile</span>
          </Link>

          <Link
            to="/order/status"
            className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 hover:text-gray-900 font-medium"
          >
            <HandPlatter className="mr-2" />
            <span>Order</span>
          </Link>

          <Link
            to="/cart"
            className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 hover:text-gray-900 font-medium"
          >
            <ShoppingCart className="mr-2" />
            <span>{cart.length}</span>
          </Link>

          {user?.admin && (
            <>
              <Link
                to="/admin/menu"
                className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 hover:text-gray-900 font-medium"
              >
                <SquareMenu className="mr-2" />
                <span>Menu</span>
              </Link>

              <Link
                to="/admin/restaurant"
                className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 hover:text-gray-900 font-medium"
              >
                <UtensilsCrossed className="mr-2" />
                <span>Restaurant</span>
              </Link>

              <Link
                to="/admin/orders"
                className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 hover:text-gray-900 font-medium"
              >
                <PackageCheck className="mr-2" />
                <span>Restaurant Orders</span>
              </Link>

              <Link
                to="/admin/users"
                className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 hover:text-gray-900 font-medium"
              >
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
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Loader2 className="text-white mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </Button>
            ) : (
              <Button
                onClick={handleLogout}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Logout
              </Button>
            )}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
