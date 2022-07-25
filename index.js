const inquirer = require('inquirer')
const mysql = require('mysql2')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'P@ssword22',
  database: 'employeeManager_db'
})

const question = () => {
  inquirer.prompt([{
    message: 'Please choose the following Action:',
    type: 'list',
    choices: ['Add Department', 'Add Role', 'Add Employee', 'Exit Application'],
    name: 'initprcs'
  }])
    .then(init => {
      switch (init.initprcs) {
        case 'Add Department':
          addDepartment()
          break
        case 'Add Role':
          addRole()
          break
        case 'Add Employee':
          addEmployee()
          break
        case 'Exit Application':
          console.log('Application Terminated.')
      }

    })

  const addDepartment = () => {
    console.log('Attempting to Add Department..')
    inquirer.prompt([{
      message: 'Please Input the Department Name:',
      type: 'input',
      name: 'name'
    }])
      .then(department => {
        console.log(department)
        db.query('INSERT INTO departments SET ?', department, err => {
          if (err) { console.log(err) }
        })
        console.log('Input Recieved.')
      })
  }

  const addRole = () => {
    console.log('Attempting to Add Role..')
    inquirer.prompt([{
      message: 'Please Input the Role Title:',
      type: 'input',
      name: 'title'
    },
    {
      message: 'Please Input the Earned Salary:',
      type: 'input',
      name: 'salary'
    },
    {
      message: "Please Input the Current Role's Department ID:",
      type: 'input',
      name: 'department_id'
    }
    ])
      .then(role => {
        console.log(role)
        db.query('INSERT INTO roles SET ?', role, err => {
          if (err) { console.log(err) }
        })
        console.log('Input Recieved.')
        question()
      })
  }

  const addEmployee = () => {
    console.log('Attempting to Add Employee..')
    inquirer.prompt([{
      message: "Please Input employee's First Name:",
      type: 'input',
      name: 'first_name'
    },
    {
      message: "Please Input the employee's Last Name:",
      type: 'input',
      name: 'last_name'
    },
    {
      message: "Please Input the employee's Role ID:",
      type: 'input',
      name: 'role_id'
    },
    ])
      .then(employee => {
        console.log(employee)
        db.query('INSERT INTO employees SET ?', employee, err => {
          if (err) { console.log(err) }
        })
        console.log('Input Recieved.')
        question()
      })
  }
}

question()