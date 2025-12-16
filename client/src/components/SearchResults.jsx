import Book from './Book'
import './SearchResults.css'

function SearchResults (props) {
    const data = props.searchData
    console.log(data)
    if(data.length==0){
        return (<></>)
    }
    else{
        return(
            <>
            <h2>Search Results</h2>
            <div className='search-result-container'>
                <div className='result'>
                    <Book bookName={data[0].title}
                          authorName={data[0].author_name[0]}
                          cover_edition_key={data[0].cover_edition_key}/>
                    <div className='buttons'>
                        <button>Library</button>
                        <button>Wishlist</button>
                    </div>
                </div>
                <div className='result'>
                    <Book bookName={data[1].title}
                          authorName={data[1].author_name[0]}
                          cover_edition_key={data[1].cover_edition_key}/>
                    <div className='buttons'>
                        <button>Library</button>
                        <button>Wishlist</button>
                    </div>
                </div>
                <div className='result'>
                    <Book bookName={data[2].title}
                          authorName={data[2].author_name[0]}
                          cover_edition_key={data[2].cover_edition_key}/>
                    <div className='buttons'>
                        <button>Library</button>
                        <button>Wishlist</button>
                    </div>
                </div>
                <div className='result'>
                    <Book bookName={data[3].title}
                          authorName={data[3].author_name[0]}
                          cover_edition_key={data[3].cover_edition_key}/>
                    <div className='buttons'>
                        <button>Library</button>
                        <button>Wishlist</button>
                    </div>                    
                </div>
                <div className='result'>
                    <Book bookName={data[4].title}
                          authorName={data[4].author_name[0]}
                          cover_edition_key={data[4].cover_edition_key}/>
                    <div className='buttons'>
                        <button>Library</button>
                        <button>Wishlist</button>
                    </div>                    
                </div>
            </div>
            </>
        )
    }
}
export default SearchResults