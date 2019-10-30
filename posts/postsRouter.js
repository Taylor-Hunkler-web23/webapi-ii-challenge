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
            if (post.length) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
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
    db.findPostComments(id)
        .then(comment => {
            if (comment.length) {
                res.status(200).json(comment);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            console.log('error', err);
            res.status(500).json({ error: "The comments information could not be retrieved." })
        })
})



//post

router.post('/', (req, res) => {

    const { title, contents } = req.body;
    if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        db.insert(req.body)
            .then(user => db.findById(user.id))
            .then(user => {
                res.status(201).json(user);
            })
            .catch(err => {
                console.log('error', err);
                res.status(500).json({ error: "There was an error while saving the post to the database" })
            })
    }
})



//post comments

router.post('/:id/comments', (req, res) => {
    const id= req.params.id;

    const { text, post_id } = req.body;
    if (!text) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        db.insertComment(req.body)

            .then(comment => {
                res.status(201).json(comment);
            })
            .catch(err => {
                console.log('error', err);
                res.status(500).json({ error: "There was an error while saving the post to the database" })
            })
    }
})



//put
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { title, contents } = req.body;


    if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    } else {

        db.update(id, req.body)
        
            .then(user => {
                if (user) {
                    res.status(200).json(user);
                } else {
                    res.status(404).json({ message: "The user with the specified ID does not exist." });
                }

            })
            .catch(err => {
                console.log('error', err);
                res.status(404).json({ error: "The user could not be removed" })
            })
    }
});


//delete
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)

        .then(removed => {
            if (removed) {
                res.status(200).json({ message: 'Deleted' });

            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }

        })
        .catch(err => {
            console.log('error', err);
            res.status(404).json({ error: "The post could not be removed" })
        })
})



module.exports = router;