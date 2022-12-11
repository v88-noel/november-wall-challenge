/* Input fields */
const password_input = document.getElementById('password_input');
const email_input = document.getElementById('email_input');

/* Error message box */
const email_error = document.getElementById('email_error');
const password_error = document.getElementById('password_error');

/* Form */
const login_form = document.getElementById('login_form');
login_form.addEventListener('submit', validateLoginForm);

/* Triggered when user submitted the form/clicked 'Sign In' button */
function validateLoginForm(event){
    event.preventDefault();

    let email = event.target[0].value;
    let password = event.target[1].value;

    if(!email){
        showError(email_error, email_input, 'Email is required');
    }
    else if(!validateEmail(email)){
        showError(email_error, email_input, 'Invalid email entered');
    }
    else if(email!=='ndasco@gmail.com'){
        showError(email_error, email_input, 'You entered wrong email');
    }
    else{
        hideError(email_error, email_input);
    }

    if(!password){
        showError(password_error, password_input, 'Password is required');
    }
    else if(password!=='testpassword'){
        showError(password_error, password_input, 'You entered wrong password');
    }
    else if(password < 8){
        showError(password_error, password_input, 'Invalid password');
    }
    else{
        hideError(password_error, password_input);
    }

    let error_count = login_form.querySelectorAll('.wrong_input').length;

    if(!error_count){
        window.location.href = 'wall.html';
    }
}
