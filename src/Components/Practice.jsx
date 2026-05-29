import React, { useState } from 'react'
import Drilling from '../Components/Drilling'


const Practice = ({name,setName,handlechange,handledelete}) => {

    

    return (
        <div>
         {(name.length)?(
            <Drilling
              name={name}
      setName={setName}
      handlechange={handlechange}
      handledelete={handledelete}
            />
         )
            :(
                <p>Your list is empty</p>
            )
            }
         
        </div>
    )
}

export default Practice
