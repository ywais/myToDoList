let section = document.querySelector('#viewSection'),
    input = document.querySelector('#textInput'),
    priority = document.querySelector('#prioritySelector'),
    options = document.querySelectorAll('#prioritySelector option'),
    addButton = document.querySelector('#addButton');
addButton.addEventListener('click', addItem);
input.addEventListener('keyup', enterItem);

function enterItem(event) {
    if(event.keyCode === 13) {
    addItem();
    }
}

function addItem (event) {
    let newInput = input.value,
        newItem = document.createElement('div'),
        newPriority = document.createElement('span'),
        newTime = document.createElement('span'),
        newText = document.createElement('span'),
        newButton = document.createElement('button');
    input.value = '';
    newItem.className = 'todoContainer',
    newPriority.className = 'todoPriority',
    newTime.className = 'todoCreatedAt',
    newText.className = 'todoText',
    newButton.className = 'todoDelete';
    newItem.appendChild(newPriority),
    newItem.appendChild(newTime),
    newItem.appendChild(newText),
    newItem.appendChild(newButton);
    newButton.onclick = () => {
        newItem.remove();
    }
    newPriority.innerText = options[priority.selectedIndex].value,
    newTime.innerText = new Date(),
    newText.innerText = newInput,
    newButton.innerText = '[ X ]';
    section.appendChild(newItem);
    input.focus();
}