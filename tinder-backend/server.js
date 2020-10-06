import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import Cards from './dbCards.js';

// app config
const app = express();
const port = process.env.PORT || 8000;
dotenv.config()

// middlewares
app.use(express.json())
app.use(cors())

// DB config
const conn = process.env.CONN_URL;
// const conn = process.env.CONN_URL;

mongoose.connect(conn,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

// api endpoints
app.get('/', (req, res)=> res.status(200).send('hello guys'));

app.post('/tinder/card', (req, res)=> {
    const dbCards = req.body;

    Cards.create(dbCards, (err,data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
});

app.get('/tinder/card', (req, res)=> {

    Cards.find((err,data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
});


// listen
app.listen(port, ()=>console.log(`listening on localhost: ${port} ${conn}`))
