const express = require('express');
const app = express();
const port = 3000;

let dataStore = [];

app.use(express.json());
app.use(express.static('public'));

// API routes
app.get('/api/data', (req, res) => {
    res.json(dataStore);
});

app.post('/api/data', (req, res) => {
    const { data } = req.body;
    if (data) {
        dataStore.push(data);
        res.status(201).send();
    } else {
        res.status(400).send('Invalid data');
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
