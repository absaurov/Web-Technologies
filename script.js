document.addEventListener('DOMContentLoaded', function() {
    // Terms and Conditions Modal
    const termsLink = document.getElementById('termsLink');
    const termsModal = document.getElementById('termsModal');
    const closeTerms = document.getElementById('closeTerms');
    
    termsLink.addEventListener('click', function(e) {
      e.preventDefault();
      termsModal.classList.remove('hidden');
    });
    
    closeTerms.addEventListener('click', function() {
      termsModal.classList.add('hidden');
    });
    
    // Close modals when clicking outside
    [termsModal, document.getElementById('successMessage')].forEach(modal => {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          modal.classList.add('hidden');
        }
      });
    });
  
    // Registration Form Validation
    const registrationForm = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');
    const closeSuccess = document.getElementById('closeSuccess');
    
    closeSuccess.addEventListener('click', function() {
      successMessage.classList.add('hidden');
    });
  
    registrationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let isValid = true;
      
      // Clear previous errors
      document.querySelectorAll('.error').forEach(el => el.textContent = '');
      
      // Full Name validation
      const fname = document.getElementById('fname').value.trim();
      if (fname === '') {
        document.getElementById('fnameError').textContent = 'Full name is required';
        isValid = false;
      } else if (fname.length < 3) {
        document.getElementById('fnameError').textContent = 'Name must be at least 3 characters';
        isValid = false;
      }
      
      // Email validation
      const email = document.getElementById('mail').value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email === '') {
        document.getElementById('mailError').textContent = 'Email is required';
        isValid = false;
      } else if (!emailRegex.test(email)) {
        document.getElementById('mailError').textContent = 'Please enter a valid email';
        isValid = false;
      }
      
      // Password validation
      const password = document.getElementById('pass').value;
      if (password === '') {
        document.getElementById('passError').textContent = 'Password is required';
        isValid = false;
      } else if (password.length < 8) {
        document.getElementById('passError').textContent = 'Password must be at least 8 characters';
        isValid = false;
      }
      
      // Confirm Password validation
      const repass = document.getElementById('repass').value;
      if (repass === '') {
        document.getElementById('repassError').textContent = 'Please confirm your password';
        isValid = false;
      } else if (repass !== password) {
        document.getElementById('repassError').textContent = 'Passwords do not match';
        isValid = false;
      }
      
      // Date of Birth validation (must be 18+)
      const dob = document.getElementById('dob').value;
      if (dob === '') {
        document.getElementById('dobError').textContent = 'Date of birth is required';
        isValid = false;
      } else {
        const dobDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - dobDate.getFullYear();
        const monthDiff = today.getMonth() - dobDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
          age--;
        }
        
        if (age < 18) {
          document.getElementById('dobError').textContent = 'You must be at least 18 years old';
          isValid = false;
        }
      }
      
      // Gender validation
      const genderSelected = document.querySelector('input[name="gender"]:checked');
      if (!genderSelected) {
        document.getElementById('genderError').textContent = 'Please select a gender';
        isValid = false;
      }
      
      // Country validation
      const country = document.getElementById('country').value;
      if (country === '') {
        document.getElementById('countryError').textContent = 'Please select your country';
        isValid = false;
      }
      
      // Terms checkbox validation
      const termsChecked = document.getElementById('termsCheckbox').checked;
      if (!termsChecked) {
        document.getElementById('termsError').textContent = 'You must agree to the terms and conditions';
        isValid = false;
      }
      
      if (isValid) {
        // Form is valid, show success message
        successMessage.classList.remove('hidden');
        registrationForm.reset();
      }
    });
  
    // Login Form Validation
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let isValid = true;
      
      // Email validation
      const loginEmail = document.getElementById('loginEmail').value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (loginEmail === '') {
        alert('Email is required');
        isValid = false;
      } else if (!emailRegex.test(loginEmail)) {
        alert('Please enter a valid email');
        isValid = false;
      }
      
      // Password validation
      const loginPassword = document.getElementById('loginPassword').value;
      if (loginPassword === '') {
        alert('Password is required');
        isValid = false;
      }
      
      if (isValid) {
        // Here you would typically send the data to a server
        alert('Login successful! (This is a demo)');
        loginForm.reset();
      }
    });
  });