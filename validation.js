
  document.addEventListener('DOMContentLoaded', function() {
    // Get all the necessary elements from the page
    const form = document.getElementById('registrationForm');
    const termsModal = document.getElementById('termsModal');
    const termsLink = document.getElementById('termsLink');
    const closeTerms = document.getElementById('closeTerms');
    const successMessage = document.getElementById('successMessage');
    const closeSuccess = document.getElementById('closeSuccess');

    // Terms and Conditions Modal functionality
    termsLink.addEventListener('click', function(e) {
      e.preventDefault(); // Stop the link from navigating
      termsModal.classList.remove('hidden'); // Show the modal
    });

    closeTerms.addEventListener('click', function() {
      termsModal.classList.add('hidden'); // Hide the modal
    });

    // Close success message
    closeSuccess.addEventListener('click', function() {
      successMessage.classList.add('hidden');
    });

    // Form validation when user submits
    form.addEventListener('submit', function(e) {
      e.preventDefault(); // Stop form from submitting normally
      clearErrors(); // Clear any previous error messages

      let isValid = true; // Flag to track if form is valid

      // Validate Full Name
      const fname = document.getElementById('fname').value.trim();
      if (fname === '') {
        showError('fnameError', 'Full name is required');
        isValid = false;
      }

      // Validate Email
      const email = document.getElementById('mail').value.trim();
      if (email === '') {
        showError('mailError', 'Email is required');
        isValid = false;
      } else if (!validateEmail(email)) {
        showError('mailError', 'Please enter a valid email');
        isValid = false;
      }

      // Validate Password
      const password = document.getElementById('pass').value;
      if (password === '') {
        showError('passError', 'Password is required');
        isValid = false;
      } else if (password.length < 8) {
        showError('passError', 'Password must be at least 8 characters');
        isValid = false;
      }

      // Validate Confirm Password
      const repass = document.getElementById('repass').value;
      if (repass === '') {
        showError('repassError', 'Please confirm your password');
        isValid = false;
      } else if (repass !== password) {
        showError('repassError', 'Passwords do not match');
        isValid = false;
      }

      // Validate Date of Birth
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

      // Validate Gender
      const gender = document.querySelector('input[name="gender"]:checked');
      if (!gender) {
        showError('genderError', 'Please select a gender');
        isValid = false;
      }

      // Validate Country
      const country = document.getElementById('country').value;
      if (country === '') {
        showError('countryError', 'Please select a country');
        isValid = false;
      }

      // Validate Terms Checkbox
      const termsChecked = document.getElementById('termsCheckbox').checked;
      if (!termsChecked) {
        showError('termsError', 'You must agree to the terms and conditions');
        isValid = false;
      }

      // If everything is valid, show success message
      if (isValid) {
        setTimeout(() => {
          successMessage.classList.remove('hidden');
          form.reset(); // Clear the form
        }, 500);
      }
    });

    // Helper function to show error messages
    function showError(id, message) {
      const errorElement = document.getElementById(id);
      errorElement.textContent = message;
    }

    // Helper function to clear all error messages
    function clearErrors() {
      const errors = document.querySelectorAll('.error');
      errors.forEach(error => {
        error.textContent = '';
      });
    }

    // Helper function to validate email format
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
  });