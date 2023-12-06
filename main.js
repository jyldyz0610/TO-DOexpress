const express = require('express');
const mysql = require('mysql12'); // Add this line to import the mysql module
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DB_USER = "todo";
const DB_PASSWORD = "1234";
const DB_HOST = "localhost";
const DB_NAME = "todoexpress";

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

// Invoke the function to create DB connection
createDBConnection();

app.post("/todo", (req, res) => {
    const { test } = req.body; 


    res.status(200).json({ message: "Received POST request to /todo", receivedData: { test } });
});


app.post("/hello", (request, response) => {
    console.log("Req:", request.body);
    response.status(200).send("Hello AWS23-07!");
});

app.post('/delete', (request, response) => {
    const { id } = request.body;
    const deleteSql = 'DELETE FROM items WHERE id = ?';
    connection.query(deleteSql, [id], (err, results) => {
        if (err) {
            console.error(err);
            response.status(500).send("Error deleting item");
        } else {
            response.redirect("/");
        }
    });
});

app.post('/update', (request, response) => {
    const { id } = request.body;
    const updateSql = `
        UPDATE items
        SET status = CASE
            WHEN status = 'open' THEN 'in progress'
            WHEN status = 'in progress' THEN 'finished'
            ELSE status
        END
        WHERE id = ?;
    `;
    connection.query(updateSql, [id], (err, results) => {
        if (err) {
            console.error(err);
            response.status(500).send("Error updating item");
        } else {
            response.redirect("/");
        }
    });
});

app.listen(port, () => {
    console.log(`ToDo app started on Port ${port}`);
});
