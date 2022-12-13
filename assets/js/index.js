/* Input fields */
const password_input = document.getElementById('password_input');
const email_input = document.getElementById('email_input');

/* Error message box */
const email_error = document.getElementById('email_error');
const password_error = document.getElementById('password_error');

/* Form */
const login_form = document.getElementById('login_form');
login_form.addEventListener('submit', validateLoginForm);

/**
* DOCU: Validates the login form and if there are no errors, it redirects the user to the wall/main page. <br>
* Triggered: When user submitted the form/clicked 'Sign in' button. <br>
* @function 
* @param {object} event - The event object is a parameter that is passed to the event handler function.
* @author Noel
*/
function validateLoginForm(event){
    event.preventDefault();

    let email = event.target[0].value;
    let password = event.target[1].value;

    
    /** Check if the email is empty, if it is not equal to 'ndasco@gmail.com', and if it is not a
    * valid email. If it is, it will show an error message. If it is not, it will hide the error
    * message. */
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

    /** Checking if the password is empty, if it is not equal to 'testpassword', and if it is less than
    * 8 characters. If it is, it will show an error message. If it is not, it will hide the error
    * message. */
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

    /* Counts the number of elements with the class "wrong_input" */
    let error_count = login_form.querySelectorAll('.wrong_input').length;

    /* Check if there are no errors in the form. If there are no errors, it redirects the user to the wall/main page. */
    if(!error_count){
        window.location.href = 'wall.html';
    }
}
