const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 30,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
    },
    favorites:{
        characters: [Number], // Storing Character ID
        locations: [Number], // Storing Location ID
        episodes: [Number] // Storing Episode ID
    }
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema)