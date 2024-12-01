const API_URL = 'http://localhost:5000'; // Backend API URL

function setType(type) {
  const container = document.getElementById("container");
  if (type === "signUp") {
    container.classList.add("right-panel-active");
  } else {
    container.classList.remove("right-panel-active");
  }
}

function togglePasswordVisibility(inputId, button) {
  const input = document.getElementById(inputId);
  const icon = button.querySelector("i");
  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}

async function handleSignUp(event) {
  event.preventDefault();
  const name = document.getElementById("signUpName").value.trim();
  const email = document.getElementById("signUpEmail").value.trim();
  const password = document.getElementById("signUpPassword").value.trim();

  // Validate inputs
  document.getElementById("signUpNameError").textContent = name ? "" : "*Name is required";
  document.getElementById("signUpEmailError").textContent = /\S+@\S+\.\S+/.test(email) ? "" : "*Invalid email address";
  document.getElementById("signUpPasswordError").textContent = password.length >= 6 ? "" : "*Password should be at least 6 characters";

  if (name && /\S+@\S+\.\S+/.test(email) && password.length >= 6) {
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        window.location.href = 'login.html'; // Redirect to main page
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  }
}

async function handleSignIn(event) {
  event.preventDefault();
  const email = document.getElementById("signInEmail").value.trim();
  const password = document.getElementById("signInPassword").value.trim();

  // Validate inputs
  document.getElementById("signInEmailError").textContent = /\S+@\S+\.\S+/.test(email) ? "" : "*Invalid email address";
  document.getElementById("signInPasswordError").textContent = password.length >= 6 ? "" : "*Password should be at least 6 characters";

  if (/\S+@\S+\.\S+/.test(email) && password.length >= 6) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        window.location.href = 'index.html'; // Redirect to main page
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }
}
