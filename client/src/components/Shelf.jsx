import Book from './Book.jsx'

import './Shelf.css'

function Shelf(props){
    return(
        <>
        <div className='title-container'>
            {props.shelfName}
        </div>
        <div className="shelf-container">

            <Book bookName='Little Red Ridinghood'/>

            <div className="book-container">
                PlaceHolder
            </div>

            <div className="book-container">
                PlaceHolder
            </div>

            <div className="book-container">
                PlaceHolder
            </div>

        </div>
        </>
    )
}

export default Shelf