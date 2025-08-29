const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');  // PostgreSQL client

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());               // OK if needed
app.use(express.json());
app.use(express.static('public')); // serves frontend

app.use(bodyParser.json());

// PostgreSQL Connection Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Render provides this
  ssl: { rejectUnauthorized: false }
});

// ---------- CRUD Routes ---------- //

// CREATE Student
app.post('/api/students', async (req, res) => {
  const { firstname, lastname, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO students (firstname, lastname, email) VALUES ($1, $2, $3) RETURNING *',
      [firstname, lastname, email]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ All Students
app.get('/api/students', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ One Student
app.get('/api/students/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Student not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE Student
app.put('/api/students/:id', async (req, res) => {
  const { firstname, lastname, email } = req.body;
  try {
    const result = await pool.query(
      'UPDATE students SET firstname=$1, lastname=$2, email=$3 WHERE id=$4 RETURNING *',
      [firstname, lastname, email, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Student not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE Student
app.delete('/api/students/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM students WHERE id=$1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Student deleted', student: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
