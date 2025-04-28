// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Registration Form Elements
    const registrationForm = document.getElementById('registrationForm');
    const termsModal = document.getElementById('termsModal');
    const termsLink = document.getElementById('termsLink');
    const closeTerms = document.getElementById('closeTerms');
    const successMessage = document.getElementById('successMessage');
    const closeSuccess = document.getElementById('closeSuccess');
  
    // Login Form Elements
    const loginForm = document.getElementById('loginForm');
    const loginUsername = document.getElementById('loginUsername');
    const loginPassword = document.getElementById('loginPassword');
  
    // Terms and Conditions Modal
    termsLink.addEventListener('click', function(e) {
      e.preventDefault();
      termsModal.classList.remove('hidden');
    });
  
    closeTerms.addEventListener('click', function() {
      termsModal.classList.add('hidden');
    });
  
    // Close success message
    closeSuccess.addEventListener('click', function() {
      successMessage.classList.add('hidden');
    });
  
    // Registration Form validation
    registrationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      clearRegistrationErrors();
  
      // Validate form fields
      let isValid = true;
  
      // Full Name validation
      const fname = document.getElementById('fname').value.trim();
      if (fname === '') {
        showError('fnameError', 'Full name is required');
        isValid = false;
      }
  
      // Email validation
      const email = document.getElementById('mail').value.trim();
      if (email === '') {
        showError('mailError', 'Email is required');
        isValid = false;
      } else if (!validateEmail(email)) {
        showError('mailError', 'Please enter a valid email');
        isValid = false;
      }
  
      // Password validation
      const password = document.getElementById('pass').value;
      if (password === '') {
        showError('passError', 'Password is required');
        isValid = false;
      } else if (password.length < 8) {
        showError('passError', 'Password must be at least 8 characters');
        isValid = false;
      }
  
      // Confirm Password validation
      const repass = document.getElementById('repass').value;
      if (repass === '') {
        showError('repassError', 'Please confirm your password');
        isValid = false;
      } else if (repass !== password) {
        showError('repassError', 'Passwords do not match');
        isValid = false;
      }
  
      // Date of Birth validation
      const dob = document.getElementById('dob').value;
      if (dob === '') {
        showError('dobError', 'Date of birth is required');
        isValid = false;
      } else {
        const dobDate = new Date(dob);
        const today = new Date();
        if (dobDate >= today) {
          showError('dobError', 'Date must be in the past');
          isValid = false;
        }
      }
  
      // Gender validation
      const gender = document.querySelector('input[name="gender"]:checked');
      if (!gender) {
        showError('genderError', 'Please select a gender');
        isValid = false;
      }
  
      // Country validation
      const country = document.getElementById('country').value;
      if (country === '') {
        showError('countryError', 'Please select a country');
        isValid = false;
      }
  
      // Terms validation
      const termsChecked = document.getElementById('termsCheckbox').checked;
      if (!termsChecked) {
        showError('termsError', 'You must agree to the terms and conditions');
        isValid = false;
      }
  
      if (isValid) {
        // Simulate form submission
        setTimeout(() => {
          successMessage.classList.remove('hidden');
          registrationForm.reset();
        }, 500);
      }
    });
  
    // Login Form validation
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      clearLoginErrors();
  
      let isValid = true;
  
      // Username validation
      const username = loginUsername.value.trim();
      if (username === '') {
        showLoginError('Username is required');
        isValid = false;
      }
  
      // Password validation
      const password = loginPassword.value;
      if (password === '') {
        showLoginError('Password is required');
        isValid = false;
      }
  
      if (isValid) {
        // Here you would typically make an AJAX call to your server
        // For demo purposes, we'll just log the values
        console.log('Login attempt with:', { username, password });
        
        // Simulate successful login
        alert('Login successful! (This is a demo)');
        loginForm.reset();
      }
    });
  
    function showError(id, message) {
      const errorElement = document.getElementById(id);
      errorElement.textContent = message;
    }
  
    function showLoginError(message) {
      // For simplicity, we'll use an alert in this case
      // In a real app, you might want to show this near the form
      alert(message);
    }
  
    function clearRegistrationErrors() {
      const errors = document.querySelectorAll('.error');
      errors.forEach(error => {
        error.textContent = '';
      });
    }
  
    function clearLoginErrors() {
      // Clear any existing login error displays
      // (In this simple example, we're using alerts instead)
    }
  
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
  });