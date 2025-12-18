import Book from './Book'
import './SearchResults.css'

function ResultList(props){
    const elements = props.data.map((book, index) => {
        return(
            <div className='result' key={index}>
                <Book bookName={book.title}
                    authorName={book.author_name[0]}
                    cover_edition_key={book.cover_edition_key}/>
                <div className='buttons'>
                    <button onClick={() => props.addToLibrary({book: book, shelf: 'main'})}>Library</button>
                    <button onClick={() => props.addToLibrary({book: book, shelf: 'wish'})}>Wishlist</button>
                </div>
            </div>
        )
    })
    return <div className='search-result-container'>{elements}</div>
}

function SearchResults (props) {
    const data = props.searchData
    console.log(data)
    if(data.length==0){
        return (<h2>Search using the bar above</h2>)
    }
    else{
        return(
            <>
                <h2>Search Results</h2>
                <ResultList data={data} addToLibrary={props.addToLibrary}/>
            </>
        )
    }
}
export default SearchResults