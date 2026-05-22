import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const termsData = [
  {
    title: "Introduction",
    content: "Welcome to Zayka Hub. By accessing or using our food ordering platform, you agree to comply with these Terms & Conditions.",
  },
  {
    title: "Account Registration & Security",
    content:
      "Users must provide accurate details while creating an account. Any unauthorized activity should be reported immediately.",
  },
  {
    title: "Ordering Process",
    content: "Orders can be placed from our listed restaurants. Once confirmed, cancellation policies apply.",
  },
  {
    title: "Payments & Charges",
    content: "We accept multiple payment methods including Credit/Debit Cards, UPI, Wallets, and Cash on Delivery.",
  },
  {
    title: "Cancellation & Refunds",
    content:
      "Orders can be canceled before preparation starts. Refunds for prepaid orders take up to 7 business days.",
  },
  {
    title: "Loyalty Points & Rewards",
    content: "Earn reward points on every order, which can be redeemed but not exchanged for cash.",
  },
  {
    title: "User Conduct",
    content: "Users should not engage in abusive behavior, fake orders, or misuse of promotions.",
  },
  {
    title: "Restaurant & Vendor Responsibilities",
    content: "Restaurants must ensure fresh and hygienic food, and honor listed prices.",
  },
  {
    title: "Third-Party Integrations",
    content: "We integrate with payment gateways and delivery partners but are not liable for their failures.",
  },
  {
    title: "Delivery Terms",
    content: "Delivery times are estimates and may be affected by weather, traffic, or restaurant delays.",
  },
  {
    title: "Force Majeure",
    content: "We are not responsible for service delays due to natural disasters, strikes, or government restrictions.",
  },
  {
    title: "Privacy & Data Protection",
    content: "Your data is protected and used according to our Privacy Policy.",
  },
  {
    title: "Dispute Resolution & Legal Jurisdiction",
    content: "All disputes will be handled under the jurisdiction of the applicable legal authority.",
  },
  {
    title: "Amendments to Terms & Conditions",
    content: "We reserve the right to update these terms at any time. Continued use implies acceptance.",
  },
  {
    title: "Contact Us",
    content: "For any queries, contact us at support@zaykahub.com",
  },
];

const TermsAndConditions = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold text-center mb-8">Terms & Conditions</h1>

      {termsData.map((section, index) => (
        <div key={index} className="border-b border-gray-300 dark:border-gray-600 py-3">
          <button
            onClick={() => toggleSection(index)}
            className="w-full flex justify-between items-center text-lg font-semibold py-3 focus:outline-none"
          >
            {section.title}
            <ChevronDown
              className={`transition-transform ${openIndex === index ? "rotate-180" : "rotate-0"}`}
            />
          </button>
          {openIndex === index && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-2 text-gray-600 dark:text-gray-400"
            >
              {section.content}
            </motion.div>
          )}
        </div>
      ))}

      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-6">
        Last Updated: DD/MM/YYYY
      </p>
    </div>
  );
};

export default TermsAndConditions;
