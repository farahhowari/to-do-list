document.addEventListener("DOMContentLoaded", () => {
  // التحقق من تسجيل الدخول
  const token = sessionStorage.getItem('token');
  if (!token) {
    alert("You must log in first!");
    window.location.href = 'login.html';
    return;
  }

  // تفعيل الوضع الليلي إذا كان محفوظ
  const isDark = localStorage.getItem('darkMode') === 'true';
  if (isDark) {
    document.body.classList.add('dark-mode');
  }

  const profileBtn = document.getElementById('profileBtn');
  const sidebar = document.getElementById('sidebar');
  const profileBtnSidebar = document.getElementById('profileBtnSidebar');
  const toggleDarkModeBtn = document.getElementById('toggleDarkMode');
  const logoutBtn = document.getElementById('logoutBtn');
  const closeSidebar = document.getElementById('closeSidebar');
  const addTaskBtn = document.querySelector('.add-task');

  // تحميل المهام من localStorage
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

  // تحديث المهام عند أي تغيير
  document.addEventListener('input', saveTasksToLocalStorage);
  document.addEventListener('change', saveTasksToLocalStorage);

  // إضافة مهمة جديدة
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

  // القائمة الجانبية
  profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebar.classList.remove('hidden');
  });

  document.addEventListener('click', () => {
    sidebar.classList.add('hidden');
  });

  sidebar.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  closeSidebar.addEventListener('click', () => {
    sidebar.classList.add('hidden');
  });

  profileBtnSidebar.addEventListener('click', () => {
    window.location.href = 'profile.html';
  });

  // تفعيل/إيقاف الوضع الليلي
  toggleDarkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkNow = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkNow);
  });

  // تسجيل الخروج
  logoutBtn.addEventListener('click', () => {
    sessionStorage.clear(); // حذف التوكن والمعلومات
    alert("You have been logged out.");
    window.location.href = 'login.html';
  });
});