import Shelf from './components/Shelf'
import NavBar from './components/NavBar'
import SearchResults from './components/SearchResults'

import './App.css'
import { useState } from 'react'

function App() {

  const [searchResult, setSearchResult] = useState([])

  const searchBooks = async (search) => {
    const filter = search.filter
    const term = search.searchTerm
    try{
      if (filter == 'title'){
        const response = await fetch(`https://openlibrary.org/search.json?q=${term}`)
        let jsonData = await response.json()
        setSearchResult(jsonData.docs.slice(0,5))
      }
    }
    catch(error){
      console.log(error)
    }
  }

  const handleSearchBooks = async(search) => {
    searchBooks(search)
  }

  return(
    <>
      <NavBar onSearchBooks={handleSearchBooks}/>
      <div>
        <SearchResults searchData={searchResult}/>
        <Shelf shelfName='Library'/>
        <Shelf shelfName='Wishlist'/>
      </div>
    </>
  )
}

export default App
