document.addEventListener("DOMContentLoaded", () => {
  const token = sessionStorage.getItem('token');
  if (!token) {
    alert("You must log in first!");
    window.location.href = 'login.html';
    return;
  }

  const profileBtn = document.getElementById('profileBtn');
  const sidebar = document.getElementById('sidebar');
  const profileBtnSidebar = document.getElementById('profileBtnSidebar');
  const toggleDarkModeBtn = document.getElementById('toggleDarkMode');
  const logoutBtn = document.getElementById('logoutBtn');
  const closeSidebar = document.getElementById('closeSidebar');
  const addTaskBtn = document.querySelector('.add-task');

  
  const isDark = localStorage.getItem('darkMode') === 'true';
  if (isDark) {
    document.body.classList.add('dark-mode');
  }

  if (toggleDarkModeBtn) {
    toggleDarkModeBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Night Mode";
    toggleDarkModeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDarkNow = document.body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDarkNow);
      toggleDarkModeBtn.textContent = isDarkNow ? "☀️ Light Mode" : "🌙 Night Mode";
    });
  }

  
  if (profileBtn) {
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.remove('hidden');
    });
  }

  document.addEventListener('click', () => {
    sidebar.classList.add('hidden');
  });

  sidebar.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  if (closeSidebar) {
    closeSidebar.addEventListener('click', () => {
      sidebar.classList.add('hidden');
    });
  }

  if (profileBtnSidebar) {
    profileBtnSidebar.addEventListener('click', () => {
      window.location.href = 'profile.html';
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.clear();
      alert("You have been logged out.");
      window.location.href = 'login.html';
    });
  }

  
  loadTasksFromLocalStorage();

  function updateTaskPlaceholders() {
    const inputs = document.querySelectorAll('.task-input');
    inputs.forEach((input, index) => {
      input.placeholder = `Enter task ${index + 1}`;
    });
  }

  function attachDeleteHandler(button) {
    button.addEventListener('click', () => {
      button.parentElement.remove();
      updateTaskPlaceholders();
      saveTasksToLocalStorage();
    });
  }

  function saveTasksToLocalStorage() {
    const taskElements = document.querySelectorAll('.task-item');
    const tasks = [];

    taskElements.forEach(item => {
      const input = item.querySelector('.task-input');
      const checkbox = item.querySelector('.check');
      tasks.push({
        text: input.value,
        done: checkbox.checked
      });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskContainer = document.querySelector('.main');
    taskContainer.innerHTML = '';

    tasks.forEach((task, index) => {
      const taskItem = document.createElement('div');
      taskItem.className = 'task-item';
      taskItem.innerHTML = `
        <input type="text" class="task-input" value="${task.text}" placeholder="Enter task ${index + 1}" />
        <input type="checkbox" class="check" ${task.done ? 'checked' : ''} />
        <button class="delete-btn">🗑</button>
      `;
      taskContainer.appendChild(taskItem);
      attachDeleteHandler(taskItem.querySelector('.delete-btn'));
    });

    updateTaskPlaceholders();
  }

  document.addEventListener('input', saveTasksToLocalStorage);
  document.addEventListener('change', saveTasksToLocalStorage);

  if (addTaskBtn) {
    addTaskBtn.addEventListener('click', () => {
      const taskContainer = document.querySelector('.main');
      const taskItem = document.createElement('div');
      taskItem.className = 'task-item';
      taskItem.innerHTML = `
        <input type="text" class="task-input" />
        <input type="checkbox" class="check" />
        <button class="delete-btn">🗑</button>
      `;
      taskContainer.appendChild(taskItem);
      attachDeleteHandler(taskItem.querySelector('.delete-btn'));
      updateTaskPlaceholders();
      saveTasksToLocalStorage();
    });
  }
});
