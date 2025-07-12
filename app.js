
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
        const id = parseInt(e.target.parentElement.parentElement.dataset.id);
        const employee = mockEmployees.find(emp => emp.id === id);
        if (employee) {
            document.getElementById('firstName').value = employee.firstName;
            document.getElementById('lastName').value = employee.lastName;
            document.getElementById('email').value = employee.email;
            document.getElementById('department').value = employee.department;
            document.getElementById('role').value = employee.role;
            
            const modal = document.getElementById('add-modal');
            modal.style.display = 'block';
            modal.querySelector('h2').textContent = 'Edit Employee';
            
            // Store the ID being edited
            modal.dataset.editingId = id;
        }
    }
});

// Update form submission handler
document.getElementById('employee-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const department = document.getElementById('department').value;
    const role = document.getElementById('role').value;

    if (firstName && lastName && email && department && role) {
        const modal = document.getElementById('add-modal');
        const isEditing = modal.dataset.editingId;
        
        if (isEditing) {
            // Update existing employee
            const id = parseInt(modal.dataset.editingId);
            const index = mockEmployees.findIndex(emp => emp.id === id);
            if (index !== -1) {
                mockEmployees[index] = {
                    id,
                    firstName,
                    lastName,
                    email,
                    department,
                    role
                };
            }
            delete modal.dataset.editingId;
        } else {
            // Add new employee
            const newEmployee = {
                id: Date.now(),
                firstName,
                lastName,
                email,
                department,
                role
            };
            mockEmployees.push(newEmployee);
        }
        
        renderEmployees();
        modal.style.display = 'none';
        document.getElementById('employee-form').reset();
        modal.querySelector('h2').textContent = 'Add Employee';
    } else {
        alert('Please fill all fields!');
    }
});

// Search functionality
document.getElementById('search-bar').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm) {
        const filtered = mockEmployees.filter(emp => 
            emp.firstName.toLowerCase().includes(searchTerm) ||
            emp.lastName.toLowerCase().includes(searchTerm) ||
            emp.email.toLowerCase().includes(searchTerm)
        );
        renderEmployees(filtered);
    } else {
        renderEmployees();
    }
});

// Sort functionality
document.getElementById('sort').addEventListener('change', (e) => {
    const sortBy = e.target.value;
    if (sortBy) {
        const sorted = [...mockEmployees].sort((a, b) => {
            if (sortBy === 'name') {
                return a.firstName.localeCompare(b.firstName);
            } else if (sortBy === 'department') {
                return a.department.localeCompare(b.department);
            }
            return 0;
        });
        renderEmployees(sorted);
    } else {
        renderEmployees();
    }
});


document.getElementById('show').addEventListener('change', (e) => {
    const limit = parseInt(e.target.value);
    renderEmployees(mockEmployees.slice(0, limit));
});