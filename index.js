const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "base2brand",
  database: "taskmanagerdb",
});

app.post("/create", (req, res) => {
  console.log(req.body, "----");
  const EmpID = req.body.EmpID;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const jobPosition = req.body.jobPosition;
  const email = req.body.email;
  const phone = req.body.phone;
  const permanentaddress = req.body.permanentaddress;
  const currentAddress = req.body.currentAddress;
  const dob = req.body.dob;
  const role = req.body.role;
  const parentPhone = req.body.parentPhone;
  const EmployeeID = req.body.EmployeeID;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  db.query(
    "INSERT INTO addemployee (EmpID,firstName, lastName, jobPosition, email, phone, permanentaddress, currentAddress,dob,role,parentPhone,EmployeeID,password,confirmPassword) VALUES (?,?, ?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      EmpID,
      firstName,
      lastName,
      jobPosition,
      email,
      phone,
      permanentaddress,
      currentAddress,
      dob,
      role,
      parentPhone,
      EmployeeID,
      password,
      confirmPassword,
    ],
    (err, result) => {
      if (err) {
        console.log(err, "lll");
      } else {
        res.send("value inserted");
      }
    }
  );
});

app.get("/employees", (req, res) => {
  console.log("ddddd-----");
  db.query("SELECT * FROM addemployee", (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

app.post("/user/login", (req, res) => {
  console.log(req.body, "kk---ppp--");
  const { email, password } = req.body.values;
  console.log(email, password, "777---");
  if (email && password) {
    db.query(
      "SELECT * FROM addemployee WHERE email = ? AND password = ?",
      [email, password],
      (error, results) => {
        if (error) throw error;
        console.log(results, "ll---");
        if (results?.length > 0) {
          res.send(results);

          console.log("00---999");
        } else {
          res.send("Invalid username or password");
        }
      }
    );
  } else {
    res.send("Username and password are required");
  }
});

app.post("/user/info", (req, res) => {
  console.log(req.body, "kk-----");
  const { email, password } = req.body.values;
  console.log(email, password, "777---");
  if (email && password) {
    db.query(
      "SELECT * FROM addemployee WHERE email = ? AND password = ?",
      [email, password],
      (error, results) => {
        if (error) throw error;
        console.log(results, "ll---");
        if (results?.length > 0) {
          res.send(results);

          console.log("00---999");
        } else {
          res.send("Invalid username or password");
        }
      }
    );
  } else {
    res.send("Username and password are required");
  }
});

app.post("/login", (req, res) => {
  console.log(req.body, "kk-----");
  const { email, password } = req.body.values;
  console.log(email, password, "777---");
  if (email && password) {
    db.query(
      "SELECT * FROM userlogin WHERE email = ? AND password = ?",
      [email, password],
      (error, results) => {
        if (error) throw error;
        console.log(results.length, "ll---");
        if (results?.length > 0) {
          res.send("Login successful");
          console.log("00---999");
        } else {
          res.send("Invalid username or password");
        }
      }
    );
  } else {
    res.send("Username and password are required");
  }
});

app.delete("/users/:id", (req, res) => {
  console.log(req?.params, "888--");
  const EmpID = req.params.id;
  const query = "DELETE FROM addemployee WHERE EmpID = ?";

  db.query(query, [EmpID], (err, results, fields) => {
    if (err) throw err;
    res.send(`User with ID ${EmpID} has been deleted`);
  });
});

app.put("/update/:id", (req, res) => {
  console.log(req.params, "888--");
  const EmpID = req.params.id;
  const { firstName, lastName, email } = req.body;
  const query =
    "UPDATE addemployee SET firstName = ?, lastName = ?, email = ? WHERE EmpID = ?";

  db.query(
    query,
    [firstName, lastName, email, EmpID],
    (err, results, fields) => {
      if (err) throw err;
      res.send(`User with ID ${EmpID} has been updated`);
    }
  );
});


app.put("/employeeUpdate/:id", (req, res) => {
  console.log(req.params, "888--");
  const EmpID = req.params.id;
  const { firstName, lastName, jobPosition ,email,phone ,permanentaddress,currentAddress,dob ,role, parentPhone,EmployeeID,password,confirmPassword} = req.body;

  const query =
  "UPDATE addemployee SET firstName = ?, lastName = ?, jobPosition = ?, email = ?, phone = ?, permanentaddress = ?, currentAddress = ?, dob = ?, role = ?, parentPhone = ?, EmployeeID = ?, password = ?, confirmPassword = ? WHERE EmpID = ?";

  db.query(
    query,
    [firstName, lastName, jobPosition, email, phone, permanentaddress, currentAddress, dob, role, parentPhone, EmployeeID, password, confirmPassword, EmpID],
    (err, results, fields) => {
      if (err) throw err;
      res.send(`User with ID ${EmpID} has been updated`);
    }
  );

});

app.put("/updateProject/:id", (req, res) => {
  console.log(req.params, "888--");
  const ProID = req.params.id;
  const { clientName, projectName, projectDescription } = req.body;

  const query =
  "UPDATE projects SET clientName = ?, projectName = ?, projectDescription = ? WHERE ProID = ?";

  db.query(
    query,
    [clientName, projectName, projectDescription, ProID], // add ProID parameter here
    (err, results, fields) => {
      if (err) throw err;
      res.send(`User with ID ${ProID} has been updated`);
    }
  );

});


app.put("/updatePhase/:id", (req, res) => {
  console.log(req.params, "888--");
  const ProID = req.params.id;
  const { clientName, projectName, projectDescription } = req.body;

  const query =
  "UPDATE projects SET clientName = ?, projectName = ?, projectDescription = ? WHERE ProID = ?";

  db.query(
    query,
    [clientName, projectName, projectDescription, ProID], // add ProID parameter here
    (err, results, fields) => {
      if (err) throw err;
      res.send(`User with ID ${ProID} has been updated`);
    }
  );

});




app.put("/updateModule/:id", (req, res) => {
  console.log(req.params, "888--");
  const ProID = req.params.id;
  const { clientName, projectName, projectDescription } = req.body;

  const query =
  "UPDATE projects SET clientName = ?, projectName = ?, projectDescription = ? WHERE ProID = ?";

  db.query(
    query,
    [clientName, projectName, projectDescription, ProID], // add ProID parameter here
    (err, results, fields) => {
      if (err) throw err;
      res.send(`User with ID ${ProID} has been updated`);
    }
  );

});










app.post("/add/projects", (req, res) => {
  console.log(req.body, "----");
  const ProID = req.body.ProID;
  const clientName = req.body.clientName;
  const projectName = req.body.projectName;
  const projectDescription = req.body.projectDescription;

  // Check if projectName already exists
  db.query(
    "SELECT COUNT(*) as count FROM projects WHERE projectName = ?",
    [projectName],
    (err, result) => {
      if (err) {
        console.log(err, "lll");
        res.send("An error occurred");
      } else {
        const count = result[0].count;
        if (count > 0) {
          res.send("Project with same name already exists");
        } else {
          // Insert new project
          db.query(
            "INSERT INTO projects (ProID, clientName, projectName, projectDescription) VALUES (?, ?, ?, ?)",
            [ProID, clientName, projectName, projectDescription],
            (err, result) => {
              if (err) {
                console.log(err, "lll");
                res.send("An error occurred");
              } else {
                res.send("Project added successfully");
              }
            }
          );
        }
      }
    }
  );
});

app.get("/get/projects", (req, res) => {
  db.query("SELECT * FROM projects", (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

app.delete("/project/:id", (req, res) => {
  console.log(req?.params, "888--");
  const ProID = req.params.id;
  const query = "DELETE FROM projects WHERE ProID = ?";

  db.query(query, [ProID], (err, results, fields) => {
    if (err) throw err;
    res.send(`Project with ID ${ProID} has been deleted`);
  });
});

app.put("/update/project/:id", (req, res) => {
  console.log(req.params, "88844--");
  const ProID = req.params.id;
  const { clientName, projectName, projectDescription } = req.body;
  const query =
    "UPDATE projects SET clientName = ?, projectName =? , projectDescription = ? WHERE ProID = ?";

  db.query(
    query,
    [clientName, projectName, projectDescription, ProID],
    (err, results, fields) => {
      if (err) throw err;
      res.send(`Project with ID ${ProID} has been updated`);
    }
  );
});

app.post("/api/add-phase", (req, res) => {
  const { projectName, phases } = req.body;
  console.log(projectName, phases, "pp---");
  // Insert the client name and phases into the database
  db.beginTransaction((err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    // loop through each phase and insert into the database
    phases.forEach((phase) => {
      db.query(
        "INSERT INTO phases (projectName, phases) VALUES (?, ?)",
        [projectName, phase],
        (err, result) => {
          if (err) {
            console.error(err);
            db.rollback(() => {
              res.status(500).send("Internal Server Error");
              db.release();
            });
            return;
          }
        }
      );
    });

    db.commit((err) => {
      if (err) {
        console.error(err);
        db.rollback(() => {
          res.status(500).send("Internal Server Error");
          db.release();
        });
        return;
      }

      res.status(200).send("OK");
      // db.release();
    });
  });
});




app.put("/api/update-phase/:id", (req, res) => {
  console.log(req.body,"kkk--");
  const phaseID = req.params.id;

  const { projectName,phases } = req.body;
  // console.log(phaseId, phase, "pp---");

  db.beginTransaction((err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    // update the phase with the given ID
    db.query(
      "UPDATE phases SET projectName = ? , phases =? WHERE  phaseID = ?",
      [projectName, phases,phaseID],
      (err, result) => {
        if (err) {
          console.error(err);
          db.rollback(() => {
            res.status(500).send("Internal Server Error");
            // db.release();
          });
          return;
        }

        db.commit((err) => {
          if (err) {
            console.error(err);
            db.rollback(() => {
              res.status(500).send("Internal Serverrrr Error");
              db.release();
            });
            return;
          }

          res.status(200).send("OK");
        });
      }
    );
  });
});



// app.put("/api/update-module/:id", (req, res) => {
//   console.log(req.body,"kkk5555--");
//   const modID = req.params.id;

//   const { projectName,phaseName,modules } = req.body;
//   // console.log(phaseId, phase, "pp---");

//   db.beginTransaction((err) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send("Internal Server Error");
//       return;
//     }

//     // update the phase with the given ID
//     db.query(
//       "UPDATE modules SET projectName = ? , phaseName =? , modules =? WHERE  modID = ?"
//       ,
//       [projectName, phaseName, modules,modID],
//       (err, result) => {
//         if (err) {
//           console.error(err);
//           db.rollback(() => {
//             res.status(500).send("Internal Server Error");
//             // db.release();
//           });
//           return;
//         }

//         db.commit((err) => {
//           if (err) {
//             console.error(err);
//             db.rollback(() => {
//               res.status(500).send("Internal Serverrrr Error");
//               db.release();
//             });
//             return;
//           }

//           res.status(200).send("OK");
//         });
//       }
//     );
//   });
// });


app.get("/get/phases", (req, res) => {
  db.query("SELECT * FROM phases", (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

app.delete("/delete/phase/:id", (req, res) => {
  console.log(req?.params, "8889--");
  const phaseID = req.params.id;
  const query = "DELETE FROM phases WHERE phaseID = ?";

  db.query(query, [phaseID], (err, results, fields) => {
    if (err) throw err;
    res.send(`User with ID ${phaseID} has been deleted`);
  });
});

app.post("/api/add-module", (req, res) => {
  const { projectName, phaseName, modules } = req.body;
  console.log(projectName, phaseName, modules, "pp---");
  // Insert the client name and phases into the database
  db.beginTransaction((err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Insert each module as a separate row
    modules.forEach((module) => {
      db.query(
        "INSERT INTO modules (projectName, phaseName, modules) VALUES (?, ?, ?)",
        [projectName, phaseName, module],
        (err, result) => {
          if (err) {
            console.error(err);
            db.rollback(() => {
              res.status(500).send("Internal Server Error");
              db.release();
            });
            return;
          }
        }
      );
    });

    db.commit((err) => {
      if (err) {
        console.error(err);
        db.rollback(() => {
          res.status(500).send("Internal Server Error");
          db.release();
        });
        return;
      }

      res.status(200).send("OK");
      // db.release();
    });
  });
});





app.post("/api/add-phaseAssignee", (req, res) => {
  console.log(req.body,"kkkkk---");
  const { projectName, phaseName, assignedNames, EmployeeID } = req.body;
  // console.log(projectName, phaseName, assignedNames, EmployeeID, "pp---");

  // Insert the client name and phases into the database
  db.beginTransaction((err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Insert each module as a separate row
    assignedNames.forEach((assignedName, index) => {
      db.query(
        "INSERT INTO addphaseassignee (projectName, phaseName, assignedNames, EmployeeID) VALUES (?, ?, ?, ?)",
        [projectName, phaseName, assignedName, EmployeeID[index]],
        (err, result) => {
          if (err) {
            console.error(err);
            db.rollback(() => {
              res.status(500).send("Internal Server Error");
              db.release();
            });
            return;
          }
        }
      );
    });

    db.commit((err) => {
      if (err) {
        console.error(err);
        db.rollback(() => {
          res.status(500).send("Internal Server Error");
          db.release();
        });
        return;
      }

      res.status(200).send("OK");
      // db.release();
    });
  });
});

app.delete("/delete/phaseAssignee/:id", (req, res) => {
  console.log(req?.params, "8889--");
  const PhaseAssigneeID = req.params.id;
  const query = "DELETE FROM addphaseassignee WHERE PhaseAssigneeID = ?";

  db.query(query, [PhaseAssigneeID], (err, results, fields) => {
    if (err) throw err;
    res.send(`User with ID ${PhaseAssigneeID} has been deleted`);
  });
});












app.get("/get/modules", (req, res) => {
  console.log("hello");
  db.query("SELECT * FROM modules", (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});


app.get("/get/PhaseAssignedTo", (req, res) => {
  console.log("hello");
  db.query("SELECT * FROM addphaseassignee", (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});


app.delete("/delete/module/:id", (req, res) => {
  console.log(req?.params, "8889--");
  const modID = req.params.id;
  const query = "DELETE FROM modules WHERE modID = ?";

  db.query(query, [modID], (err, results, fields) => {
    if (err) throw err;
    res.send(`User with ID ${modID} has been deleted`);
  });
});

app.post("/create/addTaskMorning", (req, res) => {
  console.log(req.body, "----");
  const projectName = req.body.projectName;
  const phaseName = req.body.phaseName;
  const module = req.body.module;
  const task = req.body.task;
  const estTime = req.body.estTime;
  const upWorkHrs = req.body.upWorkHrs;
  const employeeID = req.body.employeeID;
 const currDate = req.body.currDate;
  if (
    !projectName ||
    !phaseName ||
    !module ||
    !task ||
    !estTime ||
    !upWorkHrs

  ) {
    res.send("All fields are required.");
  } else {
    db.query(
      "INSERT INTO addmorningtask (projectName,phaseName, module, task,estTime, upWorkHrs,employeeID , currDate) VALUES (?,?,?,?,?,?,?,?)",
      [projectName, phaseName, module, task, estTime, upWorkHrs, employeeID, currDate],
      (err, result) => {
        if (err) {
          console.log(err, "lll");
        } else {
          res.send("value inserted");
        }
      }
    );
  }
});

app.get("/get/addTaskMorning", (req, res) => {
  console.log("hello");
  db.query("SELECT * FROM addmorningtask", (error, results, fields) => {
    if (error) throw error;
    res.json(results);
    console.log(results,"kkk");
  });
});

app.delete("/delete/morningDashboard/:id", (req, res) => {
  console.log(req?.params, "8889--");
  const MrngTaskID = req.params.id;
  const query = "DELETE FROM addmorningtask WHERE MrngTaskID = ?";

  db.query(query, [MrngTaskID], (err, results, fields) => {
    if (err) throw err;
    res.send(`User with ID ${MrngTaskID} has been deleted`);
  });
});


app.put("/update/addMrngTask/:id", (req, res) => {


  console.log(req.params, "88844--");
  const MrngTaskID = req.params.id;
  const { projectName, phaseName, module, task, estTime, upWorkHrs, employeeID, currDate } = req.body;
  const query = "UPDATE addmorningtask SET projectName = ?, phaseName = ?, module = ?, task = ?, estTime = ?, upWorkHrs = ?, employeeID = ?, currDate = ? WHERE MrngTaskID = ?";

  db.query(
    query,
    [projectName, phaseName, module, task, estTime, upWorkHrs, employeeID, currDate, MrngTaskID],
    (err, results, fields) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error updating project");
        return;
      }
      res.send(`Project with ID ${MrngTaskID} has been updated`);
    }
  );
});


app.put("/update/addEvngTask/:id", (req, res) => {


  console.log(req.params, "88844--");
  const EvngTaskID = req.params.id;
  const { projectName, phaseName, module, task, estTime,actTime, upWorkHrs, employeeID, currDate } = req.body;
  const query = "UPDATE addeveningtable SET projectName = ?, phaseName = ?, module = ?, task = ?, estTime = ?, actTime= ?, upWorkHrs = ?, employeeID = ?, currDate = ? WHERE EvngTaskID = ?";

  db.query(
    query,
    [projectName, phaseName, module, task, estTime,actTime, upWorkHrs, employeeID, currDate, EvngTaskID],
    (err, results, fields) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error updating project");
        return;
      }
      res.send(`Project with ID ${EvngTaskID} has been updated`);
    }
  );
});









app.delete("/delete/eveningDashboard/:id", (req, res) => {
  console.log(req?.params, "8889--");
  const EvngTaskID = req.params.id;
  const query = "DELETE FROM addeveningtable WHERE EvngTaskID = ?";

  db.query(query, [EvngTaskID], (err, results, fields) => {
    if (err) throw err;
    res.send(`User with ID ${EvngTaskID} has been deleted`);
  });
});

app.post("/create/addTaskEvening", (req, res) => {
  console.log(req.body, "----");
  const projectName = req.body.projectName;
  const phaseName = req.body.phaseName;
  const module = req.body.module;
  const task = req.body.task;
  const estTime = req.body.estTime;
  const actTime = req.body.actTime;
  const upWorkHrs = req.body.upWorkHrs;
  const employeeID = req.body.employeeID;
 const currDate = req.body.currDate;


  if (
    !projectName ||
    !phaseName ||
    !module ||
    !task ||
    !estTime ||
    !upWorkHrs
  ) {
    res.send("All fields are required.");
  } else {
    db.query(
      "INSERT INTO addeveningtable (projectName,phaseName, module, task,estTime , actTime, upWorkHrs,employeeID,currDate) VALUES (?,?,?,?,?,?,?,?,?)",
      [
        projectName,
        phaseName,
        module,
        task,
        estTime,
        actTime,
        upWorkHrs,
        employeeID,
        currDate,
      ],
      (err, result) => {
        if (err) {
          console.log(err, "lll");
        } else {
          console.log("inserted");
          res.send("value inserted");
        }
      }
    );
  }
});

app.get("/get/addTaskEvening", (req, res) => {
  console.log("hello");
  db.query("SELECT * FROM addeveningtable", (error, results, fields) => {
    console.log("55555-----");
    if (error) throw error;
    res.json(results);
  });
});

app.listen(5000, () => {
  console.log("hi  its  5000 port");
});
