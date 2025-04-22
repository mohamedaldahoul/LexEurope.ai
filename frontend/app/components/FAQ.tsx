import React, { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left font-medium text-gray-900 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`mt-2 transition-all duration-200 overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const faqItems: FAQItemProps[] = [
    {
      question: "Are these legal documents legally binding?",
      answer: "Yes, all our documents are legally binding and enforceable. They are created using the same legal principles and requirements that attorneys use, tailored to your specific jurisdiction and needs."
    },
    {
      question: "How does the AI customize my document?",
      answer: "Our advanced AI analyzes your inputs about your business, jurisdiction, and specific requirements. It then generates a document that incorporates relevant legal provisions, state-specific requirements, and your custom clauses."
    },
    {
      question: "Can I edit the document after it's generated?",
      answer: "Yes, you receive your document in both PDF and editable Word format, allowing you to make any additional changes you need. However, our AI customization is comprehensive enough that most clients use the documents as-is."
    },
    {
      question: "How does your service compare to hiring a lawyer?",
      answer: "Our service provides professionally drafted legal documents at a fraction of the cost of hiring an attorney. While we cannot provide legal advice for your specific situation, our documents are created using the same legal standards and requirements that attorneys follow."
    },
    {
      question: "What if I need help with my document?",
      answer: "We offer one free revision with your purchase. If you need additional assistance, our customer support team is available to help with technical questions about your document."
    },
    {
      question: "How quickly will I receive my document?",
      answer: "You'll receive your custom legal document within minutes of completing your purchase. Our AI technology works instantly to generate your document based on your specifications."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">Frequently Asked Questions</h2>
        <p className="text-center text-gray-600 mb-12">Everything you need to know about our legal document service</p>
        
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
          {faqItems.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600">Still have questions?</p>
          <a href="#" className="text-primary font-medium hover:underline">Contact our support team</a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;