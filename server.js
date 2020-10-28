const express = require('express')
require('dotenv').config();
const mongoose = require('mongoose')
const app = express();
const port = process.env.PORT;
const db_uri = process.env.DB_URI

mongoose.connect(db_uri , { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Connected to Database"))

//Middleware to accept JSON
app.use(express.json());

//Routes
const notesRouter = require('./routes/notes')
app.use('/notes', notesRouter)

app.listen(port, () => {
    console.log(`Server running at port: ${port}`);
})