import React, { forwardRef, useId } from 'react'

function SelectBtn(
    {
        options=[],
        label,
        className="",
        props
    }, ref
) {

    const id = useId();

    return (
        <div className="w-full">
            {label && <label htmlFor={id}>{label}</label>}
            <select 
                name="" 
                id={id} 
                {...props} 
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            >
                {options?.map((option, idx) =>( 
                        <option key={idx} value={option}>{option}</option>
                    )
                )}

            </select>
        </div>
    )
}

export default forwardRef(SelectBtn);