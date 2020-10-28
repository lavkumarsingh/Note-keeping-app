const express = require('express')
const router = express.Router()
const Note = require('../models/note')

// Getting all
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find()
        res.json(notes)
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting one 
router.get('/:id', getNotes, (req, res) => {
    res.send(res.note.title)
})

// Creating one
router.post('/', async(req, res) => {
    const note = new Note({ 
        title: req.body.title,
        content: req.body.content,
    })
    try {
        const newNote = await note.save();
        res.status(201).json(newNote)
    } catch(err) {
        res.status(400).json({ message: err.message })
    } 
})

// Updating one
router.patch('/:id', getNotes, async(req, res) => {
    if(req.body.title != null) {
        res.note.title =  req.body.title
    }
    if(req.body.content != null) {
        res.note.content = req.body.content
    }
    try {
        const upDatedNote = await res.note.save()
        res.status(200).json(upDatedNote);
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleteing one
router.delete('/:id', getNotes, async(req, res) => {
    try{
        await res.note.remove();
        res.json({ message: "Note deletes! "})
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})


async function getNotes(req, res, next) {
    let note
    try {
        note = await Note.findById(req.params.id)
        if(note == null) {
            return res.status(400).json({ message: "Cannot find the user!"})
        }
    } catch(err) {
        return res.status(500).json({ message: err.message })
    }

    res.note = note;
    next()
} 

module.exports = router;