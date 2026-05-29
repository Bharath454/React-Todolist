import React from 'react'
import { MdDelete } from "react-icons/md";

const listitem = ({name,handlechange,handledelete}) => {
  return (
    <div className="todo-list-container">
      <ul className="todo-list">
        {name.map((item) => (
          <li className={`todo-item ${item.checked ? 'checked' : ''}`} key={item.id}>
            <div className="todo-item-left">
              <input
                type="checkbox"
                className="todo-checkbox"
                onChange={() => handlechange(item.id)}
                checked={item.checked}
              />
              <label 
                className="todo-label"
                onDoubleClick={() => handlechange(item.id)}
              >
                {item.item}
              </label>
            </div>
            <button 
              className="todo-delete-btn" 
              onClick={() => handledelete(item.id)}
              aria-label={`Delete ${item.item}`}
            >
              <MdDelete />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default listitem
