const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require("console.table")

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "employees_db"
});


connection.connect(err => {
    if (err) throw err;

    
    start();
});


const start = async () => {
    
    const { action } = await inquirer.prompt({
        name: "action",
        type: "list",
        message: "Would you like to [ADD DEPARTMENT], [ADD ROLE], [ADD EMPLOYEE] or [VIEW] employees?",
        choices: ["ADD DEPARTMENT", "ADD ROLE", "ADD EMPLOYEE", "VIEW", "EXIT"]
    });

    
    switch (action) {
        case "ADD DEPARTMENT":
            return addDepartment();
        case "ADD ROLE":
            return addRole();
        case "ADD EMPLOYEE":
            return addEmployee()
        case "VIEW":
            return viewEmployees();
        default:
            connection.end();
    }
}

const addEmployee = async () => {
    
    const { first_name, last_name } = await inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the first name of the employee?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the last name of the employee?"
        }
    ]);
    connection.query(
        "INSERT INTO employee SET ?",
        {
            first_name, 
            last_name, 
        },
        (err) => {
            if (err) throw err;

            console.log(`Your employee input for ${first_name} ${last_name} was successfully created!`);
            
            start();
        }
    )
}
const addRole = async () => {
    
    const { title, salary } = await inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the role title?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the annual salary for this role? Include cents."
        },
    ]);
    connection.query(
        "INSERT INTO role SET ?",
        {
            title, // the same as writing `name: name`
            salary, // the same as writing `category: category`
            
        },
        (err) => {
            if (err) throw err;

            console.log(`Your input for ${title} was successfully created!`);
            
            start();
        }
    )

}
const addDepartment = async () => {
    
    const { name } = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the department?"
        },
    ]);

   
    connection.query(
        "INSERT INTO department SET ?",
        {
            name,
        },
        (err) => {
            if (err) throw err;

            console.log(`Your entry for ${name} was successfully created!`);
            start();
        }
    )


}
const viewEmployees = () => {
    connection.query("SELECT * FROM employee", async (err, items) => {
        if (err) throw err;
        console.table([
            {
              items.first_name,
              age: 10
            }, {
              name: 'bar',
              age: 20
            }
          ]);
});
    connection.query("SELECT * FROM role", async (err, items) => {
    if (err) throw err;
    consoleTable(items)
});
    connection.query("SELECT * FROM department", async (err, items) => {
    if (err) throw err;
    consoleTable(items)
});
}
