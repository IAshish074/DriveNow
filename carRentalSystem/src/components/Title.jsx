import React from 'react'

const Title = ({ title, subTitle, align = "center" }) => {
  return (
    <div
      className={`
        flex flex-col justify-center items-center text-center
        ${align === "left" ? "md:items-start md:text-left" : ""}
      `}
    >
      <h1 className='font-semibold text-3xl md:text-4xl lg:text-5xl text-gray-900'>
        {title}
      </h1>

      <p className='text-sm md:text-base text-gray-500 mt-3 max-w-2xl'>
        {subTitle}
      </p>
    </div>
  )
}

export default Title
