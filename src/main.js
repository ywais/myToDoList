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
        updateCount();
    }
    newPriority.innerText = options[priority.selectedIndex].value,
    newTime.innerText = displayDate(),
    newText.innerText = newInput,
    newButton.innerText = '[ X ]';
    section.appendChild(newItem);
    updateCount();
    input.focus();
}

function displayDate() {
    let date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth(),
        day = date.getDate(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();
    if(month < 9) {
        month = '0' + (month + 1);
    } else {
        if(month === 9) { month++ }
    }
    if(day < 10) { day = '0' + day; }
    if(hours < 10) { hours = '0' + hours; }
    if(minutes < 10) { minutes = '0' + minutes; }
    if(seconds < 10) { seconds = '0' + seconds; }
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function updateCount() {
    document.querySelector('#actionSection span').innerText = section.childElementCount;
}