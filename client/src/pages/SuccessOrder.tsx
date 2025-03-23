import { IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";
import { CartItem } from "@/types/cartType";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { useOrderStore } from "@/Zustand Store/useOrderStore";
import dayjs from "dayjs";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const SuccessOrder = () => {
  const { orders, getOrderDetails } = useOrderStore();

  useEffect(() => {
    getOrderDetails(); // Orders fetch karega jab page load hoga
  }, []);

  if (!orders || orders.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="font-bold text-2xl text-gray-700 dark:text-gray-200">
          Order not found!
        </h1>
      </div>
    );

  // --------------
  const generatePDF = (order: any) => {
    const doc = new jsPDF();

    // ✅ Header Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text("Order Invoice", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    let currentY = 30;

    doc.text(`Order ID: ${order._id}`, 14, currentY);
    currentY += 8;

    doc.text(
      `Customer Name: ${order.deliveryDetails.name || "N/A"}`,
      14,
      currentY
    );
    currentY += 8;

    doc.text(`Email: ${order.deliveryDetails.email || "N/A"}`, 14, currentY);
    currentY += 8;

    doc.text(`Phone: ${order.deliveryDetails.contact || "N/A"}`, 14, currentY);
    currentY += 8;

    doc.text(
      `Ordered From: ${order.restaurant?.restaurantName || "Unknown"}`,
      14,
      currentY
    );
    currentY += 8;

    doc.text(`Payment Method: ${order.paymentMethod || "Card"}`, 14, currentY);
    currentY += 8;

    doc.text(`Status: ${order.status}`, 14, currentY);
    currentY += 8;

    doc.text(
      `Ordered Date: ${dayjs(order.orderedDate).format("DD/MM/YYYY hh:mm A")}`,
      14,
      currentY
    );
    currentY += 10; // Extra space before image and address

    // ✅ Image at Right Side
    if (order.cartItems && order.cartItems.length > 0) {
      const firstItemImage = order.cartItems[0]?.image || "menu image"; // Fallback text if image not found
      doc.addImage(firstItemImage, "PNG", 150, 30, 40, 40); // Adjusted positioning
    }

    // ✅ Properly Wrapped Delivery Address
    const deliveryAddress = `Delivery Address: ${order.deliveryDetails.address}, ${order.deliveryDetails.city}, ${order.deliveryDetails.postalCode}, ${order.deliveryDetails.country}`;
    const wrappedAddress = doc.splitTextToSize(deliveryAddress, 180);

    wrappedAddress.forEach((line: string) => {
      doc.text(line, 14, currentY);
      currentY += 7; // Proper spacing
    });

    currentY += 5; // Extra space before separator
    doc.line(14, currentY, 195, currentY); // Separator line

    // ✅ Items Table (Using autoTable)
    currentY += 5;
    autoTable(doc, {
      startY: currentY,
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] }, // Green header
      head: [["Item Name", "Quantity", "Price (₹)", "Total (₹)"]],
      body: order.cartItems.map((item: any) => [
        item?.name || "Unknown",
        item?.quantity || "N/A",
        `₹${item?.price.toFixed(2) || 0}`,
        `₹${(item?.price * item?.quantity).toFixed(2) || 0}`,
      ]),
    });

    // ✅ Position Grand Total Below the Table
    const finalY = (doc as any).lastAutoTable?.finalY || currentY + 10;
    doc.text(`Grand Total: ₹${order.totalAmount.toFixed(2)}`, 14, finalY + 10);
    doc.text("Thank you for your order!", 14, finalY + 20);

    // ✅ Save PDF
    doc.save(`invoice_${order._id}.pdf`);
  };

  // ✅ Function to Convert Image URL to Base64
  const getBase64Image = (imgUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Allow cross-origin images
      img.src = imgUrl;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL("image/png")); // Convert to Base64
        } else {
          reject(new Error("Canvas context not available"));
        }
      };

      img.onerror = (err) => reject(err);
    });
  };

  // ✅ Main Function to Generate All Invoices with Images
  const downloadAllInvoices = async (orders: any[]) => {
    const zip = new JSZip();

    for (const order of orders) {
      const doc = new jsPDF();

      // ✅ Header Section
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(40, 40, 40);
      doc.text("Order Invoice", 105, 20, { align: "center" });

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      let currentY = 30;

      doc.text(`Order ID: ${order._id}`, 14, currentY);
      currentY += 8;
      doc.text(
        `Customer Name: ${order.deliveryDetails.name || "N/A"}`,
        14,
        currentY
      );
      currentY += 8;
      doc.text(`Email: ${order.deliveryDetails.email || "N/A"}`, 14, currentY);
      currentY += 8;
      doc.text(
        `Phone: ${order.deliveryDetails.contact || "N/A"}`,
        14,
        currentY
      );
      currentY += 8;
      doc.text(
        `Ordered From: ${order.restaurant?.restaurantName || "Unknown"}`,
        14,
        currentY
      );
      currentY += 8;
      doc.text(
        `Payment Method: ${order.paymentMethod || "Card"}`,
        14,
        currentY
      );
      currentY += 8;
      doc.text(`Status: ${order.status}`, 14, currentY);
      currentY += 8;
      doc.text(
        `Ordered Date: ${dayjs(order.orderedDate).format(
          "DD/MM/YYYY hh:mm A"
        )}`,
        14,
        currentY
      );
      currentY += 10;

      // ✅ Image at Right Side (Convert to Base64 First)
      if (order.cartItems && order.cartItems.length > 0) {
        try {
          const firstItemImage = order.cartItems[0]?.image; // Image URL
          if (firstItemImage) {
            const base64Image = await getBase64Image(firstItemImage);
            doc.addImage(base64Image, "PNG", 150, 30, 40, 40); // Image in PDF
          }
        } catch (error) {
          console.error("Image Load Error:", error);
        }
      }

      // ✅ Properly Wrapped Delivery Address
      const deliveryAddress = `Delivery Address: ${order.deliveryDetails.address}, ${order.deliveryDetails.city}, ${order.deliveryDetails.postalCode}, ${order.deliveryDetails.country}`;
      const wrappedAddress = doc.splitTextToSize(deliveryAddress, 180);
      wrappedAddress.forEach((line: string) => {
        doc.text(line, 14, currentY);
        currentY += 7;
      });

      currentY += 5;
      doc.line(14, currentY, 195, currentY);

      // ✅ Items Table
      currentY += 5;
      autoTable(doc, {
        startY: currentY,
        theme: "grid",
        styles: { fontSize: 10 },
        headStyles: { fillColor: [22, 160, 133] },
        head: [["Item Name", "Quantity", "Price (₹)", "Total (₹)"]],
        body: order.cartItems.map((item: any) => [
          item?.name || "Unknown",
          item?.quantity || "N/A",
          `₹${item?.price.toFixed(2) || 0}`,
          `₹${(item?.price * item?.quantity).toFixed(2) || 0}`,
        ]),
      });

      // ✅ Position Grand Total Below the Table
      const finalY = (doc as any).lastAutoTable?.finalY || currentY + 10;
      doc.text(
        `Grand Total: ₹${order.totalAmount.toFixed(2)}`,
        14,
        finalY + 10
      );
      doc.text("Thank you for your order!", 14, finalY + 20);

      // ✅ Convert PDF to Blob & Add to ZIP
      const pdfBlob = doc.output("blob");
      zip.file(`invoice_${order._id}.pdf`, pdfBlob);
    }

    // ✅ Generate & Download ZIP File
    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, "All_Invoices.zip");
  };

  // --------------

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4 md:mt-17">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Total Orders:{" "}
            <span className="text-[#FF5A5A]">{orders.length}</span>
          </h1>
        </div>

        {orders.map((order: any) => (
          <div
            key={order._id}
            className="mb-8 border rounded-lg p-4 bg-gray-100 dark:bg-gray-700"
          >
            {/* Restaurant Details */}
            <h4 className="text-left text-sm text-gray-600 dark:text-gray-200">
              Restaurant Details
            </h4>
            <h3 className="text-md font-semibold text-gray-700 dark:text-white">
              Ordered From:{" "}
              <span className="font-medium text-orange-500">
                {order.restaurant.restaurantName}
              </span>
            </h3>

            <Separator className="my-4" />

            {/* ✅ Order ID & Status */}
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100">
              Order ID: <span className="font-medium text-gray-600 dark:text-neutral-50">{order._id}</span>
            </h2>
            <h3 className="text-md text-gray-600 dark:text-gray-400">
              Status:{" "}
              <span
                className={`font-medium ${
                  order.status === "Delivered"
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                {order.status}
              </span>
            </h3>
            <Button
              onClick={() => generatePDF(order)}
              className="mt-2 bg-blue-500 hover:bg-blue-600 w-full py-2 rounded-md"
            >
              Download Invoice
            </Button>

            <Separator className="my-4" />

            {/* ✅ Delivery Details Section */}
            {order.deliveryDetails && (
              <div className="mb-4">
                <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300">
                  Delivery Details:
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-100">
                  <span className="font-medium">Name:</span>{" "}
                  {order.deliveryDetails.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-100">
                  <strong>Email:</strong> {order.deliveryDetails.email}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-100">
                  <span className="font-medium">Phone:</span>{" "}
                  {order.deliveryDetails.contact}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-100">
                  <span className="font-medium">Address:</span>{" "}
                  {order.deliveryDetails.address}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-100">
                  <strong>City:</strong> {order.deliveryDetails.city}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-100">
                  <strong>Country:</strong> {order.deliveryDetails.country}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-100">
                  <strong>Postal Code:</strong>{" "}
                  {order.deliveryDetails.postalCode}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-100">
                  <span className="font-medium">Expected Delivery:</span>{" "}
                  {order.deliveryDetails.deliveryTime ||
                    "7-10 days from now 🚚"}
                </p>

                <p className="text-gray-600 dark:text-gray-100 mt-2">
                  <span className="font-semibold">Ordered Date: </span>
                  {order.orderedDate
                    ? dayjs(order.orderedDate).format("DD/MM/YYYY hh:mm A")
                    : "Not Available"}
                </p>
              </div>
            )}

            <Separator className="my-4" />

            {/* ✅ Order Items */}
            {order.cartItems.map((item: CartItem, index: number) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-md object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="text-gray-800 dark:text-gray-200 font-medium">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-800 dark:text-gray-200 flex items-center">
                      <IndianRupee />
                      <span className="text-lg font-medium">{item.price}</span>
                    </div>
                  </div>
                </div>
                <Separator className="my-4" />
              </div>
            ))}

            {/* Total Amount */}
            <h3 className="text-md font-semibold text-gray-700 dark:text-gray-100">
              Total Amount:{" "}
              <span className="text-gray-900 dark:text-gray-100 font-bold flex items-center">
                <IndianRupee /><span className="text-lg text-orange-500"> {order.totalAmount}</span>
              </span>
            </h3>
          </div>
        ))}

        <Button
          variant="link"
          onClick={() => downloadAllInvoices(orders)}
          className="bg-green-500 hover:bg-green-600 w-full py-3 rounded-md shadow-lg mt-4 mb-3"
        >
          Download All Invoices
        </Button>

        {/* ✅ Continue Shopping Button */}
        <Link to="/cart">
          <Button className="bg-orange-500 hover:bg-orange-600 w-full py-3 rounded-md shadow-lg">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessOrder;

// import { IndianRupee } from "lucide-react";
// import { Link } from "react-router-dom";
// import { CartItem } from "@/types/cartType";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import hero_pizza from "@/assets/hero_pizza.png";
// import { useOrderStore } from "@/Zustand Store/useOrderStore";

// const SuccessOrder = () => {
//   const { orders } = useOrderStore();

//   // Filter out "Pending" orders
//   const validOrders = orders.filter(
//     (order: any) =>
//       order.status !== "Pending" // Remove fake/pending orders
//   );

//   if (validOrders.length === 0)
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <h1 className="font-bold text-2xl text-gray-700 dark:text-gray-200">
//           No valid orders found!
//         </h1>
//       </div>
//     );

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
//       <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-full">
//         <div className="text-center mb-6">
//           <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
//             Order Details
//           </h1>
//         </div>

//         <div className="mb-6">
//           <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
//             Order Summary
//           </h2>

//           {validOrders.map((order: any, index: number) => (
//             <div key={index} className="mb-6">
//               <h3 className="text-md font-semibold text-gray-600 dark:text-gray-300">
//                 Order ID: {order._id}
//               </h3>
//               <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-2">
//                 Status:{" "}
//                 <span className="text-orange-500 font-semibold">
//                   {order.status}
//                 </span>
//               </h4>

//               {order.cartItems.map((item: CartItem, itemIndex: number) => (
//                 <div key={itemIndex} className="mb-4">
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center">
//                       <img
//                         src={item.image}
//                         alt=""
//                         className="w-14 h-14 rounded-md object-cover"
//                       />
//                       <h3 className="ml-4 text-gray-800 dark:text-gray-200 font-medium">
//                         {item.name} (x{item.quantity})
//                       </h3>
//                     </div>
//                     <div className="text-right">
//                       <div className="text-gray-800 dark:text-gray-200 flex items-center">
//                         <IndianRupee />
//                         <span className="text-lg font-medium">{item.price}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <Separator className="my-4" />
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>

//         <Link to="/cart">
//           <Button className="bg-orange-500 hover:bg-orange-600 w-full py-3 rounded-md shadow-lg">
//             Continue Shopping
//           </Button>
//         </Link>
//       </div>
//     </div>
//   );
// };
// export default SuccessOrder;
