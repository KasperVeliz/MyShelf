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

  const putRating = async (id) => {
    try{
      let newRating = prompt('Enter new rating 0 - 5 stars:')

      if ((Number.isInteger(parseInt(newRating, 10))) && (newRating >= 0) && (newRating <= 5)){
        const response = await fetch(`/library/rating/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({id: id, rating: newRating})
        })
        console.log(response)
      }
      else{
        alert('Invalid Rating')
      }
    }
    catch(e){
      console.log(e)
    }
    await fetchMain()
    await fetchWish()
  }

  const putList = async (id) => {
    try{
      const response = await fetch(`/library/${id}`)
      const jsonData = await response.json()
      const currList = jsonData[0].shelf

      if (currList == 'main'){
        //switch main to wish
        const res = await fetch(`/library/shelf/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({id: id, shelf: 'wish'})
        })
        console.log(response)
      }
      else{
        //switch wish to main
        const res = await fetch(`/library/shelf/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({id: id, shelf: 'main'})
        })
        console.log(response)
      }
    }
    catch(e){
      console.log(e)
    }
    await fetchMain()
    await fetchWish()
  }

  const removeBook = async (id) => {
    try{
      const response = await fetch(`/library/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        console.log(`Deleted book with id: ${id}`)
      }
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
        <Shelf shelfName='Library' books={mainLib} editList={putList} editRating={putRating} remove={removeBook}/>
        <Shelf shelfName='Wishlist' books={wish} editList={putList} editRating={putRating} remove={removeBook}/>
      </div>
    </>
  )
}

export default App
