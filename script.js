document.addEventListener('DOMContentLoaded', function () {
    const listsContainer = document.querySelector('[data-lists]');
    const newListForm = document.querySelector('[data-new-list-form]');
    const newListInput = document.querySelector('[data-new-list-input]');
    const deleteListButton = document.querySelector('[data-delete-list-button]');
    const listDisplayContainer = document.querySelector('[data-list-display-container]');
    const listTitleElement = document.querySelector('[data-list-title]');
    const listCountElement = document.querySelector('[data-list-count]');
    const tasksContainer = document.querySelector('[data-tasks]');
    const newTaskForm = document.querySelector('[data-new-task-form]');
    const inputTaskName = document.querySelector('[data-new-task-input]');
    const clearCompleteTasksButton = document.querySelector('[data-clear-complete-tasks-button]');
    const footer = document.querySelector('.footer');

    const LOCAL_STORAGE_LIST_KEY = 'task.lists';
    const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';
    let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
    let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

    function areListsPresent() {
        return lists.length > 0;
    }

    function renderLists() {
        listsContainer.innerHTML = '';
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

    newTaskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const taskName = inputTaskName.value.trim();
        
        if (taskName !== '') {
            const selectedList = lists.find(list => list.id === selectedListId);
            
            if (selectedList) {
                const newTask = { id: Date.now().toString(), name: taskName, complete: false };
                selectedList.tasks.push(newTask);
                saveAndRender();
                inputTaskName.value = '';
            }
        }
    });

    function renderTasks(selectedList) {
        tasksContainer.innerHTML = '';
    
        selectedList.tasks.forEach((task) => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('listName');
    
            const checkboxContainer = document.createElement('div');
            checkboxContainer.classList.add('checkbox-container');
    
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = task.id;
            checkbox.checked = task.complete;
            checkbox.classList.add('box');
            checkbox.addEventListener('change', () => {
                toggleTaskComplete(selectedList, task.id);
                saveAndRender();
            });
    
            const label = document.createElement('label');
            label.htmlFor = task.id;
            label.classList.add('label');
            label.textContent = task.name;
    
            checkboxContainer.appendChild(checkbox);
            checkboxContainer.appendChild(label);
            taskElement.appendChild(checkboxContainer);
            tasksContainer.appendChild(taskElement);
        });
    }
    
    

    function renderTaskCount(selectedList) {
        const incompleteTaskCount = selectedList.tasks.filter(task => !task.complete).length;
        const taskString = incompleteTaskCount === 1 ? "task" : "tasks";
        listCountElement.innerHTML = `${incompleteTaskCount} ${taskString} remaining`;
    }

    function clearElement(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    function saveAndRender() {
        save();
        render();
    }

    function save() {
        localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
        localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
    }

    listsContainer.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() === 'li') {
            selectedListId = e.target.dataset.listId;
            saveAndRender();
        } else if (!listsContainer.contains(e.target)) {
            selectedListId = null;
            saveAndRender();
        }
    });

    deleteListButton.addEventListener('click', (e) => {
        lists = lists.filter(list => list.id !== selectedListId);
        selectedListId = null;
        saveAndRender();
    });

    newListForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const listName = newListInput.value.trim();
        if (listName === '') return;
        const list = createList(listName);
        newListInput.value = '';
        lists.push(list);
        saveAndRender();
    });

    const deleteListButtonOnRight = document.querySelector('.delete-stuff [data-delete-list-button]');
    deleteListButtonOnRight.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete this list?')) {
        lists = lists.filter(list => list.id !== selectedListId);
        selectedListId = null;
        saveAndRender();
    }
});

    clearCompleteTasksButton.addEventListener('click', () => {
        const selectedList = lists.find(list => list.id === selectedListId);
        selectedList.tasks = selectedList.tasks.filter(task => !task.complete);
        saveAndRender();
    });

    function createList(name) {
        return { id: Date.now().toString(), name: name, tasks: [] };
    }

    function toggleTaskComplete(selectedList, taskId) {
        const task = selectedList.tasks.find(task => task.id === taskId);
        if (task) {
            task.complete = !task.complete;
        }
    }

    function render() {
        if (areListsPresent()) {
            footer.style.display = 'block';
            listDisplayContainer.style.display = '';
            const selectedList = lists.find(list => list.id === selectedListId);
            if (selectedList) {
                listTitleElement.innerText = selectedList.name;
                renderTaskCount(selectedList);
                clearElement(tasksContainer);
                renderTasks(selectedList);
            }
        } else {
            footer.style.display = 'none';
            listDisplayContainer.style.display = 'none';
        }
        renderLists();
    }

    render();
});