import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  restaurantFormSchema,
  RestaurantFormSchema,
} from "@/zod schema/restaurantSchema";
import { useRestaurantStore } from "@/Zustand Store/useRestaurantStore";
import { useUserStore } from "@/Zustand Store/useUserStore";
import { Loader2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

const Restaurant = () => {
  const [input, setInput] = useState<RestaurantFormSchema>({
    restaurantName: "",
    city: "",
    address: "",
    email: "rahulrajmodi24523@gmail.com",
    phone: "9973162148",
    openingHours: "",
    closingHours: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    image: undefined,
    lastUpdated: new Date(),
  });
  const [errors, setErrors] = useState<Partial<RestaurantFormSchema>>({});

  const {
    loading,
    restaurant,
    updateRestaurant,
    createRestaurant,
    getRestaurant,
  } = useRestaurantStore();

  const { user } = useUserStore();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // form validation check start from here
    const result = restaurantFormSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<RestaurantFormSchema>);
      return;
    }
    // add restaurant api implementation start from here
    try {
      const formData = new FormData();
      formData.append("restaurantName", input.restaurantName);
      formData.append("city", input.city);
      formData.append("address", input.address);
      formData.append("country", input.country);
      formData.append("openingHours", input.openingHours);
      formData.append("closingHours", input.closingHours);
      formData.append("deliveryTime", input.deliveryTime.toString());
      formData.append("cuisines", JSON.stringify(input.cuisines));
      if (input.lastUpdated) {
        formData.append("lastUpdated", input.lastUpdated.toISOString());
      }

      if (input.image) {
        formData.append("image", input.image);
      }

      if (restaurant) {
        // update
        await updateRestaurant(formData);
      } else {
        // create
        await createRestaurant(formData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      await getRestaurant();
      if (restaurant) {
        setInput({
          restaurantName: restaurant.restaurantName || "",
          city: restaurant.city || "",
          address: restaurant.address || "",
          openingHours: restaurant.openingHours || "",
          closingHours: restaurant.closingHours || "",
          country: restaurant.country || "",
          deliveryTime: restaurant.deliveryTime || 0,
          cuisines: restaurant.cuisines
            ? restaurant.cuisines.map((cuisine: string) => cuisine)
            : [],
          email: user?.email || "",
          phone: user?.contact?.toString() || "",
          image: undefined,
          lastUpdated: restaurant.lastUpdated
            ? new Date(restaurant.lastUpdated)
            : new Date(),
        });
      }
    };
    fetchRestaurant();
    console.log(restaurant);
  }, []);

  return (
    <div className="max-w-6xl mx-auto my-10 md:mt-17">
      <div>
        <h1 className="font-extrabold text-3xl mb-5">Add Restaurants</h1>
        <form onSubmit={submitHandler}>
          <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
            {/* Restaurant Name  */}
            <div>
              <Label>Restaurant Name</Label>
              <Input
                type="text"
                name="restaurantName"
                value={input.restaurantName}
                onChange={changeEventHandler}
                placeholder="Enter your restaurant name"
              />
              {errors && (
                <span className="text-xs text-red-600 font-medium">
                  {errors.restaurantName}
                </span>
              )}
            </div>
            <div>
              <Label>City</Label>
              <Input
                type="text"
                name="city"
                value={input.city}
                onChange={changeEventHandler}
                placeholder="Enter your city name"
              />
              {errors && (
                <span className="text-xs text-red-600 font-medium">
                  {errors.city}
                </span>
              )}
            </div>
            <div>
              <Label>Address</Label>
              <Input
                type="text"
                name="address"
                value={input.address}
                onChange={changeEventHandler}
                placeholder="Enter your address"
              />
              {errors && (
                <span className="text-xs text-red-600 font-medium">
                  {errors.address}
                </span>
              )}
            </div>
            <div>
              <Label>Country</Label>
              <Input
                type="text"
                name="country"
                value={input.country}
                onChange={changeEventHandler}
                placeholder="Enter your country name"
              />
              {errors && (
                <span className="text-xs text-red-600 font-medium">
                  {errors.country}
                </span>
              )}
            </div>
            <div>
              <Label>Email</Label>
              <Input
                disabled
                type="email"
                name="email"
                value={user?.email}
                onChange={changeEventHandler}
                placeholder="Enter your address"
              />
              {errors && (
                <span className="text-xs text-red-600 font-medium">
                  {errors.email}
                </span>
              )}
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                disabled
                type="text"
                name="phone"
                value={user?.contact}
                onChange={changeEventHandler}
                placeholder="Enter your phone number"
              />
              {errors && (
                <span className="text-xs text-red-600 font-medium">
                  {errors.phone}
                </span>
              )}
            </div>
            <div>
              <Label>Opening Hours</Label>
              <Input
                type="text"
                name="openingHours"
                value={input.openingHours}
                onChange={changeEventHandler}
                placeholder="Enter your opening hours"
              />
              {errors && (
                <span className="text-xs text-red-600 font-medium">
                  {errors.openingHours}
                </span>
              )}
            </div>
            <div>
              <Label>Closing Hours</Label>
              <Input
                type="text"
                name="closingHours"
                value={input.closingHours}
                onChange={changeEventHandler}
                placeholder="Enter your closing hours"
              />
              {errors && (
                <span className="text-xs text-red-600 font-medium">
                  {errors.closingHours}
                </span>
              )}
            </div>
            <div>
              <Label>Delivery Time</Label>
              <Input
                // type="number"
                name="deliveryTime"
                value={input.deliveryTime}
                onChange={changeEventHandler}
                placeholder="Enter your delivery time"
              />
              {errors && (
                <span className="text-xs text-red-600 font-medium">
                  {errors.deliveryTime}
                </span>
              )}
            </div>
            <div>
              <Label>Cuisines</Label>
              <Input
                type="text"
                name="cuisines"
                value={input.cuisines}
                onChange={(e) =>
                  setInput({ ...input, cuisines: e.target.value.split(",") })
                }
                placeholder="e.g. Momos, Biryani"
              />
              {errors && (
                <span className="text-xs text-red-600 font-medium">
                  {errors.cuisines}
                </span>
              )}
            </div>
            <div>
                <Label>Upload Restaurant Banner</Label>
                <Input
                onChange={(e) =>
                  setInput({
                  ...input,
                  image: e.target.files?.[0] || undefined,
                  })
                }
                type="file"
                accept="image/*"
                name="imageFile"
                />
                {input.image && (
                <div className="mt-2">
                  <img
                  src={URL.createObjectURL(input.image)}
                  alt="Restaurant Banner Preview"
                  className="w-full h-auto"
                  />
                </div>
                )}
              {errors && (
                <span className="text-xs text-red-600 font-medium">
                  {errors.image?.name}
                </span>
              )}
            </div>
            <div className="mt-1">
              <Label className="border-b border-gray-200 dark:border-gray-700">
                Last Updated
              </Label>
              <div className="w-full bg-transparent border-none outline-none text-black dark:text-white mt-2">
                {input.lastUpdated
                  ? new Intl.DateTimeFormat("en-IN", {
                      weekday: "long",
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                      timeZone: "Asia/Kolkata",
                    }).format(new Date(input.lastUpdated))
                  : "Not Available"}
              </div>
            </div>
          </div>
          <div className="my-5 w-fit">
            {loading ? (
              <Button disabled className="bg-orange-500 hover:bg-orange-600">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </Button>
            ) : (
              <Button className="bg-orange-500 hover:bg-orange-600">
                {restaurant ? "Update Your Restaurant" : "Add Your Restaurant"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Restaurant;
