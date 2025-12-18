import Shelf from './components/Shelf'
import NavBar from './components/NavBar'
import SearchResults from './components/SearchResults'

import './App.css'
import { useState } from 'react'
import { useEffect } from 'react'

function App() {
  const [searchResult, setSearchResult] = useState([])
  const [mainLib, setMain] = useState([])
  const [wish, setWish] = useState([])

  const searchBooks = async (search) => {
    const filter = search.filter
    const term = search.searchTerm
    try{
      if (filter == 'title'){
        const response = await fetch(`https://openlibrary.org/search.json?q=${term}`)
        let jsonData = await response.json()
        setSearchResult(jsonData.docs.slice(0,5))
      }
      else if (filter == 'author'){
        const response = await fetch(`https://openlibrary.org/search/authors.json?q=${term}`)
        let jsonData = await response.json()
        jsonData = jsonData.docs[0].key
        const res = await fetch(`https://openlibrary.org/search.json?q=${jsonData}`)
        jsonData = await res.json()
        setSearchResult(jsonData.docs.slice(0,5))
        console.log(searchResult)
      }
    }
    catch(error){
      console.log(error)
    }
  }

  const fetchMain = async () => {
    try{
      const response = await fetch('/library/main')
      const jsonData = await response.json()
      setMain(jsonData)
      console.log(mainLib)
    }
    catch(e){
      console.log(e)
    }
  }

  const fetchWish = async () => {
    try{
      const response = await fetch('/library/wish')
      const jsonData = await response.json()
      setWish(jsonData)
      console.log(wish)
    }
    catch(e){
      console.log(e)
    }
  }

  const postBook = async (params) => {
    try{
      const book_data = params.book
      const shelf = params.shelf

      const response = await fetch('/library', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({book_data: book_data, shelf: shelf})
      })
      console.log(response)
    }
    catch(error){
      console.log(error)
    }
    await fetchMain()
    await fetchWish()
  }

  useEffect(() => {
    fetchMain()
    fetchWish()
  }, [])

  return(
    <>
      <NavBar onSearchBooks={searchBooks}/>
      <div>
        <SearchResults searchData={searchResult} addToLibrary={postBook} />
        <Shelf shelfName='Library' books={mainLib}/>
        <Shelf shelfName='Wishlist' books={wish}/>
      </div>
    </>
  )
}

export default App
