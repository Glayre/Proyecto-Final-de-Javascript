document.addEventListener("DOMContentLoaded", () => {
  protectRoute();

  const form = document.getElementById("profileForm");
  const usernameField = document.getElementById("profileUsername");
  const emailField = document.getElementById("profileEmail");
  const successMsg = document.getElementById("profileSuccess");

  const user = sessionStorage.getItem("loggedInUser");
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = users.find(u => u.username === user);

  if (currentUser) {
    usernameField.value = currentUser.username;
    emailField.value = currentUser.email;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newEmail = emailField.value.trim();

    // Validación de correo simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      successMsg.textContent = "Correo inválido.";
      successMsg.style.color = "#ff6b6b";
      return;
    }

    currentUser.email = newEmail;
    localStorage.setItem("users", JSON.stringify(users));
    successMsg.textContent = "Perfil actualizado correctamente.";
    successMsg.style.color = "#00ff9d";
  });
});
