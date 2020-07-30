const express = require('express');

const router = express.Router();


router.get('/', (req, res, next) => {
    console.log('Get Request in Teacher');
    res.json({message: 'Working Route'});
});

module.exports = router;