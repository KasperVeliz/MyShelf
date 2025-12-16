import Book from './Book.jsx'

import './Shelf.css'

function Shelf(props){
    return(
        <>
        <div className='title-container'>
            {props.shelfName}
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