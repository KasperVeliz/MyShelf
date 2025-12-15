import Shelf from './components/Shelf'
import NavBar from './components/NavBar'

import './App.css'

function App() {
  return(
    <>
      <NavBar />
      <h1>My Shelf</h1>
      <p>Your personal librarian</p>
      <Shelf shelfName='Library'/>
      <Shelf shelfName='Wishlist'/>
    </>
  )
}

export default App
