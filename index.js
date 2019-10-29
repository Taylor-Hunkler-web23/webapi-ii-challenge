const express = require ('express');

const server = express();

server.use(express.json());


server.listen(8000, () => {
    console.log('\n*** Server Running on http://localhost:8000 ***\n');
  });
  