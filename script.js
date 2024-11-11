const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const tasks = getTasksFromLocalStorage();
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'list-group-item d-flex justify-content-between align-items-center';

        // Aplicar sublinhado se a tarefa estiver concluída
        const taskText = task.completed ? `<s>${task.text}</s>` : task.text;
        
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button onclick="toggleComplete(${index})" class="btn btn-outline-info btn-sm">${task.completed ? 'Desmarcar' : 'Concluir'}</button>
                <button onclick="editTask(${index})" class="btn btn-outline-warning btn-sm me-md-2">Editar</button>
                <button onclick="deleteTask(${index})" class="btn btn-outline-danger btn-sm">Excluir</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const task = { text: taskText, completed: false };
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    saveTasksToLocalStorage(tasks);
    renderTasks();
    taskInput.value = '';

    showSuccessAlert(); // Mostrar o alerta de sucesso
}

function editTask(index) {
    const tasks = getTasksFromLocalStorage();
    const newText = prompt("Edite a tarefa:", tasks[index].text);
    if (newText) {
        tasks[index].text = newText;
        saveTasksToLocalStorage(tasks);
        renderTasks();
        
        // Mostrar o alerta de edição
        showEditAlert();
    }
}

function deleteTask(index) {
    const tasks = getTasksFromLocalStorage();
    tasks.splice(index, 1);
    saveTasksToLocalStorage(tasks);
    renderTasks();

    showDeleteAlert();
}

function toggleComplete(index) {
    const tasks = getTasksFromLocalStorage();
    tasks[index].completed = !tasks[index].completed;
    saveTasksToLocalStorage(tasks);
    renderTasks();

    showCompleteAlert();
}

function showSuccessAlert() {
    const alert = document.getElementById('successAlert');
    alert.classList.remove('d-none');  // Mostrar o alerta

    // Ocultar o alerta automaticamente após 2 segundos
    setTimeout(() => {
        alert.classList.add('d-none');
    }, 2000);
}

function showEditAlert() {
    const alert = document.getElementById('editAlert');
    alert.classList.remove('d-none');  // Mostrar o alerta

    // Ocultar o alerta automaticamente após 2 segundos
    setTimeout(() => {
        alert.classList.add('d-none');
    }, 2000);
}

function showDeleteAlert() {
    const alert = document.getElementById('deleteAlert');
    alert.classList.remove('d-none');  // Mostrar o alerta

    // Ocultar o alerta automaticamente após 2 segundos
    setTimeout(() => {
        alert.classList.add('d-none');
    }, 2000);
}

function showCompleteAlert() {
    const alert = document.getElementById('completeAlert');
    alert.classList.remove('d-none');  // Mostrar o alerta

    // Ocultar o alerta automaticamente após 2 segundos
    setTimeout(() => {
        alert.classList.add('d-none');
    }, 2000);
}

addTaskButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});



document.addEventListener('DOMContentLoaded', renderTasks);
