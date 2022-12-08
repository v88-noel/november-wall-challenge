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
* Onload event Listeners
*/
create_message_btn.addEventListener('click', ()=>showElement(create_new_message_modal));
create_new_message_textarea.addEventListener('keyup', (event)=>formTextAreaKeyUp(event, post_message_btn));
post_message_btn.addEventListener('click', postMessageBtnOnClick);

for( let index = 0; index < confirm_delete_btn.length; index++){
    confirm_delete_btn[index].addEventListener('click', confirmDeleteOnClick);
}

for( let index = 0; index < close_modal.length; index++){
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

/* When the user clicks the delete button, show the delete message/comment modal. */
function showDeleteModal(content_to_delete){
    delete_node_holder = content_to_delete;
    const content_class_list = content_to_delete.classList;

    if(content_class_list.contains('messages')){
        showElement(remove_message);
    }else{
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

    if(class_list.contains('hide')){
        showElement(comment_form);
    }
    else{
        hideElement(comment_form);
    }
}


/**
* When the user clicks the post message button, the function will check if the message value is
* greater than 0, if it is, it will create a new message, reset the form, and hide the modal.
* @function 
* @param {object} event - the event object
* @author Noel
*/
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

/**
* DOCU: It creates a new message, adds event listeners to the buttons, and prepends the message to the message container. <br>
* Triggered: When user when user input character in textarea and clicked "Post Message" which will then fire postMessageBtnOnClick function <br>
* that will triggered this function <br> 
* @function
* @param {string} message - the message that the user has typed in the create new message textarea
* @author Noel
*/
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
    button_container.querySelector('.delete').addEventListener('click', ()=>showDeleteModal(message_clone));
    button_container.querySelector('.edit').addEventListener('click', ()=>showEditFunction(button_container, message_clone));
    edit_message_container.querySelector('.cancel_update').addEventListener('click', ()=>updateMessage(message_clone));
    update_message_btn.addEventListener('click', ()=>updateMessage(message_clone));
    message_clone.querySelector('.comment_form').addEventListener('submit', prependComment);
    comment_form_node.querySelector('textarea').addEventListener('keyup', (event)=>formTextAreaKeyUp(event, comment_form_submit_btn));
    message_form.querySelector('textarea').addEventListener('keyup', (event)=>formTextAreaKeyUp(event, update_message_btn));
    
    message_container.prepend(message_clone);
    updateMessageCount();
}

/**
* Function that clones comment template, removes the hide class from the clone, and then prepends the clone to the comment_container. <br>
* @function
* @param {object} event - the event object
* @author Noel
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
        comment_clone.querySelector('form textarea').value = comment_value;
        comment_clone.classList.remove('hide');

        const button_container = comment_clone.querySelector('.buttons_container');
        const message_form = comment_clone.querySelector('.message_form');
        const edit_message_container = comment_clone.querySelector('.edit_message_container');
        const update_message_btn = comment_clone.querySelector('.update_message_btn');

        comment_clone.querySelector('.buttons_container .delete').addEventListener('click', ()=>showDeleteModal(comment_clone));
        comment_clone.querySelector('.buttons_container .edit').addEventListener('click', ()=>showEditFunction(button_container, comment_clone));
        edit_message_container.querySelector('.update_message_btn').addEventListener('click', ()=>updateMessage(comment_clone));
        edit_message_container.querySelector('.cancel_update').addEventListener('click', ()=>updateMessage(comment_clone));
        message_form.querySelector('textarea').addEventListener('keyup', (event)=>formTextAreaKeyUp(event, update_message_btn));

        parent_comment_container.prepend(comment_clone);
        resetForm(comment_form_text_area, comment_form_submit_btn);
        updateCommentCount(parent_message);
    }
}

/**
* It takes a button container and a clone of the message/comment container as arguments, and then it hides the
* button container and shows the edit message container.
* @function
* @param {object} button_container - The container that holds the buttons.
* @param {object} clone - The clone of the message/comment that is being edited.
* @author Noel
*/
function showEditFunction(button_container, clone){
    const class_list = clone.classList;
    const clone_textarea = clone.querySelector('textarea');
    const edit_message_container = clone.querySelector('.edit_message_container');

    if(!class_list.contains('active')){
        hideElement(button_container);
        showElement(edit_message_container);
        clone.classList.add('active');
        clone_textarea.disabled = false;
    }
}

/* When the user clicks the update button, the message is updated and the message form is disabled. */
function updateMessage(message_container){
    const message_textarea = message_container.querySelector('.message_form textarea');
    const edit_message_container = message_container.querySelector('.edit_message_container');
    const buttons_container = message_container.querySelector('.buttons_container')

    if(message_textarea.value.length > 0){
        message_container.classList.remove('active');
        message_textarea.disabled = true;
        hideElement(edit_message_container);
        showElement(buttons_container);
    }
}

/**
* If the user clicks the confirm delete button, then delete the node that was stored in the
* delete_node_holder variable and hide the modal.
*/
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