// script.js

$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();

    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault();
        validateForm();
    });
});

function validateForm() {
    // Clear previous errors
    clearErrors();

    let isValid = true;

    // Full Name validation
    const fullName = document.getElementById('fullName').value;
    if (fullName.length < 5) {
        showError('fullName', 'nameError', 'Name must not be less than 5 characters');
        isValid = false;
    } else {
        showSuccess('fullName');
    }

    // Email validation
    const email = document.getElementById('email').value;
    if (!email.includes('@')) {
        showError('email', 'emailError', 'Enter a correct email');
        isValid = false;
    } else {
        showSuccess('email');
    }

    // Phone Number validation
    const phone = document.getElementById('phone').value;
    if (phone === '123456789' || phone.length !== 10 || isNaN(phone)) {
        showError('phone', 'phoneError', 'Enter a valid 10-digit phone number');
        isValid = false;
    } else {
        showSuccess('phone');
    }

    // Password validation
    const password = document.getElementById('password').value;
    const fullNameParts = fullName.split(' ');
    if (password.length < 8 || password.toLowerCase() === 'password' || fullNameParts.some(part => part.toLowerCase() === password.toLowerCase())) {
        showError('password', 'passwordError', 'Password is not strong');
        alert('Password should not be "password", your name, or less than 8 characters.');
        isValid = false;
    } else {
        showSuccess('password');
    }

    // Confirm Password validation
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (password !== confirmPassword) {
        showError('confirmPassword', 'confirmPasswordError', 'Passwords do not match');
        isValid = false;
    } else {
        showSuccess('confirmPassword');
    }

    if (isValid) {
        alert('Form submitted successfully!');
    }
}

function showError(inputId, errorId, message) {
    const inputElement = document.getElementById(inputId);
    inputElement.classList.add('is-invalid');
    const errorElement = document.getElementById(errorId);
    errorElement.innerText = message;
    errorElement.classList.add('visible');
}

function showSuccess(inputId) {
    const inputElement = document.getElementById(inputId);
    inputElement.classList.remove('is-invalid');
    inputElement.classList.add('is-valid');
}

function clearErrors() {
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.classList.remove('is-invalid');
        input.classList.remove('is-valid');
    });

    const errorTexts = document.querySelectorAll('.form-text.text-danger');
    errorTexts.forEach(text => {
        text.innerText = '';
        text.classList.remove('visible');
    });
}
