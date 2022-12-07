/**
* Variable Declarations
*/

/* Current Number of Message Span */
const message_number = document.getElementById('message_number');
const empty_message_container = document.querySelector('.empty_message_container');

/* Create Message Container */
const create_message_btn = document.getElementById('create_message_btn');

/* Modal */
const create_new_message_modal = document.querySelector('.create_new_message_modal');
const create_new_message_textarea = document.querySelector('.create_new_message_textarea');
const remove_message = document.querySelector('.remove_message');
const remove_comment = document.querySelector('.remove_comment');

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

/* Hold the node of comment/message to be deleted. */
let delete_node_holder = '';

/**
* Event Listeners
*/
create_message_btn.addEventListener('click', ()=>showElement(create_new_message_modal));
create_new_message_textarea.addEventListener('keyup', newMessageTextAreaKeyUp);
post_message_btn.addEventListener('click', postMessageBtnOnClick);

for(let index = 0; index < confirm_delete_btn.length; index++){
    confirm_delete_btn[index].addEventListener('click', confirmDeleteOnClick);
}

for(let index = 0; index < close_modal.length; index++){
    close_modal[index].addEventListener('click', hideModal);
}

/**
* Functions
*/

/* Adds show class to element and remove hide to change display value */
function showElement(element){
    element.classList.add('show');
    element.classList.remove('hide');
}

/* Adds hide class to element and remove show to change display value */
function hideElement(element){
    element.classList.add('hide');
    element.classList.remove('show');
}

/* Reset form by removing all text in textarea and set button to become disabled */
function resetForm(textarea, button){
    textarea.value = '';
    button.disabled = true;
    button.classList.add('disabled');
}

/* When the user clicks the delete button, show the delete message modal. */
function showDeleteMessageModal(parent){
    delete_node_holder = parent;
    showElement(remove_message);
}

/* Bind click listener to hide element in modal containing the clicked button */
function hideModal(event){
    event.preventDefault();
    const modal = event.target.closest('.modal');
    hideElement(modal);

    if(modal.classList.contains('create_new_message_modal')){
        const modal_textarea = modal.querySelector('.create_new_message_modal textarea');
        const post_message_btn = modal.querySelector('.create_new_message_modal .post_message_btn');
        resetForm(modal_textarea, post_message_btn);
    }
}

/* Add/Delete "disabled" in class list of element and changes disabled attribute to true/false */
function newMessageTextAreaKeyUp(event){
    const post_message_button_node = event.target.nextElementSibling.children[1];
    const length_value = event.target.value.length;
    changeDisabledAttribute(length_value, post_message_button_node);
}

/* Show and hide comment form */
function toggleAddComment(comment_form){
    const class_list = comment_form.classList;

    if(class_list.contains('hide')){
        showElement(comment_form);
    }
    else{
        hideElement(comment_form);
    }
}

/* The above code is adding an event listener to the post message button. When the button is clicked,
the code will grab the value of the textarea and if the value length is greater than 0, it will create a
new message, reset the form, and hide the element. */
function postMessageBtnOnClick(event){
    event.preventDefault();
    const create_new_message_modal = event.target.closest('.create_new_message_modal');
    const message_value = create_new_message_textarea.value;

    if(message_value.length > 0){
        createNewMessage(create_new_message_textarea.value);
        resetForm(create_new_message_textarea, post_message_btn);
        hideElement(create_new_message_modal); 
    }    
}

/* Creates a new message, adds event listeners to the buttons, and prepends the message to the message container.*/
function createNewMessage(message){
    const message_clone = message_template.cloneNode(true);
    message_clone.classList.remove('hide');
    message_clone.querySelector('textarea').innerText = message;
    const comment_form_node = message_clone.querySelector('.comment_form');
    const message_form = message_clone.querySelector('.message_form');
    const comment_form_submit_btn = comment_form_node.querySelector('.post_comment_btn');
    const button_container = message_clone.querySelector('.buttons_container');
    const edit_message_container = message_clone.querySelector('.edit_message_container');
    const update_message_btn = message_clone.querySelector('.update_message_btn');

    button_container.querySelector('.comment').addEventListener('click', ()=>toggleAddComment(comment_form_node));
    button_container.querySelector('.delete').addEventListener('click', ()=>showDeleteMessageModal(message_clone));
    button_container.querySelector('.edit').addEventListener('click', ()=>showEditFunction(button_container, message_clone));
    edit_message_container.querySelector('.cancel_update').addEventListener('click', ()=>updateMessage(message_clone));
    update_message_btn.addEventListener('click', ()=>updateMessage(message_clone));
    message_clone.querySelector('.comment_form').addEventListener('submit', prependComment);
    comment_form_node.querySelector('textarea').addEventListener('keyup', (event)=>commentFormKeyUp(event, comment_form_submit_btn));
    message_form.querySelector('textarea').addEventListener('keyup', (event)=>commentFormKeyUp(event, update_message_btn));
    
    message_container.prepend(message_clone);
    updateMessageCount();
}

/**
 * It takes a button container and a clone as arguments, and then it hides the button container, shows
 * the edit message container, changes the clone to active, and disables the clone's textarea.
 */
function showEditFunction(button_container, clone){
    const class_list = clone.classList;
    const clone_textarea = clone.querySelector('textarea');
    const edit_message_container = clone.querySelector('.edit_message_container');

    if(class_list.contains('inactive')){
        hideElement(button_container);
        showElement(edit_message_container);
        clone.classList.add('active');
        clone.classList.remove('inactive');
        clone_textarea.disabled = false;
    }
}

/* When the user clicks the update button, the message is updated and the message form is disabled. */
function updateMessage(message_container){
    const message_textarea = message_container.querySelector('.message_form textarea');
    
    if(message_textarea.value.length > 0){
        message_container.classList.add('inactive');
        message_container.classList.remove('active');
        message_textarea.disabled = true;
        hideElement(message_container.querySelector('.edit_message_container'));
        showElement(message_container.querySelector('.buttons_container'));
    }
}

/* Adding an event listener to the confirm delete button. When the button is clicked,
the code will remove the node stored in delete_node_holder and then hide the modal. */
function confirmDeleteOnClick(event){
    event.preventDefault();
    const modal_class_list = event.target.closest('.modal').classList;

    if(event.target.classList.contains('confirm_delete_btn')){
        if(modal_class_list.contains('remove_message')){
            delete_node_holder.closest('#message_container').removeChild(delete_node_holder);
            hideElement(remove_message);
            updateMessageCount();
        }
        else{
            let container = delete_node_holder.closest('.comment_container');
            container.removeChild(delete_node_holder)
            hideElement(remove_comment);
            updateCommentCount(container.closest('.messages'));
        }
    }
}

/**
* Function that takes an event as an argument, prevents the default action of
* the event, and then clones a comment template, adds event listeners to the cloned template, and then
* prepends the cloned template to the comment container.
*/
function prependComment(event){
    event.preventDefault();
    const comment_value = event.target[0].value; 

    if(comment_value.length){
        const parent_message = event.target.closest('.messages');
        const comment_form_submit_btn = parent_message.querySelector('.comment_form .post_comment_btn');
        const comment_form_text_area = parent_message.querySelector('.comment_form textarea');
        const parent_comment_container = parent_message.querySelector('.comment_container');
        parent_comment_container.classList.remove('hide');

        const comment_clone = comment_template.cloneNode(true);
        comment_clone.classList.remove('hide');

        const button_container = comment_clone.querySelector('.buttons_container');
        const message_form = comment_clone.querySelector('.message_form');
        const edit_message_container = comment_clone.querySelector('.edit_message_container');
        const update_message_btn = comment_clone.querySelector('.update_message_btn');

        comment_clone.querySelector('form textarea').value = comment_value;
        comment_clone.querySelector('.buttons_container .delete').addEventListener('click', ()=>deleteComment(comment_clone));
        comment_clone.querySelector('.buttons_container .edit').addEventListener('click', ()=>showEditFunction(button_container, comment_clone));
        edit_message_container.querySelector('.update_message_btn').addEventListener('click', ()=>updateMessage(comment_clone));
        edit_message_container.querySelector('.cancel_update').addEventListener('click', ()=>updateMessage(comment_clone));
        message_form.querySelector('textarea').addEventListener('keyup', (event)=>commentFormKeyUp(event, update_message_btn));

        parent_comment_container.prepend(comment_clone);
        resetForm(comment_form_text_area, comment_form_submit_btn);
        updateCommentCount(parent_message);
    }
}


/* Updates message_number span count after adding/deleting messages */
function updateMessageCount(){
    const message_count = message_container.children.length - 3;
    message_number.innerText = message_count;

    if(message_count <= 0){
        showElement(empty_message_container);
    }
    else{
        hideElement(empty_message_container);
    }
}

/**
* It updates the comment count based from the number of child in comment container. 
* It then changes the comment button and icons color depending on number of comments.
*/
function updateCommentCount(parent){
    const comment_count = parent.querySelector('.comment_container').children.length;
    const comment_btn_icon = parent.querySelector('.comment span');
    const comment_count_span = parent.querySelector('.comment .comment_count')
    const comment_btn = parent.querySelector('.comment');

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
function changeDisabledAttribute(textarea_length, button_to_be_disabled){
    if(textarea_length){
        button_to_be_disabled.classList.remove('disabled');
        button_to_be_disabled.disabled = false;
    }
    else{
        button_to_be_disabled.classList.add('disabled');
        button_to_be_disabled.disabled = true;
    }
}

/**
* If the length of the textarea is greater than 0, then remove the disabled attribute from the submit
* button.
*/
function commentFormKeyUp(event, comment_form_submit_btn){
    const textarea_length = event.target.value.length;
    changeDisabledAttribute(textarea_length, comment_form_submit_btn);
}

/**
* When the delete button is clicked, show the delete confirmation button and store the parent node of
* the deleted button in a variable.
*/
function deleteComment(comment_node){
    showElement(remove_comment);
    delete_node_holder = comment_node;
}

