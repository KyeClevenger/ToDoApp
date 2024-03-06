document.addEventListener('DOMContentLoaded', function () {
    const listsContainer = document.querySelector('[data-lists]');
    const newListForm = document.querySelector('[data-new-list-form]');
    const newListInput = document.querySelector('[data-new-list-input]');
    const deleteListButton = document.querySelector('[data-delete-list-button]');
    const listDisplayContainer = document.querySelector('[data-list-display-container]');
    const listTitleElement = document.querySelector('[data-list-title]');
    const listCountElement = document.querySelector('[data-list-count]');
    const tasksContainer = document.querySelector('[data-tasks]');
    const footer = document.querySelector('.footer');

    const LOCAL_STORAGE_LIST_KEY = 'task.lists';
    let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
    let selectedListId = localStorage.getItem('task.selectedListId');


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

    function renderTasks(selectedList) {
        tasksContainer.innerHTML = '';
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
        localStorage.setItem('task.selectedListId', selectedListId);
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
