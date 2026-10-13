import React, { useState } from 'react';

export default function CheckoutCheckboxes({ onCheckboxChange }) {
  const [formData, setFormData] = useState({
    acceptTerms: false,
    subscribeNewsletter: false,
    createAccount: false,
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    const updatedData = { ...formData, [name]: checked };
    setFormData(updatedData);
    
    // Pass the state up to the main checkout page component
    if (onCheckboxChange) {
      onCheckboxChange(updatedData);
    }
  };

  return (
    <div className="space-y-4 pt-4 border-t border-gray-100">
      
      {/* 1. Store Sales Policy Checkbox */}
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="acceptTerms"
            name="acceptTerms"
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            required
          />
        </div>
        <div className="ml-3 text-xs">
          <label htmlFor="acceptTerms" className="font-serif text-gray-700 cursor-pointer">
            I agree to the <a href="/sales-policy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline hover:text-indigo-500">Store Sales Policy</a> and Terms of Service. <span className="text-red-500">*</span>
          </label>
        </div>
      </div>

      {/* 2. Newsletter Subscription Checkbox */}
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="subscribeNewsletter"
            name="subscribeNewsletter"
            type="checkbox"
            checked={formData.subscribeNewsletter}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />
        </div>
        <div className="ml-3 text-xs">
          <label htmlFor="subscribeNewsletter" className="font-light text-gray-700 cursor-pointer">
            Subscribe to our newsletter for exclusive offers and updates.
          </label>
        </div>
      </div>

      {/* 3. Post-Purchase Account Creation Checkbox */}
      <div className="flex flex-col">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="createAccount"
              name="createAccount"
              type="checkbox"
              checked={formData.createAccount}
              onChange={handleChange}
              className="h-4 w-4 rounded  border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
          </div>
          <div className="ml-3 text-xs">
            <label htmlFor="createAccount" className="font-light text-gray-700 cursor-pointer">
              Save my information and create an account
            </label>
          </div>
        </div>
        
        {/* Conditional helper text that smoothly updates based on selection */}
        {formData.createAccount && (
          <div className="ml-7 mt-1.5 text-xs font-light text-indigo-600 bg-indigo-50 p-2.5 rounded-md border border-indigo-100 animate-fadeIn">
            ✨ <span className="font-semibold"> Great choice!</span> You will be asked to set up a secure password **after your order is processed**, using your checkout email address.
          </div>
        )}
      </div>

    </div>
  );
}
