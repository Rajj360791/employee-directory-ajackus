document.getElementById("employeeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const newEmp = {
    id: Date.now(),
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    department: document.getElementById("department").value,
    role: document.getElementById("role").value,
  };

  const stored = JSON.parse(localStorage.getItem("employees")) || [];
  stored.push(newEmp);
  localStorage.setItem("employees", JSON.stringify(stored));

  alert("Employee added successfully!");
  window.location.href = "index.ftlh";
});
