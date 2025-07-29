const express = require('express');
const EmailController = require('./controllers/EmailController');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.post("/email", (req, res) => {
  EmailController.sendContact(req, res);
});


