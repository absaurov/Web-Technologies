/**
 * AQI Application - Main JavaScript File
 * Handles form validation, city selection, and AQI display
 */

// Configuration - City data for each country
const cityData = {
  "Bangladesh": ["Dhaka", "Chittagong", "Khulna", "Rajshahi", "Sylhet"],
  "United States": ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
  "Australia": ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
  "Canada": ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
  "India": ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai"]
};

// AQI Status descriptions
const aqiStatusData = [
  { range: [0, 50], level: "Good", description: "Air quality is satisfactory" },
  { range: [51, 100], level: "Moderate", description: "Acceptable quality" },
  { range: [101, 150], level: "Unhealthy for Sensitive Groups", description: "Mild health effects" },
  { range: [151, 200], level: "Unhealthy", description: "Health effects possible" },
  { range: [201, 300], level: "Very Unhealthy", description: "Health alert" },
  { range: [301, 500], level: "Hazardous", description: "Emergency conditions" }
];

// DOM Elements
const elements = {
  countrySelect: document.getElementById('country'),
  citySelect: document.getElementById('citySelect'),
  aqiValue: document.getElementById('aqiValue'),
  aqiStatus: document.getElementById('aqiStatus'),
  termsModal: document.getElementById('termsModal'),
  termsLink: document.getElementById('termsLink'),
  closeTerms: document.getElementById('closeTerms'),
  successMessage: document.getElementById('successMessage'),
  closeSuccess: document.getElementById('closeSuccess'),
  registrationForm: document.getElementById('registrationForm'),
  loginForm: document.getElementById('loginForm'),
  // Form fields for validation
  fname: document.getElementById('fname'),
  mail: document.getElementById('mail'),
  pass: document.getElementById('pass'),
  repass: document.getElementById('repass'),
  dob: document.getElementById('dob'),
  termsCheckbox: document.getElementById('termsCheckbox')
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  setupEventListeners();
});

/**
 * Sets up all event listeners for the application
 */
function setupEventListeners() {
  // Country and city selection
  if (elements.countrySelect) {
    elements.countrySelect.addEventListener('change', handleCountryChange);
  }

  if (elements.citySelect) {
    elements.citySelect.addEventListener('change', handleCityChange);
  }

  // Modal controls
  if (elements.termsLink && elements.closeTerms) {
    elements.termsLink.addEventListener('click', showTermsModal);
    elements.closeTerms.addEventListener('click', hideTermsModal);
  }

  if (elements.closeSuccess) {
    elements.closeSuccess.addEventListener('click', hideSuccessMessage);
  }

  // Form submissions
  if (elements.registrationForm) {
    elements.registrationForm.addEventListener('submit', handleRegistrationSubmit);
  }

  if (elements.loginForm) {
    elements.loginForm.addEventListener('submit', handleLoginSubmit);
  }

  // Real-time form validation
  setupFormValidation();
}

/**
 * Handles country selection change - populates cities dropdown
 */
function handleCountryChange() {
  const selectedCountry = this.value;
  
  // Reset city dropdown
  elements.citySelect.innerHTML = '<option value="">Select a city</option>';
  elements.aqiValue.textContent = "--";
  elements.aqiStatus.textContent = "Select a city to view AQI";
  
  // Populate cities if a country is selected
  if (selectedCountry && cityData[selectedCountry]) {
    cityData[selectedCountry].forEach(city => {
      const option = document.createElement('option');
      option.value = city;
      option.textContent = city;
      elements.citySelect.appendChild(option);
    });
  }
}

/**
 * Handles city selection change - displays mock AQI data
 */
function handleCityChange() {
  if (this.value) {
    // Generate random AQI between 0-300 for demo
    const randomAqi = Math.floor(Math.random() * 300);
    displayAqiData(randomAqi);
  } else {
    elements.aqiValue.textContent = "--";
    elements.aqiStatus.textContent = "Select a city to view AQI";
  }
}

/**
 * Displays AQI data with appropriate status
 * @param {number} aqiValue - The AQI value to display
 */
function displayAqiData(aqiValue) {
  elements.aqiValue.textContent = aqiValue;
  
  // Find matching status description
  const status = aqiStatusData.find(item => 
    aqiValue >= item.range[0] && aqiValue <= item.range[1]
  ) || { level: "Unknown", description: "No data available" };
  
  elements.aqiStatus.textContent = `${status.level} - ${status.description}`;
  
  // Add color coding based on AQI level
  const aqiColors = {
    "Good": "text-green-500",
    "Moderate": "text-yellow-500",
    "Unhealthy for Sensitive Groups": "text-orange-500",
    "Unhealthy": "text-red-500",
    "Very Unhealthy": "text-purple-500",
    "Hazardous": "text-red-800"
  };
  
  // Remove all color classes first
  elements.aqiValue.classList.remove(
    "text-green-500", "text-yellow-500", "text-orange-500",
    "text-red-500", "text-purple-500", "text-red-800"
  );
  
  // Add appropriate color class
  if (aqiColors[status.level]) {
    elements.aqiValue.classList.add(aqiColors[status.level]);
  }
}

/**
 * Shows the Terms and Conditions modal
 */
function showTermsModal(e) {
  e.preventDefault();
  elements.termsModal.classList.remove('hidden');
}

/**
 * Hides the Terms and Conditions modal
 */
function hideTermsModal() {
  elements.termsModal.classList.add('hidden');
}

/**
 * Hides the success message modal
 */
function hideSuccessMessage() {
  elements.successMessage.classList.add('hidden');
}

/**
 * Handles registration form submission
 */
function handleRegistrationSubmit(e) {
  e.preventDefault();
  
  // Clear previous errors
  clearErrors();
  
  // Validate form
  if (validateRegistrationForm()) {
    elements.successMessage.classList.remove('hidden');
    elements.registrationForm.reset();
    // Reset city selection as well
    elements.citySelect.innerHTML = '<option value="">Select a country first</option>';
    elements.aqiValue.textContent = "--";
    elements.aqiStatus.textContent = "Select a city to view AQI";
  }
}

/**
 * Handles login form submission
 */
function handleLoginSubmit(e) {
  e.preventDefault();
  alert('Login functionality would be implemented here with proper authentication');
}

/**
 * Sets up real-time form validation
 */
function setupFormValidation() {
  // Add blur event listeners for real-time validation
  if (elements.fname) elements.fname.addEventListener('blur', validateName);
  if (elements.mail) elements.mail.addEventListener('blur', validateEmail);
  if (elements.pass) elements.pass.addEventListener('blur', validatePassword);
  if (elements.repass) elements.repass.addEventListener('blur', validateConfirmPassword);
  if (elements.dob) elements.dob.addEventListener('blur', validateDOB);
}

/**
 * Validates the entire registration form
 * @returns {boolean} True if form is valid, false otherwise
 */
function validateRegistrationForm() {
  let isValid = true;
  
  // Validate each field
  if (!validateName()) isValid = false;
  if (!validateEmail()) isValid = false;
  if (!validatePassword()) isValid = false;
  if (!validateConfirmPassword()) isValid = false;
  if (!validateDOB()) isValid = false;
  if (!validateGender()) isValid = false;
  if (!validateCountry()) isValid = false;
  if (!validateTerms()) isValid = false;
  
  return isValid;
}

// Field validation functions
function validateName() {
  const name = elements.fname.value.trim();
  const errorElement = document.getElementById('fnameError');
  
  if (!name) {
    showError(errorElement, 'Full name is required');
    return false;
  }
  
  if (name.length < 3) {
    showError(errorElement, 'Name must be at least 3 characters');
    return false;
  }
  
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    showError(errorElement, 'Name can only contain letters and spaces');
    return false;
  }
  
  clearError(errorElement);
  return true;
}

function validateEmail() {
  const email = elements.mail.value.trim();
  const errorElement = document.getElementById('mailError');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    showError(errorElement, 'Email is required');
    return false;
  }
  
  if (!emailRegex.test(email)) {
    showError(errorElement, 'Please enter a valid email address');
    return false;
  }
  
  clearError(errorElement);
  return true;
}

function validatePassword() {
  const password = elements.pass.value;
  const errorElement = document.getElementById('passError');
  
  if (!password) {
    showError(errorElement, 'Password is required');
    return false;
  }
  
  if (password.length < 8) {
    showError(errorElement, 'Password must be at least 8 characters');
    return false;
  }
  
  if (!/[A-Z]/.test(password)) {
    showError(errorElement, 'Password must contain at least one uppercase letter');
    return false;
  }
  
  if (!/[0-9]/.test(password)) {
    showError(errorElement, 'Password must contain at least one number');
    return false;
  }
  
  clearError(errorElement);
  return true;
}

function validateConfirmPassword() {
  const password = elements.pass.value;
  const confirmPassword = elements.repass.value;
  const errorElement = document.getElementById('repassError');
  
  if (!confirmPassword) {
    showError(errorElement, 'Please confirm your password');
    return false;
  }
  
  if (password !== confirmPassword) {
    showError(errorElement, 'Passwords do not match');
    return false;
  }
  
  clearError(errorElement);
  return true;
}

function validateDOB() {
  const dob = elements.dob.value;
  const errorElement = document.getElementById('dobError');
  
  if (!dob) {
    showError(errorElement, 'Date of birth is required');
    return false;
  }
  
  // Calculate age
  const dobDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - dobDate.getFullYear();
  const monthDiff = today.getMonth() - dobDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
    age--;
  }
  
  if (age < 13) {
    showError(errorElement, 'You must be at least 13 years old');
    return false;
  }
  
  clearError(errorElement);
  return true;
}

function validateGender() {
  const genderSelected = document.querySelector('input[name="gender"]:checked');
  const errorElement = document.getElementById('genderError');
  
  if (!genderSelected) {
    showError(errorElement, 'Please select a gender');
    return false;
  }
  
  clearError(errorElement);
  return true;
}

function validateCountry() {
  const country = elements.countrySelect.value;
  const errorElement = document.getElementById('countryError');
  
  if (!country) {
    showError(errorElement, 'Please select a country');
    return false;
  }
  
  clearError(errorElement);
  return true;
}

function validateTerms() {
  const termsChecked = elements.termsCheckbox.checked;
  const errorElement = document.getElementById('termsError');
  
  if (!termsChecked) {
    showError(errorElement, 'You must agree to the terms and conditions');
    return false;
  }
  
  clearError(errorElement);
  return true;
}

// Helper functions
function showError(element, message) {
  if (element) {
    element.textContent = message;
    element.style.display = 'block';
  }
}

function clearError(element) {
  if (element) {
    element.textContent = '';
    element.style.display = 'none';
  }
}

function clearErrors() {
  const errorElements = document.querySelectorAll('.error');
  errorElements.forEach(element => {
    clearError(element);
  });
}