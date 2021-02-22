const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const notes = require('../../db/db.json');

const deleteNote = (id, notes) => {
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].id === id.id) {
            notes.splice(i, 1);
            break;
        }
    };
    console.log(notes);
    fs.writeFileSync(
        path.join(__dirname, "../../db/db.json"),
        JSON.stringify(notes, null, 2)
    );
}

const createNewNote = (note, notes) => {
    note.id = uuidv4();
    notes.push(note);
    fs.writeFileSync(
        path.join(__dirname, "../../db/db.json"),
        JSON.stringify(notes, null, 2)
    );

    return note;
};

const getObjSize = obj => {
    let size = 0;
    for (key in obj) {
        size++;
    };
    return size;
};

const validateNote = note => {
    const size = getObjSize(note);
    if (size === 2 && note.title && note.text) {
        return true;
    }

    return false;
};

router.get('/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

router.post('/notes', (req, res) => {
    const body = req.body;
    if (validateNote(body)) {
        const note = createNewNote(body, notes);
        res.json(note);
    } else {
        res.status(400).send('Note is not properly formatted!!');
    }
});

router.delete('/notes/:id', (req, res) => {
    const noteID = req.params;
    deleteNote(noteID, notes);
    res.send('Deleted');
});

module.exports = router;