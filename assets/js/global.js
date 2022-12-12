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

/* Adds show class to element and remove hide to change display value */
function showElement(element, class_name = "show"){
    element.classList.add(class_name);
    element.classList.remove('hide');
}

/* Adds hide class to element and remove show to change display value */
function hideElement(element, class_name = "show"){
    element.classList.add('hide');
    element.classList.remove(class_name);
}

/* Shows error message */
function showError(error_element, input_element, message){
    showElement(error_element)
    error_element.textContent = message; 
    input_element.classList.add('wrong_input');
}

/* Remove error password when all condition passed */
function hideError(error_element, input_element){
    hideElement(error_element)
    error_element.textContent = '';
    input_element.classList.remove('wrong_input');
}
