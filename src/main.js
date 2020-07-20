// getting document elements
let section = document.querySelector('#viewSection'),
    input = document.querySelector('#textInput'),
    priority = document.querySelector('#prioritySelector'),
    options = document.querySelectorAll('#prioritySelector option'),
    addButton = document.querySelector('#addButton');
addButton.addEventListener('click', addItem);
input.addEventListener('keyup', enterItem);

// sorters
let sortButton = document.querySelector('#sortButton');
let dateSortButton = document.querySelector('#dateSortButton');
sortButton.addEventListener('click', sortByPriority);
dateSortButton.addEventListener('click', sortByDate);

// all-checkers
let allChecker = document.querySelector('#checkAll');
let allUnchecker = document.querySelector('#uncheckAll');
allChecker.addEventListener('click', checkAllBoxes);
allUnchecker.addEventListener('click', uncheckAllBoxes);

// delete checked
let deleteChecked = document.querySelector('#deleteChecked');
deleteChecked.addEventListener('click', deleteAllChecked);

// when pressing Enter in the input
function enterItem(event) {
    if(event.keyCode === 13) {
    addItem();
    }
}

// when clicking the Add button
function addItem () {
    let newInput = input.value,
        newItem = document.createElement('div'),
        newPriority = document.createElement('span'),
        newTime = document.createElement('span'),
        newText = document.createElement('span'),
        newAddButton = document.createElement('button'),
        newButton = document.createElement('button'),
        newCheck = document.createElement('input');
    newCheck.setAttribute('type', 'checkbox'),
    newCheck.setAttribute('name', 'toDoItems'),
    newCheck.setAttribute('value', newInput);
    input.value = '';
    newItem.className = 'todoContainer',
    newPriority.className = 'todoPriority',
    newTime.className = 'todoCreatedAt',
    newText.className = 'todoText',
    newAddButton.className = 'todoChild',
    newButton.className = 'todoDelete';
    newItem.appendChild(newCheck),
    newItem.appendChild(newPriority),
    newItem.appendChild(newTime),
    newItem.appendChild(newText),
    newItem.appendChild(newButton),
    newItem.appendChild(newAddButton);
    newTime.setAttribute('compareDate', (new Date()).getTime()); // for the sorter
    newPriority.innerText = options[priority.selectedIndex].value,
    newTime.innerText = displayDate(),
    newText.innerText = newInput,
    newButton.innerText = 'Delete',
    newAddButton.innerText = 'Add mini task';
    section.appendChild(newItem);
    updateCounter();
    input.focus();
}

// when clicking a button on the view section
section.addEventListener('click', (event) => {
    if(event.target.className === 'todoDelete') {
        event.target.parentElement.remove();
        updateCounter();
        updateMiniCounter();
        updateChecker();
    } else if(event.target.className === 'todoChild') {
        addChildInputs(event.target.parentElement);
        event.target.parentElement.querySelector('.textInput').addEventListener('keyup', enterChildItem);
    } else if(event.target.className === 'todoAddChild') {
        addToDoChild(event.target.parentElement);
    }
});

// when clicking any checkbox on the view section
section.addEventListener('click', (event) => {
    if(event.target.getAttribute('type') === 'checkbox') {
        if(event.target.parentElement.parentElement === section) {
            event.target.parentElement.querySelectorAll('[type="checkbox"]').forEach(box => {
                box.checked = event.target.checked;
            });
        } else if(!event.target.checked) {
            event.target.parentElement.parentElement.querySelector('[type="checkbox"]').checked = false;
        }
        updateCounter();
        updateMiniCounter();
        updateChecker();
    }
});

// to display the date in the specified format
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

// add inputs for child todo
function addChildInputs(parent) {
    let childInput = document.createElement('input'),
        childPriority = document.createElement('select'),
        childAddButton = parent.querySelector('.todoChild');
    childInput.className = 'textInput';
    for(let i = 1; i <= 5; i++) {
        childPriority.innerHTML += `\n<option value="${i}">${i}</option>`;
    }
    childAddButton.innerText = 'Add';
    childAddButton.className = 'todoAddChild';
    parent.appendChild(childInput),
    parent.appendChild(childPriority);
    childInput.focus();
}

// when pressing Enter in the child input
function enterChildItem(event) {
    if(event.keyCode === 13) {
        addToDoChild(event.target.parentElement);
    }
}

// add child todo
function addToDoChild (parent) {
    let newInput = parent.querySelector('input.textInput').value,
        newItem = document.createElement('div'),
        newPriority = document.createElement('span'),
        newTime = document.createElement('span'),
        newText = document.createElement('span'),
        newButton = document.createElement('button'),
        newCheck = document.createElement('input');
    newCheck.setAttribute('type', 'checkbox'),
    newCheck.setAttribute('name', 'toDoItems'),
    newCheck.setAttribute('value', newInput);
    input.value = '';
    newItem.className = 'todoContainer',
    newPriority.className = 'todoPriority',
    newTime.className = 'todoCreatedAt',
    newText.className = 'todoText',
    newButton.className = 'todoDelete';
    newItem.appendChild(newCheck),
    newItem.appendChild(newPriority),
    newItem.appendChild(newTime),
    newItem.appendChild(newText),
    newItem.appendChild(newButton);
    newTime.setAttribute('compareDate', (new Date()).getTime()); // for the sorter
    newPriority.innerText = parent.querySelectorAll('select option')[parent.querySelector('select').selectedIndex].value,
    newTime.innerText = displayDate(),
    newText.innerText = newInput,
    newButton.innerText = 'Delete';
    parent.appendChild(newItem);
    
    let childAddButton = parent.querySelector('.todoAddChild');
    parent.querySelector('input.textInput').remove();
    parent.querySelector('select').remove();
    childAddButton.innerText = 'Add mini task';
    childAddButton.className = 'todoChild';

    updateMiniCounter();
}

// counting ToDos
function updateCounter() {
    document.querySelector('#actionSection #counter').innerText = section.childElementCount;
}

// counting ToDo children
function updateMiniCounter() {
    document.querySelector('#actionSection #childCounter').innerText = document.querySelectorAll('.todoContainer .todoContainer').length;
}

// counting checked ToDos
function updateChecker() {
    let checker = 0;
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(box => {
        if(box.checked) {
            checker++;
        }
    });
    document.querySelector('#actionSection #checker').innerText = checker;
}

// when clicking the sort by priority button
function sortByPriority() {
    let itemsArray = [...section.children];
    itemsArray.sort((a,b) => a.querySelector('.todoPriority').innerText > b.querySelector('.todoPriority').innerText ? -1 : 1);
    itemsArray.forEach(item=>section.appendChild(item));
}

// when clicking the sort by date button
function sortByDate() {
    let itemsArray = [...section.children];
    itemsArray.sort((a,b) => a.querySelector('.todoCreatedAt').getAttribute('compareDate') > b.querySelector('.todoCreatedAt').getAttribute('compareDate') ? 1 : -1);
    itemsArray.forEach(item=>section.appendChild(item));
}

// when clicking the checkAll button
function checkAllBoxes() {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(box => {
        box.checked = true;
    });
    document.querySelector('#actionSection #checker').innerText = section.childElementCount;
}

// when clicking the uncheckAll button
function uncheckAllBoxes() {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(box => {
        box.checked = false;
    });
    document.querySelector('#actionSection #checker').innerText = 0;
}

// when clicking the deleteChecked button
function deleteAllChecked() {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(box => {
        if(box.checked) {
            box.parentElement.remove();
        }
    });
    updateCounter();
    updateChecker();
}