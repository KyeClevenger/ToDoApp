// document.addEventListener('DOMContentLoaded', function () {
//     const daysTag = document.querySelector(".days");
//     const currentDate = document.querySelector(".current-date");
//     const prevNextIcon = document.querySelectorAll(".icons span");
//     const jumpToTodayButton = document.getElementById('jumpToToday');

//     let date = new Date();
//     let currYear = date.getFullYear();
//     let currMonth = date.getMonth();

//     const months = ["January", "February", "March", "April", "May", "June", "July",
//         "August", "September", "October", "November", "December"];

//     const renderCalendar = () => {
//         let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
//             lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
//             lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
//             lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
//         let liTag = "";

//         for (let i = firstDayofMonth; i > 0; i--) {
//             liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
//         }

//         for (let i = 1; i <= lastDateofMonth; i++) {
//             let isToday = i === date.getDate() && currMonth === date.getMonth() &&
//                 currYear === date.getFullYear() ? "active" : "";
//             liTag += `<li class="${isToday}" onclick="displayModal(new Date(${currYear}, ${currMonth}, ${i}))">${i}</li>`;
//         }

//         for (let i = lastDayofMonth; i < 6; i++) {
//             liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
//         }

//         currentDate.innerText = `${months[currMonth]} ${currYear}`;
//         daysTag.innerHTML = liTag;
//     };

//     const updateCalendar = () => {
//         currentDate.textContent = new Date().toLocaleDateString();
//         renderCalendar();
//     };

//     renderCalendar();

//     prevNextIcon.forEach(icon => {
//         icon.addEventListener("click", () => {
//             currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

//             if (currMonth < 0 || currMonth > 11) {
//                 date = new Date(currYear, currMonth, new Date().getDate());
//                 currYear = date.getFullYear();
//                 currMonth = date.getMonth();
//             } else {
//                 date = new Date();
//             }

//             updateCalendar();
//         });
//     });

//     jumpToTodayButton.addEventListener('click', function () {
//         date = new Date();
//         currYear = date.getFullYear();
//         currMonth = date.getMonth();
//         updateCalendar();
//     });
// });

// function displayTasksAndModal(selectedDate, isModalDisplay = true) {
//     const modal = document.getElementById("myModal");
//     const modalContent = document.getElementById("modalContent");
//     const footer = document.querySelector(".footer");

//     const tasksForDay = array1.filter(item => {
//         const itemDate = new Date(item.dueDate);
//         return (
//             itemDate.getDate() === selectedDate.getDate() &&
//             itemDate.getMonth() === selectedDate.getMonth() &&
//             itemDate.getFullYear() === selectedDate.getFullYear()
//         );
//     });

//     modalContent.innerHTML = `<p>Clicked on date: ${selectedDate.toLocaleDateString()}</p>`;

//     if (tasksForDay.length > 0) {
//         tasksForDay.forEach(task => {
//             modalContent.innerHTML += `<p>${task.title} - ${task.description}</p>`;
//         });
//     } else {
//         modalContent.innerHTML += `<p>No tasks for this day.</p>`;
//     }

//     const todoForm = document.createElement("form");
//     todoForm.classList.add("flex", "flex-col");
//     todoForm.onsubmit = function () { return false; };

//     todoForm.innerHTML = `
//         <label class="p-3" for="title">Title:</label>
//         <input class="text-center rounded-xl" type="text" id="title" placeholder="Title">
//         <label class="p-3" for="description">Description:</label>
//         <textarea class="text-center rounded-xl" id="description" placeholder="Description"></textarea>
//         <label class="p-3" for="dueDate">Due Date:</label>
//         <input class="text-center rounded-xl" type="datetime-local" id="dueDate">
//         <button class="p-3" onclick="buttonPress()">Add To List</button>
//     `;

//     modalContent.appendChild(todoForm);

//     const footerRect = footer.getBoundingClientRect();
//     modal.style.display = isModalDisplay ? "block" : "none";

//     window.onclick = function (event) {
//         if (event.target === modal) {
//             modal.style.display = "none";
//         }
//     };
// }

// function displayTasksForDay(selectedDate) {
//     displayTasksAndModal(selectedDate);
// }

// function displayModal(selectedDate) {
//     displayTasksAndModal(selectedDate, true);
// }
// document.addEventListener('DOMContentLoaded', function () {
//     const footerYear = document.getElementById("footerYear");
//     const currentYear = new Date().getFullYear();
//     footerYear.innerText = currentYear;
// });

// function openToDoForm(selectedDate) {
//     const toDoForm = document.getElementById("toDoForm");
//     const dateInput = document.getElementById("dueDate");
//     dateInput.value = selectedDate.toISOString().slice(0, 16);
//     toDoForm.style.display = "block";
// }

// let array1 = [];

// function buttonPress() {
//     const title = document.getElementById("title").value.trim();
//     const description = document.getElementById("description").value.trim();
//     const dueDate = document.getElementById("dueDate").value;

//     if (title !== "") {
//         const newItem = {
//             title,
//             description,
//             dueDate,
//             timestamp: new Date().toLocaleString(),
//             completed: false,
//         };
//         array1.push(newItem);
//         displayArray();
//         saveDataToLocal();
//         clearInputFields();
//     }
// }

// function displayArray() {
//     const ul = document.getElementById("toDo");
//     ul.innerHTML = "";

//     array1.forEach((item, index) => {
//         const li = document.createElement("li");
//         li.draggable = true;
//         li.setAttribute("ondragstart", `drag(event, ${index})`);

//         const titleNode = document.createElement("h3");
//         titleNode.textContent = item.title;
//         li.appendChild(titleNode);

//         const descriptionNode = document.createElement("p");
//         descriptionNode.textContent = item.description;
//         li.appendChild(descriptionNode);

//         const timestampNode = document.createElement("span");
//         timestampNode.textContent = "Added on: " + item.timestamp;
//         li.appendChild(timestampNode);

//         const dueDateNode = document.createElement("span");
//         dueDateNode.textContent = "Due on: " + item.dueDate;
//         li.appendChild(dueDateNode);

//         const deleteButton = document.createElement("button");
//         deleteButton.innerText = "X";
//         deleteButton.onclick = () => deleteItem(index);
//         li.appendChild(deleteButton);

//         const checkbox = document.createElement("input");
//         checkbox.type = "checkbox";
//         checkbox.checked = item.completed;
//         checkbox.addEventListener("change", () => toggleCompleted(index, li));
//         li.appendChild(checkbox);

//         const editButton = document.createElement("button");
//         editButton.innerText = "Edit";
//         editButton.onclick = () => editItem(index);
//         li.appendChild(editButton);

//         ul.appendChild(li);
//     });
// }

// function editItem(index) {
//     const editModal = document.getElementById("editModal");
//     const titleInput = document.getElementById("editTitle");
//     const descriptionInput = document.getElementById("editDescription");
//     const dueDateInput = document.getElementById("editDueDate");
//     const currentItem = array1[index];
//     titleInput.value = currentItem.title;
//     descriptionInput.value = currentItem.description;
//     dueDateInput.value = currentItem.dueDate;
//     const saveEditButton = document.getElementById("saveEditButton");
//     saveEditButton.onclick = () => saveEdit(index);
//     editModal.style.display = "block";
// }

// function saveEdit(index) {
//     const titleInput = document.getElementById("editTitle").value.trim();
//     const descriptionInput = document.getElementById("editDescription").value.trim();
//     const dueDateInput = document.getElementById("editDueDate").value;

//     if (titleInput !== "") {
//         array1[index].title = titleInput;
//         array1[index].description = descriptionInput;
//         array1[index].dueDate = dueDateInput;
//         array1[index].timestamp = new Date().toLocaleString();

//         displayArray();
//         saveDataToLocal();

//         const editModal = document.getElementById("editModal");
//         editModal.style.display = "none";
//     }
// }

// function closeEditModal() {
//     const editModal = document.getElementById("editModal");
//     editModal.style.display = "none";
// }

// function toggleCompleted(index, li) {
//     array1[index].completed = !array1[index].completed;

//     if (array1[index].completed) {
//         li.classList.add("completed");
//     } else {
//         li.classList.remove("completed");
//     }

//     displayArray();
//     saveDataToLocal();
// }

// function deleteItem(index) {
//     array1.splice(index, 1);
//     displayArray();
//     saveDataToLocal();
// }

// function allowDrop(event) {
//     event.preventDefault();
// }

// function drag(event, index) {
//     event.dataTransfer.setData("text/plain", index);
// }

// function drop(event) {
//     event.preventDefault();
//     const fromIndex = event.dataTransfer.getData("text/plain");
//     const toIndex = getDropPosition(event.clientY);

//     const [removed] = array1.splice(fromIndex, 1);
//     array1.splice(toIndex, 0, removed);

//     displayArray();
//     saveDataToLocal();
// }

// function getDropPosition(dropY) {
//     const listItems = document.querySelectorAll("#toDo li");
//     for (let i = 0; i < listItems.length; i++) {
//         const rect = listItems[i].getBoundingClientRect();
//         if (dropY < rect.top + rect.height / 2) {
//             return i;
//         }
//     }
//     return listItems.length;
// }

// function saveDataToLocal() {
//     localStorage.setItem('myData', JSON.stringify(array1));
// }

// function clearInputFields() {
//     document.getElementById("title").value = "";
//     document.getElementById("description").value = "";
//     document.getElementById("dueDate").value = "";
// }

// document.getElementById("title").addEventListener("keydown", function (event) {
//     handleEnterKey(event);
// });

// document.getElementById("description").addEventListener("keydown", function (event) {
//     handleEnterKey(event);
// });

// function handleEnterKey(event) {
//     if (event.key === "Enter") {
//         event.preventDefault();
//         buttonPress();
//     }
// }

// window.onload = function () {
//     const storedData = localStorage.getItem('myData');
//     if (storedData) {
//         array1 = JSON.parse(storedData);
//         displayArray();
//     }
// };





