import cloudinary from "./cloudinary";

// Helper function to sanitize names for use in public_id
const sanitizeFileName = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_") // Replace spaces with underscores
    .replace(/[^a-z0-9_-]/g, "") // Remove special characters
    .slice(0, 50); // Limit length
};

// Upload restaurant/generic images with optional naming
const uploadImageOnCloudinary = async (
  file: Express.Multer.File,
  entityName?: string
) => {
  const base64Image = Buffer.from(file.buffer).toString("base64");
  const dataURI = `data:${file.mimetype};base64,${base64Image}`;
  
  const uploadOptions: any = {
    folder: "ZaykaHub/restaurants",
  };

  // Add public_id (filename) if name is provided
  if (entityName) {
    const sanitized = sanitizeFileName(entityName);
    const timestamp = Date.now();
    uploadOptions.public_id = `${sanitized}_${timestamp}`;
  }

  const uploadResponse = await cloudinary.uploader.upload(dataURI, uploadOptions);
  return uploadResponse.secure_url;
};
export default uploadImageOnCloudinary;

// Upload menu images with optional naming
export const uploadMenuImageOnCloudinary = async (
  file: Express.Multer.File,
  menuName?: string
) => {
  const base64Image = Buffer.from(file.buffer).toString("base64");
  const dataURI = `data:${file.mimetype};base64,${base64Image}`;
  
  const uploadOptions: any = {
    folder: "ZaykaHub/restaurants/menus",
  };

  // Add public_id (filename) if name is provided
  if (menuName) {
    const sanitized = sanitizeFileName(menuName);
    const timestamp = Date.now();
    uploadOptions.public_id = `${sanitized}_${timestamp}`;
  }

  const uploadResponse = await cloudinary.uploader.upload(dataURI, uploadOptions);
  return uploadResponse.secure_url;
};

// Upload user profile pictures with naming
export const uploadUserProfileImage = async (
  file: Express.Multer.File,
  userName?: string
) => {
  const base64Image = Buffer.from(file.buffer).toString("base64");
  const dataURI = `data:${file.mimetype};base64,${base64Image}`;
  
  const uploadOptions: any = {
    folder: "ZaykaHub/users",
    resource_type: "image",
  };

  // Add public_id (filename) if name is provided
  if (userName) {
    const sanitized = sanitizeFileName(userName);
    const timestamp = Date.now();
    uploadOptions.public_id = `${sanitized}_${timestamp}`;
  }

  const uploadResponse = await cloudinary.uploader.upload(dataURI, uploadOptions);
  return uploadResponse.secure_url;
};
