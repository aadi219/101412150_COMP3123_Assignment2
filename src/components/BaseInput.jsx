import React from 'react'

function BaseInput({type, labelText, value, name, placeholder, handleChange, readonly, className}) {
  type = type || "text";
  readonly = readonly || false;
  return (
    <div className={className + ""}>
      <input type={type} placeholder={placeholder} name={name} id={name} onChange={handleChange}
        value={value} readOnly={readonly}
        className="input input-bordered w-full" />
    </div>
  )
}

export default BaseInput 