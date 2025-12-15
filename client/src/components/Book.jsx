import './Book.css'

function Book(props) {
    if(!props){
        return(
            <>
            <div className="book-container">
                PlaceHolder
            </div>
            </>
        )
    }
    else {
        return(
            <>
            <div className="book-container">
                {props.bookName}
            </div>
            </>
        )
    }
}

export default Book