import  express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


console.log(__dirname + '/www');

const PORT = process.env.PORT || 3030;

// Express app
var app = express();
// Use public directory
app.use(express.static(path.join(__dirname, "www")));


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "www","index.html"));
});

// Start server
let server = app.listen(PORT, () => {
    console.log('Control Energia,puerto %d', server.address().port);
});