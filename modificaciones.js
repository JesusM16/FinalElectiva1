const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

// Initialize database
db.serialize(() => {
    db.run('CREATE TABLE data (id INTEGER PRIMARY KEY, content TEXT)');
});

app.get('/api/data', (req, res) => {
    db.all('SELECT content FROM data', [], (err, rows) => {
        if (err) {
            res.status(500).send('Database error');
        } else {
            res.json(rows.map(row => row.content));
        }
    });
});

app.post('/api/data', (req, res) => {
    const { data } = req.body;
    if (data) {
        db.run('INSERT INTO data (content) VALUES (?)', [data], function (err) {
            if (err) {
                res.status(500).send('Database error');
            } else {
                res.status(201).send();
            }
        });
    } else {
        res.status(400).send('Invalid data');
    }
});
