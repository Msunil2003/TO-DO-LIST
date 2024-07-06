document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
  
    // Load tasks from local storage
    loadTasks();
  
    // Add new task
    addTaskBtn.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText) {
        addTask(taskText);
        taskInput.value = '';
      }
    });
  
    // Add task to the list
    function addTask(taskText, isCompleted = false) {
      const taskItem = document.createElement('li');
      taskItem.className = isCompleted ? 'completed' : '';
      taskItem.innerHTML = `
        <span>${taskText}</span>
        <div>
          <button class="complete-btn">✔️</button>
          <button class="edit-btn">✏️</button>
          <button class="delete-btn">❌</button>
        </div>
      `;
      taskList.appendChild(taskItem);
      saveTasks();
    }
  
    // Handle task actions
    taskList.addEventListener('click', (e) => {
      if (e.target.classList.contains('complete-btn')) {
        toggleComplete(e.target.parentElement.parentElement);
      } else if (e.target.classList.contains('edit-btn')) {
        editTask(e.target.parentElement.parentElement);
      } else if (e.target.classList.contains('delete-btn')) {
        deleteTask(e.target.parentElement.parentElement);
      }
    });
  
    // Toggle task completion
    function toggleComplete(taskItem) {
      taskItem.classList.toggle('completed');
      saveTasks();
    }
  
    // Edit task
    function editTask(taskItem) {
      const taskText = prompt('Edit task:', taskItem.firstElementChild.textContent);
      if (taskText) {
        taskItem.firstElementChild.textContent = taskText;
        saveTasks();
      }
    }
  
    // Delete task
    function deleteTask(taskItem) {
      taskList.removeChild(taskItem);
      saveTasks();
    }
  
    // Save tasks to local storage
    function saveTasks() {
      const tasks = [];
      taskList.querySelectorAll('li').forEach(taskItem => {
        tasks.push({
          text: taskItem.firstElementChild.textContent,
          completed: taskItem.classList.contains('completed')
        });
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    // Load tasks from local storage
    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => addTask(task.text, task.completed));
    }
  });
  