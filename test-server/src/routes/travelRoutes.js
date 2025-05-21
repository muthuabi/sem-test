const express = require("express");
const router = express.Router();
const Travel = require("../models/Travel");

// Create a new travel entry
router.post("/", async (req, res) => {
    try {
        const { place, city, name } = req.body;
        const travel = new Travel({ place, city, name });
        await travel.save();
        res.status(201).json({ success: true, data: travel, message: "Travel entry created", err: null });
    } catch (err) {
        res.status(400).json({ success: false, message: "Error", err });
    }
});

// Get all travel entries
router.get("/", async (req, res) => {
    try {
        const travels = await Travel.find();
        res.status(200).json({ success: true, data: travels, message: "Data fetched", err: null });
    } catch (err) {
        res.status(400).json({ success: false, message: "Error", err });
    }
});

// Get a travel entry by ID
router.get("/:id", async (req, res) => {
    try {
        const travel = await Travel.findById(req.params.id);
        if (!travel) {
            return res.status(404).json({ success: false, message: "Travel not found", err: "Not found" });
        }
        res.status(200).json({ success: true, data: travel, message: "Data fetched", err: null });
    } catch (err) {
        res.status(400).json({ success: false, message: "Error", err });
    }
});

// Update a travel entry by ID
router.put("/:id", async (req, res) => {
    try {
        const { place, city, name } = req.body;
        const travel = await Travel.findByIdAndUpdate(
            req.params.id,
            { place, city, name },
            { new: true }
        );
        if (!travel) {
            return res.status(404).json({ success: false, message: "Travel not found", err: "Not found" });
        }
        res.status(200).json({ success: true, data: travel, message: "Travel updated", err: null });
    } catch (err) {
        res.status(400).json({ success: false, message: "Error", err });
    }
});

// Delete a travel entry by ID
router.delete("/:id", async (req, res) => {
    try {
        const travel = await Travel.findByIdAndDelete(req.params.id);
        if (!travel) {
            return res.status(404).json({ success: false, message: "Travel not found", err: "Not found" });
        }
        res.status(200).json({ success: true, message: "Travel deleted" });
    } catch (err) {
        res.status(400).json({ success: false, message: "Error", err });
    }
});

module.exports = router;
