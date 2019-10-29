const router = require('express').Router();


const db = require('../data/db.js')




router.get('/', (req, res) => {
    db.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'The posts information could not be retrieved.',
      });
    });
  });
  


module.exports = router;