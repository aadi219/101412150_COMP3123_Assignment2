import React from 'react'

function BaseInput({type, labelText, name, placeholder, handleChange}) {
  type = type || "text";
  return (
    <div className="">
      <input type={type} placeholder={placeholder} name={name} id={name} onChange={handleChange}
        className="input input-bordered w-full" />
    </div>
  )
}

export default BaseInput 