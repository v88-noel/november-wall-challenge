/* ---- Variable Declaration Section---- */

/* Current Number of Message Span */
const message_number = document.getElementById('message_number');
const empty_message_container = document.querySelector('#empty_message_container');

/* Create Message Container */
const create_message_btn = document.getElementById('create_message_btn');

/* Modal */
const create_new_message_modal = document.querySelector('.create_new_message_modal');
const create_new_message_textarea = document.querySelector('.create_new_message_textarea');
const remove_message = document.querySelector('.remove_message');
const remove_comment = document.querySelector('.remove_comment');
const modal_panel_form = document.querySelectorAll('.modal_panel');

/* Modal Buttons */
const cancel_btn = document.querySelectorAll('.cancel_btn');
const close_modal_btn = document.querySelectorAll('.close_modal_btn');
const post_message_btn = document.querySelector('.post_message_btn');
const confirm_delete_btn = document.querySelectorAll('.confirm_delete_btn');
const close_modal = document.querySelectorAll('.close_modal');

/* Containers */
const message_container = document.getElementById('message_container');

/* Template Elements */
const message_template = document.querySelector('.messages');
const comment_template = document.querySelector('.comments');

/* ---- Onload Event Listener Section ---- */

create_message_btn.addEventListener('click', ()=>showElement(create_new_message_modal));
create_new_message_textarea.addEventListener('keyup', (event)=>formTextAreaKeyUp(event, post_message_btn));
post_message_btn.addEventListener('click', postMessageBtnOnClick);

for (let modal_panel_form_index = 0;  modal_panel_form_index < modal_panel_form.length; modal_panel_form_index++){
    modal_panel_form[modal_panel_form_index].addEventListener('submit', submitDelete);
}

for( let close_modal_index = 0; close_modal_index < close_modal.length; close_modal_index++){
    close_modal[close_modal_index].addEventListener('click', hideModal);
}

/* ---- Function Section ---- */

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

/* Reset form by removing all text in textarea and set button to become disabled */
function resetForm(textarea, button){
    textarea.value = '';
    button.disabled = true;
    button.classList.add('disabled');
}

/* When the user clicks the delete button, show the delete message/comment modal. */
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

/* Hides modal containing close_modal class */
function hideModal(event){
    event.preventDefault();
    const modal = event.target.closest('.modal');
    hideElement(modal);

    if(modal.classList.contains('create_new_message_modal')){
        const modal_textarea = modal.querySelector('textarea');
        const post_message_btn = modal.querySelector('.post_message_btn');
        resetForm(modal_textarea, post_message_btn);
    }
}

/* Show and hide comment form */
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
function postMessageBtnOnClick(event){
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
    /* Creating a new message_id_number, cloning the message_template, and setting the
    message_id_number attribute to the new message_id_number. It is also setting the innerText of
    the message_wrapper p element to the message. */
    const message_id_number = new Date().valueOf();
    const message_clone = message_template.cloneNode(true);
    message_clone.setAttribute('data-message-id', message_id_number);
    message_clone.querySelector('.message_wrapper p').innerText = message;

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

    /* Getting the value of the textarea, the id of the comment, the parent message, the submit button,
    the textarea, and the comment container. */
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
    comment_clone.querySelector('.message_wrapper p').innerText = comment_value;

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
* Triggered: When user clicked edit button in comment/message buttons container.  
* @function
* @param {object} button_container - The container that holds the buttons.
* @param {object} clone - The clone of the message/comment that is being edited.
* @author Noel
*/
function showEditFunction(button_container, clone){
    const edit_message_container = clone.querySelector('.edit_message_container');
    const message_wrapper = clone.querySelector('.message_wrapper');
    const message_text = message_wrapper.querySelector('p').innerText;
    const edit_message_texarea = edit_message_container.querySelector('textarea');
    
    edit_message_texarea.value = message_text;
    hideElement(button_container);
    hideElement(message_wrapper);
    showElement(edit_message_container, 'show_flex');
}

/* When the user clicks the update button, the message is updated and the message form is disabled. */
function cancelUpdateMessage(message_container){
    const message_wrapper = message_container.querySelector('.message_wrapper');
    const buttons_container = message_container.querySelector('.buttons_container');
    const edit_message_container = message_container.querySelector('.edit_message_container');

    hideElement(edit_message_container, 'show_flex');
    showElement(message_wrapper);
    showElement(buttons_container);
}

/**
 * It takes an event, and a message container as arguments, and then it updates the message paragraph
 * with the value of the textarea.
 */
function updateMessage(event, message_container){
    event.preventDefault();

    const edit_message_container = message_container.querySelector('.edit_message_container');
    const message_wrapper = message_container.querySelector('.message_wrapper');
    const buttons_container = message_container.querySelector('.buttons_container');
    const textarea_value = edit_message_container.querySelector('.edit_message_textarea').value;
    const message_paragraph = message_wrapper.querySelector('p');
    message_paragraph.innerText = textarea_value;

    showElement(message_wrapper);
    showElement(buttons_container);
    hideElement(edit_message_container, 'show_flex');
}

/** It removes comment/message from the DOM and updates the count of the list items. */
function submitDelete(event){
    event.preventDefault();
    const modal_class_list = event.target.closest('.modal').classList;
    const list_item_id_number = event.target[1].value;
    let item_to_delete = ''

    /* Removing the message/comment from the message/comment container. */
    if(modal_class_list.contains('remove_message')){
        item_to_delete = message_container.querySelector(`li[data-message-id="${list_item_id_number}"]`);
        item_to_delete.closest('#message_container').removeChild(item_to_delete);
        hideElement(remove_message);
        updateMessageCount();
    }
    else{
        item_to_delete = message_container.querySelector(`li[data-comment-id="${list_item_id_number}"]`);
        let container = item_to_delete.closest('.comment_container');
        container.removeChild(item_to_delete);
        hideElement(remove_comment);
        updateCommentCount(container.closest('.messages'));
    }
}

/* Updates message_number span count after adding/deleting messages */
function updateMessageCount(){
    const message_count = message_container.children.length;
    message_number.innerText = message_count;

    if(message_count){
        hideElement(empty_message_container);
    }
    else{
        showElement(empty_message_container);
    }
}

/**
* It updates the comment count based from the number of child in comment container. 
* It then changes the comment button and icons color depending on number of comments.
*/
function updateCommentCount(parent_message){
    const comment_count = parent_message.querySelector('.comment_container').children.length;
    const comment_btn_icon = parent_message.querySelector('.comment span');
    const comment_count_span = parent_message.querySelector('.comment .comment_count')
    const comment_btn = parent_message.querySelector('.comment');

    if(comment_count){
        comment_btn_icon.classList.add('active_comment_icon');
        comment_btn.classList.add('active');  
    }
    else{
        comment_btn_icon.classList.remove('active_comment_icon');
        comment_btn.classList.remove('active'); 
    }

    comment_count_span.innerText = comment_count;
}

/**
* If the textarea has text in it, remove the disabled class and set the disabled attribute to false.
* If the textarea is empty, add the disabled class and set the disabled attribute to true
*/
function changeDisabledAttribute(textarea_length, button_to_disable){
    if(textarea_length){
        button_to_disable.classList.remove('disabled');
        button_to_disable.disabled = false;
    }
    else{
        button_to_disable.classList.add('disabled');
        button_to_disable.disabled = true;
    }
}

/* Function that helps bind keyup event listener to form submit buttons in create new comment/message as well as edit comment/message. */
function formTextAreaKeyUp(event, form_submit_btn){
    const textarea_length = event.target.value.trim().length;
    changeDisabledAttribute(textarea_length, form_submit_btn);
}