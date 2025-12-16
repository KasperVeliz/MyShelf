import Shelf from './components/Shelf'
import NavBar from './components/NavBar'

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
        console.log(searchResult)
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
        <p>Your personal librarian</p>
        <Shelf shelfName='Library'/>
        <Shelf shelfName='Wishlist'/>
      </div>
      
    </>
  )
}

export default App
