const mysql = require ("mysql");
const inquirer = require ("inquirer");
const cTable = require("console.table");
// require("dotenv").config();
// const PORT = process.env.PORT || 8080;

const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   PORT: PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE
    host: "localhost",
    PORT: 3306,
    user: "root",
    password: "root",
    database: "employees_db"
});

connection.connect((err) => {
  if(err)throw err;
  start();
})
// initial question with all options
const start = () => {
  inquirer.prompt({
    name: "wantToDo",
    type: "list",
    message: "What would you like to do?",
    choices: ["View all employees", "View all roles", "View all departments","Add employee", "Add role", "Add department", "Update employee role", "Remove Employee", "Exit"]
  })

  // , "View all employees by department"


  .then(function(answer){
    switch (answer.wantToDo){
      case "View all employees":
        allEmployees();
        break;
      case "View all roles":
        allRoles();
        break;
      case "View all departments":
        allDepartments();
        break;
      // case "View all employees by department":
      //   employeeByDep();
        // break;
      case "Add employee":
        addEmployee();
        break;
      case "Add role":
        addRole();
        break; 
      case "Add department":
        addDepartment();
        break;
      case "Update employee role":
        updateEmployee();
        break;
      case "Remove Employee":
          removeEmployee();
          break;
      default:
        connection.end();
      };   
  });
};

// viewing all categories
const allEmployees = () => {
  connection.query("SELECT * FROM employee",(err,res) => {
    if (err){
      throw err
    }else {
      console.table(res)
      start();
    }
  });
};

const allRoles = () => {
  connection.query("SELECT * FROM role",(err,res) => {
    if (err){
      throw err
    }else {
      console.table(res)
      start();
    }
  });
};

// const viewAllDep = [];

const allDepartments = () => {
  connection.query("SELECT * FROM department",(err,res) => {
    if (err){
      throw err
    }else {
      console.table(res)
      start();
    }
  });
};


// const employeeByDep = () => {
//   inquirer.prompt([
//     {
//       type: "list",
//       name: "depView",
//       message: "Which department would you like to view?",
//       choices: [viewAllDep.depName]
//     },
//   ]).then(function(answer){
//   connection.query(
//   });
// }


// adding categories
const addEmployee = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "What is the employee's first name?"
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the employee's last name?"
    },
    {
      type: "input",
      name: "employeeRoleID",
      message: "What is the employee's roleID?"
    },
  ]).then(function(answer){
    connection.query(
      "INSERT INTO employee SET ?",
      {
        first_name: answer.firstName,
        last_name: answer.lastName,
        role_id: answer.employeeRoleID,
      },
      function (err){
        if (err) throw err;
        console.log("New employee added!");
        start();
      }
    );
  });
};

const addRole = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the new role?"
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary?"
    },
    {
      type: "input",
      name: "departmentID",
      message: "What is the department ID?"
    },
  ]).then(function(answer){
    connection.query(
      "INSERT INTO role SET ?",
      {
        title: answer.title,
        salary: answer.salary,
        department_id: answer.departmentID,
      },
      function (err){
        if (err) throw err;
        console.log("New role added!");
        start();
      }
    );
  });
};

const addDepartment = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the new department name?"
    },
  ]).then(function(answer){
    connection.query(
      "INSERT INTO department SET ?",
      {
        name: answer.name,
      },
      function (err){
        if (err) throw err;
        console.log("New department added!");
        start();
      }
    );
  });
};

// updating categories
const updateEmployee = () => {
  inquirer.prompt([
    {
      name: "first_name",
      message: "Whats the first name of the employee you want to update?"
    },
    {
      name: "last_name",
      message: "Whats the last name of the employee you want to update?"
    },
    {
      name: "role_id",
      message: "What would you like to change their role ID to?"
    }
  ]).then((answer) => {
    connection.query( "UPDATE employee SET ? WHERE ? AND ?",
    [
      {
        role_id: answer.role_id
      },
      {
        first_name: answer.first_name
      },
      {
        last_name: answer.last_name
      }
    ], (err) => {
      if (err) throw err;
      console.log("Employee role ID updated!")
      start();
  })
  })
}

const removeEmployee = () => {
    inquirer.prompt([
      {
        name: "first_name",
        message: "Whats the first name of the employee you want to delete?"
      },
      {
        name: "last_name",
        message: "Whats the last name of the employee you want to delete?"
      },
   
    ]).then((answer) => {
      connection.query( "DELETE FROM employee WHERE ? AND ?",
      [
       
        {
          first_name: answer.first_name
        },
        {
          last_name: answer.last_name
        }
      ], (err) => {
        if (err) throw err;
        console.log("Employee deleted!")
        start();
    })
    })
  }