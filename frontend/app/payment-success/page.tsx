'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [documentUrl, setDocumentUrl] = useState('');
  const [error, setError] = useState('');
  
  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    if (sessionId) {
      // Verify payment and generate document
      const verifyPaymentAndGenerateDocument = async () => {
        try {
          // Import is inside the function to avoid issues with SSR
           const { generateDocument } = await import('../api/documentService');
          
          // Call backend to verify payment and generate document
          const response = await fetch(`http://localhost:5000/payment-success?session_id=${sessionId}`);
          
          if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
          }
          
          const data = await response.json();
          
          if (data.success) {
            setDocumentUrl(data.documentUrl);
          } else {
            throw new Error(data.error || 'Failed to generate document');
          }
        } catch (error) {
          console.error('Error verifying payment:', error);
          setError(error instanceof Error ? error.message : 'An unknown error occurred');
        } finally {
          setIsLoading(false);
        }
      };
      
      verifyPaymentAndGenerateDocument();
    } else {
      setError('No session ID provided');
      setIsLoading(false);
    }
  }, [searchParams]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Loading Header */}
        <header className="bg-gradient-to-r from-primary via-secondary to-accent text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-white rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Generating Your Document</h1>
            <p className="text-xl mb-8">Our AI is crafting a custom legal document tailored to your needs</p>
          </div>
        </header>
        
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl mb-8 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4">Processing Your Request</h2>
            <p className="mb-6 text-gray-600">This may take up to 2 minutes. Thank you for your patience!</p>
            
            <div className="flex flex-col items-center">
              <div className="animate-pulse text-xl italic mb-4 text-blue-600">Turning legal jargon into plain English...</div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                <div className="bg-blue-500 h-2.5 rounded-full animate-[loading_2s_ease-in-out_infinite]" style={{width: '70%'}}></div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-100">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-blue-700">Your document is being generated with AI customization based on your inputs.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        {/* Error Header */}
        <header className="bg-gradient-to-r from-primary via-secondary to-accent text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-white rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Something Went Wrong</h1>
            <p className="text-xl mb-8">We encountered an error while processing your document</p>
          </div>
        </header>
        
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl mb-8 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4">Error Details</h2>
            <p className="mb-6 text-gray-600">{error}</p>
            
            <div className="mt-6 p-4 bg-red-50 rounded-md border border-red-100">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-red-700">If this error persists, please contact our support team for assistance.</p>
              </div>
            </div>
          </div>
          
          <Link href="/" className="py-3 px-6 bg-primary hover:bg-primary/90 text-white font-bold rounded-md transition duration-200 inline-block">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      {/* Success Header */}
      <header className="bg-gradient-to-r from-primary via-secondary to-accent text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-xl mb-8">Your legal document has been generated successfully.</p>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl mb-8 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">Your Document is Ready</h2>
          <p className="mb-6 text-gray-600">You can download your document using the link below:</p>
          
          <a 
            href={documentUrl} 
            download
            className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-md transition duration-200 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Document
          </a>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-100">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-blue-700">Your document has been saved to your account. You can access it anytime from your dashboard.</p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Link href="/" className="py-3 px-6 border border-primary text-primary hover:bg-primary/10 font-bold rounded-md transition duration-200 inline-block">
            Return to Home
      </Link>
    </div>
  </div>
  </div>
  );
}