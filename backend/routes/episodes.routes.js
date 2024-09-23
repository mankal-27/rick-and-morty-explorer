const express = require("express");
const axios = require("axios");
const router = express.Router();

//Get /api/episodes
router.get('/', async(req, res) => {
    try {
        const response = await axios.get('https://rickandmortyapi.com/api/episode', {
            params: req.query, // Forward query parameters for filtering , pagination
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error Fetching Episodes' })
    }
});

//Get /api/episodes/:id
router.get('/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error Fetching Episode' });  
    }
});

module.exports = router;