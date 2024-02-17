require('dotenv').config() 

const express = require('express') 
const mongoose = require('mongoose')
const cors = require('cors')
const workoutRoutes = require('./routes/workout')
const userRoutes = require('./routes/user')


const app = express() 

app.use(cors())

// Middleware 
app.use(express.json())
app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
app.use('/api/workouts',workoutRoutes)
app.use('/user',userRoutes)


mongoose.connect(process.env.MONGO_URI) 
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Database Connected and Its working on", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

