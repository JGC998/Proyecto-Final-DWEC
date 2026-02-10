const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;
const DATA_FILE = path.join(__dirname, 'albums.json');

app.use(cors());
app.use(express.json());

// Helper to read data
const readData = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading data:", err);
        return [];
    }
};

// Helper to write data
const writeData = (data) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Error writing data:", err);
    }
};

// GET all albums
app.get('/api/albums', (req, res) => {
    const albums = readData();
    res.json(albums);
});

// GET single album by ID
app.get('/api/albums/:id', (req, res) => {
    const albums = readData();
    const album = albums.find(a => a.id === parseInt(req.params.id));
    if (!album) return res.status(404).json({ message: 'Album not found' });
    res.json(album);
});

// POST new album
app.post('/api/albums', (req, res) => {
    const albums = readData();
    const newAlbum = {
        id: albums.length > 0 ? Math.max(...albums.map(a => a.id)) + 1 : 1,
        ...req.body,
        rating: 0,
        review: ""
    };
    albums.push(newAlbum);
    writeData(albums);
    res.status(201).json(newAlbum);
});

// PUT update album (rating/review)
app.put('/api/albums/:id', (req, res) => {
    const albums = readData();
    const index = albums.findIndex(a => a.id === parseInt(req.params.id));

    if (index === -1) return res.status(404).json({ message: 'Album not found' });

    // Update fields
    const album = albums[index];
    if (req.body.rating !== undefined) album.rating = req.body.rating;
    if (req.body.review !== undefined) album.review = req.body.review;

    writeData(albums);
    res.json(album);
});

app.listen(port, () => {
    console.log(`Music API running at http://localhost:${port}`);
});
