import React from 'react'

function BaseInput({type, labelText, name, value, placeholder, handleChange}) {
  type = type || "text";
  return (
    <div className="form-floating">
        <input className='form-control' type={type}
          name={name} id={name} placeholder={placeholder} 
          onChange={handleChange}
         />
        <label htmlFor={name}>{labelText}</label>
    </div>
  )
}

export default BaseInput 