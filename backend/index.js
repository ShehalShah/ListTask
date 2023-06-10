const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());

const port = 4000;
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mine@2604',
  database: 'task',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

app.use(bodyParser.json());

app.get('/api/tasks', (req, res) => {
  connection.query('SELECT * FROM task', (error, results) => {
    if (error) {
      console.error('Error retrieving tasks: ' + error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

app.post('/api/tasks', (req, res) => {
  const { title, description, completed } = req.body;
  connection.query(
    'INSERT INTO task (title, description, completed) VALUES (?, ?, ?)',
    [title, description, completed],
    (error, result) => {
      if (error) {
        console.error('Error creating task: ' + error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json({ id: result.insertId });
      }
    }
  );
});

app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  connection.query(
    'UPDATE task SET title = ?, description = ?, completed = ? WHERE id = ?',
    [title, description, completed, id],
    (error) => {
      if (error) {
        console.error('Error updating task: ' + error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json({ message: 'Task updated successfully' });
      }
    }
  );
});

app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM task WHERE id = ?', [id], (error) => {
    if (error) {
      console.error('Error deleting task: ' + error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ message: 'Task deleted successfully' });
    }
  });
});

app.listen(port, () => {
  console.log('Server listening on port ' + port);
});
