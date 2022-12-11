const REGEX = {
    is_valid_email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
}

/* Check if the email is right and returns boolean*/
function validateEmail(email){
    if(email.match(REGEX.is_valid_email)){
        return true;
    }
    else{
        return false;
    }
}

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
