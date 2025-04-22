import React from 'react';

interface PricingTierProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  onClick?: () => void;
}

const PricingTier: React.FC<PricingTierProps> = ({
  name,
  price,
  description,
  features,
  isPopular = false,
  buttonText,
  onClick
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${isPopular ? 'border-2 border-primary ring-2 ring-primary/20' : 'border border-gray-200'}`}>
      {isPopular && (
        <div className="bg-primary text-white text-center py-1 text-sm font-medium">
          MOST POPULAR
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="mb-4">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-gray-500"> / document</span>
        </div>
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={onClick}
          className={`w-full py-3 px-4 rounded-md font-bold transition duration-200 ${isPopular ? 'bg-primary hover:bg-primary/90 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

const Pricing: React.FC = () => {
  const tiers: PricingTierProps[] = [
    {
      name: "Basic",
      price: "$19",
      description: "Essential legal protection for small businesses",
      features: [
        "AI-customized document",
        "PDF format",
        "State-specific compliance",
        "Basic clauses included",
        "24-hour email support"
      ],
      buttonText: "Get Started"
    },
    {
      name: "Professional",
      price: "$39",
      description: "Comprehensive protection for growing businesses",
      features: [
        "Everything in Basic",
        "PDF + Word formats",
        "Advanced clauses included",
        "1 free revision",
        "Priority email support",
        "30-day update guarantee"
      ],
      isPopular: true,
      buttonText: "Select Plan"
    },
    {
      name: "Enterprise",
      price: "$79",
      description: "Maximum legal protection for established businesses",
      features: [
        "Everything in Professional",
        "All premium clauses included",
        "3 free revisions",
        "Phone support",
        "90-day update guarantee",
        "Legal review by AI assistant"
      ],
      buttonText: "Contact Sales"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">Simple, Transparent Pricing</h2>
        <p className="text-center text-gray-600 mb-12">Choose the plan that fits your business needs</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <PricingTier key={index} {...tier} />
          ))}
        </div>
        
        <div className="mt-12 text-center text-gray-600">
          <p>All plans include:</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-2">
            <div className="flex items-center">
              <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Secure payment</span>
            </div>
            <div className="flex items-center">
              <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Instant delivery</span>
            </div>
            <div className="flex items-center">
              <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Money-back guarantee</span>
            </div>
            <div className="flex items-center">
              <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>No subscription</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;