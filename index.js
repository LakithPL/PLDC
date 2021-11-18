import express from 'express'
import 'dotenv/config'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

//Importing routes from the routes folder
import postRouter from './routes/post.js'
import coviddataRouter from './routes/covidData.js'

//Create Mongo DB Connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log("Database Connected"))

//Crete a Express application
const app = express()

const PORT = process.env.PORT || 5000

//Setting body parser to get access of request.body
app.use(bodyParser.json())

//Home View
app.get('/', (req, res) => {
    res.send("PLDC REST API");
})

//Setting the route to the app as middlewares
app.use('/posts', postRouter)
app.use('/covid', coviddataRouter)


app.listen(PORT, () => console.log(`Server started at port ${PORT}`))