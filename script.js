// Obter referências aos elementos HTML
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Função para buscar as tarefas armazenadas no localStorage
function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Função para salvar as tarefas no localStorage
function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para renderizar as tarefas na tela
function renderTasks() {
    const tasks = getTasksFromLocalStorage();
    taskList.innerHTML = ''; // Limpa a lista antes de renderizar
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'list-group-item d-flex justify-content-between align-items-center';

        // Verifica se a tarefa está concluída e estiliza o texto
        const taskText = task.completed ? `<s>${task.text}</s>` : task.text;
        
        // HTML da tarefa com botões para editar, excluir e completar
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button onclick="toggleComplete(${index})" class="btn btn-outline-info btn-sm">${task.completed ? 'Desmarcar' : 'Concluir'}</button>
                <button onclick="editTask(${index})" class="btn btn-outline-warning btn-sm me-md-2">Editar</button>
                <button onclick="deleteTask(${index})" class="btn btn-outline-danger btn-sm">Excluir</button>
            </div>
        `;
        taskList.appendChild(taskItem); // Adiciona a tarefa na lista
    });
}

// Função para adicionar uma nova tarefa
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return; // Valida que o campo não está vazio

    const task = { text: taskText, completed: false }; // Cria objeto da tarefa
    const tasks = getTasksFromLocalStorage(); // Obtém tarefas do localStorage
    tasks.push(task); // Adiciona nova tarefa à lista
    saveTasksToLocalStorage(tasks); // Salva lista atualizada no localStorage
    renderTasks(); // Re-renderiza as tarefas
    taskInput.value = ''; // Limpa o campo de entrada

    showSuccessAlert(); // Mostra alerta de sucesso
}

// Função para editar uma tarefa existente
function editTask(index) {
    const tasks = getTasksFromLocalStorage();
    const newText = prompt("Edite a tarefa:", tasks[index].text); // Solicita novo texto
    if (newText) { // Se o texto não for nulo
        tasks[index].text = newText; // Atualiza o texto da tarefa
        saveTasksToLocalStorage(tasks); // Salva lista atualizada
        renderTasks(); // Re-renderiza as tarefas
        
        showEditAlert(); // Mostra alerta de edição
    }
}

// Função para excluir uma tarefa
function deleteTask(index) {
    const tasks = getTasksFromLocalStorage();
    tasks.splice(index, 1); // Remove a tarefa do array
    saveTasksToLocalStorage(tasks); // Salva lista atualizada
    renderTasks(); // Re-renderiza as tarefas

    showDeleteAlert(); // Mostra alerta de exclusão
}

// Função para marcar uma tarefa como concluída ou não
function toggleComplete(index) {
    const tasks = getTasksFromLocalStorage();
    tasks[index].completed = !tasks[index].completed; // Alterna o status
    saveTasksToLocalStorage(tasks); // Salva lista atualizada
    renderTasks(); // Re-renderiza as tarefas

    showCompleteAlert(); // Mostra alerta de conclusão
}

// Função para mostrar alerta de sucesso
function showSuccessAlert() {
    const alert = document.getElementById('successAlert'); // Chamando a ação pelo id alerta
    alert.classList.remove('d-none'); // Mostra o alerta

    setTimeout(() => {
        alert.classList.add('d-none'); // Esconde o alerta após 2 segundos
    }, 2000);
}

// Função para mostrar alerta de edição
function showEditAlert() {
    const alert = document.getElementById('editAlert');
    alert.classList.remove('d-none'); 

    setTimeout(() => {
        alert.classList.add('d-none'); 
    }, 2000);
}

// Função para mostrar alerta de exclusão
function showDeleteAlert() {
    const alert = document.getElementById('deleteAlert');
    alert.classList.remove('d-none'); 

    setTimeout(() => {
        alert.classList.add('d-none'); 
    }, 2000);
}

// Função para mostrar alerta de conclusão
function showCompleteAlert() {
    const alert = document.getElementById('completeAlert');
    alert.classList.remove('d-none'); 

    setTimeout(() => {
        alert.classList.add('d-none'); 
    }, 2000);
}

// Evento para adicionar tarefa ao clicar no botão "Adicionar Tarefa"
addTaskButton.addEventListener('click', addTask);

// Evento para adicionar tarefa ao pressionar a tecla "Enter"
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Renderiza as tarefas ao carregar a página
document.addEventListener('DOMContentLoaded', renderTasks);