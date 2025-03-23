import { useState } from "react";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";
import { Separator } from "../ui/separator";

const FAQSection = () => {
  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "Simply browse through the restaurants, add your favorite dishes to the cart, and proceed to checkout. Choose your payment method, and your food will be on the way!",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept credit/debit cards, UPI, net banking, and cash on delivery, depending on the restaurant.",
    },
    {
      question: "Can I track my order?",
      answer:
        "Yes! Once you place an order, you can track it in real-time from the 'My Orders' section.",
    },
    {
      question: "What if I receive the wrong order?",
      answer:
        "If you receive an incorrect order, contact our support team immediately through the 'Help' section. We will resolve the issue as soon as possible.",
    },
    {
      question: "Is there a delivery charge?",
      answer:
        "Delivery charges vary depending on the restaurant and distance. You can check the charges before placing an order.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible>
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <button
              onClick={() => toggleAccordion(index)}
              className="flex justify-between w-full p-4 text-lg font-medium bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-md mb-2"
            >
              {faq.question}
              <ChevronDown
                className={`transition-transform text-gray-600 dark:text-gray-300 ${
                  activeIndex === index ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            {activeIndex === index && (
              <div className="p-4 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-md">
                {faq.answer}
              </div>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </div>

    <Separator className="my-8" />
    </>
  );
};

export default FAQSection;
