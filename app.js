const express = require("express");
const path = require("path");
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(cors());

app.use(express.json());

const dbPath = path.join(__dirname, "studentschema.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();


  app.put("/sessions/:sessionId/", async (request, response) => {
    const { sessionId } = request.params;
    const sessionDetails = request.body;
    const {
      isBooked,
    } = sessionDetails;
    const updateSessionQuery = `
     UPDATE
        sessionschema
      SET
        isBooked=${isBooked}
      WHERE
        sessionID = ${sessionId};`;
    await db.run(updateSessionQuery);
    response.send("Session Booked Successfully");
  });



  app.get("/sessions/dean/", async (request, response) => {
    const sessionDetails = request.body;
    const {
      isBooked,
    } = sessionDetails;
    const getsessionQuery = `SELECT * FROM sessionschema  WHERE isBooked = '${isBooked}'`;
	const sessionArray = await db.all(getsessionQuery);
	response.send(sessionArray);
    });


  app.get("/sessions/", async (request, response) => {

          const getSessionsQuery = `
              SELECT
                *
              FROM
               sessionschema;`;
          const sessionArray = await db.all(getSessionsQuery);
          response.send(sessionArray);
        
    
  });
  app.post("/login", async (request, response) => {
    const { loginID, password } = request.body;
      const selectpasswordQuery = `SELECT loginID,password FROM studentschema WHERE loginID = '${loginID}'`;
      const dbloginandpassword = await db.get(selectpasswordQuery);
      if (loginID === dbloginandpassword.loginID && password === dbloginandpassword.password) {
        const Auth = uuidv4();
        response.send({Auth});
      } else {
        response.status(400);
        response.send("Invalid password");
      }
    }
  );

  app.post("/deanlogin", async (request, response) => {
    const { loginID, password } = request.body;
      const selectpasswordQuery = `SELECT loginID,password FROM deanschema WHERE loginID = '${loginID}'`;
      const dbloginandpassword = await db.get(selectpasswordQuery);
      if (loginID === dbloginandpassword.loginID && password === dbloginandpassword.password) {
        const Auth = uuidv4();
        response.send({Auth});
      } else {
        response.status(400);
        response.send("Invalid password");
      }
    }
  );




  app.post("/login", async (request, response) => {
    const { loginID, password } = request.body;
      const selectpasswordQuery = `SELECT loginID,password FROM studentschema WHERE loginID = '${loginID}'`;
      const dbloginandpassword = await db.get(selectpasswordQuery);
      if (loginID === dbloginandpassword.loginID && password === dbloginandpassword.password) {
        const Auth = uuidv4();
        response.send({Auth});
      } else {
        response.status(400);
        response.send("Invalid password");
      }
    }
  );