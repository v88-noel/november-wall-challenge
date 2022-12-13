/* ---- Variable Declaration Section ---- */
/* Modals */
const create_new_message_modal = document.querySelector('.create_new_message_modal');
const create_new_message_textarea = document.querySelector('.create_new_message_textarea');
const remove_message = document.querySelector('.remove_message');
const remove_comment = document.querySelector('.remove_comment');

/* Modal Buttons and forms */
const close_modal_btn = document.querySelectorAll('.close_modal');
const post_message_btn = document.querySelector('.post_message_btn');

/* Containers */
const message_container = document.getElementById('message_container');
/* ---- End of Variable Declaration Section ---- */

/* ---- Onload Event Listener Section ---- */
/* Binds click event listener to create message button to show modal. */
document.getElementById('create_message_btn').addEventListener('click', ()=>showElement(create_new_message_modal));

/* Binds submit event listener to form submit of delete comment modal. */
document.querySelector('.remove_comment_form').addEventListener('submit', submitDeleteComment);

/* Binds submit event listener to form submit of delete message modal. */
document.querySelector('.remove_message_form').addEventListener('submit', submitDeleteMessage);

/* Binds submit event listener to  form submit of create message form */
document.querySelector('.create_message_form').addEventListener('submit', submitNewMessage);
create_new_message_textarea.addEventListener('keyup', (event)=>formTextAreaKeyUp(event, post_message_btn));

/* Binds click event listerner to all class containing "close_modal"*/
for( let close_modal_index = 0; close_modal_index < close_modal_btn.length; close_modal_index++){
    close_modal_btn[close_modal_index].addEventListener('click', hideModal);
}
/* ---- End of Onload Event Listener Section ---- */

/* ---- Function Section ---- */
/**
* DOCU: Reset form by removing all text in textarea and set button to become disabled <br>
* Triggered: When user clicked input a character in modal textarea then clicked "Post Message" button. <br>
* @function 
* @param {object} event - the event object
* @author Noel
*/
function resetForm(textarea, button){
    textarea.value = '';
    button.disabled = true;
    button.classList.add('disabled');
}

/**
* DOCU: Shows the delete modal for message/comment then pass comment/message id number. <br>
* Triggered: When the user clicks the delete button, show the delete message/comment modal. <br>
* @function 
* @param {object} content_to_delete - the element that was clicked on
* @author Noel
*/
function showDeleteModal(content_to_delete){
    if(content_to_delete.classList.contains('messages')){
        let message_id = content_to_delete.getAttribute('data-message-id');
        remove_message.querySelector('input').value = message_id;
        showElement(remove_message);
    }
    else{
        let comment_id = content_to_delete.getAttribute('data-comment-id');
        remove_comment.querySelector('input').value = comment_id;
        showElement(remove_comment);
    }
}

/**
* DOCU: Hides a modal and resets the form if the modal is the create new message modal. <br>
* Triggered: When user clicked close or cancel button of any modal. <br>
* @function
* @param {object} event - the event object
* @author Noel
*/
function hideModal(event){
    event.preventDefault();
    const modal = event.target.closest('.modal');
    hideElement(modal);

    if(modal.classList.contains('create_new_message_modal')){
        const modal_textarea = modal.querySelector('textarea');
        resetForm(modal_textarea, post_message_btn);
    }
}

/**
* DOCU: If the comment form is hidden, show it and the comment container. If the comment form is visible, <br>
* hide the comment container and the comment form. <br>
* Triggered: When user clicked comment button
* @function 
* @param {object} comment_form - the form element that contains the textarea and submit button
* @author Noel
*/
function toggleAddComment(comment_form){
    const class_list = comment_form.classList;
    const comment_container = comment_form.closest('.messages').querySelector('.comment_container');
   
    if(class_list.contains('hide')){
        showElement(comment_form);
        showElement(comment_container);
    }
    else{
        hideElement(comment_container);
        hideElement(comment_form);
    }
}

/**
* DOCU: When the user clicks the post message button, the function will check if the message value is <br>
* greater than 0, if it is, it will create a new message, reset the form, and hide the modal. <br>
* Triggered: When user clicked input a character in modal textarea then clicked "Post Message" button. 
* @function 
* @param {object} event - the event object
* @author Noel
*/
function submitNewMessage(event){
    event.preventDefault();
    const message_value = create_new_message_textarea.value;

    if(message_value.length > 0){
        createNewMessage(create_new_message_textarea.value);
        resetForm(create_new_message_textarea, post_message_btn);
        hideElement(create_new_message_modal); 
    }    
}

/**
* DOCU: It creates a new message, adds event listeners to the buttons, and prepends the message to the message container. <br>
* Triggered: When postMessageBtnOnClick function is triggered by user who entered a character in modal textarea.<br>
* @function
* @param {string} message - the message that the user has typed in the create new message textarea
* @author Noel
*/
function createNewMessage(message){   
    /* Clone the message_template and assigning it to the message_clone variable. */
    const message_template = document.querySelector('.messages');
    const message_id_number = new Date().valueOf();
    const message_clone = message_template.cloneNode(true);

    /**  
    * Set the data-message-id attribute to the message_id_number variable. It is also setting the
    * innerText of the message_wrapper class to the message variable. 
    */
    message_clone.setAttribute('data-message-id', message_id_number);
    message_clone.querySelector('.message_wrapper').innerText = message;

    /* The above code is selecting the elements from the message_clone. */
    const comment_form_node = message_clone.querySelector('.comment_form');
    const comment_form_submit_btn = comment_form_node.querySelector('.post_comment_btn');
    const button_container = message_clone.querySelector('.buttons_container');
    const edit_message_container = message_clone.querySelector('.edit_message_container');
    const update_message_btn = message_clone.querySelector('.update_message_btn');

    /* The above code is adding event listeners to the elements of the message clone buttons/forms. */
    button_container.querySelector('.comment').addEventListener('click', ()=>toggleAddComment(comment_form_node));
    button_container.querySelector('.delete').addEventListener('click', ()=>showDeleteModal(message_clone));
    button_container.querySelector('.edit').addEventListener('click', ()=>showEditFunction(button_container, message_clone));
    edit_message_container.querySelector('.edit_message_textarea').addEventListener('keyup', (event)=>formTextAreaKeyUp(event, update_message_btn));
    edit_message_container.querySelector('.cancel_update').addEventListener('click', ()=>cancelUpdateMessage(message_clone));
    edit_message_container.addEventListener('submit', (event)=>updateMessage(event ,message_clone));
    message_clone.querySelector('.comment_form').addEventListener('submit', prependComment);
    comment_form_node.querySelector('.comment_form_textarea').addEventListener('keyup', (event)=>formTextAreaKeyUp(event, comment_form_submit_btn));
    
    /* Creating a new message and adding it to the message container. */
    message_container.prepend(message_clone);
    updateMessageCount();
}

/**
* Function that clones comment template, removes the hide class from the clone, and then prepends the clone to the comment_container. <br>
* Triggered: When user clicked "Post Comment" button. <br>
* @function
* @param {object} event - the event object
* @author Noel
*/
function prependComment(event){
    event.preventDefault();

    /** Getting the value of the textarea, the id of the comment, the parent message, the submit button,
    * the textarea, and the comment container. 
    */
    const comment_template = document.querySelector('.comments');
    const comment_value = event.target[0].value; 
    const comment_id = new Date().valueOf();
    const parent_message = event.target.closest('.messages');
    const comment_form_submit_btn = parent_message.querySelector('.comment_form .post_comment_btn');
    const comment_form_text_area = parent_message.querySelector('.comment_form textarea');
    const parent_comment_container = parent_message.querySelector('.comment_container');
    parent_comment_container.classList.remove('hide');
    
   /* Cloning the comment template and setting the comment id number and the comment value. */
    const comment_clone = comment_template.cloneNode(true);
    comment_clone.setAttribute('data-comment-id', comment_id);
    comment_clone.querySelector('.message_wrapper').innerText = comment_value;

   /* The above code is selecting the elements from the comment_clone. */
    const button_container = comment_clone.querySelector('.buttons_container');
    const edit_message_container = comment_clone.querySelector('.edit_message_container');
    const update_message_btn = comment_clone.querySelector('.update_message_btn');
    
    /* The above code is adding event listeners to the buttons and textarea. */
    button_container.querySelector('.delete').addEventListener('click', ()=>showDeleteModal(comment_clone));
    button_container.querySelector('.edit').addEventListener('click', ()=>showEditFunction(button_container, comment_clone));
    edit_message_container.addEventListener('submit', (event)=>updateMessage(event, comment_clone));
    edit_message_container.querySelector('.cancel_update').addEventListener('click', ()=>cancelUpdateMessage(comment_clone));
    edit_message_container.querySelector('.edit_message_textarea').addEventListener('keyup', (event)=>formTextAreaKeyUp(event, update_message_btn));

    /* Taking the comment_clone and prepending it to the parent_comment_container. */
    parent_comment_container.prepend(comment_clone);

    /* Resetting the form and updating the comment count. */
    resetForm(comment_form_text_area, comment_form_submit_btn);
    updateCommentCount(parent_message);
}

/**
* It takes a button container and a clone of the message/comment container as arguments, <br>
* and then it hides the button container and shows the edit message container.  <br>
* Triggered: When user clicked edit button in comment/message buttons container.  <br>
* @function
* @param {object} button_container - The container that holds the buttons.
* @param {object} clone - The clone of the message/comment that is being edited.
* @author Noel
*/
function showEditFunction(button_container, clone){
    const edit_message_container = clone.querySelector('.edit_message_container');
    const message_wrapper = clone.querySelector('.message_wrapper');
    const message_text = message_wrapper.innerText;
    const edit_message_texarea = edit_message_container.querySelector('textarea');
    
    edit_message_texarea.value = message_text;
    hideElement(button_container);
    hideElement(message_wrapper);
    showElement(edit_message_container, 'show_flex');
}

/**
* It hides the edit message container, shows the message wrapper, and shows the buttons container <br>
* Triggered: When the user clicks the update button <br>
* @function
* @param {object} message_container - The container of the message that is being edited. <br>
* @author Noel
*/
function cancelUpdateMessage(message_container){
    const message_wrapper = message_container.querySelector('.message_wrapper');
    const buttons_container = message_container.querySelector('.buttons_container');
    const edit_message_container = message_container.querySelector('.edit_message_container');

    hideElement(edit_message_container, 'show_flex');
    showElement(message_wrapper);
    showElement(buttons_container);
}

/**
* DOCU: It takes an event, and a message container as arguments, and then it updates the message paragraph <br>
* with the value of the textarea. <br>
* Triggered: When user submitted edit form. <br>
* @function
* @param {object} event - the event object
* @param {object} message_container - the container of the message that is being edited
* @author Noel
*/
function updateMessage(event, message_container){
    event.preventDefault();

    const edit_message_container = message_container.querySelector('.edit_message_container');
    const message_wrapper = message_container.querySelector('.message_wrapper');
    const buttons_container = message_container.querySelector('.buttons_container');
    const textarea_value = edit_message_container.querySelector('.edit_message_textarea').value;

    /* Setting the innerText of the message_wrapper to the value of the textarea. */
    message_wrapper.innerText = textarea_value;

    /* Showing the message_wrapper and buttons_container and hiding the edit_message_container. */
    showElement(message_wrapper);
    showElement(buttons_container);
    hideElement(edit_message_container, 'show_flex');
}

/**
* DOCU: The function is called when the user clicks the delete button on a comment. The function then <br>
* removes the comment from the DOM, hides the delete button, and updates the comment count. <br>
* Triggered: When user successfully submitted comment delete modal form.
* @function
* @param {onject} event - The event object.
* @author Noel
*/
function submitDeleteComment(event){
    event.preventDefault();

    /* Get the comment id, comment container,  and parent message */
    const comment_item_id_number = event.target[0].value;
    const comment_to_delete = message_container.querySelector(`li[data-comment-id="${comment_item_id_number}"]`);
    const comment_container = comment_to_delete.closest('.comment_container');
    const comment_parent_message = comment_container.closest('.messages');

    /* Removing the comment from the DOM. */
    comment_container.removeChild(comment_to_delete);
    
    /* Hiding the comment and updating the comment count. */
    hideElement(remove_comment);
    updateCommentCount(comment_parent_message);
}


/**
* DOCU: It deletes a message from the DOM and updates the message count. <br>
* Triggered: When user successfully submitted message delete modal form.
* @function
* @param {object} event - The event object.
* @author Noel 
*/
function submitDeleteMessage(event){
    event.preventDefault();

    /* Selecting the message to delete and its id. */
    const message_item_id_number = event.target[0].value;
    const message_to_delete = message_container.querySelector(`li[data-message-id="${message_item_id_number}"]`);

    /* Removing the message from the DOM. */
    message_to_delete.closest('#message_container').removeChild(message_to_delete);

    /* Hiding the message modal and updating the message count. */
    hideElement(remove_message);
    updateMessageCount();
}

/**
* DOCU: It updates the message count and shows/hides the empty message container.
* Triggered: When user delete/add message.
* @function
* @author Noel 
*/
function updateMessageCount(){
    const message_count = message_container.children.length;
    const message_message_span = document.getElementById('message_number');
    const empty_message_container = document.getElementById('empty_message_container');
    message_message_span.innerText = message_count;

    /** 
    * Check if the message count is greater than 0. If it is, it hides the empty message container.
    * If it is not, it shows the empty message container. 
    */
    if(message_count){
        hideElement(empty_message_container);
    }
    else{
        showElement(empty_message_container);
    }
}

/**
* DOCU: It takes a parent message element as an argument and updates the comment count and comment icon
* based on the number of comments that message has.
* Triggered: When user delete/add comment.
* @param {object} parent_message - the parent message of the comment
* @function
* @author Noel  
*/
function updateCommentCount(parent_message){
    const comment_count = parent_message.querySelector('.comment_container').children.length;
    const comment_btn_icon = parent_message.querySelector('.comment span');
    const comment_count_span = parent_message.querySelector('.comment .comment_count')
    const comment_btn = parent_message.querySelector('.comment');

    /** 
    * If comment count is greater than 0, it will add the class active_comment_icon to the comment_btn_icon 
    * and add the class active to the comment_btn. If it is false, it will remove the class active_comment_icon 
    * from the comment_btn_icon and remove the class active from the comment_btn. 
    */
    if(comment_count){
        comment_btn_icon.classList.add('active_comment_icon');
        comment_btn.classList.add('active');  
    }
    else{
        comment_btn_icon.classList.remove('active_comment_icon');
        comment_btn.classList.remove('active'); 
    }

    /* Setting the innerText of the comment_count_span to the value of the comment_count variable. */
    comment_count_span.innerText = comment_count;
}

/**
* DOCU: Changes button style and disabled attribute value. <br>
* Triggered: It is called by formTextAreaKeyUp function when updating form button on keyup of textarea. <br>
* @param {integer} textarea_length - the length of the textarea
* @param {object} button_to_disable - The button you want to disable/enable
* @function
* @author Noel  
*/
function changeDisabledAttribute(textarea_length, button_to_disable){

    /** 
    * Check the length of the textarea. If it is greater than 0, it removes the disabled class
    * and sets the disabled attribute to false. If the length is 0, it adds the disabled class and
    * sets the disabled attribute to true. 
    */
    if(textarea_length){
        button_to_disable.classList.remove('disabled');
        button_to_disable.disabled = false;
    }
    else{
        button_to_disable.classList.add('disabled');
        button_to_disable.disabled = true;
    }
}

/**
* DOCU: Pass textarea length change button class and disabled attribut depending of length of textarea. <br>
* Triggered: It is called by keyup event listener of a form textarea. <br>
* @param {object} event - The event object
* @param {object} form_submit_btn - The submit button of the form.
* @function
* @author Noel 
*/
function formTextAreaKeyUp(event, form_submit_btn){
    const textarea_length = event.target.value.trim().length;
    changeDisabledAttribute(textarea_length, form_submit_btn);
}