/**
 * API service for interacting with the Flask backend
 */

export interface DocumentFormData {
  documentType: string;
  businessName: string;
  businessType: string;
  state: string;
  industry: string;
  protectionLevel: string;
  specialClauses: string[];
  additionalInstructions: string;
}

export interface DocumentResponse {
  success: boolean;
  documentUrl?: string;
  error?: string;
}

/**
 * Generate a legal document by sending form data to the backend
 */
export async function generateDocument(formData: DocumentFormData): Promise<DocumentResponse> {
  try {
    // Convert the form data to FormData for submission
    const form = new FormData();
    
    // Add all form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'specialClauses' && Array.isArray(value)) {
        // Handle array of special clauses
        value.forEach(clause => {
          form.append('specialClauses[]', clause);
        });
      } else {
        form.append(key, value as string);
      }
    });

    // Send request to the Flask backend
    const response = await fetch('http://localhost:5000/api/generate-document', {
      method: 'POST',
      body: form,
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      documentUrl: data.documentUrl
    };
  } catch (error) {
    console.error('Error generating document:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Create a checkout session with Stripe for document payment
 */
export async function createCheckoutSession(formData: DocumentFormData): Promise<{ sessionId: string } | { error: string }> {
  try {
    // Convert the form data to FormData for submission
    const form = new FormData();
    
    // Add all form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'specialClauses' && Array.isArray(value)) {
        // Handle array of special clauses
        value.forEach(clause => {
          form.append('specialClauses[]', clause);
        });
      } else {
        form.append(key, value as string);
      }
    });

    // Send request to create a checkout session
    const response = await fetch('http://localhost:5000/create-checkout-session', {
      method: 'POST',
      body: form,
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const data = await response.json();
    return { sessionId: data.sessionId };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return { error: error instanceof Error ? error.message : 'Unknown error occurred' };
  }
}