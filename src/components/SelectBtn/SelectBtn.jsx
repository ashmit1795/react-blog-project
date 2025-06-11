import React, { forwardRef, useId } from 'react'

function SelectBtn(
    {
        options=[],
        label,
        className="",
        ...props
    }, ref
) {

    const id = useId();

    return (
        <div className="w-full">
            {label && <label className="inline-block mt-1 mb-1 pl-1 text-gray-700 font-medium text-base tracking-wide cursor-pointer transition-colors duration-200 hover:text-indigo-600" htmlFor={id}>{label}</label>}
            <select 
                name="" 
                id={id} 
                {...props} 
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 border border-gray-300 w-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 hover:border-indigo-400 transition-colors duration-200 ${className}`}
            >
                {options?.map((option, idx) =>( 
                        <option key={idx} value={option}>{option.toUpperCase()}</option>
                    )
                )}

            </select>
        </div>
    )
}

export default forwardRef(SelectBtn);