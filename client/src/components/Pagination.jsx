import React from 'react'

function Pagination({allProducts, productPerPage, pagination, currentPage}) {

  const pageNumbers = []

  for(let i = 1 ; i<=Math.ceil(allProducts/productPerPage); i++){
    pageNumbers.push(i)
  }

  return (
    <nav>
      <div className='flex flex-row justify-center items-center w-full h-full list-none'>
        {currentPage === 1 ? 
        <button disabled className='w-7 h-7 flex justify-center items-center bg-gray-600 text-white rounded-full'>&lt;</button> : 
        currentPage > 1 && <button className='w-7 h-7 flex justify-center items-center bg-black text-white rounded-full' onClick={()=>pagination(currentPage - 1)}>&lt;</button>
      }
        {pageNumbers && pageNumbers.map(number => (
          <button onClick={()=>pagination(number)} key={number}>{number}</button>
        ))}
        {currentPage === pageNumbers.length ? 
        <button disabled className='w-7 h-7 flex justify-center items-center bg-gray-600 text-white rounded-full' >&gt;</button> : currentPage <= pageNumbers.length - 1 && <button className='w-7 h-7 flex justify-center items-center bg-black text-white rounded-full' onClick={()=>pagination(currentPage + 1)}>&gt;</button>  
      }
      </div>
    </nav>
  )
}

export default Pagination