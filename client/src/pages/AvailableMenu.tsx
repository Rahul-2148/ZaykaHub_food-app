import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MenuItem } from "@/types/restaurantType";
import { useCartStore } from "@/Zustand Store/useCartStore";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AvailableMenu = ({ menus }: { menus: MenuItem[] }) => {
  const { addToCart } = useCartStore();
  // const navigateTo = useNavigate();
  const [loading] = useState<boolean>(false);
  return (
    <div className="md:p-4">
      <h1 className="text-xl md:text-2xl font-extrabold mb-6">
        Available Menu's
      </h1>
      {/* Menu items */}
      {loading ? (
        <AvailableMenuSkeleton menus={menus} />
      ) : (
        <div className="grid md:grid-cols-3 space-y-4 md:space-y-0">
          {menus.map((menu: MenuItem) => (
            <Card className="max-w-xs shadow-lg rounded-lg overflow-hidden">
              <img src={menu.image} alt={menu.name} className="w-full h-50" />
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {menu.name}
                </h2>
                <p className="text-sm text-gray-600 mt-2">{menu.description}</p>
                <h3 className="text-lg font-semibold mt-4">
                  Price: <span className="text-[#fe7b00]">₹{menu.price}</span>
                </h3>
              </CardContent>
              <CardFooter className="p-4">
                <Button
                  onClick={() => {
                    addToCart(menu);
                    // navigateTo("/Cart");
                    toast.success(`${menu.name} added to cart`);
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-black dark:text-white w-full"
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableMenu;

// Skeleton Loader
const AvailableMenuSkeleton = ({ menus }: { menus: MenuItem[] }) => {
  return (
    <div className="grid md:grid-cols-3 gap-6 p-4">
      {menus.map((menu: MenuItem) => (
        <Card
          key={menu._id}
          className="w-full mx-auto shadow-lg rounded-lg overflow-hidden"
        >
          <Skeleton className="w-full h-40 rounded-lg" />
          <CardContent className="p-4">
            <Skeleton className="h-6 w-3/4 mb-4 rounded-lg" />
            <Skeleton className="h-4 w-full mb-3 rounded-lg" />
            <Skeleton className="h-4 w-5/6 mb-3 rounded-lg" />
            <Skeleton className="h-4 w-4/6 mb-3 rounded-lg" />
            <Skeleton className="h-5 w-1/3 mt-4 rounded-lg" />
            <Skeleton className="h-4 w-1/4 mt-2 rounded-lg" />
          </CardContent>
          <CardFooter className="p-4">
            <Skeleton className="h-12 w-full rounded-lg" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
