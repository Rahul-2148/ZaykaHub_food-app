import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import CheckoutConfirmPage from "./CheckoutConfirmPage";
import { useCartStore } from "@/Zustand Store/useCartStore";
import { CartItem } from "@/types/cartType";

const Cart = () => {
  const [open, setOpen] = useState<boolean>(false);
  const {
    cart,
    decrementQuantity,
    incrementQuantity,
    removeFromTheCart,
    clearCart,
  } = useCartStore();

  let totalAmount = cart.reduce((acc, ele) => {
    return acc + ele.price * ele.quantity;
  }, 0);

  // const [promoCode, setPromoCode] = useState<string>(""); // State for promo code
  // const [isPromoApplied, setIsPromoApplied] = useState<boolean>(false); // State for promo application

  // let subTotalAmount = isPromoApplied
  //   ? TotalAmount - TotalAmount * 0.15
  //   : TotalAmount; // Apply discount only if promo is applied

  // const applyPromoCode = () => {
  //   if (promoCode === "DISCOUNT15") {
  //     alert("Promocode applied");
  //     setIsPromoApplied(true);
  //   } else {
  //     alert("Invalid Promo Code");
  //   }
  // };

  return (
    <div className="flex flex-col max-w-7xl mx-auto my-10 px-4 md:mt-17">
      {/* Clear All Button */}
      <div className="flex justify-end">
        <Button onClick={clearCart} variant="link">
          Clear All
        </Button>
      </div>
      {/* Table on Large Screens */}
      <div className="hidden md:block overflow-x-auto">
        <Table className="mt-1 min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right">Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart.map((item: CartItem) => (
              <TableRow key={item._id} className="text-sm md:text-base">
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={item.image || "https://github.com/shadcn.png"}
                      alt={item.name}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <span className="text-yellow-600">₹</span>
                  {item.price}
                </TableCell>
                <TableCell>
                  <div className="w-fit flex items-center space-x-2 rounded-full border border-gray-200 dark:border-gray-700 shadow-md p-1">
                    <Button
                      onClick={() => decrementQuantity(item._id)}
                      size="icon"
                      variant="outline"
                      className="rounded-full hover:bg-gray-300 bg-gray-200 p-2"
                    >
                      <Minus className="w-4 h-4 dark:text-black" />
                    </Button>
                    <span className="font-bold px-3">{item.quantity}</span>
                    <Button
                      onClick={() => incrementQuantity(item._id)}
                      size="icon"
                      className="rounded-full bg-orange-500 hover:bg-orange-600 text-white p-2"
                      variant="outline"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-yellow-600">₹</span>
                  {item.price * item.quantity}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    onClick={() => removeFromTheCart(item._id)}
                    size="sm"
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="text-lg md:text-2xl font-bold">
              <TableCell colSpan={5}>Grand Total</TableCell>
              <TableCell className="text-right"><span className="text-yellow-600">₹</span> {totalAmount}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* Card View for Mobile */}
      <div className="md:hidden space-y-4">
        {cart.map((item: CartItem) => (
          <div
            key={item._id}
            className="border rounded-lg p-4 shadow-md bg-white flex flex-col space-y-3"
          >
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage
                  src={item.image || "https://github.com/shadcn.png"}
                  alt={item.name}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-lg text-gray-500"><span className="text-yellow-600">₹</span>{item.price}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => decrementQuantity(item._id)}
                  size="icon"
                  variant="outline"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="font-bold">{item.quantity}</span>
                <Button
                  onClick={() => incrementQuantity(item._id)}
                  size="icon"
                  variant="outline"
                  className="bg-orange-500 text-white"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <Button
                onClick={() => removeFromTheCart(item._id)}
                size="sm"
                className="bg-red-500 hover:bg-red-600"
              >
                Remove
              </Button>
            </div>
            <div className="flex justify-between font-semibold text-xl">
              <span>Total</span>
              <span><span className="text-yellow-600">₹</span>{item.price * item.quantity}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Grand Total for Mobile View */}
      {cart.length > 0 && (
        <div className="border-t border-gray-300 pt-4 mt-4 text-xl font-bold flex justify-between md:hidden lg:hidden xl:hidden">
          <span>Grand Total</span>
          <span><span className="text-yellow-600">₹</span> {totalAmount}</span>
        </div>
      )}

      {/* Promo Code Input */}
      {cart.length > 0 && (
        <div className="flex items-center space-x-4 my-4">
          <input
            type="text"
            // value={promoCode}
            // onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Enter Promo Code"
            className="border rounded-lg px-4 py-2 w-full"
          />
          <Button
            // onClick={applyPromoCode}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Apply
          </Button>
        </div>
      )}

      {/* Checkout Button */}
      {cart.length > 0 && (
        <div className="flex justify-end mt-5">
          <Button
            onClick={() => setOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl"
          >
            Proceed To Checkout
          </Button>
        </div>
      )}
      <CheckoutConfirmPage open={open} setOpen={setOpen} />
    </div>
  );
};

export default Cart;
