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
import { useRestaurantStore } from "@/Zustand Store/useRestaurantStore";
import { useUserStore } from "@/Zustand Store/useUserStore";
import { Loader2 } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

const CheckoutConfirmPage = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user } = useUserStore();

  const [input, setInput] = useState({
    name: user?.fullname || "",
    email: user?.email || "",
    contact: user?.contact.toString() || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
    postalCode: user?.postalCode || "",
  });

  const { cart } = useCartStore();
  const { restaurant } = useRestaurantStore();
  const { createCheckoutSession, loading } = useOrderStore();

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
        restaurantId: restaurant?._id as string,
        totalAmount: cart.reduce((acc, ele) => {
          return acc + ele.price * ele.quantity;
        }, 0),
        orderedDate: new Date(),
      };
      await createCheckoutSession(checkoutData);
      console.log(checkoutData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle className="font-bold">Review Your Order</DialogTitle>
        <DialogDescription className="text-xs">
          Double-check your delivery details and ensure everything is in order.
          When you are ready, hit confirm button to finalize your order.
        </DialogDescription>
        <form
          onSubmit={checkoutHandler}
          className="md:grid grid-cols-2 gap-2 space-y-1 md:space-y-0"
        >
          <div>
            <Label>Fullname</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              disabled
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Contact</Label>
            <Input
              type="text"
              name="contact"
              value={input.contact}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Address</Label>
            <Input
              type="text"
              name="address"
              value={input.address}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>City</Label>
            <Input
              type="text"
              name="city"
              value={input.city}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Country</Label>
            <Input
              type="text"
              name="country"
              value={input.country}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Pin-Code</Label>
            <Input
              type="text"
              name="postalCode"
              value={input.postalCode}
              onChange={changeEventHandler}
            />
          </div>
          <DialogFooter className="col-span-2 pt-5">
            {loading ? (
              <Button
                disabled
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Loader2 className="text-white mr-2 h-4 w-4 animate-spin" />{" "}
                Please wait...
              </Button>
            ) : (
              <Button className="bg-orange-500 hover:bg-orange-600">
                Continue To Payment
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutConfirmPage;
