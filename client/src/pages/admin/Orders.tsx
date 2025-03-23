import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRestaurantStore } from "@/Zustand Store/useRestaurantStore";
import type { Orders } from "@/types/orderType";
import { useEffect } from "react";
import dayjs from "dayjs";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";
// import hero_pizza from "@/assets/hero_pizza.png";

const Orders = () => {
  const { restaurantOrder, getRestaurantOrders, updateRestaurantOrder } =
    useRestaurantStore();

  const handleStatusChange = async (id: string, status: string) => {
    await updateRestaurantOrder(id, status);
  };

  // --------------
  // const generatePDF = (order: any) => {
  //   const doc = new jsPDF();

  //   // ✅ Header Section
  //   doc.setFont("helvetica", "bold");
  //   doc.setFontSize(18);
  //   doc.setTextColor(40, 40, 40);
  //   doc.text("Order Invoice", 105, 20, { align: "center" });

  //   doc.setFontSize(12);
  //   doc.setFont("helvetica", "normal");
  //   let currentY = 30;

  //   doc.text(`Order ID: ${order._id}`, 14, currentY);
  //   currentY += 8;

  //   doc.text(
  //     `Customer Name: ${order.deliveryDetails.name || "N/A"}`,
  //     14,
  //     currentY
  //   );
  //   currentY += 8;

  //   doc.text(`Email: ${order.deliveryDetails.email || "N/A"}`, 14, currentY);
  //   currentY += 8;

  //   doc.text(`Phone: ${order.deliveryDetails.contact || "N/A"}`, 14, currentY);
  //   currentY += 8;

  //   doc.text(
  //     `Ordered From: ${order.restaurant?.restaurantName || "Unknown"}`,
  //     14,
  //     currentY
  //   );
  //   currentY += 8;

  //   doc.text(`Payment Method: ${order.paymentMethod || "Card"}`, 14, currentY);
  //   currentY += 8;

  //   doc.text(`Status: ${order.status}`, 14, currentY);
  //   currentY += 8;

  //   doc.text(
  //     `Ordered Date: ${dayjs(order.orderedDate).format("DD/MM/YYYY hh:mm A")}`,
  //     14,
  //     currentY
  //   );
  //   currentY += 10; // Extra space before image and address

  //   // ✅ Image at Right Side
  //   if (order.cartItems && order.cartItems.length > 0) {
  //     const firstItemImage = order.cartItems[0]?.image || hero_pizza; // Fallback image
  //     doc.addImage(firstItemImage, "PNG", 150, 30, 40, 40); // Adjusted positioning
  //   }

  //   // ✅ Properly Wrapped Delivery Address
  //   const deliveryAddress = `Delivery Address: ${order.deliveryDetails.address}, ${order.deliveryDetails.city}, ${order.deliveryDetails.postalCode}, ${order.deliveryDetails.country}`;
  //   const wrappedAddress = doc.splitTextToSize(deliveryAddress, 180);

  //   wrappedAddress.forEach((line: string) => {
  //     doc.text(line, 14, currentY);
  //     currentY += 7; // Proper spacing
  //   });

  //   currentY += 5; // Extra space before separator
  //   doc.line(14, currentY, 195, currentY); // Separator line

  //   // ✅ Items Table (Using autoTable)
  //   currentY += 5;
  //   autoTable(doc, {
  //     startY: currentY,
  //     theme: "grid",
  //     styles: { fontSize: 10 },
  //     headStyles: { fillColor: [22, 160, 133] }, // Green header
  //     head: [["Item Name", "Quantity", "Price (₹)", "Total (₹)"]],
  //     body: order.cartItems.map((item: any) => [
  //       item?.name || "Unknown",
  //       item?.quantity || "N/A",
  //       `₹${item?.price.toFixed(2) || 0}`,
  //       `₹${(item?.price * item?.quantity).toFixed(2) || 0}`,
  //     ]),
  //   });

  //   // ✅ Position Grand Total Below the Table
  //   const finalY = (doc as any).lastAutoTable?.finalY || currentY + 10;
  //   doc.text(`Grand Total: ₹${order.totalAmount.toFixed(2)}`, 14, finalY + 10);
  //   doc.text("Thank you for your order!", 14, finalY + 20);

  //   // ✅ Save PDF
  //   doc.save(`invoice_${order._id}.pdf`);
  // };

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

  useEffect(() => {
    getRestaurantOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500 text-white";
      case "Confirmed":
        return "bg-blue-500 text-white";
      case "Preparing":
        return "bg-orange-500 text-white";
      case "OutForDelivery":
        return "bg-purple-500 text-white";
      case "Delivered":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 md:mt-17">
      <div className="justify-between items-center flex flex-col md:flex-row">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-10">
          Orders Overview
        </h1>

        <div className="flex items-center mb-10">
          {/* <Button
            onClick={() => generatePDF(restaurantOrder[0])}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Download Invoice
          </Button> */}
          <Button
            onClick={() => downloadAllInvoices(restaurantOrder)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg ml-4"
          >
            Download All Invoices
          </Button>
        </div>
      </div>
      <div className="space-y-8">
        {restaurantOrder.map((order: Orders) => (
          <div
            key={order._id}
            className="flex flex-col md:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex-1 mb-6 sm:mb-0">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {order.deliveryDetails.name} (#{order._id})
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                <span className="font-semibold">Phone: </span>
                {order.deliveryDetails.contact}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-semibold">Email: </span>
                {order.deliveryDetails.email}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                <span className="font-semibold">Address: </span>
                {order.deliveryDetails.address}, {order.deliveryDetails.city},{" "}
                {order.deliveryDetails.country},{" "}
                {order.deliveryDetails.postalCode}
              </p>

              <p className="text-gray-600 dark:text-gray-400 mt-2">
                <span className="font-semibold">Ordered Date: </span>
                {order.orderedDate
                  ? dayjs(order.orderedDate).format("DD/MM/YYYY hh:mm A")
                  : "Not Available"}
              </p>

              <h2 className="text-lg font-bold mt-4">Ordered Items:</h2>
              <ul className="text-gray-600 dark:text-gray-400">
                {order.cartItems.map((item: any) => (
                  <li key={item.id} className="mt-1">
                    {item.name} - {item.quantity} x ₹{item.price}
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 dark:text-gray-400 font-bold text-2xl pt-3">
                Total Amount: ₹
                <span className="text-orange-600 dark:text-orange-400 mt-2">
                  {order.totalAmount}
                </span>
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                <span className="font-semibold">Expected Delivery: </span>
                {order.expectedDeliveryTime || "7 days"}
              </p>
            </div>
            <div className="w-full sm:w-1/3">
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Order Status
              </Label>
              <Select
                onValueChange={(newStatus) =>
                  handleStatusChange(order._id, newStatus)
                }
                defaultValue={order.status}
              >
                <SelectTrigger
                  className={`p-2 rounded ${getStatusColor(order.status)}`}
                >
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {[
                      "Pending",
                      "Confirmed",
                      "Preparing",
                      "OutForDelivery",
                      "Delivered",
                    ].map((status, index) => (
                      <SelectItem key={index} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
