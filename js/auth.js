// Authentication functionality
document.addEventListener("DOMContentLoaded", function () {
  // Login form submission
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Simple validation
      if (email && password) {
        // In a real app, this would be an API call
        localStorage.setItem("user", JSON.stringify({ email: email }));
        alert("Login successful! Redirecting to dashboard...");
        window.location.href = "index.html";
      } else {
        alert("Please fill in all fields");
      }
    });
  }

  // Signup form submission
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm-password").value;

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      if (name && email && password) {
        // In a real app, this would be an API call
        localStorage.setItem(
          "user",
          JSON.stringify({ name: name, email: email })
        );
        alert("Account created successfully! Redirecting to login...");
        window.location.href = "login.html";
      } else {
        alert("Please fill in all fields");
      }
    });
  }
});
