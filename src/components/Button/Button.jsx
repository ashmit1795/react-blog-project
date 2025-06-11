import React, { forwardRef } from 'react'

function Button(
    {
        text, 
        type="button",
        bgColor="bg-blue-600",
        textColor="text-white",
        className="",
        ...props
    },
    ref
) {
  return (
    <button ref={ref} type={type} className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
        {text}
    </button>
  )
}

export default forwardRef(Button);