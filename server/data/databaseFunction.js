import express from 'express';
import sqlite3 from 'sqlite3';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';
import axios from 'axios';

// Set up SQLite database path
const __filename = fileURLToPath(import.meta.url);  // Get the current file's path
const __dirname = dirname(__filename);  // Get the directory name

const dbPath = join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to SQLite database at', dbPath);
  }
});

// Initialize Express application
const app = express();


app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Create table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS projects (
    PN INTEGER PRIMARY KEY AUTOINCREMENT,
    projectName TEXT,
    companyName TEXT,
    officeName TEXT,
    modeOfProcurement TEXT,
    dateOrdered TEXT NULL,
    dateOrderedNum TEXT,
    cost NUMERIC(5,2),
    dateDelivered TEXT NULL,
    dateDeliveredNum TEXT,
    pdCost NUMERIC(5,2)
  )
`);

// Route to fetch all projects
app.get('/projects', (req, res) => {
  db.all('SELECT * FROM projects', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Route to add a new project
app.post('/projects', (req, res) => {
  const { projectName, companyName, officeName, modeOfProcurement, dateOrdered, dateOrderedNum, cost, dateDelivered, dateDeliveredNum, pdCost } = req.body;

  const query = `
    INSERT INTO projects (projectName, companyName, officeName, modeOfProcurement, dateOrdered, dateOrderedNum, cost, dateDelivered, dateDeliveredNum, pdCost)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  // console.log("BACKEND SIDE HERE")
  db.run(query, [projectName, companyName, officeName, modeOfProcurement, dateOrdered, dateOrderedNum, cost, dateDelivered, dateDeliveredNum, pdCost], function (err) {
    if (err) {
      console.log(dateOrdered)
      console.log(dateDelivered)
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'Project added successfully', id: this.lastID });
    }
  });
});

// Route to update a project by PN
app.put('/projects/:id', (req, res) => {
  const id = req.params.id;
  const { projectName, companyName, officeName, modeOfProcurement, dateOrdered, dateOrderedNum, cost, dateDelivered, dateDeliveredNum, pdCost } = req.body;

  const query = `
    UPDATE projects SET projectName = ?, companyName = ?, officeName = ?, modeOfProcurement = ?, dateOrdered = ?, dateOrderedNum = ?, cost = ?, dateDelivered = ?, dateDeliveredNum = ?, pdCost = ?
    WHERE PN = ?
  `;

  db.run(query, [projectName, companyName, officeName, modeOfProcurement, dateOrdered, dateOrderedNum, cost, dateDelivered, dateDeliveredNum, pdCost, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Project updated' });
    }
  });
});

// Route to delete a project by PN
app.delete('/projects/:id', (req, res) => {
  const id = req.params.id;
  console.log('Backend received ID:', id);
  db.run('DELETE FROM projects WHERE PN = ?', [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Project deleted' });
    }
  });
});

app.delete('/projects', (req, res) => {
  
  
  db.run('DELETE FROM projects', function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      // Reset the auto-increment counter for the "projects" table
      db.run("UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='projects'", function(err) {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          console.log('Backend received request to delete all projectsI should Be up');
          res.json({ message: 'All projects deleted and auto-increment reset' });
        }
      });
    }
  });
});


app.post('/projects/all', (req, res) => {
  const projects = req.body; // Expecting an array of projects
  
  const query = `
    INSERT INTO projects (projectName, companyName, officeName, modeOfProcurement, dateOrdered, dateOrderedNum, cost, dateDelivered, dateDeliveredNum, pdCost)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const insertPromises = projects.map(project => {
    return new Promise((resolve, reject) => {
      db.run(query, [
        project.projectName,
        project.companyName,
        project.officeName,
        project.modeOfProcurement,
        project.dateOrdered,
        project.dateOrderedNum,
        project.cost,
        project.dateDelivered,
        project.dateDeliveredNum,
        project.pdCost
      ], function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      });
    });
  });

  Promise.all(insertPromises)
    .then(results => res.json({ message: 'Projects added', results }))
    .catch(error => res.status(500).json({ error: error.message }));
  console.log("Added all projects I should be down")
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

