import './Book.css'

function Book({ cover_edition_key, bookName, authorName }) {
    const hasCover = Boolean(cover_edition_key)
    const coverURL = hasCover ? `https://covers.openlibrary.org/b/olid/${cover_edition_key}-M.jpg` : null

    if (!hasCover) {
        return (
            <div className="book-container placeholder">
                <span className="title">{bookName || 'Untitled'}</span>
                <span className="author">{authorName || 'Unknown author'}</span>
            </div>
        )
    }

    return (
        <>
        <div className="book-container">
            <img
                className="cover"
                src={coverURL}
                alt={`${bookName || 'book'} cover`}
                // crossOrigin="anonymous" // only enable if you need to access image data and the server sets CORS headers
                onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
        </div>
        <div className="meta">
            <span className="title">{bookName}</span>
            <br></br>
            <span className="author">{authorName}</span>
        </div>
        </>
    )
}

export default Book