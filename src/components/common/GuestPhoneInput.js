import React, { useState } from 'react';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
import en from 'react-phone-number-input/locale/en.json';

// Optional: Import standard flags CSS if you want to use the package's built-in flags
 import 'react-phone-number-input/style.css';

export default function GuestPhoneInput({ onChange }) {
  const countries = getCountries();
  
  // Default to United States ('US'), or change to your primary market
  const [country, setCountry] = useState('US');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Handle changes and pass the full E.164 formatted string up to the parent form
  const handlePhoneChange = (number) => {
    const cleanNumber = number.replace(/\D/g, '');
    setPhoneNumber(cleanNumber);
    
    if (cleanNumber) {
      const callingCode = getCountryCallingCode(country);
      onChange(`+${callingCode}${cleanNumber}`);
    } else {
      onChange('');
    }
  };

  const handleCountryChange = (e) => {
    const newCountry = e.target.value;
    setCountry(newCountry);
    // Reset or update the parent container if needed when country changes
    if (phoneNumber) {
      const callingCode = getCountryCallingCode(newCountry);
      onChange(`+${callingCode}${phoneNumber}`);
    }
  };

  return (
    <div className="flex md:flex-row flex-col  ">
      <label htmlFor="phone-number" className="">
       <span className=" text-xs font-light  text-zinc-600"> Mobile Number (For order updates): </span>
      
      
      <div className="inline-flex mt-1 rounded-md shadow-sm border border-gray-300 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 overflow-hidden bg-white">
        
        {/* Country Code Dropdown */}
        <div className="relative flex items-center bg-gray-50 border-r border-gray-300 px-3">
          <select
            value={country}
            onChange={handleCountryChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            aria-label="Select Country"
          >
            {countries.map((code) => (
              <option key={code} value={code}>
                {en[code]} (+{getCountryCallingCode(code)})
              </option>
            ))}
          </select>
          
          {/* Visual Display of Selected Country */}
          <div className="flex items-center space-x-1 pointer-events-none text-sm text-gray-600 font-medium">
            <span className="text-base mr-1">
              {/* Fallback to simple emoji flags natively supported by modern OS */}
              {codeToEmoji(country)}
            </span>
            <span>+{getCountryCallingCode(country)}</span>
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Local Phone Number Input Field */}
        <input
          type="tel"
          id="phone-number"
          value={phoneNumber}
          onChange={(e) => handlePhoneChange(e.target.value)}
          placeholder="Enter mobile number"
          className=" w-full px-3 py-2.5 text-xs font-light text-gray-900 placeholder-gray-400 focus:outline-none border-0"
          required
        />
      </div>
      </label>
    </div>
  );
}

// Quick helper function to turn country codes (US, CA) into native emoji flags
function codeToEmoji(countryCode) {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397));
}
