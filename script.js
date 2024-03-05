const listsContainer = document.querySelector('[data-lists]');
const newListForm = document.querySelector('[data-new-list-form]');
const newListInput = document.querySelector('[data-new-list-input]');
const deleteListButton = document.querySelector('[data-delete-list-button]');
const listDisplayContainer = document.querySelector('[data-list-display-container]');
const listTitleElement = document.querySelector('[data-list-title]');
const listCountElement = document.querySelector('[data-list-count]');
const tasksContainer = document.querySelector('[data-tasks]');


const LOCAL_STORAGE_LIST_KEY = 'task.lists';
let lists = [];
const LOCAL_STORAGE_SELECTED_LIST_KEY = 'task.selectedListId'
const savedLists = localStorage.getItem(LOCAL_STORAGE_LIST_KEY);
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_KEY);
(LOCAL_STORAGE_SELECTED_LIST_KEY);

listsContainer.addEventListener('click', e=> {
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedListId = e.target.dataset.listId
        saveAndRender();
    }
})

if (savedLists) { 
    try {
        // Parse the JSON data if it exists
        lists = JSON.parse(savedLists);
    } catch (error) {
        // Handle parsing errors
        console.error("Error parsing localStorage data:", error);
    }
}

deleteListButton.addEventListener('click', e => {
    lists = lists.filter(lists => lists.id !== selectedListId)
    selectedListId = null;
    saveAndRender();
})

newListForm.addEventListener('submit', e => {
    e.preventDefault();
    const listName = newListInput.value 
    if (listName == null || listName === '') return
    const list = createList(listName)
    newListInput.value = null
    lists.push(list)
    saveAndRender()
})

function createList(name) {
    return {id: Date.now().toString(), name: name, tasks: []}
}

function saveAndRender() {
    save()
    render()
}

function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_KEY, selectedListId);
}


function render() {
    clearElement(listsContainer);
    renderLists();
    const selectedList = lists.find((list) => list.id === selectedListId);
    if (selectedListId == null) {
        listDisplayContainer.style.display = 'none';
    } else {
        listDisplayContainer.style.display = '';
        listTitleElement.innerHTML = selectedList.name;
        renderTaskCount(selectedList);
        renderTasks(selectedList); 
    }
}
function renderTasks(selectedList) {
    clearElement(tasksContainer);

    selectedList.tasks.forEach((task) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = task.id; 
        checkbox.checked = task.complete;
        checkbox.addEventListener('change', () => {
            toggleTaskComplete(selectedList, task.id);
            saveAndRender();
        });

        const label = document.createElement('label');
        label.htmlFor = task.id;
        label.textContent = task.name;

        taskElement.appendChild(checkbox);
        taskElement.appendChild(label);
        tasksContainer.appendChild(taskElement);
    });
}


function renderTaskCount(selectedList) {
    const incompleteTaskCount = selectedList.tasks.filter( task => !task.complete).length;
    // compact if else
    const taskString = incompleteTaskCount === 1 ? "task" : "tasks";
    listCountElement.innerHTML = `${incompleteTaskCount} ${taskString} remaining`
}

function renderLists() {
    lists.forEach((list) => {
    const listElement = document.createElement('li');
    listElement.dataset.listId = list.id;
    listElement.classList.add('listName');
    listElement.innerHTML = list.name;
    if (list.id === selectedListId) {
        listElement.classList.add('activeList');
    }
    listsContainer.appendChild(listElement);
    });
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

render();