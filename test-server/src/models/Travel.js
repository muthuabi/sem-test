const mongoose = require("mongoose");

const travelSchema = new mongoose.Schema({
    place: {
        type: String,
        required: [true, "Place is required"],
        trim: true
    },
    city: {
        type: String,
        required: [true, "City is required"],
        trim: true
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    }
}, { timestamps: true });

const Travel = mongoose.model("Travel", travelSchema);
module.exports = Travel;
