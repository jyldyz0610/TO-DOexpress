const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const DB_USER = "todo";
const DB_PASSWORD = "1234";
const DB_HOST = "localhost";
const DB_NAME = "todoexpress";

const templates = "templates";


app.use(express.urlencoded({ extended: true }));


let connection;

async function createDBConnection() {
    try {
        connection = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME,
        });
        console.log("Connected to the database");
    } catch (error) {
        console.error(`Error connecting to the database: ${error}`);
        throw error;
    }
}

async function resetAutoIncrement() {
    const query = "ALTER TABLE todos AUTO_INCREMENT = 1";
    await connection.execute(query);
}



app.get("/", (req, res) => {
    console.log("Req:", req);
    res.send("Hello AWS23-07!")

})

app.post("/hello", (request, response) => {
    console.log("Req:", request.body);
    response.status(200).send("Hello AWS23-07!");
 })

app.listen(port, () => {
     console.log(`ToDo app started on Port ${port}`);
     

})

