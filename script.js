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

//         function editItem(index) {
//             const editModal = document.getElementById("editModal");
//             const titleInput = document.getElementById("editTitle");
//             const descriptionInput = document.getElementById("editDescription");
//             const dueDateInput = document.getElementById("editDueDate");
//             const currentItem = array1[index];
//             titleInput.value = currentItem.title;
//             descriptionInput.value = currentItem.description;
//             dueDateInput.value = currentItem.dueDate;
//             const saveEditButton = document.getElementById("saveEditButton");
//             saveEditButton.onclick = () => saveEdit(index);
//             editModal.style.display = "block";
//         }
        
//         function saveEdit(index) {
//             const titleInput = document.getElementById("editTitle").value.trim();
//             const descriptionInput = document.getElementById("editDescription").value.trim();
//             const dueDateInput = document.getElementById("editDueDate").value;
        
//             if (titleInput !== "") {
//                 array1[index].title = titleInput;
//                 array1[index].description = descriptionInput;
//                 array1[index].dueDate = dueDateInput;
//                 array1[index].timestamp = new Date().toLocaleString();
        
//                 displayArray();
//                 saveDataToLocal();
        
//                 const editModal = document.getElementById("editModal");
//                 editModal.style.display = "none";
//             }
//         }
        
//         if (item.completed) {
//             li.classList.add("completed"); 
//         }

//         ul.appendChild(li);
//     });
//     console.log("Current Array:", array1);
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

// document.getElementById("title").addEventListener("keydown", function(event) {
//     handleEnterKey(event);
// });

// document.getElementById("description").addEventListener("keydown", function(event) {
//     handleEnterKey(event);
// });

// function handleEnterKey(event) {
//     if (event.key === "Enter") {
//         event.preventDefault();
//         buttonPress();
//     }
// }

// window.onload = function() {
//     const storedData = localStorage.getItem('myData');
//     if (storedData) {
//         array1 = JSON.parse(storedData);
//         displayArray();
//     }
// };



function updateDateTime() {
    var currentDate = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    var formattedDate = currentDate.toLocaleDateString('en-US', options);

    document.getElementById('datetime').innerHTML = formattedDate;
}

setInterval(updateDateTime, 1000);
updateDateTime();