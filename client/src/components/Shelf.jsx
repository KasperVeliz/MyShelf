import Book from './Book.jsx'

import './Shelf.css'

function Shelf(props){
    return(
        <>
        <div className='title-container'>
            <h3>{props.shelfName}</h3>
        </div>
        <div className="shelf-container">

            <Book />
            <Book />
            <Book />

        </div>
        </>
    )
}

export default Shelf