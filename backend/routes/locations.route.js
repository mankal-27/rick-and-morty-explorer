const express = require("express");
const router = express.Router();
const axios = require("axios");

//Get /api/locations
router.get('/', async(req, res) => {
    try {
        const response = await axios.get('https://rickandmortyapi.com/api/location', {
            params: req.query, // Forward query parameters for filtering , pagination
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error Fetching Locations' })
    }
});

//Get /api/locations/:id
router.get('/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`https://rickandmortyapi.com/api/location/${id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error Fetching Location' });  
    }
});

module.exports = router;