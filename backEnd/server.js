const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware.js');
const connectDB = require('./config/db.js');
const cors = require('cors');
const path = require('path');


const port = process.env.PORT || 5000

connectDB()

const app = express()



app.use(
    cors (
        {
            origin: '*',
            Credential: true,
        }
    )
)
app.use('/images', express.static(path.join(__dirname, 'Images')));
app.use(express.json())
app.use(express.urlencoded({ extended : false }))

app.use( '/api/users' , require('./routes/usersRoutes'))



app.use(errorHandler)
app.listen(port , () => console.log(`Server listening on port ${port}`))