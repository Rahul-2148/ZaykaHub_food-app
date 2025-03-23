import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MenuFormSchema, menuSchema } from "@/zod schema/menuSchema";
import { useMenuStore } from "@/Zustand Store/useMenuStore";
import { useRestaurantStore } from "@/Zustand Store/useRestaurantStore";
import { Loader2, Plus, Trash } from "lucide-react";
import React, { FormEvent, useState } from "react";
import EditMenu from "./EditMenu";
import Swal from "sweetalert2";

const AddMenu = () => {
  const [input, setInput] = useState<MenuFormSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });
  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<any>();
  const [error, setError] = useState<Partial<MenuFormSchema>>({});

  const { loading, createMenu, deleteAllMenus, deleteMenu } = useMenuStore();
  const { restaurant } = useRestaurantStore();

  const changeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setError(fieldErrors as Partial<MenuFormSchema>);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("price", input.price.toString());
      if (input.image) {
        formData.append("image", input.image);
      }
      await createMenu(formData);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Button Click Handler
  const handleDelete = (menuId: string) => {
    // Check if menu exists
    const menuExists = restaurant?.menus?.some((menu) => menu._id === menuId);

    if (!menuExists) {
      Swal.fire({
        title: "Menu Not Found",
        text: "This menu does not exist or has already been deleted.",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
      return;
    }

    // Show confirmation before deleting
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMenu(menuId);
        Swal.fire("Deleted!", "Your menu has been deleted.", "success");
      }
    });
  };

  // Delete All Button Click Handler
  const handleDeleteAll = () => {
    // Check if menus exist
    if (!restaurant?.menus || restaurant.menus.length === 0) {
      Swal.fire({
        title: "No Menus Found",
        text: "There are no menus to delete!",
        icon: "info",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
      return;
    }

    // Show confirmation before deleting
    Swal.fire({
      title: "Delete All Menus?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete all!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAllMenus();
        Swal.fire("Deleted!", "All menus have been deleted.", "success");
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto my-10 md:mt-17">
      {/* Heading */}
      <h1 className="font-bold md:font-extrabold text-lg md:text-2xl mb-4">
        Available Menus
      </h1>

      {/* Buttons Row */}
      <div className="flex justify-between items-center">
        <Button
          className="bg-red-500 hover:bg-red-600"
          onClick={handleDeleteAll}
        >
          <Trash className="mr-2" />
          Delete All
        </Button>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="mr-2" />
              Add Menus
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add A New Menu</DialogTitle>
              <DialogDescription>
                Create a menu that will make your restaurant stand out.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={submitHandler} className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  placeholder="Enter menu name"
                />
                {error.name && (
                  <span className="text-xs text-red-600">{error.name}</span>
                )}
              </div>
              <div>
                <Label>Description</Label>
                <textarea
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  placeholder="Enter menu description"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={4}
                />
                {error.description && (
                  <span className="text-xs text-red-600">
                    {error.description}
                  </span>
                )}
              </div>
              <div>
                <Label>Price in (Rupees)</Label>
                <Input
                  type="number"
                  name="price"
                  value={input.price}
                  onChange={changeEventHandler}
                  placeholder="Enter menu price"
                />
                {error.price && (
                  <span className="text-xs text-red-600">{error.price}</span>
                )}
              </div>
              <div>
                <Label>Upload Menu Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={(e) =>
                    setInput({
                      ...input,
                      image: e.target.files?.[0] || undefined,
                    })
                  }
                />
                {error.image?.name && (
                  <span className="text-xs text-red-600">
                    {error.image.name}
                  </span>
                )}
              </div>
              <DialogFooter className="mt-5">
                {loading ? (
                  <Button
                    disabled
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Please wait...
                  </Button>
                ) : (
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    Submit
                  </Button>
                )}
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Menus List */}
      {restaurant?.menus.map((menu: any, idx: number) => (
        <div key={idx} className="mt-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-lg border">
            <img
              src={menu.image}
              alt="menu image"
              className="md:h-full md:w-40 h-40 w-full object-cover rounded-lg"
            />
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
                {menu.name}
              </h1>
              <p className="text-sm tex-gray-600 mt-1">{menu.description}</p>
              <h2 className="text-md font-semibold mt-2">
                Price: ₹<span className="text-[#d4771a]">{menu.price}</span>
              </h2>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setSelectedMenu(menu);
                  setEditOpen(true);
                }}
                size={"sm"}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(menu._id)}
                size={"sm"}
                className="bg-red-500 hover:bg-red-600"
              >
                <Trash className="mr-1" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      ))}
      <EditMenu
        selectedMenu={selectedMenu}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
      />
    </div>
  );
};

export default AddMenu;
