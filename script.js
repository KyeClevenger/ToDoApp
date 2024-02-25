document.addEventListener('DOMContentLoaded', function () {
    const daysTag = document.querySelector(".days");
    const currentDate = document.querySelector(".current-date");
    const prevNextIcon = document.querySelectorAll(".icons span");
    const jumpToTodayButton = document.getElementById('jumpToToday');

    let date = new Date();
    let currYear = date.getFullYear();
    let currMonth = date.getMonth();

    const months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];

        const renderCalendar = () => {
            const firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
            const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
            const lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
            const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
        
            let liTag = "";
        
            for (let i = 0; i < 6; i++) {
                for (let j = 0; j < 7; j++) {
                    const dayNumber = i * 7 + j + 1 - firstDayofMonth;
        
                    if (i === 0 && j < firstDayofMonth) {
                        // Display inactive days before the first day of the month
                        liTag += `<li class="inactive">${lastDateofLastMonth - firstDayofMonth + j + 1}</li>`;
                    } else if (dayNumber <= lastDateofMonth) {
                        // Display active days within the month
                        const isToday = dayNumber === date.getDate() && currMonth === date.getMonth() &&
                            currYear === date.getFullYear() ? "active" : "";
                        liTag += `<li class="${isToday}" onclick="displayModal(new Date(${currYear}, ${currMonth}, ${dayNumber}))">${dayNumber}</li>`;
                    } else {
                        // Display inactive days after the last day of the month
                        liTag += `<li class="inactive">${dayNumber - lastDateofMonth}</li>`;
                    }
                }
            }
        
            currentDate.innerText = `${months[currMonth]} ${currYear}`;
            daysTag.innerHTML = liTag;
        };

    const updateCalendar = () => {
        currentDate.textContent = new Date().toLocaleDateString();
        renderCalendar();
    };

    renderCalendar();

    prevNextIcon.forEach(icon => {
        icon.addEventListener("click", () => {
            currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

            if (currMonth < 0 || currMonth > 11) {
                date = new Date(currYear, currMonth, new Date().getDate());
                currYear = date.getFullYear();
                currMonth = date.getMonth();
            } else {
                date = new Date();
            }

            updateCalendar();
        });
    });

    jumpToTodayButton.addEventListener('click', function () {
        date = new Date();
        currYear = date.getFullYear();
        currMonth = date.getMonth();
        updateCalendar();
    });
});

function displayTasksAndModal(selectedDate, isModalDisplay = true) {
    const modal = document.getElementById("myModal");
    const modalContent = document.getElementById("modalContent");

    // Clear modalContent before adding new content
    modalContent.innerHTML = '';

    const tasksForDay = array1.filter(item => {
        const itemDate = new Date(item.dueDate);
        return (
            itemDate.getDate() === selectedDate.getDate() &&
            itemDate.getMonth() === selectedDate.getMonth() &&
            itemDate.getFullYear() === selectedDate.getFullYear()
        );
    });

    modalContent.innerHTML += `<p>Clicked on date: ${selectedDate.toLocaleDateString()}</p>`;

    if (tasksForDay.length > 0) {
        tasksForDay.forEach(task => {
            modalContent.innerHTML += `<p>${task.title} - ${task.description}</p>`;
        });
    } else {
        modalContent.innerHTML += `<p>No tasks for this day.</p>`;
    }

    const todoForm = document.createElement("form");
    todoForm.classList.add("flex", "flex-col");
    todoForm.onsubmit = function () { return false; };

    modalContent.appendChild(todoForm);
    modal.style.display = isModalDisplay ? "block" : "none";

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

function displayTasksForDay(selectedDate) {
    displayTasksAndModal(selectedDate);
}

function displayModal(selectedDate) {
    displayTasksAndModal(selectedDate, true);
}

document.addEventListener('DOMContentLoaded', function () {
    const footerYear = document.getElementById("footerYear");
    const currentYear = new Date().getFullYear();
    footerYear.innerText = currentYear;
});

function openToDoForm(selectedDate) {
    const modal = document.getElementById("myModal");
    const modalContent = document.getElementById("modalContent");
    modalContent.innerHTML = '';

    // Create form element
    const todoForm = document.createElement("form");
    todoForm.classList.add("flex", "flex-col");
    todoForm.onsubmit = function () { return false; };

    // Create date input element
    const dateInput = document.createElement("input");
    dateInput.classList.add("text-center", "rounded-xl");
    dateInput.type = "datetime-local";  // Error likely here
    dateInput.id = "dueDate";
    dateInput.value = selectedDate.toISOString().slice(0, 16);
    dateInput.required = true;

    // Append elements to form
    const clickedDateParagraph = document.createElement("p");
    clickedDateParagraph.textContent = `Clicked on date: ${selectedDate.toLocaleDateString()}`;
    modalContent.appendChild(clickedDateParagraph);

    const descriptionParagraph = document.createElement("p");
    descriptionParagraph.textContent = "If you would like to add a task for this day, use the form below:";
    todoForm.appendChild(descriptionParagraph);

    const titleLabel = document.createElement("label");
    titleLabel.classList.add("p-3");
    titleLabel.textContent = "Title:";
    todoForm.appendChild(titleLabel);

    const titleInput = document.createElement("input");
    titleInput.classList.add("text-center", "rounded-xl", "title-input");
    titleInput.type = "text";
    todoForm.appendChild(titleInput);

    const descriptionLabel = document.createElement("label");
    descriptionLabel.classList.add("p-3");
    descriptionLabel.textContent = "Description:";
    todoForm.appendChild(descriptionLabel);

    const descriptionInput = document.createElement("textarea");
    descriptionInput.classList.add("text-center", "rounded-xl", "description-input");
    todoForm.appendChild(descriptionInput);

    const dueDateLabel = document.createElement("label");
    dueDateLabel.classList.add("p-3");
    dueDateLabel.textContent = "Due Date:";
    todoForm.appendChild(dueDateLabel);

    todoForm.appendChild(dateInput);

   const addButton = document.createElement("button");
    addButton.classList.add("p-3");
    addButton.textContent = "Add To List";
    addButton.addEventListener("click", function () {
        const title = document.getElementById("title").value.trim();
        const description = document.getElementById("description").value.trim();
        const dueDate = document.getElementById("dueDate").value;

        addTask(title, description, dueDate); // Pass the due date to the addTask function
    });
    todoForm.appendChild(addButton);

    // Clear modalContent and append the form
    modalContent.innerHTML = '';
    modalContent.appendChild(todoForm);

    modal.style.display = "block";
}





function addTask(title, description, dueDate) {
    if (title !== "") {
        const newItem = {
            title,
            description,
            dueDate,
            timestamp: new Date().toLocaleString(),
            completed: false,
        };
        array1.push(newItem);
        displayArray();
        saveDataToLocal();
        clearInputFields();
        closeToDoForm();
    }
}

function closeToDoForm() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}








let array1 = [];

function buttonPress() {
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const dueDate = document.getElementById("dueDate").value; 

    if (title !== "") {
        const newItem = {
            title,
            description,
            dueDate,
            timestamp: new Date().toLocaleString(),
            completed: false,
        };
        array1.push(newItem);
        displayArray();
        saveDataToLocal();
        clearInputFields();
    }
}

function displayArray() {
    const ul = document.getElementById("toDo");
    ul.innerHTML = "";

    array1.forEach((item, index) => {
        const li = document.createElement("li");
        li.draggable = true;
        li.setAttribute("ondragstart", `drag(event, ${index})`);

        const titleNode = document.createElement("h3");
        titleNode.textContent = item.title;
        li.appendChild(titleNode);

        const descriptionNode = document.createElement("p");
        descriptionNode.textContent = item.description;
        li.appendChild(descriptionNode);

        const timestampNode = document.createElement("span");
        timestampNode.textContent = "Added on: " + item.timestamp;
        li.appendChild(timestampNode);

        const dueDateNode = document.createElement("span");
        dueDateNode.textContent = "Due on: " + item.dueDate;
        li.appendChild(dueDateNode);

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "X";
        deleteButton.onclick = () => deleteItem(index);
        li.appendChild(deleteButton);

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.completed;
        checkbox.addEventListener("change", () => toggleCompleted(index, li)); 
        li.appendChild(checkbox);

        const editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.onclick = () => editItem(index);
        li.appendChild(editButton);

        function editItem(index) {
            const editModal = document.getElementById("editModal");
            const titleInput = document.getElementById("editTitle");
            const descriptionInput = document.getElementById("editDescription");
            const dueDateInput = document.getElementById("editDueDate");
            const currentItem = array1[index];
            titleInput.value = currentItem.title;
            descriptionInput.value = currentItem.description;
            dueDateInput.value = currentItem.dueDate;
            const saveEditButton = document.getElementById("saveEditButton");
            saveEditButton.onclick = () => saveEdit(index);
            editModal.style.display = "block";
        }
        
        function saveEdit(index) {
            const titleInput = document.getElementById("editTitle").value.trim();
            const descriptionInput = document.getElementById("editDescription").value.trim();
            const dueDateInput = document.getElementById("editDueDate").value;
        
            if (titleInput !== "") {
                array1[index].title = titleInput;
                array1[index].description = descriptionInput;
                array1[index].dueDate = dueDateInput;
                array1[index].timestamp = new Date().toLocaleString();
        
                displayArray();
                saveDataToLocal();
        
                const editModal = document.getElementById("editModal");
                editModal.style.display = "none";
            }
        }
        
        if (item.completed) {
            li.classList.add("completed"); 
        }

        ul.appendChild(li);
    });
    console.log("Current Array:", array1);
}
function closeEditModal() {
    const editModal = document.getElementById("editModal");
    editModal.style.display = "none";
}

function toggleCompleted(index, li) {
    array1[index].completed = !array1[index].completed;

    if (array1[index].completed) {
        li.classList.add("completed"); 
    } else {
        li.classList.remove("completed"); 
    }

    displayArray();
    saveDataToLocal();
}

function deleteItem(index) {
    array1.splice(index, 1);
    displayArray();
    saveDataToLocal();
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event, index) {
    event.dataTransfer.setData("text/plain", index);
}

function drop(event) {
    event.preventDefault();
    const fromIndex = event.dataTransfer.getData("text/plain");
    const toIndex = getDropPosition(event.clientY);

    const [removed] = array1.splice(fromIndex, 1);
    array1.splice(toIndex, 0, removed);

    displayArray();
    saveDataToLocal();
}

function getDropPosition(dropY) {
    const listItems = document.querySelectorAll("#toDo li");
    for (let i = 0; i < listItems.length; i++) {
        const rect = listItems[i].getBoundingClientRect();
        if (dropY < rect.top + rect.height / 2) {
            return i;
        }
    }
    return listItems.length;
}

function saveDataToLocal() {
    localStorage.setItem('myData', JSON.stringify(array1));
}

function clearInputFields() {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("dueDate").value = ""; 
}

document.getElementById("title").addEventListener("keydown", function(event) {
    handleEnterKey(event);
});

document.getElementById("description").addEventListener("keydown", function(event) {
    handleEnterKey(event);
});

function handleEnterKey(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        buttonPress();
    }
}

window.onload = function() {
    const storedData = localStorage.getItem('myData');
    if (storedData) {
        array1 = JSON.parse(storedData);
        displayArray();
    }
};