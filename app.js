import express from "express";
import bodyParser from "body-parser"; 
import tasks from './routes/task.js'
import connectDB from "./db/connect.js"; 
import 'dotenv/config'
import notFound from "./middleware/not-found.js";
import errorHandlerMw from "./middleware/errorHandler.js";

const app = new express()

const port = process.env.PORT || 3000

//middleware
app.use(express.static('./public'))
app.use(express.json())


app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandlerMw)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,() => {
            console.log(`Listening on port ${port}`);
        })
    } catch (err) {
        console.log(err);
    }
}

start()


