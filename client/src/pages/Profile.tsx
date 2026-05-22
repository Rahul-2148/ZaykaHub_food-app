import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/Zustand Store/useUserStore";
import {
  Globe,
  Loader2,
  LocateIcon,
  Mail,
  MapPin,
  Phone,
  Pin,
  Plus,
} from "lucide-react";
import { FormEvent, useRef, useState } from "react";

const Profile = () => {
  const { user, updateProfile } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phone: user?.contact || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
    postalCode: user?.postalCode || "",
    lastUpdated: user?.lastUpdated || "",
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const updateProfileHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      Object.entries(profileData).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });
      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      }
      await updateProfile(formData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
      <form
        className="max-w-7xl mx-auto my-5 px-4 sm:px-6 lg:px-8"
        onSubmit={updateProfileHandler}
        encType="multipart/form-data"
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between md:mt-17">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
            <Avatar className="relative w-20 h-20 sm:w-28 sm:h-28">
              <AvatarImage
                src={
                  profilePicture
                    ? URL.createObjectURL(profilePicture)
                    : user?.profilePicture
                }
              />
              <AvatarFallback>CN</AvatarFallback>
              <input
                type="file"
                ref={imageRef}
                accept="image/*"
                onChange={fileChangeHandler}
                className="hidden"
              />
              <div
                onClick={() => imageRef.current?.click()}
                className="absolute inset-0 opacity-0 hover:opacity-80 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer"
              >
                <Plus className="text-white w-8 h-8" />
              </div>
            </Avatar>

            <div className="text-center sm:text-left">
              <Label className="text-lg font-semibold text-gray-500">
                Full Name
              </Label>
              {isEditing ? (
                <input
                  type="text"
                  name="fullname"
                  value={profileData.fullname}
                  onChange={changeHandler}
                  onBlur={() => setIsEditing(false)}
                  autoFocus
                  className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 bg-transparent border-none focus:ring-0 focus:outline-none w-full px-2"
                />
              ) : (
                <h1
                  className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-gray-100 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setIsEditing(true)}
                >
                  {profileData.fullname || "Your Name"}
                </h1>
              )}
            </div>
          </div>
        </div>

        {/* Grid layout for form inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full mt-6">
          <div>
            <Label>Email</Label>
            <div className="flex items-center bg-gray-200 p-2 rounded-sm">
              <Mail className="text-gray-500 mr-2" />
              <Input
                type="email"
                name="email"
                value={profileData.email}
                onChange={changeHandler}
                className="w-full bg-transparent border-none outline-none dark:text-black"
              />
            </div>
          </div>
          <div>
            <Label>Phone</Label>
            <div className="flex items-center bg-gray-200 p-2 rounded-sm">
              <Phone className="text-gray-500 mr-2" />
              <Input
                type="text"
                name="phone"
                value={profileData.phone}
                onChange={changeHandler}
                className="w-full bg-transparent border-none outline-none dark:text-black"
              />
            </div>
          </div>
          <div>
            <Label>Address</Label>
            <div className="flex items-center bg-gray-200 p-2 rounded-sm">
              <LocateIcon className="text-gray-500 mr-2" />
              <Input
                type="text"
                name="address"
                value={profileData.address}
                onChange={changeHandler}
                className="w-full bg-transparent border-none outline-none dark:text-black"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full mt-4">
          <div>
            <Label>City</Label>
            <div className="flex items-center bg-gray-200 p-2 rounded-sm">
              <MapPin className="text-gray-500 mr-2" />
              <Input
                type="text"
                name="city"
                value={profileData.city}
                onChange={changeHandler}
                className="w-full bg-transparent border-none outline-none dark:text-black"
              />
            </div>
          </div>
          <div>
            <Label>Country</Label>
            <div className="flex items-center bg-gray-200 p-2 rounded-sm">
              <Globe className="text-gray-500 mr-2" />
              <Input
                type="text"
                name="country"
                value={profileData.country}
                onChange={changeHandler}
                className="w-full bg-transparent border-none outline-none dark:text-black"
              />
            </div>
          </div>
          <div>
            <Label>Postal Code</Label>
            <div className="flex items-center bg-gray-200 p-2 rounded-sm">
              <Pin className="text-gray-500 mr-2" />
              <Input
                type="text"
                name="postalCode"
                value={profileData.postalCode}
                onChange={changeHandler}
                className="w-full bg-transparent border-none outline-none dark:text-black"
              />
            </div>
          </div>
          <div>
            <Label>Last Updated</Label>
            <div className="w-full bg-transparent border-none outline-none text-black dark:text-white">
              {profileData.lastUpdated
                ? new Intl.DateTimeFormat("en-IN", {
                    weekday: "long",
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                    timeZone: "Asia/Kolkata",
                  }).format(new Date(profileData.lastUpdated))
                : "Not Available"}
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          {isLoading ? (
            <Button
              disabled
              className="bg-orange-500 hover:bg-orange-600 py-3 px-12 text-white rounded-md"
            >
              <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Updating...
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 py-3 px-12 text-white rounded-md"
            >
              Update Profile
            </Button>
          )}
        </div>
      </form>
  );
};

export default Profile;
