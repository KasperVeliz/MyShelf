const Pool = require('pg').Pool
const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'myshelf',
    password: 'GRAdm1n',
    port: 5432,
})

const getLibrary = (req, res) => {
    pool.query("SELECT * FROM library WHERE shelf = $1", ['main'], (e, result) => {
        if (e){
            throw(e)
        }
        res.status(200).json(result.rows)
        
    })
}

const getWishlist = (req, res) => {
    pool.query('SELECT * FROM library WHERE shelf = $1', ['wish'], (e, result) => {
        if (e){
            throw(e)
        }
        res.status(200).json(result.rows)
    })
}

const getBook = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('SELECT * FROM library WHERE id = $1', [id], (e, result) => {
        if(e){
            throw(e)
        }
        res.status(200).json(result.rows)
    })
}

const createBook = (req, res) => {
    const bookData = req.body.book_data
    const shelf = req.body.shelf
    pool.query('INSERT INTO library (book_data, rating, shelf) VALUES ($1, 0, $2)', [bookData, shelf], (e, result) => {
        if (e){
            throw(e)
        }
        res.status(201).send(`Book added with ID: ${result.id}`)
    })
}

const updateRating = (req, res) => {
    const id = req.params.id
    const rating = req.body.rating

    pool.query('UPDATE library SET rating = $1 WHERE id = $2', [rating, id], (e, result) => {
        if (e){
            throw(e)
        }
        res.status(200).send(`Book ID: ${result.insertId} updated`)
    })
}

const updateShelf = (req, res) => {
    const id = req.params.id
    const shelf = req.body.shelf

    pool.query('UPDATE library SET shelf = $1 WHERE id = $2', [shelf, id], (e, result) => {
        if (e){
            throw(e)
        }
        res.status(200).send(`Book ID: ${result.insertId} updated`)
    })
}

const deleteBook = (req, res) => {
    const id = req.params.id

    pool.query('DELETE FROM library WHERE id = $1', [id], (e, result) => {
        if (e){
            throw(e)
        }
        res.status(200).send(`Book ID: ${id} deleted`)
    })
}

module.exports = {
    getLibrary,
    getWishlist,
    getBook,
    createBook,
    updateRating,
    updateShelf,
    deleteBook,
}