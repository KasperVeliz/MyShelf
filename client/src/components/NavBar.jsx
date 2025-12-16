import { useState } from 'react'

import './NavBar.css'

function NavBar(props){

    const [searchTerm, setSearchTerm] = useState('')
    const [filter, setFilter] = useState('title')

    const handleInput = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleFilter = (event) => {
        setFilter(event.target.value)
    }

    return(
        <div className='nav-bar'>
            <h1>My Shelf</h1>
            
            <div className='search-bar-container'>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    props.onSearchBooks({filter,searchTerm})
                }}>
                    <select name='options' id='searchBy' onChange={handleFilter}>
                        <option value='title'>Title</option>
                        <option value='author'>Author</option>
                    </select>
                    <input className='search-bar' type='text' id='search-term' value={searchTerm} onChange={handleInput} placeholder='Search'/>
                    <input id='submit' type='submit' value='Search'/>
                </form>
            </div>
        </div>
    )
}

export default NavBar