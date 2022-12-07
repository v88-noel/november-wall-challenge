/* Input fields */
const password_input = document.getElementById('password_input');
const email_input = document.getElementById('email_input');

/* Error message box */
const email_error = document.getElementById('email_error');
const password_error = document.getElementById('password_error');

/* Form */
const login_form = document.getElementById('login_form');

/* Triggered when user submitted the form/clicked 'Sign In' button */
login_form.addEventListener('submit', function(event){
    event.preventDefault();

    let error_count = 0;
    let email = event.target[0].value;
    let password = event.target[1].value;

    if(!email){
        error_count++;
        ShowError(email_error, email_input, 'Email is required');
    }
    else if(!ValidateEmail(email)){
        error_count++;
        ShowError(email_error, email_input, 'Invalid email entered');
    }
    else if(email!=='ndasco@gmail.com'){
        ShowError(email_error, email_input, 'You entered wrong email');
    }
    else{
        HideError(email_error, email_input);
    }

    if(!password){
        error_count++;
        ShowError(password_error, password_input, 'Password is required');
    }
    else if(password!=='testpassword'){
        error_count++;
        ShowError(password_error, password_input, 'You entered wrong password');
    }
    else if(password < 8){
        error_count++;
        ShowError(password_error, password_input, 'Invalid password');
    }
    else{
        HideError(password_error, password_input);
    }

    if(error_count <= 0){
        window.location.href = 'wall.html';
    }
});

/* Shows error message */
function ShowError(error_element, input_element, message){
    error_element.classList.add('show');
    error_element.classList.remove('hide');
    error_element.textContent = message;
    input_element.classList.add('wrong_input');
}

/* Remove error password when all condition passed */
function HideError(error_element, input_element){
    error_element.classList.add('hide');
    error_element.classList.remove('show');
    error_element.textContent = '';
    input_element.classList.remove('wrong_input');
}

/* Check if the email is right and returns boolean*/
function ValidateEmail(email){
    const format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(email.match(format)){
        return true;
    }
    else{
        return false;
    }
}