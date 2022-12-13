const REGEX = {
    is_valid_email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
}

/**
* DOCU: Check if email is valid or not by matching with regular expression <br>
* Triggered: When form is submitted <br>
* @function
* @param {string} email - The email address to validate.
* @returns A boolean value.
* @author Noel
*/
function validateEmail(email){

    if(email.match(REGEX.is_valid_email)){
        return true;
    }
    else{
        return false;
    }
}

/**
* DOCU: Adds "show" class to element and remove "hide" to change display value. <br>
* @function
* @param {object} element - The element you want to show.
* @param {string} class_name - The class name to add to the element.
* @author Noel
*/
function showElement(element, class_name = "show"){
    element.classList.add(class_name);
    element.classList.remove('hide');
}

/**
* DOCU: Adds the class "hide" to the element and removes the class "show" from the element. <br>
* @function
* @param {object} element - The element you want to show.
* @param {string} class_name - The class name to add to the element.
* @author Noel
*/
function hideElement(element, class_name = "show"){
    element.classList.add('hide');
    element.classList.remove(class_name);
}

/**
* DOCU: Show the error element, set the error message, and add the wrong_input class to the input element. <br>
* @function
* @param {object} error_element - The element that will show the error message.
* @param {object} input_element - The input element that you want to check.
* @param {string} message - The error message to display
* @author Noel
*/
function showError(error_element, input_element, message){
    showElement(error_element)
    error_element.textContent = message; 
    input_element.classList.add('wrong_input');
}


/**
* DOCU: Hide the error element, clear the error text, and remove the wrong_input class from the input element. <br>
* @function
* @param {object} error_element - The element that will display the error message.
* @param {object} input_element - The input element that you want to validate.
* @author Noel
*/
function hideError(error_element, input_element){
    hideElement(error_element)
    error_element.textContent = '';
    input_element.classList.remove('wrong_input');
}
