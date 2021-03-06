const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { inherits } = require("util");

let teamList = [];

// create questions for inquirer

const init = async () => {
    const teamQuestions = () => {
        inquirer
         .prompt([
             {
                type: "input",
                name: "name",
                message: "Enter team member's name",
                default: "name",
             },
             {
                type: "number",
                name: "id",
                message: "Enter team member's ID number",
                default: "id",
             },
             {
                type: "input",
                name: "email",
                message: "Enter team member's email address",
                default: "email",
             },
             // Ask what type of team member is being entered
             {
                type: "rawlist",
                name: "employeeType",
                message: "Enter the team member's role:",
                choices: ["Intern", "Manager", "Engineer"],
             },
             // If team member is Intern:
             {
                type: "input",
                name: "school",
                message: "Enter the schooling if Intern",
                default: "school name",
                when: (answers) => answers.employeeType === "Intern",
             },
             // If team member is Manager:
             {
                type: "number",
                name: "officeNumber",
                message: "Enter office number if manager",
                default: "office number",
                when: (answers) => answers.employeeType === "Manager",
             },
             // If team member is Engineer:
             {
                type: "input",
                name: "github",
                message: "Enter github username if engineer",
                default: "github username",
                when: (answers) => answers.employeeType === "Engineer",
             },
             // Determine if user would like to add another team member
             {
                 type: "confirm",
                 name: "continue",
                 message: "Enter another team member?",
                 default: true,
             },
         ])
         .then(function (answers) {
             teamList.push(answers);
             if (answers.continue) {
                 teamQuestions();
             }
             let team = teamConstructors(teamList);
             writeHTML(team);
         })
         .catch(function (err) {
             console.log(err);
         });
    };
    await teamQuestions();
};

const teamConstructors = (teamList) => {
    console.log(teamList);
    return teamList.map((answer) => {
        if (answer.employeeType === "Intern") {
            return new Intern(answer.name, answer.id, answer.email, answer.school);
        }
        console.log(answer);
        if (answer.employeeType === "Manager") {
            return new Manager(answer.name, answer.id, answer.email, answer.officeNumber);
        }
        if (answer.employeeType === "Engineer") {
            return new Engineer(answer.name, answer.id, answer.email, answer.github);
        }
    });
};

// Generate HTML page with entered team info

function writeHTML(team) {
    const html = render(team);
    fs.writeFileSync(outputPath, html, "utf8", function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

init();
    
        
        
        
        
        
        
        
        
        
          // ]);
        // .then(function (answers) {
        //     teamQuestions.push(answers);
        //     if (answers.continue) {
        //         teamAnswers();
        //     }
        //     let team = teamConstructors(allAnswers);
        //     writeHTML(team);
        // })
    
        // .catch(function (err) {
        //     console.log(err);
        // });
        // await gatherInfo();
//           .then(function (answers) {
//               teamList.push(answers);
//               if (answers.continue) {
//                   teamAnswers();
//               }
//               let team = employeeConstructor(teamList);
//               writeHTML(team);
//           })

//           .catch(function (err) {
//               console.log(err);
//           });
//     };
//     await teamAnswers();
// }; 

// const employeeConstructor = (teamList) => {
    // console.log(teamList);
    // return teamList.map((answer) => {
        // if (answer.employeeType === "Intern") {
            // return new Intern(answer.name, answer.id, answer.email, answer.school);
        // }
        // console.log(answer);
        // if (answer.employeeType === "Manager") {
            // return new Manager(answer.name, answer.id, answer.email, answer.officeNumber);
        // }
        // if (answer.employeeType === "Engineer") {
            // return new Engineer(answer.name, answer.id, answer.email, answer.github);
        // }
    // });
// };

// function writeHTML(team) {
//     const html = render(team);
//     fs.writeFileSync(outputPath, html, "utf8", function (err) {
//         if (err) {
//             return console.log(err);
//         }
//     });
// }

// teamQuestions();
        
    
    
    
    
    
    
    



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! 


