const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const port = 3000

const db = require('./queries')

app.use(express.static(path.resolve(__dirname, '../client/dist')))

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true,}))

app.get('/', (req, res) => {
    res.sendFile(express.static(path.resolve(__dirname, '../client/dist', 'index.html')))
})

app.get('/library/main', db.getLibrary)
app.get('/library/wish', db.getWishlist)
app.get('/library/:id', db.getBook)
app.post('/library', db.createBook)
app.put('/library/shelf/:id', db.updateShelf)
app.put('/library/rating/:id', db.updateRating)
app.delete('/library/:id', db.deleteBook)

app.listen(port, '0.0.0.0', () => {
    console.log(`App running:\nhttp://localhost:${port}/`)
})