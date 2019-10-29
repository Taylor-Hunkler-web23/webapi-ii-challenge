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
  


  //returns posts with specified id

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then(post => {
            if (post.length){
            res.status(200).json(post);
            }else{
                res.status(404).json({message: "The post with the specified ID does not exist."})
            }
        })
        .catch(err => {
            console.log('error', err);
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})

  //returns comment with specified id

  router.get('/:id/comments', (req, res) => {
    const id = req.params.id;
    db.findCommentById(id)
        .then(comment => {
            if (comment.length){
            res.status(200).json(comment);
            }else{
                res.status(404).json({message: "The post with the specified ID does not exist."})
            }
        })
        .catch(err => {
            console.log('error', err);
            res.status(500).json({ error: "The comments information could not be retrieved." })
        })
})



module.exports = router;