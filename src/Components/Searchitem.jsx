import React from 'react'

const Searchitem = ({search,setSearch}) => {
  return (
    <div className="search-container">
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <label className="search-label">Search Items</label>
        <input 
          type="text"
          className="search-input"
          placeholder='Filter items...'
          value={search}
          onChange={(e)=> setSearch(e.target.value)}
        />
      </form>
    </div>
  )
}

export default Searchitem