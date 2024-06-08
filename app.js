const express = require('express');
const app = express();
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'myDB'
});

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

app.use(express.static('Connexion'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/loginpage.html');
  });
  
  app.use(express.urlencoded({ extended: false }));

  app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    const sql = `SELECT id, username FROM users WHERE username = '${username}' AND password = '${password}'`;
  
    db.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.send(`Bonjour ${result[0].username}`);
      } else {
        res.send('Nom d\'utilisateur ou mot de passe incorrect');
      }
    });
  });
  
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/inscription.html');
  });
  
  app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/inscription.html');
  });
  
  app.use(express.urlencoded({ extended: false }));

  app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    const sql = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;
  
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send('Inscription réussie !');
    });
  });
  

app.listen('3000', () => {
  console.log('Server started on port 3000');
});
