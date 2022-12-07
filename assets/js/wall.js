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

/* Containers */
const message_container = document.getElementById('message_container');

/* Template Elements */
const message_template = document.querySelector('.messages');
const comment_template = document.querySelector('.comments');

let delete_node_holder = '';

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

/* If the element has the class 'inactive', remove it and add the class 'active'. */
function changeToActive(element){
    element.classList.add('active');
    element.classList.remove('inactive');
}

/* If the element has the class 'active', then remove it and add the class 'inactive'. */
function changeToInactive(element){
    element.classList.add('inactive');
    element.classList.remove('active');
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

/* Show and hide comment form */
function toggleAddComment(comment_form){
    let class_list = comment_form.classList;
    if(class_list.contains('hide')){
        showElement(comment_form);
    }
    else{
        hideElement(comment_form);
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
    update_message_btn.addEventListener('click', ()=>updateMessage(message_clone));
    edit_message_container.querySelector('.cancel_update').addEventListener('click', ()=>updateMessage(message_clone));
    message_clone.querySelector('.comment_form').addEventListener('submit', prependComment);
    comment_form_node.querySelector('textarea').addEventListener('keydown', (event)=>commentFormKeyDown(event, comment_form_submit_btn));
    message_form.querySelector('textarea').addEventListener('keydown', (event)=>commentFormKeyDown(event, update_message_btn));
    
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
        changeToActive(clone);
        clone_textarea.disabled = false;
    }
}

/* When the user clicks the update button, the message is updated and the message form is disabled. */
function updateMessage(message_container){
    let message_textarea = message_container.querySelector('.message_form textarea');
    
    if(message_textarea.value.length > 0){
        changeToInactive(message_container);
        message_textarea.disabled = true;
        hideElement(message_container.querySelector('.edit_message_container'));
        showElement(message_container.querySelector('.buttons_container'));
    }
}

/**
* Function that takes an event as an argument, prevents the default action of
* the event, and then clones a comment template, adds event listeners to the cloned template, and then
* prepends the cloned template to the comment container.
*/
function prependComment(event){
    event.preventDefault();
    let comment_value = event.target[0].value; 

    if(comment_value.length > 0){
        const parent = event.target.parentElement;
        const comment_form_submit_btn = parent.querySelector('.comment_form .post_comment_btn');
        const comment_form_text_area = parent.querySelector('.comment_form textarea');
        const parent_comment_container = parent.querySelector('.comment_container');
        const comment_clone = comment_template.cloneNode(true);
        const button_container = comment_clone.querySelector('.buttons_container');
        const message_form = comment_clone.querySelector('.message_form');
        const edit_message_container = comment_clone.querySelector('.edit_message_container');
        const update_message_btn = comment_clone.querySelector('.update_message_btn');

        comment_clone.querySelector('form textarea').value = comment_value;
        comment_clone.querySelector('.buttons_container .delete').addEventListener('click', ()=>deleteComment(comment_clone));
        comment_clone.querySelector('.buttons_container .edit').addEventListener('click', ()=>showEditFunction(button_container, comment_clone));
        edit_message_container.querySelector('.update_message_btn').addEventListener('click', ()=>updateMessage(comment_clone));
        edit_message_container.querySelector('.cancel_update').addEventListener('click', ()=>updateMessage(comment_clone));
        message_form.querySelector('textarea').addEventListener('keydown', (event)=>commentFormKeyDown(event, update_message_btn));

        resetForm(comment_form_text_area, comment_form_submit_btn);
        showElement(comment_clone);
        showElement(parent_comment_container);
        parent_comment_container.prepend(comment_clone);
        updateCommentCount(parent);
    }
}


/* Updates message_number span count after adding/deleting messages */
function updateMessageCount(){
    let message_count = message_container.children.length - 3;
    message_number.innerText = message_count;
    if(message_count <= 0){
        showElement(empty_message_container);
    }
    else{
        hideElement(empty_message_container);
    }
}

/**
* It updates the comment count from a message.
*/
function updateCommentCount(parent){
    let comment_count = parent.querySelector('.comment_container').children.length;
    const comment_btn_icon = parent.querySelector('.comment span');
    const comment_count_span = parent.querySelector('.comment .comment_count')
    const comment_btn = parent.querySelector('.comment');

    if(comment_count > 0){
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
* If the target length is greater than 0, remove the disabled class and set the disabled attribute to
* false. Otherwise, add the disabled class and set the disabled attribute to true
*/
function changeDisabledAttribute(target_length, node){
    if(target_length > 0){
        node.classList.remove('disabled');
        node.disabled = false;
    }
    else{
        node.classList.add('disabled');
        node.disabled = true;
    }
}

/**
* If the length of the textarea is greater than 0, then remove the disabled attribute from the submit
* button.
*/
function commentFormKeyDown(event, comment_form_submit_btn){
    let textarea_length = event.target.value.length;
    changeDisabledAttribute(textarea_length, comment_form_submit_btn);
}

/**
* When the delete button is clicked, show the delete confirmation button and store the parent node of
* the deleted button in a variable.
*/
function deleteComment(parent){
    showElement(remove_comment);
    delete_node_holder = parent;
}

/**
*  End of Functions
*/

/**
* Event Listeners
*/

/* Triggered by clicking "create message" button at the very top of main container*/
create_message_btn.addEventListener('click', function(event){
    showElement(create_new_message_modal);
});

/* Bind click listener to hide element in modal containing the clicked button */
for(let index = 0; index < cancel_btn.length; index++){
    cancel_btn[index].addEventListener('click', function(event){
        hideElement(event.target.parentElement.parentElement.parentElement);
    });
}

/* Bind click listener to hide element in modal containing the clicked button */
for(let index = 0; index < close_modal_btn.length; index++){
    close_modal_btn[index].addEventListener('click', function(event){
        hideElement(event.target.parentElement.parentElement.parentElement);
    });
}

/* Add/Delete "disabled" in class list of element and changes disabled attribute to true/false */
create_new_message_textarea.addEventListener('keydown', function(event){
    let post_message_button_node = event.target.nextElementSibling.children[1];
    let length_value = event.target.value.length;
    changeDisabledAttribute(length_value, post_message_button_node);
});


/* The above code is adding an event listener to the post message button. When the button is clicked,
the code will grab the value of the textarea and if the value length is greater than 0, it will create a
new message, reset the form, and hide the element. */
post_message_btn.addEventListener('click', function(event){
    let target_parent = event.target.parentElement.parentElement.parentElement;
    let message_value = create_new_message_textarea.value;

    if(message_value.length > 0){
        createNewMessage(create_new_message_textarea.value);
        resetForm(create_new_message_textarea, post_message_btn);
        hideElement(target_parent); 
    }    
});

/* Adding an event listener to the confirm delete button. When the button is clicked,
the code will remove the node stored in delete_node_holder and then hide the modal. */
for(let index = 0; index < confirm_delete_btn.length; index++){
    confirm_delete_btn[index].addEventListener('click', function(event){
        let parent_node = delete_node_holder.parentElement;
        let modal_parent = event.target.parentElement.parentElement.parentElement.classList;

        if(event.target.classList.contains('confirm_delete_btn')){
            parent_node.removeChild(delete_node_holder);

            if(modal_parent.contains('remove_message')){
                hideElement(remove_message);
                updateMessageCount();
            }
            else{
                hideElement(remove_comment);
                updateCommentCount(parent_node.parentElement);
            }
        }
    });
}
