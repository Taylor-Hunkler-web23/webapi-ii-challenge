const express = require ('express');
const postRouter = require('./posts/postsRouter.js')
const server = express();

server.use(express.json());

server.use('/api/posts', postRouter);

server.listen(8000, () => {
    console.log('\n*** Server Running on http://localhost:8000 ***\n');
  });
  