/* Input fields */
const password_input = document.getElementById('password_input');
const email_input = document.getElementById('email_input');
const confirm_password_input = document.getElementById('confirm_password_input');

/* Error message box */
const email_error = document.getElementById('email_error');
const password_error = document.getElementById('password_error');
const confirm_password_error = document.getElementById('confirm_password_error');

/* Form */
const sign_up = document.getElementById('sign_up');

sign_up.addEventListener('submit', validateRegistrationForm); 

/* Triggered when user submitted the form/clicked 'Sign up' button */
function validateRegistrationForm(event){
    event.preventDefault();

    let email = event.target[0].value;
    let password = event.target[1].value;
    let confirm_password = event.target[2].value;

    if(!email){
        showError(email_error, email_input, 'Email is required');
    }
    else if(!validateEmail(email)){
        showError(email_error, email_input, 'Invalid email entered');
    }
    else{
        hideError(email_error, email_input);
    }

    if(!password){
        showError(password_error, password_input, 'Password is required');
    }
    else if(password.length < 8){
        showError(password_error, password_input, 'Password requires minimum of 8 characters');
    }
    else{
        hideError(password_error, password_input);
    }

    if(!confirm_password){
        showError(confirm_password_error, confirm_password_input, 'Confirm password is required');
    }
    else if(confirm_password.length < 8){
        showError(confirm_password_error, confirm_password_input, 'Password requires minimum of 8 characters');
    }
    else if(password!==confirm_password){
        showError(confirm_password_error, confirm_password_input, 'Password does not match');
    }
    else{
        hideError(confirm_password_error, confirm_password_input);
    }

    let error_count = sign_up.querySelectorAll('.wrong_input').length;

    if(!error_count){
        window.location.href = 'index.html';
    }
}
