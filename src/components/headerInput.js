import React from 'react'

export const HeaderInput = ({ className, titleClassName, inputClassName, inputPlaceholder, title, onInputChange }) => {
    return (
        <div className={`${className ?? ""}`}>
            <h6 className={`${titleClassName ?? ""} theader-title `}>
                {title}
            </h6>
            <div className="mt-1" >
                <input
                    // onBlur={onInputChange}
                    onKeyDown={e => {
                        if (e.code.toLowerCase() === 'enter') {
                            onInputChange(e)
                        }
                    }} className={`${inputClassName ?? ""} py-1 px-2 `} placeholder={inputPlaceholder ?? ""} ></input>
            </div>
        </div>
    )
}
