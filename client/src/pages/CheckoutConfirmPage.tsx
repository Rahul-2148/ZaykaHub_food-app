import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckoutSessionRequest } from "@/types/orderType";
import { useCartStore } from "@/Zustand Store/useCartStore";
import { useOrderStore } from "@/Zustand Store/useOrderStore";
import { toast } from "sonner";
import { Loader2, MapPinHouse, ShieldCheck } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

const CheckoutConfirmPage = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
  });

  const { cart, restaurantId: cartRestaurantId } = useCartStore();
  const { createCheckoutSession, loading } = useOrderStore();
  const checkoutRestaurantId = cart[0]?.restaurantId || cartRestaurantId;
  const totalAmount = cart.reduce((acc, ele) => {
    return acc + ele.price * ele.quantity;
  }, 0);

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const checkoutHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // api implementation start from here
    try {
      const checkoutData: CheckoutSessionRequest = {
        cartItems: cart.map((cartItem) => ({
          menuId: cartItem._id,
          name: cartItem.name,
          image: cartItem.image,
          price: cartItem.price.toString(),
          quantity: cartItem.quantity.toString(),
        })),
        deliveryDetails: { ...input, contact: String(input.contact) },
        restaurantId: checkoutRestaurantId as string,
        totalAmount: cart.reduce((acc, ele) => {
          return acc + ele.price * ele.quantity;
        }, 0),
        orderedDate: new Date(),
      };

      if (!checkoutData.restaurantId) {
        toast.error("Restaurant not found for this cart. Please add items again from a restaurant page.");
        return;
      }
      await createCheckoutSession(checkoutData);
      console.log(checkoutData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[94vw] max-w-4xl lg:max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-orange-200 bg-white/95 p-0 shadow-2xl dark:border-orange-900 dark:bg-neutral-950">
        <div className="rounded-t-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-5 text-white">
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <MapPinHouse className="h-5 w-5" /> Update your address
          </DialogTitle>
          <DialogDescription className="mt-1 text-sm text-orange-50/90">
            Enter your delivery details before continuing to payment.
          </DialogDescription>
        </div>

        <div className="border-b border-orange-100 px-6 py-4 text-sm text-gray-600 dark:border-orange-950 dark:text-gray-300">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-orange-700 dark:bg-orange-950 dark:text-orange-200">
              <ShieldCheck className="h-4 w-4" /> Secure checkout
            </span>
            <span>
              You are ordering {cart.length} item{cart.length > 1 ? "s" : ""} from this cart.
            </span>
          </div>
        </div>

        <div className="grid gap-5 px-4 py-5 sm:px-5 lg:grid-cols-[1.5fr_0.9fr] lg:gap-5 lg:px-6 xl:px-8">
          <form onSubmit={checkoutHandler} className="grid grid-cols-1 gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-1">
                <Label>Fullname</Label>
                <Input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-2 sm:col-span-1">
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2 sm:col-span-1">
                <Label>Contact</Label>
                <Input
                  type="text"
                  name="contact"
                  value={input.contact}
                  onChange={changeEventHandler}
                  placeholder="Enter your contact number"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Address</Label>
                <Input
                  type="text"
                  name="address"
                  value={input.address}
                  onChange={changeEventHandler}
                  placeholder="Enter your address"
                />
              </div>
              <div className="space-y-2 sm:col-span-1">
                <Label>City</Label>
                <Input
                  type="text"
                  name="city"
                  value={input.city}
                  onChange={changeEventHandler}
                  placeholder="Enter your city"
                />
              </div>
              <div className="space-y-2 sm:col-span-1">
                <Label>Country</Label>
                <Input
                  type="text"
                  name="country"
                  value={input.country}
                  onChange={changeEventHandler}
                  placeholder="Enter your country"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Pin-Code</Label>
                <Input
                  type="text"
                  name="postalCode"
                  value={input.postalCode}
                  onChange={changeEventHandler}
                  placeholder="Enter your pin code"
                />
              </div>
            </div>

            <DialogFooter className="mt-2 border-t border-gray-200 pt-4 dark:border-gray-800">
              {loading ? (
                <Button
                  disabled
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white sm:w-auto"
                >
                  <Loader2 className="text-white mr-2 h-4 w-4 animate-spin" />{" "}
                  Please wait...
                </Button>
              ) : (
                <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 sm:w-auto">
                  Continue To Payment
                </Button>
              )}
            </DialogFooter>
          </form>

          <aside className="rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/60 md:self-start">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">
              Order Summary
            </h3>
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1 sm:max-h-72">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between gap-3 rounded-xl bg-white px-3 py-2 shadow-sm dark:bg-neutral-950"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Qty {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-orange-600">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-dashed border-gray-300 pt-4 dark:border-gray-700">
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>Items</span>
                <span>{cart.length}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-base font-bold text-gray-900 dark:text-white">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>
          </aside>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutConfirmPage;
