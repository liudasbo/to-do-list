const addButton = document.querySelector('#addButton');
const inputField = document.querySelector('#input__field');
// Regex
const re = /^\s/;
// Change add button class if input value changes
inputField.addEventListener('keyup', checkInputValue);
function checkInputValue() {
    // Not allowing write space in the beginning of input
    if (re.test(inputField.value)) {
        inputField.value = '';
    }
    
    if (inputField.value === '') {
        addButton.classList.replace('buttons-active', 'buttons');
    } else {
        addButton.classList.replace('buttons', 'buttons-active');
    }
}

addButton.addEventListener('click', addTask);
function addTask() {
    const taskText = inputField.value;
    if (taskText.length === 0 || re.test(inputField.value)) {
        document.querySelector('.label-text').style.color = '#DB323D';
    } else {
        const containerTasksList = document.querySelector('.container__tasks__list');

        document.querySelector('.label-text').style.color = '#6A6A6A';

        const containerTask = document.createElement('div');
        containerTask.classList.add('container__task');
        containerTasksList.appendChild(containerTask);


        // Creating task input/text
        const inputTask = document.createElement('input');
        inputTask.classList.add('input__task');
        inputTask.value = taskText;
        inputTask.type = "text";
        inputTask.setAttribute("readonly", "readonly");
        containerTask.appendChild(inputTask);

        
        const containerTaskButtons = document.createElement('div');
        containerTaskButtons.classList.add('container__task__buttons');
        containerTask.appendChild(containerTaskButtons);

        // Creating edit button
        const newEditButton = document.createElement('button');
        newEditButton.classList.add('buttons-active');
        newEditButton.id = 'editButton';
        newEditButton.innerHTML = 'EDIT';
        containerTaskButtons.appendChild(newEditButton);

        // Creating done button
        const newDoneButton = document.createElement('button');
        newDoneButton.classList.add('buttons-active');
        newDoneButton.id = 'doneButton';
        newDoneButton.innerHTML = 'DONE';
        containerTaskButtons.appendChild(newDoneButton);
    
        // Creating done button
        const newDeleteButton = document.createElement('button');
        newDeleteButton.classList.add('buttons-active');
        newDeleteButton.id = 'deleteButton';
        newDeleteButton.innerHTML = 'DELETE';
        containerTaskButtons.appendChild(newDeleteButton);

        // Creating edit button functionality
        newEditButton.addEventListener('click', editTask);
        function editTask() {
            if (newEditButton.innerHTML === 'EDIT') {
                inputTask.removeAttribute("readonly");
                inputTask.focus();
                newEditButton.innerHTML = 'SAVE';
            } else {
                inputTask.setAttribute("readonly", "readonly");
                newEditButton.innerHTML = 'EDIT';
            }
        }

        // Creating done button functionality
        newDoneButton.addEventListener('click', () => {
            if (newDoneButton.innerHTML === 'DONE') {
                inputTask.classList.replace('input__task', 'input__task-done');
                newDoneButton.innerHTML = 'UNDONE';
                newEditButton.classList.replace('buttons-active', 'buttons');
                if (newEditButton.innerHTML === 'SAVE') {
                    editTask();
                }
                newEditButton.removeEventListener('click', editTask);
            } else {
                inputTask.classList.replace('input__task-done', 'input__task');
                newDoneButton.innerHTML = 'DONE';
                newEditButton.classList.replace('buttons', 'buttons-active');
                newEditButton.addEventListener('click', editTask);
            }
        })

        // Creating delete button functionality
        newDeleteButton.addEventListener('click', () => {
            containerTaskButtons.parentElement.remove();
            showMessage();
        })

        function showMessage () {
            if (document.querySelectorAll('.container__task').length > 0) {
                document.querySelector('.container__message').style.display = 'none';
            } else {
                document.querySelector('.container__message').style.display = 'flex';
            }
        }
        showMessage();

        inputField.value = '';
        addButton.classList.replace('buttons-active', 'buttons');
    }
}