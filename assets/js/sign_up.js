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

/* Triggered when user submitted the form/clicked 'Sign up' button */
sign_up.addEventListener('submit', function(event){
    event.preventDefault();

    let error_count = 0;
    let email = event.target[0].value;
    let password = event.target[1].value;
    let confirm_password = event.target[2].value;

    if(!email){
        error_count++;
        showError(email_error, email_input, 'Email is required');
    }
    else if(!validateEmail(email)){
        error_count++;
        showError(email_error, email_input, 'Invalid email entered');
    }
    else{
        hideError(email_error, email_input);
    }

    if(!password){
        error_count++;
        showError(password_error, password_input, 'Password is required');
    }
    else if(password.length < 8){
        error_count++;
        showError(password_error, password_input, 'Password requires minimum of 8 characters');
    }else{
        hideError(password_error, password_input);
    }

    if(!confirm_password){
        error_count++;
        showError(confirm_password_error, confirm_password_input, 'Confirm password is required');
    }
    else if(confirm_password.length < 8){
        error_count++;
        showError(confirm_password_error, confirm_password_input, 'Password requires minimum of 8 characters');
    }
    else if(password!==confirm_password){
        error_count++;
        showError(confirm_password_error, confirm_password_input, 'Password does not match');
    }
    else{
        hideError(confirm_password_error, confirm_password_input);
    }

    if(error_count <= 0){
        window.location.href = 'index.html';
    }
});

/* Shows error message */
function showError(error_element, input_element, message){
    error_element.classList.add('show');
    error_element.classList.remove('hide');
    error_element.textContent = message; 
    input_element.classList.add('wrong_input');
}

/* Remove error password when all condition passed */
function hideError(error_element, input_element){
    error_element.classList.add('hide');
    error_element.classList.remove('show');
    error_element.textContent = '';
    input_element.classList.remove('wrong_input');
}

/* Check if the email is right and returns boolean*/
function validateEmail(email){
    let format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.match(format)){
        return true;
    }
    else{
        return false;
    }
}