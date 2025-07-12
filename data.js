const mockEmployees = [
    { id: 1, firstName: 'Alice', lastName: 'Smith', email: 'alice.smith@example.com', department: 'HR', role: 'Manager' },
    { id: 2, firstName: 'Bob', lastName: 'Johnson', email: 'bob.johnson@example.com', department: 'IT', role: 'Developer' },
    { id: 3, firstName: 'Charlie', lastName: 'Lee', email: 'charlie.lee@example.com', department: 'Finance', role: 'Analyst' }
];
function saveEmployeesToLocal() {
    localStorage.setItem("employees", JSON.stringify(mockEmployees));
}