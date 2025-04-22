import React from 'react';
import Image from 'next/image';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatarUrl?: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, role, company, avatarUrl }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-start mb-4">
        <div className="text-4xl text-primary mr-3">"</div>
        <p className="italic text-gray-700">{quote}</p>
      </div>
      <div className="flex items-center mt-4">
        {avatarUrl ? (
          <div className="mr-3 rounded-full overflow-hidden h-12 w-12 flex-shrink-0">
            <Image 
              src={avatarUrl} 
              alt={author} 
              width={48} 
              height={48} 
              className="object-cover"
            />
          </div>
        ) : (
          <div className="mr-3 rounded-full bg-gray-200 h-12 w-12 flex items-center justify-center flex-shrink-0">
            <span className="text-gray-500 text-lg font-semibold">{author.charAt(0)}</span>
          </div>
        )}
        <div>
          <div className="font-semibold">{author}</div>
          <div className="text-sm text-gray-600">
            {role}{company ? `, ${company}` : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const testimonials: TestimonialProps[] = [
    {
      quote: "The document I received was perfectly tailored to my business needs. Saved me thousands in legal fees and hours of time.",
      author: "Sarah Johnson",
      role: "Founder",
      company: "Bright Ideas LLC"
    },
    {
      quote: "I was skeptical about AI-generated legal documents, but I was blown away by the quality. It's comprehensive and professional.",
      author: "Michael Chen",
      role: "CEO",
      company: "TechStart Solutions"
    },
    {
      quote: "As a small business owner, legal documents were always a headache. This service made it incredibly simple and affordable.",
      author: "Jessica Williams",
      role: "Owner",
      company: "Coastal Designs"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">What Our Customers Say</h2>
        <p className="text-center text-gray-600 mb-12">Join thousands of satisfied business owners who trust our legal documents</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center space-x-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="font-bold">4.9/5</span>
            <span className="text-gray-600">(500+ reviews)</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;