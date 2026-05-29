
import React from 'react'
import { useRef } from 'react'

const Additems = ({newitem,setnewitem,handlesubmit}) => {

  const inputref=useRef();
  return (
    <div className="add-item-container">
        <form className="add-item-form" onClick={handlesubmit} >
          <label className="add-item-label">Add a New Item</label>
          <div className="add-item-input-group">
            <input 
              type="text"
              className="add-item-input"
              placeholder='What needs to be done?'
              required
              ref={inputref}
              value={newitem}
              onChange={(e)=> setnewitem(e.target.value)}
            />
            <button 
              type='submit' 
              className="add-item-btn"
              onClick={()=> inputref.current.focus()}
            >
              Add
            </button>
          </div>
        </form>
    </div>
  )
}

export default Additems