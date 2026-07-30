import type { FAQ } from "@/types";

export const faqs: FAQ[] = [
  {
    id: "faq-1",
    question: "Can I reserve a car online before visiting the showroom?",
    answer:
      "Yes. Every listing has a Reserve button that holds the vehicle for 48 hours with a fully refundable deposit while you arrange a viewing or delivery.",
    category: "reservation",
    order: 1,
  },
  {
    id: "faq-2",
    question: "Do you offer financing on certified pre-owned vehicles?",
    answer:
      "We work with a panel of luxury-specialist lenders and can typically provide indicative financing terms within one business day of your enquiry.",
    category: "financing",
    order: 2,
  },
  {
    id: "faq-3",
    question: "Is every vehicle independently inspected before listing?",
    answer:
      "Every car undergoes a 150-point inspection by a brand-trained technician, and the full report is available on request before you commit to a purchase.",
    category: "general",
    order: 3,
  },
  {
    id: "faq-4",
    question: "Can you deliver the car to my home or office?",
    answer:
      "White-glove delivery is available nationwide. Most metro deliveries arrive within 3-5 business days of your purchase being finalized.",
    category: "general",
    order: 4,
  },
  {
    id: "faq-5",
    question: "Do you accept trade-ins toward a purchase?",
    answer:
      "Yes — share your current vehicle's details in the reservation form and our team will provide a no-obligation valuation alongside your quote.",
    category: "financing",
    order: 5,
  },
  {
    id: "faq-6",
    question: "What after-sales servicing do you provide?",
    answer:
      "All purchases include a complimentary first service and access to our concierge service-booking line for the lifetime of your ownership.",
    category: "service",
    order: 6,
  },
];
