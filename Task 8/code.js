let input = document.getElementById("input-field");
let addBtn = document.querySelector(".submit-button");
let radioInputs = document.querySelectorAll('input[type="radio"]');
let bottom = document.querySelector(".bottom");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

document.addEventListener("DOMContentLoaded", () => {
    filterTasks();
    setupEventListeners();
});

function setupEventListeners() {
    addBtn.addEventListener("click", () => addTask());

    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    radioInputs.forEach(radio => {
        radio.addEventListener("change", filterTasks);
    });

    bottom.addEventListener("click", handleTaskAction);
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const taskText = input.value.trim();
    console.log(taskText)
    // Basic validation
    if (!taskText) {
        alert("Please enter a task.");
        return;
    }
    
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
    }
    
    tasks.push(newTask);
    saveTasks();
    filterTasks();
    input.value = "";
}

function filterTasks() {
    let filteredTasks = [];
    const selectedFilter = document.querySelector('input[type="radio"]:checked')?.id;

    switch (selectedFilter) {
        case "value-1":
            filteredTasks = tasks.filter(task => !task.completed);
            break;
        case "value-2":
            filteredTasks = tasks.filter(task => task.completed);
            break;
        case "value-3":
            filteredTasks = [...tasks];
            break;
        default:
            filteredTasks = [...tasks];
    }

    renderTasks(filteredTasks);
}

function renderTasks(tasksToRender) {
    if (tasksToRender.length === 0) {
        bottom.innerHTML = `<div class="empty-state">No Tasks found</div>`;
        return;
    }

    bottom.innerHTML = "";

    tasksToRender.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.className = `card ${task.completed ? "completed" : ""}`;
        taskElement.dataset.id = task.id;

        taskElement.innerHTML = `
            <label class="container-checkbox">
                <span class="checkmark">${task.completed ? "✔" : ""}</span>
            </label>
            <span class="task-text">${task.text}</span>
            <div class="action-buttons">
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            </div>
        `;
        
        toggleTaskCompletion(taskElement);

        bottom.appendChild(taskElement);
    });
}

function handleTaskAction(event) {
    const taskElement = event.target.closest(".card");
    if (!taskElement) return;

    const taskId = parseInt(taskElement.dataset.id);

    if (event.target.classList.contains("delete-button")) {
        deleteTask(taskId);
        return;
    } else if (event.target.classList.contains("edit-button")) {
        editTask(taskId);
        return;
    }
}

function toggleTaskCompletion(taskElement) {
    taskElement.querySelector(".checkmark").addEventListener("click", () => {
        const taskId = parseInt(taskElement.dataset.id);
        const task = tasks.find(task => task.id === taskId);
        if (!task) return;
        
        task.completed = !task.completed;
        
        saveTasks();
        filterTasks();
        taskElement.querySelector(".checkmark").innerHTML = `Hell`;
    });
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks();
    filterTasks();
}

function editTask(taskId) {
    const taskElement = document.querySelector(`.card[data-id="${taskId}"]`);
    const taskText = taskElement.querySelector(".task-text").innerText;

    taskElement.innerHTML = `
        <label class="container-checkbox">
            <span class="checkmark"></span>
        </label>
        <span class="task-text">
            <input type="text" value="${taskText}" class="edit-input" />
        </span>
        <div class="action-buttons">
            <button class="save-button">Save</button>
        </div>
    `;

    const saveButton = taskElement.querySelector(".save-button");
    saveButton.addEventListener("click", handleSaveClick);
}

function handleSaveClick(event) {
    const taskElement = event.target.closest('.card');
    const taskId = taskElement.dataset.id;
    const inputField = taskElement.querySelector(".edit-input");

    const task = tasks.find(task => task.id === parseInt(taskId));
    if (task) {
        task.text = inputField.value.trim();
    }

    saveTasks();
    filterTasks();
}

