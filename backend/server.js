const cors = require('cors')
const express = require('express');
const connectTomongo = require("./db")
const path = require('path')

// Connect to database
connectTomongo()

const app = express();
const PORT = 5000;

app.use(express.json())
app.use(cors())
app.use('/public', express.static(path.join(__dirname, 'public')))

// Availible Routes
app.use('/api/media', require("./routes/media"))

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})