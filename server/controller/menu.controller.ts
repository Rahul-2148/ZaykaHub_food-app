import { Request, Response } from "express";
import { Menu } from "../models/menu.model";
import { Restaurant } from "../models/restaurant.model";
import mongoose, { ObjectId } from "mongoose";
import uploadImageOnCloudinary, { uploadMenuImageOnCloudinary } from "../utils/imageUpload";
import { v2 as cloudinary } from "cloudinary";

// Add Menu controller
export const addMenu = async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;

    if (!name || !description || !price) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }
    const restaurant = await Restaurant.findOne({ user: req.id });
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    const imageUrl = await uploadMenuImageOnCloudinary(file as Express.Multer.File);
    const menu: any = await Menu.create({
      name,
      description,
      price,
      image: imageUrl,
    });

    if (restaurant) {
      (restaurant.menus as mongoose.Schema.Types.ObjectId[]).push(menu._id);
      await restaurant.save();
    }

    return res.status(201).json({
      success: true,
      message: "Menu added successfully",
      menu,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to add menu" });
  }
};

// Edit Menu Controller
export const editMenu = async (req:Request, res:Response) => {
  try {
      const {id} = req.params;
      const {name, description, price} = req.body;
      const file = req.file;
      const menu = await Menu.findById(id);
      if(!menu){
          return res.status(404).json({
              success:false,
              message:"Menu not found!"
          })
      }
      if(name) menu.name = name;
      if(description) menu.description = description;
      if(price) menu.price = price;

      if(file){
          const restaurant = await Restaurant.findOne({ menus: id });
          // delete previous menu image from Cloudinary
          if (menu.image) {
            const publicIdMatch = menu.image.match(/\/v\d+\/(.+)\./);
            const publicId = publicIdMatch ? publicIdMatch[1] : null;
            if (publicId) await cloudinary.uploader.destroy(publicId);
          }

          const imageUrl = await uploadMenuImageOnCloudinary(file as Express.Multer.File, name || menu.name);
          menu.image = imageUrl;
      }
      await menu.save();


      return res.status(200).json({
          success:true,
          message:"Menu updated",
          menu,
      })
  } catch (error) {
      console.log(error);
      return res.status(500).json({message:"Failed to update menu"}); 
  }
}

// single menu delete controller
export const deleteMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // 1️⃣ Menu check karo ki exist karta hai ya nahi
    const menu = await Menu.findById(id);
    if (!menu) {
      return res
        .status(404)
        .json({ success: false, message: "Menu not found!" });
    }

    // Delete menu image from Cloudinary if present
    if (menu.image) {
      const publicIdMatch = menu.image.match(/\/v\d+\/(.+)\./);
      const publicId = publicIdMatch ? publicIdMatch[1] : null;
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    // 3️⃣ Restaurant ke menus array se is menu ki ID remove karo
    await Restaurant.updateOne(
      { menus: id }, 
      { $pull: { menus: id } } // 🛑 Menu ki ID remove karega
    );

    // 4️⃣ Menu ko database se hatao
    await Menu.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Menu deleted successfully!",
    });
  } catch (error) {
    console.error("❌ Error deleting menu:", error);
    return res.status(500).json({ success: false, message: "Failed to delete menu" });
  }
};

// multiple menus delete controller
export const deleteAllMenus = async (req: Request, res: Response) => {
  try {
    // Safety: require explicit confirmation query param to avoid accidental mass-deletes
    const confirm = (req.query.confirm as string) || "false";
    if (confirm !== "true") {
      return res.status(400).json({
        success: false,
        message: "Confirmation required to delete all menus. Append ?confirm=true",
      });
    }
    // 1️⃣ Pehle saare menus le lo
    const menus = await Menu.find({}, "image _id");

    // 2️⃣ Agar koi menu exist nahi karta toh return kar do
    if (menus.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No menus found to delete!",
      });
    }

    // 3️⃣ Local disk se saari images delete karo
    for (const menu of menus) {
      if (menu.image) {
        const publicIdMatch = menu.image.match(/\/v\d+\/(.+)\./);
        const publicId = publicIdMatch ? publicIdMatch[1] : null;
        if (publicId) await cloudinary.uploader.destroy(publicId);
      }
    }

    // 4️⃣ Sab restaurants se menus ka array clear karo
    await Restaurant.updateMany({}, { $set: { menus: [] } });

    // 5️⃣ Sab menus database se delete karo
    await Menu.deleteMany({});

    return res.status(200).json({
      success: true,
      message: "All menus and their images deleted successfully!",
    });
  } catch (error) {
    console.error("❌ Error deleting all menus:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete all menus",
    });
  }
};








