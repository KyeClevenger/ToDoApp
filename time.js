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
        let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
            lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
            lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
            lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
        let liTag = "";

        for (let i = firstDayofMonth; i > 0; i--) {
            liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
        }

        for (let i = 1; i <= lastDateofMonth; i++) {
            let isToday = i === date.getDate() && currMonth === date.getMonth() &&
                currYear === date.getFullYear() ? "active" : "";
            liTag += `<li class="${isToday}" onclick="displayModal(new Date(${currYear}, ${currMonth}, ${i}))">${i}</li>`;
        }

        for (let i = lastDayofMonth; i < 6; i++) {
            liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
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
    const footer = document.querySelector(".footer");

    const tasksForDay = array1.filter(item => {
        const itemDate = new Date(item.dueDate);
        return (
            itemDate.getDate() === selectedDate.getDate() &&
            itemDate.getMonth() === selectedDate.getMonth() &&
            itemDate.getFullYear() === selectedDate.getFullYear()
        );
    });

    modalContent.innerHTML = `<p>Clicked on date: ${selectedDate.toLocaleDateString()}</p>`;

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

    todoForm.innerHTML = `
        <label class="p-3" for="title">Title:</label>
        <input class="text-center rounded-xl" type="text" id="title" placeholder="Title">
        <label class="p-3" for="description">Description:</label>
        <textarea class="text-center rounded-xl" id="description" placeholder="Description"></textarea>
        <label class="p-3" for="dueDate">Due Date:</label>
        <input class="text-center rounded-xl" type="datetime-local" id="dueDate">
        <button class="p-3" onclick="buttonPress()">Add To List</button>
    `;

    modalContent.appendChild(todoForm);

    const footerRect = footer.getBoundingClientRect();
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
    const toDoForm = document.getElementById("toDoForm");
    const dateInput = document.getElementById("dueDate");
    dateInput.value = selectedDate.toISOString().slice(0, 16);
    toDoForm.style.display = "block";
}
