import { Badge } from "@/components/ui/badge";
import { Timer } from "lucide-react";
import AvailableMenu from "./AvailableMenu";
import { useRestaurantStore } from "@/Zustand Store/useRestaurantStore";
import SocialMedia, { RatingSection } from "./SocialMedia";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { FcGlobe } from "react-icons/fc";
import { GiModernCity } from "react-icons/gi";
import { FaAddressCard } from "react-icons/fa6";

const RestaurantDetails = () => {
  const { singleRestaurant, getSingleRestaurant } = useRestaurantStore();
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurant = async () => {
      setLoading(true);
      try {
        await getSingleRestaurant(params.id!); // Fetch restaurant details
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchRestaurant();
    }
  }, [params.id, getSingleRestaurant]);

  if (loading) {
    return <RestaurantDetailsSkeleton />;
  }

  if (!singleRestaurant) {
    return <div className="text-center my-10">Restaurant not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto my-10 md:mt-17">
      <div className="w-full">
        <div className="relative w-full h-32 md:h-64 lg:h-72">
          <img
            src={singleRestaurant.imageUrl || "Loading..."}
            alt="Restaurant"
            className="w-full h-full object-fill rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="my-5">
            <h1 className="font-medium text-xl">
              {singleRestaurant.restaurantName}
            </h1>
            <div className="flex gap-2 my-2">
              {singleRestaurant.cuisines &&
                singleRestaurant.cuisines.map(
                  (cuisine: string, idx: number) => (
                    <Badge key={idx} className="px-2">
                      {cuisine}
                    </Badge>
                  )
                )}
            </div>
            <div className="flex md:flex-row flex-col gap-4 my-5">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                <h1 className="flex items-center gap-2 font-medium">
                  Delivery Time:{" "}
                  <span className="text-sm text-[#ef7801f7]">
                    {singleRestaurant.deliveryTime || "N/A"}
                  </span>
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                <h1 className="flex items-center gap-2 font-medium">
                  Opening Hours:{" "}
                  <span className="text-sm text-[#ef7801f7]">
                    {singleRestaurant.openingHours}
                  </span>
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                <h1 className="flex items-center gap-2 font-medium">
                  Closing Hours:{" "}
                  <span className="text-sm text-[#ef7801f7]">
                    {singleRestaurant.closingHours}
                  </span>
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <GiModernCity className="w-5 h-5" />
                <h1 className="flex items-center gap-2 font-medium">
                  City:{" "}
                  <span className="text-sm text-[#ef7801f7]">
                    {singleRestaurant.city}
                  </span>
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <FcGlobe  className="w-5 h-5" />
                <h1 className="flex items-center gap-2 font-medium">
                  Country:{" "}
                  <span className="text-sm text-[#ef7801f7]">
                    {singleRestaurant.country}
                  </span>
                </h1>
              </div>
            </div>
            <p className="flex gap-1 dark:text-gray-300 text-gray-900"><FaAddressCard /><span className="font-semibold">Address:</span> {singleRestaurant.address}</p>
          </div>
        </div>
      </div>

      {/* Displaying Menu's */}
      <div>
        {singleRestaurant?.menus && (
          <AvailableMenu menus={singleRestaurant?.menus!} />
        )}
      </div>

      {/* Displaying Like, Comment, Share */}
      <div>
        <SocialMedia />
      </div>

      {/*  Rating section */}
      <div>
        <RatingSection />
      </div>
    </div>
  );
};

export default RestaurantDetails;

// skeleton
export const RestaurantDetailsSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="w-full">
        <div className="relative w-full h-32 md:h-64 lg:h-72">
          <Skeleton className="w-full h-full rounded-lg" />
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="my-5">
            <h1 className="font-medium text-xl">
              <Skeleton className="w-48 h-6 rounded-md" />
            </h1>
            <div className="flex gap-2 my-2">
              <Skeleton className="w-20 h-6 rounded-md" />
              <Skeleton className="w-20 h-6 rounded-md" />
              <Skeleton className="w-20 h-6 rounded-md" />
            </div>
            <div className="flex md:flex-row flex-col gap-2 my-5">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                <h1 className="flex items-center gap-2 font-medium">
                  Delivery Time: <Skeleton className="w-12 h-5 rounded-md" />
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skeleton for Menu */}
      <div className="mt-5">
        <h2 className="text-lg font-medium">
          <Skeleton className="w-36 h-6 rounded-md" />
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="h-40 w-full rounded-lg" />
        </div>
      </div>

      {/* Skeleton for SocialMedia & Rating Section */}
      <div className="mt-5 flex justify-between">
        <Skeleton className="w-24 h-8 rounded-md" />
        <Skeleton className="w-24 h-8 rounded-md" />
      </div>
    </div>
  );
};
