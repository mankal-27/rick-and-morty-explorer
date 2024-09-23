const express = require("express");
const axios = require("axios");
const router = express.Router();

//Get /api/characters
router.get('/', async(req, res) => {
    try {
        const response = await axios.get('https://rickandmortyapi.com/api/character', {
            params: req.query, // Forward query parameters for filtering , pagination
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error Fetching Characters' })
    }
})

//Get /api/characters/:id
router.get('/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error Fetching Character' });  
    }
});

module.exports = router;    