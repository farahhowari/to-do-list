document.addEventListener("DOMContentLoaded", () => {
    const profileBtn = document.getElementById('profileBtn');
    const sidebar = document.getElementById('sidebar');
    const profileBtnSidebar = document.getElementById('profileBtnSidebar');
    const toggleDarkModeBtn = document.getElementById('toggleDarkMode');
    const logoutBtn = document.getElementById('logoutBtn');
    const closeSidebar = document.getElementById('closeSidebar');
    const addTaskBtn = document.querySelector('.add-task');
  
    
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
      });
    }
  
    
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
  
    toggleDarkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", isDark);
      });
  
    logoutBtn.addEventListener('click', () => {
      alert("You have been logged out.");
      window.location.href = 'login.html';
    });
  
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
      attachDeleteHandler(btn);
    });
  
    
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
  
      const deleteButton = taskItem.querySelector('.delete-btn');
      attachDeleteHandler(deleteButton);
  
      updateTaskPlaceholders(); 
    });
  
    
    updateTaskPlaceholders();
  });