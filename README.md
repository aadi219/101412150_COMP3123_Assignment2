# COMP3123 - Assignment2
By Aadi Badola (101412150)

## Description
The application provides a REACT frontend web-interface for the API endpoints created in Assignment 1.

Modules used:
- The application uses `TailwindCSS` and `DaisyUI` for styling.
- The `Axios` library was used to make requests to the API endpoints.
- The `react-router-dom` library was used to implement single-page navigation

## Screens
The application contains the following screens:
### Signup
`src/components/Signup.jsx`

The signup screen contains a form to create a new user by making a `POST` request to the `/user/signup` endpoint.
### Login
`src/components/Login.jsx`

The login screen contains a form to authenticate a user by making a `POST` request to the `/user/login` endpoint.
The user can provide either their username or their password for logging in. Upon successful authentication, the backend provides a JWT Token in the response which is stored in `localStorage`. No employee information can be viewed without obtaining the JWT Token.
### Employees
`src/components/emp/Employees.jsx`

This screen contains a table which is dynamically populated after making a `GET` request to the `/emp/employees` endpoint. Basic information of the employee is displayed and each row has buttons allowing the user to view, edit and delete an employee. The `Logout` button clears the `localStorage` token variable and redirects back to the login screen.
#### Filter
The component contains a text field allowing users to filter based on Department or Position by pressing the `Filter` button. If the button is pressed with no values provided then all employees are listed.
### Create Employee
`src/components/emp/CreateEmployee.jsx`

This screen contains a form to create a new employee. All fields must be filled and a valid email must be provided.
### Employee Details
`src/components/emp/ViewEmployee.jsx`

This screen contains a card displaying all information about an employee.
### Edit Employee
`src/components/emp/CreateEmployee.jsx`

This screen uses the same component as create employee however all fields are dynamically pre-populated based on the employee selected.

