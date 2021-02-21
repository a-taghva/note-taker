const router = require('express').Router();
const path = require('path');

const notes = require('../../db/db.json');

router.get('/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

router.post('/notes', (req, res) => {

});

module.exports = router;