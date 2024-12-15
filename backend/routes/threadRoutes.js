const express = require('express');
const router = express.Router();
const Thread = require('../models/Thread');

// Create Thread
router.post('/', async (req, res) => {
    const { title, content, author } = req.body;
    try {
        const newThread = await Thread.create({ title, content, author });
        res.status(201).json(newThread);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get All Threads
router.get('/', async (req, res) => {
    try {
        const threads = await Thread.find().populate('author', 'username');
        res.status(200).json(threads);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add Reply
router.post('/:id/reply', async (req, res) => {
    const { id } = req.params;
    const { content, author } = req.body;
    try {
        const thread = await Thread.findById(id);
        thread.replies.push({ content, author });
        await thread.save();
        res.status(201).json(thread);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
