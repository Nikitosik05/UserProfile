const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')

require('dotenv').config()

const userRoutes = require('./routes/userRoutes')

const app = express()
app.use(express.json())
app.use(cors())


app.use("/api/users", userRoutes)

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true
}).then(() => {
    console.log('Monodb started!');
    app.listen(process.env.PORT, () => {
        console.log(`Server started at port ${process.env.PORT}!`);
    })

}).catch((e) => {
    console.log('MONGODB ERROR: ' + e);
})