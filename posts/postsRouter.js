const router = require('express').Router();

// const Posts = require('./')

router.get('/', (req, res) => {
res.send('response from posts');
});



module.exports = router;