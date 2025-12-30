import React from "react";
import BenefitCard from "./BenefitsCard";

// example images
import trackingImg from "../../../assets/live-tracking.png";
import saveDeliveryImg from "../../../assets/safe-delivery.png";
import callCenterImg from "../../../assets/safe-delivery.png";

const benefits = [
  {
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: trackingImg,
  },
  {
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: saveDeliveryImg,
  },
  {
    title: "24/7 Call Center",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: callCenterImg,
  },
];

const Benefits = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-primary">Why Choose Us</h2>

        <div className="flex flex-col gap-6">
          {benefits.map((benefit, idx) => (
            <BenefitCard
              key={idx}
              image={benefit.image}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Benefits;
