import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/Zustand Store/useCartStore";
import { useOrderStore } from "@/Zustand Store/useOrderStore";
import dayjs from "dayjs";
import { Building2, Download, Mail, MapPin, Phone, ReceiptText, ShieldCheck, Store, Truck } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const companyDetails = {
  name: "ZaykaHub Restaurants Pvt. Ltd.",
  tagline: "Fresh food, fast delivery, trusted service.",
  gstin: "GSTIN: 22AAAAA0000A1Z5",
  supportEmail: "support@zaykahub.com",
  supportPhone: "+91 98765 43210",
  website: "www.zaykahub.com",
  address: "Sector 62, Noida, Uttar Pradesh, India",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);

const formatPdfCurrency = (value: number) => `Rs. ${value.toFixed(2)}`;

const buildSummary = (order: any) => {
  const itemsTotal = order.cartItems.reduce(
    (acc: number, item: any) => acc + Number(item.price) * Number(item.quantity),
    0
  );

  return {
    itemsTotal,
    grandTotal: Number(order.totalAmount || itemsTotal),
    gstNote: "GST and applicable charges are already reflected in the payment amount.",
  };
};

const SuccessOrder = () => {
  const { clearCart } = useCartStore();
  const { orders, getOrderDetails } = useOrderStore();

  useEffect(() => {
    clearCart();
    getOrderDetails();
  }, [clearCart, getOrderDetails]);

  const latestOrder = useMemo(() => orders?.[0] || null, [orders]);
  const activeOrder = latestOrder || orders[0];
  const orderView = activeOrder as any;

  if (!orders || orders.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-white to-amber-100 px-4 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
        <div className="max-w-md rounded-3xl border border-orange-200 bg-white p-8 text-center shadow-2xl dark:border-orange-950 dark:bg-neutral-900">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-3xl text-orange-600 dark:bg-orange-950 dark:text-orange-200">
            <ReceiptText className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Invoice is being prepared
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Your payment is complete. If the order list is still loading, refresh once after a few seconds.
          </p>
        </div>
      </div>
    );
  }

  const generatePDF = async (order: any) => {
    const doc = new jsPDF();
    const summary = buildSummary(order);

    doc.setFillColor(17, 24, 39);
    doc.rect(0, 0, 210, 42, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("ZaykaHub Restaurant Invoice", 14, 16);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(companyDetails.tagline, 14, 24);
    doc.text(companyDetails.website, 14, 31);

    doc.setFontSize(9);
    doc.text(`Invoice No: ${order._id}`, 150, 14, { align: "left" });
    doc.text(`Order Date: ${dayjs(order.orderedDate).format("DD/MM/YYYY hh:mm A")}`, 150, 20, {
      align: "left",
    });
    doc.text(`Status: ${order.status}`, 150, 26, { align: "left" });
    doc.text(`Payment: ${order.paymentMethod || "Card"}`, 150, 32, { align: "left" });

    let currentY = 50;
    doc.setTextColor(31, 41, 55);

    doc.setFillColor(255, 247, 237);
    doc.roundedRect(14, currentY, 182, 28, 4, 4, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(companyDetails.name, 18, currentY + 8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(companyDetails.gstin, 18, currentY + 14);
    doc.text(companyDetails.supportEmail, 18, currentY + 20);

    currentY += 38;

    doc.setFillColor(249, 250, 251);
    doc.roundedRect(14, currentY, 182, 42, 4, 4, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Bill To", 18, currentY + 8);
    doc.text("Order Meta", 108, currentY + 8);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`${order.deliveryDetails.name || "N/A"}`, 18, currentY + 16);
    doc.text(`${order.deliveryDetails.email || "N/A"}`, 18, currentY + 22);
    doc.text(`${order.deliveryDetails.contact || "N/A"}`, 18, currentY + 28);
    doc.text(`${order.restaurant?.restaurantName || "ZaykaHub Partner Restaurant"}`, 108, currentY + 16);
    doc.text(`${order.deliveryDetails.city || ""} ${order.deliveryDetails.postalCode || ""}`, 108, currentY + 22);
    doc.text(`${order.deliveryDetails.address || ""}`, 108, currentY + 28);

    currentY += 54;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Itemized Bill", 14, currentY);

    const itemRows = order.cartItems.map((item: any) => [
      item.name,
      String(item.quantity),
      formatCurrency(Number(item.price)),
      formatCurrency(Number(item.price) * Number(item.quantity)),
    ]);

    autoTable(doc, {
      startY: currentY + 5,
      theme: "grid",
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [249, 115, 22] },
      head: [["Item", "Qty", "Unit Price", "Line Total"]],
      body: itemRows,
    });

    const finalY = (doc as any).lastAutoTable?.finalY || currentY + 35;
    const taxAmount = Number((summary.itemsTotal * 0.05).toFixed(2));
    const packaging = Number((summary.itemsTotal * 0.02).toFixed(2));
    const totalBoxY = finalY + 10;

    doc.setFillColor(255, 247, 237);
    doc.roundedRect(14, totalBoxY, 182, 40, 4, 4, "F");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`Items Subtotal`, 18, totalBoxY + 10);
    doc.text(formatPdfCurrency(summary.itemsTotal), 180, totalBoxY + 10, { align: "right" });
    doc.text(`GST @ 5% (included)`, 18, totalBoxY + 18);
    doc.text(formatPdfCurrency(taxAmount), 180, totalBoxY + 18, { align: "right" });
    doc.text(`Packaging`, 18, totalBoxY + 26);
    doc.text(formatPdfCurrency(packaging), 180, totalBoxY + 26, { align: "right" });
    doc.setFont("helvetica", "bold");
    doc.text(`Grand Total`, 18, totalBoxY + 35);
    doc.text(formatPdfCurrency(summary.grandTotal), 180, totalBoxY + 35, { align: "right" });

    doc.setFontSize(8);
    doc.setTextColor(107, 114, 128);
    doc.text(companyDetails.address, 14, totalBoxY + 50);
    doc.text(`Support: ${companyDetails.supportPhone} | ${companyDetails.supportEmail}`, 14, totalBoxY + 55);

    doc.save(`invoice_${order._id}.pdf`);
  };

  const downloadAllInvoices = async (ordersList: any[]) => {
    const zip = new JSZip();

    for (const order of ordersList) {
      const doc = new jsPDF();
      const summary = buildSummary(order);

      doc.setFillColor(17, 24, 39);
      doc.rect(0, 0, 210, 42, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text("ZaykaHub Restaurant Invoice", 14, 16);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(companyDetails.website, 14, 31);

      doc.setFontSize(9);
      doc.text(`Invoice No: ${order._id}`, 150, 14);
      doc.text(`Order Date: ${dayjs(order.orderedDate).format("DD/MM/YYYY hh:mm A")}`, 150, 20);
      doc.text(`Status: ${order.status}`, 150, 26);
      doc.text(`Payment: ${order.paymentMethod || "Card"}`, 150, 32);

      let currentY = 50;
      doc.setTextColor(31, 41, 55);
      doc.setFillColor(255, 247, 237);
      doc.roundedRect(14, currentY, 182, 28, 4, 4, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(companyDetails.name, 18, currentY + 8);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(companyDetails.gstin, 18, currentY + 14);
      doc.text(companyDetails.supportEmail, 18, currentY + 20);

      currentY += 38;
      doc.setFillColor(249, 250, 251);
      doc.roundedRect(14, currentY, 182, 42, 4, 4, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("Bill To", 18, currentY + 8);
      doc.text("Order Meta", 108, currentY + 8);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(`${order.deliveryDetails.name || "N/A"}`, 18, currentY + 16);
      doc.text(`${order.deliveryDetails.email || "N/A"}`, 18, currentY + 22);
      doc.text(`${order.deliveryDetails.contact || "N/A"}`, 18, currentY + 28);
      doc.text(`${order.restaurant?.restaurantName || "ZaykaHub Partner Restaurant"}`, 108, currentY + 16);
      doc.text(`${order.deliveryDetails.city || ""} ${order.deliveryDetails.postalCode || ""}`, 108, currentY + 22);
      doc.text(`${order.deliveryDetails.address || ""}`, 108, currentY + 28);

      currentY += 54;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("Itemized Bill", 14, currentY);

      autoTable(doc, {
        startY: currentY + 5,
        theme: "grid",
        styles: { fontSize: 9, cellPadding: 3 },
        headStyles: { fillColor: [249, 115, 22] },
        head: [["Item", "Qty", "Unit Price", "Line Total"]],
        body: order.cartItems.map((item: any) => [
          item.name,
          String(item.quantity),
          formatCurrency(Number(item.price)),
          formatCurrency(Number(item.price) * Number(item.quantity)),
        ]),
      });

      const finalY = (doc as any).lastAutoTable?.finalY || currentY + 35;
      const taxAmount = Number((summary.itemsTotal * 0.05).toFixed(2));
      const packaging = Number((summary.itemsTotal * 0.02).toFixed(2));
      const totalBoxY = finalY + 10;

      doc.setFillColor(255, 247, 237);
      doc.roundedRect(14, totalBoxY, 182, 40, 4, 4, "F");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(`Items Subtotal`, 18, totalBoxY + 10);
      doc.text(formatPdfCurrency(summary.itemsTotal), 180, totalBoxY + 10, { align: "right" });
      doc.text(`GST @ 5% (included)`, 18, totalBoxY + 18);
      doc.text(formatPdfCurrency(taxAmount), 180, totalBoxY + 18, { align: "right" });
      doc.text(`Packaging`, 18, totalBoxY + 26);
      doc.text(formatPdfCurrency(packaging), 180, totalBoxY + 26, { align: "right" });
      doc.setFont("helvetica", "bold");
      doc.text(`Grand Total`, 18, totalBoxY + 35);
      doc.text(formatPdfCurrency(summary.grandTotal), 180, totalBoxY + 35, { align: "right" });

      const pdfBlob = doc.output("blob");
      zip.file(`invoice_${order._id}.pdf`, pdfBlob);
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, "All_Invoices.zip");
  };

  const activeSummary = buildSummary(activeOrder);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-100 px-4 py-8 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 md:px-6">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6 overflow-hidden rounded-[2rem] border border-orange-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:border-orange-950 dark:bg-neutral-900">
          <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-orange-600 px-6 py-6 text-white md:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-2xl font-bold ring-1 ring-white/20">
                  ZH
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-orange-100/90">
                    Tax Invoice
                  </p>
                  <h1 className="text-2xl font-bold md:text-3xl">
                    {companyDetails.name}
                  </h1>
                  <p className="mt-1 text-sm text-white/80">
                    {companyDetails.tagline}
                  </p>
                </div>
              </div>
              <div className="grid gap-2 text-sm text-white/85 md:text-right">
                <div className="inline-flex items-center gap-2 md:justify-end">
                  <ShieldCheck className="h-4 w-4" /> Secure payment confirmed
                </div>
                <div className="inline-flex items-center gap-2 md:justify-end">
                  <Store className="h-4 w-4" /> {companyDetails.website}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-[1.3fr_0.9fr] md:p-8">
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-neutral-950/60">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Company Details
                  </p>
                  <div className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                    <p className="font-semibold text-gray-900 dark:text-white">{companyDetails.name}</p>
                    <p className="flex items-center gap-2"><Building2 className="h-4 w-4 text-orange-500" /> {companyDetails.gstin}</p>
                    <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-orange-500" /> {companyDetails.supportEmail}</p>
                    <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-orange-500" /> {companyDetails.supportPhone}</p>
                    <p className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-orange-500" /> {companyDetails.address}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-neutral-950/60">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Order Summary
                  </p>
                  <div className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                    <p><span className="font-semibold">Invoice No:</span> {activeOrder._id}</p>
                    <p><span className="font-semibold">Order Status:</span> {activeOrder.status}</p>
                    <p><span className="font-semibold">Payment:</span> {orderView.paymentMethod || "Card"}</p>
                    <p><span className="font-semibold">Order Date:</span> {dayjs(activeOrder.orderedDate).format("DD/MM/YYYY hh:mm A")}</p>
                    <p className="flex items-center gap-2 text-orange-600 dark:text-orange-300"><Truck className="h-4 w-4" /> Delivery and taxes are included in the invoice view.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-neutral-950">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Billing To
                    </p>
                    <h2 className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
                      {activeOrder.deliveryDetails.name}
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      {activeOrder.deliveryDetails.address}, {activeOrder.deliveryDetails.city}, {activeOrder.deliveryDetails.postalCode}, {activeOrder.deliveryDetails.country}
                    </p>
                  </div>

                  <div className="rounded-xl bg-orange-50 px-4 py-3 text-sm text-orange-700 dark:bg-orange-950 dark:text-orange-200">
                    <p className="font-semibold">Restaurant</p>
                    <p>{orderView.restaurant?.restaurantName || "ZaykaHub Partner Restaurant"}</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-gray-50 p-4 dark:bg-neutral-900/70">
                    <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Items Total</p>
                    <p className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                      Rs. {activeSummary.itemsTotal.toFixed(2)}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-gray-50 p-4 dark:bg-neutral-900/70">
                    <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">GST / Taxes</p>
                    <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                      Included in final amount
                    </p>
                  </div>
                  <div className="rounded-2xl bg-gray-50 p-4 dark:bg-neutral-900/70">
                    <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Grand Total</p>
                    <p className="mt-1 text-xl font-bold text-orange-600 dark:text-orange-300">
                      Rs. {activeSummary.grandTotal.toFixed(2)}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                  {activeSummary.gstNote}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-neutral-950/60">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                    Line Items
                  </h3>
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-950 dark:text-orange-200">
                    {activeOrder.cartItems.length} items
                  </span>
                </div>

                <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
                  {activeOrder.cartItems.map((item: any, index: number) => {
                    const lineTotal = Number(item.price) * Number(item.quantity);

                    return (
                      <div
                        key={`${item.menuId}-${index}`}
                        className="flex gap-3 rounded-2xl border border-white/70 bg-white p-3 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 rounded-xl object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="truncate font-semibold text-gray-900 dark:text-white">
                                {item.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Qty {item.quantity} • Unit Rs. {Number(item.price).toFixed(2)}
                              </p>
                            </div>
                            <p className="font-semibold text-orange-600 dark:text-orange-300">
                              {formatCurrency(lineTotal)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-100 p-4 shadow-sm dark:border-orange-950 dark:from-orange-950 dark:to-neutral-900">
                <div className="flex items-center gap-2 text-orange-700 dark:text-orange-200">
                  <ReceiptText className="h-4 w-4" />
                  <p className="text-sm font-semibold">Invoice Actions</p>
                </div>
                <div className="mt-4 space-y-3">
                  <Button onClick={() => void generatePDF(activeOrder)} className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    <Download className="mr-2 h-4 w-4" /> Download Invoice
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => void downloadAllInvoices(orders)}
                    className="w-full border-gray-300 bg-white hover:bg-gray-100 dark:border-gray-700 dark:bg-neutral-950 dark:hover:bg-neutral-900"
                  >
                    Download All Invoices
                  </Button>
                  <Link to="/cart" className="block">
                    <Button className="w-full bg-gray-900 hover:bg-black text-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessOrder;