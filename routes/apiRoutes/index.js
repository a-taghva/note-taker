const router = require('express').Router();
const path = require('path');
const fs = require('fs');

const notes = require('../../db/db.json');

const createNewNote = (note, notes) => {
    notes.push(note);
    fs.writeFileSync(
        path.join(__dirname, "../../db/db.json"),
        JSON.stringify(notes, null, 2)
    );

    return note;
};

router.get('/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

router.post('/notes', (req, res) => {
    const note = createNewNote(req.body, notes);
    res.json(note);
});

module.exports = router;