'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
// import Image from 'next/image';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Pricing from './components/Pricing';
import Features from './components/Features';

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    documentType: '',
    businessName: '',
    businessType: '',
    state: '',
    industry: '',
    protectionLevel: 'standard',
    specialClauses: [],
    additionalInstructions: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => {
      const currentClauses = [...prev.specialClauses] as string[];
      if (checked) {
        currentClauses.push(name);
      } else {
        const index = currentClauses.indexOf(name);
        if (index > -1) {
          currentClauses.splice(index, 1);
        }
      }
      return {
        ...prev,
        specialClauses: currentClauses
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    try {
      // Import is inside the function to avoid issues with SSR
      const { createCheckoutSession } = await import('./api/documentService');
      
      // Create a checkout session with Stripe
      const result = await createCheckoutSession(formData);
      
      if ('error' in result) {
        throw new Error(result.error);
      }
      
      // Redirect to Stripe checkout
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');
      if (stripe) {
        await stripe.redirectToCheckout({
          sessionId: result.sessionId
        });
      } else {
        throw new Error('Failed to load Stripe');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setIsGenerating(false);
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to process payment'}`);
    }
  };
  
  // This function would be called after successful payment
  const generateDocumentAfterPayment = async (sessionId: string) => {
    try {
      // Here you would verify the payment and generate the document
      // For now, we'll just simulate the process
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        alert('Document generated successfully!');
      }, 2000);
    } catch (error) {
      console.error('Document generation error:', error);
      setIsGenerating(false);
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to generate document'}`);
    }
  };

  const documentTypes = [
    { value: 'nda', label: 'Non-Disclosure Agreement (NDA)' },
    { value: 'terms', label: 'Website Terms of Service' },
    { value: 'privacy', label: 'Privacy Policy' },
    { value: 'contract', label: 'Freelance Contract' },
    { value: 'employee', label: 'Employment Agreement' },
    { value: 'partnership', label: 'Partnership Agreement' }
  ];

  const states = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'NY', label: 'New York' },
    { value: 'TX', label: 'Texas' }
    // Add more states as needed
  ];

  const industries = [
    { value: 'tech', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance' },
    { value: 'education', label: 'Education' },
    { value: 'retail', label: 'Retail' },
    { value: 'manufacturing', label: 'Manufacturing' }
    // Add more industries as needed
  ];

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <div className="text-4xl mb-4">⚖️</div>
        <h1 className="text-2xl font-bold mb-4">Generating Your Legal Document</h1>
        <p className="text-lg mb-8">Our AI is crafting a custom document tailored to your needs.</p>
        <div className="animate-pulse text-xl italic mb-8">"Turning legal jargon into plain English..."</div>
        <p>This may take up to 2 minutes. Thank you for your patience!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="gradient-background text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AI-Generated Legal Documents</h1>
          <p className="text-xl mb-8">Tailored to Your Business</p>
          <p className="text-lg max-w-3xl mx-auto mb-8">
            Our AI technology creates custom legal documents instantly. No lawyers, no waiting, no excessive fees.
            Get exactly what you need in minutes, not days.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center">
              <div className="mr-2 text-2xl">✓</div>
              <div>AI-Powered Customization for Your Specific Business</div>
            </div>
            <div className="flex items-center">
              <div className="mr-2 text-2xl">✓</div>
              <div>Instant Download - Ready in 2 Minutes</div>
            </div>
            <div className="flex items-center">
              <div className="mr-2 text-2xl">✓</div>
              <div>Save $500+ Compared to Traditional Legal Services</div>
            </div>
            <div className="flex items-center">
              <div className="mr-2 text-2xl">✓</div>
              <div>State-Specific Legal Compliance Built In</div>
            </div>
          </div>
        </div>
      </header>

      {/* Form Section */}
      <section className="py-16 gradient-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto card-glass overflow-hidden">
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Generate Your Custom Legal Document</h2>
              
              <div className="countdown-container text-center mb-6">
                <p className="font-bold mb-3 text-gray-800 text-lg">24-HOUR SPECIAL PRICE ENDS IN:</p>
                <div className="countdown-timer">
                  <div className="countdown-box">
                    <div className="countdown-value">07</div>
                    <div className="countdown-label">HOURS</div>
                  </div>
                  <div className="countdown-box">
                    <div className="countdown-value">23</div>
                    <div className="countdown-label">MINS</div>
                  </div>
                  <div className="countdown-box">
                    <div className="countdown-value">41</div>
                    <div className="countdown-label">SECS</div>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="form-container p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">Document Type</label>
                    <select
                      name="documentType"
                      value={formData.documentType}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select a document type</option>
                      {documentTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">Business Name</label>
                      <input 
                        type="text" 
                        name="businessName" 
                        value={formData.businessName} 
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">Business Type</label>
                      <input 
                        type="text" 
                        name="businessType" 
                        value={formData.businessType} 
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="LLC, Corporation, Sole Proprietor, etc."
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">State/Jurisdiction</label>
                      <select 
                        name="state" 
                        value={formData.state} 
                        onChange={handleInputChange}
                        className="form-select"
                        required
                      >
                        <option value="">Select a state</option>
                        {states.map(state => (
                          <option key={state.value} value={state.value}>{state.label}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">Industry</label>
                      <select 
                        name="industry" 
                        value={formData.industry} 
                        onChange={handleInputChange}
                        className="form-select"
                        required
                      >
                        <option value="">Select an industry</option>
                        {industries.map(industry => (
                          <option key={industry.value} value={industry.value}>{industry.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">Document Protection Level</label>
                    <div className="flex flex-col md:flex-row gap-4 mt-2">
                      <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4 cursor-pointer transition-all hover:border-primary relative overflow-hidden"
                           onClick={() => setFormData({...formData, protectionLevel: 'standard'})}
                      >
                        <div className={`absolute top-2 right-2 w-5 h-5 rounded-full border ${formData.protectionLevel === 'standard' ? 'bg-primary border-primary' : 'border-gray-400'}`}>
                          {formData.protectionLevel === 'standard' && (
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold mb-1 text-gray-800">Standard</h3>
                        <p className="text-sm text-gray-600">Basic legal protection for your business</p>
                      </div>
                      
                      <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4 cursor-pointer transition-all hover:border-primary relative overflow-hidden"
                           onClick={() => setFormData({...formData, protectionLevel: 'comprehensive'})}
                      >
                        <div className={`absolute top-2 right-2 w-5 h-5 rounded-full border ${formData.protectionLevel === 'comprehensive' ? 'bg-primary border-primary' : 'border-gray-400'}`}>
                          {formData.protectionLevel === 'comprehensive' && (
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold mb-1 text-gray-800">Comprehensive</h3>
                        <p className="text-sm text-gray-600">Enhanced protection with additional clauses</p>
                      </div>
                      
                      <div className="flex-1 border border-[rgba(255,255,255,0.1)] rounded-lg p-4 cursor-pointer transition-all hover:border-primary relative overflow-hidden"
                           onClick={() => setFormData({...formData, protectionLevel: 'maximum'})}
                      >
                        <div className={`absolute top-2 right-2 w-5 h-5 rounded-full border ${formData.protectionLevel === 'maximum' ? 'bg-primary border-primary' : 'border-white'}`}>
                          {formData.protectionLevel === 'maximum' && (
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold mb-1 text-white">Maximum</h3>
                        <p className="text-sm text-gray-300">Complete legal protection for your business</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">Special Clauses (Optional)</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                      <div 
                        className={`bg-white border ${formData.specialClauses.includes('nonCompete') ? 'border-primary' : 'border-gray-200'} rounded-lg p-3 cursor-pointer transition-all hover:border-primary relative`}
                        onClick={(e) => {
                          const fakeEvent = { target: { name: 'nonCompete', checked: !formData.specialClauses.includes('nonCompete') } } as React.ChangeEvent<HTMLInputElement>;
                          handleCheckboxChange(fakeEvent);
                        }}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.specialClauses.includes('nonCompete') ? 'bg-primary border-primary' : 'border-gray-400'}`}>
                            {formData.specialClauses.includes('nonCompete') && (
                              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 2 2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className="ml-2 text-gray-800">Non-Compete Clause</span>
                        </div>
                      </div>
                      
                      <div 
                        className={`bg-white border ${formData.specialClauses.includes('enhancedConfidentiality') ? 'border-primary' : 'border-gray-200'} rounded-lg p-3 cursor-pointer transition-all hover:border-primary relative`}
                        onClick={(e) => {
                          const fakeEvent = { target: { name: 'enhancedConfidentiality', checked: !formData.specialClauses.includes('enhancedConfidentiality') } } as React.ChangeEvent<HTMLInputElement>;
                          handleCheckboxChange(fakeEvent);
                        }}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.specialClauses.includes('enhancedConfidentiality') ? 'bg-primary border-primary' : 'border-gray-400'}`}>
                            {formData.specialClauses.includes('enhancedConfidentiality') && (
                              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className="ml-2 text-gray-800">Enhanced Confidentiality</span>
                        </div>
                      </div>
                      
                      <div 
                        className={`bg-white border ${formData.specialClauses.includes('arbitrationProvision') ? 'border-primary' : 'border-gray-200'} rounded-lg p-3 cursor-pointer transition-all hover:border-primary relative`}
                        onClick={(e) => {
                          const fakeEvent = { target: { name: 'arbitrationProvision', checked: !formData.specialClauses.includes('arbitrationProvision') } } as React.ChangeEvent<HTMLInputElement>;
                          handleCheckboxChange(fakeEvent);
                        }}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.specialClauses.includes('arbitrationProvision') ? 'bg-primary border-primary' : 'border-gray-400'}`}>
                            {formData.specialClauses.includes('arbitrationProvision') && (
                              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className="ml-2 text-gray-800">Arbitration Provision</span>
                        </div>
                      </div>
                      
                      <div 
                        className={`bg-white border ${formData.specialClauses.includes('internationalCompliance') ? 'border-primary' : 'border-gray-200'} rounded-lg p-3 cursor-pointer transition-all hover:border-primary relative`}
                        onClick={(e) => {
                          const fakeEvent = { target: { name: 'internationalCompliance', checked: !formData.specialClauses.includes('internationalCompliance') } } as React.ChangeEvent<HTMLInputElement>;
                          handleCheckboxChange(fakeEvent);
                        }}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.specialClauses.includes('internationalCompliance') ? 'bg-primary border-primary' : 'border-gray-400'}`}>
                            {formData.specialClauses.includes('internationalCompliance') && (
                              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className="ml-2 text-gray-800">International Compliance</span>
                        </div>
                      </div>
                      
                      <div 
                        className={`bg-white border ${formData.specialClauses.includes('intellectualProperty') ? 'border-primary' : 'border-gray-200'} rounded-lg p-3 cursor-pointer transition-all hover:border-primary relative`}
                        onClick={(e) => {
                          const fakeEvent = { target: { name: 'intellectualProperty', checked: !formData.specialClauses.includes('intellectualProperty') } } as React.ChangeEvent<HTMLInputElement>;
                          handleCheckboxChange(fakeEvent);
                        }}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.specialClauses.includes('intellectualProperty') ? 'bg-primary border-primary' : 'border-gray-400'}`}>
                            {formData.specialClauses.includes('intellectualProperty') && (
                              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className="ml-2 text-gray-800">Intellectual Property Protection</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Additional Instructions (Optional)</label>
                    <textarea
                      name="additionalInstructions"
                      value={formData.additionalInstructions}
                      onChange={handleInputChange}
                      placeholder="Add any specific requirements or details you want included in your document"
                      className="form-input h-32 bg-white text-gray-900"
                    ></textarea>
                  </div>

                  <div className="mt-8 text-center">
                    <div className="mb-4">
                      <div className="text-3xl font-bold text-gray-800">$19</div>
                      <div className="text-sm text-gray-600">per document</div>
                      <div className="text-sm mt-1 text-orange-500 font-semibold">Regular price: $39 - Save 50% today!</div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="ml-2 text-gray-700">Enhanced document customization</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="ml-2 text-gray-700">PDF + Word formats</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="ml-2 text-gray-700">1 free revision</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="ml-2 text-gray-700">Special clauses included</span>
                      </div>
                    </div>
                    
                    <div className="text-center text-sm text-orange-400 font-semibold mb-4">Only 14 documents remaining at this price today!</div>
                    
                    <button
                      type="submit"
                      className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-4 px-4 rounded-md transition duration-300 shadow-lg"
                      disabled={isGenerating}
                    >
                      {isGenerating ? 'Generating...' : 'Generate Document Now'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="text-center mb-8">Our AI-powered system creates professional legal documents in just minutes</div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-primary mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Fill Out the Form</h3>
              <p>Provide basic information about your business and document requirements</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-primary mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">AI Generation</h3>
              <p>Our advanced AI creates a custom legal document tailored to your specific needs</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-primary mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Instant Download</h3>
              <p>Receive your professional document in minutes, ready to use immediately</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <Features />
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* Pricing Section */}
      <Pricing />
      
      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} LexEurope.AI - All rights reserved</p>
          <div className="mt-4 space-x-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
