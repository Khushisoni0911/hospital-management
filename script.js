// --- LOGIN FUNCTIONALITY ---
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const role = document.getElementById("role").value;
      const message = document.getElementById("loginMessage");

      // Simple fixed login
      if (role === "admin" && username === "admin" && password === "admin123") {
        localStorage.setItem("role", "admin");
        window.location.href = "admin.html";
      } else if (role === "patient" && username !== "" && password !== "") {
        localStorage.setItem("role", "patient");
        window.location.href = "patient.html";
      } else {
        message.textContent = "❌ Invalid credentials or role!";
        message.style.color = "red";
      }
    });
  }

  // --- PATIENT FORM ---
  const patientForm = document.getElementById("patientForm");
  if (patientForm) {
    patientForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const age = document.getElementById("age").value;
      const dept = document.getElementById("department").value;
      const msg = document.getElementById("message");

      if (name && age && dept) {
        // Save patient to local storage
        let patients = JSON.parse(localStorage.getItem("patients")) || [];
        patients.push({ name, age, dept });
        localStorage.setItem("patients", JSON.stringify(patients));

        msg.textContent = `✅ Registered ${name} successfully!`;
        msg.style.color = "green";
        patientForm.reset();
      } else {
        msg.textContent = "❌ Please fill all fields!";
        msg.style.color = "red";
      }
    });
  }

  // --- ADMIN TABLE ---
  const table = document.getElementById("patientTable");
  if (table) {
    const patients = JSON.parse(localStorage.getItem("patients")) || [];
    const tbody = table.querySelector("tbody");
    patients.forEach(p => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${p.name}</td><td>${p.age}</td><td>${p.dept}</td>`;
      tbody.appendChild(row);
    });
  }
});

// --- LOGOUT FUNCTION ---
function logout() {
  localStorage.removeItem("role");
  window.location.href = "index.html";
}
