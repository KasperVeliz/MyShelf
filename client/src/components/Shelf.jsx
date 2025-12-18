import Book from './Book.jsx'

import './Shelf.css'

function Rating(props){
    const rating = ['-', '-', '-', '-', '-']

    for(let i = -1; i < 4; i++){
        if(i<props.rating-1){
            rating[i] = '*'
        }
        else{
            rating[i] = '-'
        }
    }
    return<div className='Rating'>{rating}</div>
}

function RenderBooks(props){
    const books = props.data.map((item) => {
        return(
            <div className='book-container' key={item.id}>
                <Book bookName={item.book_data.title}
                    authorName={item.book_data.author_name[0]}
                    cover_edition_key={item.book_data.cover_edition_key}/>
                <div className='buttons'>
                    <button onClick={() => props.remove(item.id)}>Remove</button>
                    <button onClick={() => props.editRating(item.id)}>Rate</button>
                </div>
                <Rating rating={item.rating}/>
            </div>
        )
    })
    return <div className='shelf-container'>{books}</div>
}

function Shelf(props){
    if(props.books.length == 0){
        return(
        <>
            <div className='title-container'>
                <h3>{props.shelfName}</h3>
            </div>
                <div className='title-container'>
                <br></br>
                <br></br>
                <h4>Add some books</h4>
                <br></br>
                <br></br>
            </div>
        </>
        )
    }
    else{
        return(
        <>
            <div className='title-container'>
                <h3>{props.shelfName}</h3>
            </div>
            <RenderBooks data={props.books}/>
        </>
        )
    }
}

export default Shelf