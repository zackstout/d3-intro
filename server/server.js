
const express = require('express');
const app = express();

app.use(express.static('server/public'));

const port = 4777;

app.listen(port, () => console.log('listening on port ' + port));
