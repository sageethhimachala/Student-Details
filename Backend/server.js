import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ILMS",
    database: "crud"
})

// Check MySQL connection
{/*
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});
*/}

app.get('/', (req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.get('/read/:id', (req, res) => {
    const sql = "SELECT * FROM student WHERE id = ?";
    const id = req.params.id;
    
    db.query(sql, [id], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.post('/create', (req, res) => {
    const { id, name, email } = req.body;

    if (id) {
        const sql = `UPDATE student SET name = ? , email = ? WHERE id = ?`;
        db.query(sql, [name, email, id], (err, result) => {
        if(err) return res.json({Message: "Error inserting data into database"});
        return res.json({ Message: "Data successfully updated", data: result });
    })
    } else {
        const sql = "INSERT INTO student (name, email) VALUES (?, ?)";
        db.query(sql, [name, email], (err, result) => {
        if(err) return res.json({Message: "Error inserting data into database"});
        return res.json({ Message: "Student successfully created", data: result });
    })
    }
})

app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM student WHERE id = ?";
    const id = req.params.id;
    
    db.query(sql, [id], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.listen(8081, () => {
    console.log("Listening")
})