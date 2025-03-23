import { Request, Response } from "express";
import { Menu } from "../models/menu.model";
import { Restaurant } from "../models/restaurant.model";
import mongoose, { ObjectId } from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import { Multer } from "multer";
import { uploadMenuImageOnCloudinary } from "../utils/imageUpload";

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
    const imageUrl = await uploadMenuImageOnCloudinary(
      file as Express.Multer.File
    );
    const menu: any = await Menu.create({
      name,
      description,
      price,
      image: imageUrl,
    });
    const restaurant = await Restaurant.findOne({ user: req.id });
    
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

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
    return res.status(500).json({ message: "Internal server error" });
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
          const imageUrl = await uploadMenuImageOnCloudinary(file as Express.Multer.File);
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
      return res.status(500).json({message:"Internal server error"}); 
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

    // 2️⃣ Cloudinary se image delete karo (agar hai toh)
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
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// multiple menus delete controller
export const deleteAllMenus = async (req: Request, res: Response) => {
  try {
    // 1️⃣ Pehle saare menus le lo
    const menus = await Menu.find({}, "image _id");

    // 2️⃣ Agar koi menu exist nahi karta toh return kar do
    if (menus.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No menus found to delete!",
      });
    }

    // 3️⃣ Cloudinary se saari images delete karo
    for (const menu of menus) {
      if (menu.image) {
        const publicIdMatch = menu.image.match(/\/v\d+\/(.+)\./);
        const publicId = publicIdMatch ? publicIdMatch[1] : null;
        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }
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
      message: "Internal server error",
    });
  }
};







// https://res.cloudinary.com/demo/image/upload/v1700000000/Food-Restaurant_ZaykaHub/restaurants/menus/wkv95re0bfwdtmzior5y.jpg
// 🔸 Isme public ID kya hai?
// 👉 Food-Restaurant_ZaykaHub/restaurants/menus/wkv95re0bfwdtmzior5y
// (Ye "v1700000000" ke baad aur ".jpg" se pehle wala part hai)

// Regex: /\/v\d+\/(.+)\./

// \/v\d+\/ → v ke baad jitne bhi numbers hain (1700000000), unko ignore kar diya.
// (.+) → Ye public ID capture kar raha hai (Food-Restaurant_ZaykaHub/restaurants/menus/wkv95re0bfwdtmzior5y)
// \. → Ye . (dot) ko match kar raha hai, jo .jpg, .png, etc. se pehle aata hai.

