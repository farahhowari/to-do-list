document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
 
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    
    fetch('http://localhost:3000/api/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })
    .then(res => {
      if (res.ok) {
        alert('log in successfully ');
        window.location.href = 'login.html'; 
      } else {
        return res.json().then(data => {
          throw new Error(data.message || ("An error occurred "));
        });
      }
    })
    .catch(error => {
      alert(error.message);
    });
  });