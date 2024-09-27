// Select elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filterBtn');

let tasks = [];

// Add task
addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(task);
        renderTasks(tasks);
        taskInput.value = '';
    }
}

// Render tasks
function renderTasks(filteredTasks) {
    taskList.innerHTML = '';

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.dataset.id = task.id;

        const taskText = document.createElement('span');
        taskText.textContent = task.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'deleteBtn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', deleteTask);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', toggleTaskStatus);

        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

// Toggle task completion
function toggleTaskStatus(e) {
    const taskId = e.target.closest('li').dataset.id;
    tasks = tasks.map(task => {
        if (task.id == taskId) {
            task.completed = !task.completed;
        }
        return task;
    });
    renderTasks(tasks);
}

// Delete task
function deleteTask(e) {
    const taskId = e.target.closest('li').dataset.id;
    tasks = tasks.filter(task => task.id != taskId);
    renderTasks(tasks);
}

// Filter tasks
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        let filteredTasks;

        if (filter === 'all') {
            filteredTasks = tasks;
        } else if (filter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        } else {
            filteredTasks = tasks.filter(task => !task.completed);
        }

        renderTasks(filteredTasks);
    });
});
