import React, { useEffect, useState } from 'react'
import './Pagination.css';

function Pagination({allProducts, productPerPage, pagination, currentPage}) {

  const pageNumbers = []

  for(let i = 1 ; i<=Math.ceil(allProducts/productPerPage); i++){
    pageNumbers.push(i)
  }
  
  return (
    <nav className='pagination-container'>
        {currentPage === 1 ? 
        <button className='opacity-30' disabled>Prev</button> : 
        currentPage > 1 && <button onClick={()=>pagination(currentPage - 1)}>Prev</button>
      }
        {pageNumbers && pageNumbers.map(number => (
          <button onClick={()=>pagination(number)} className={currentPage === number ? 'active' : ""} key={number}>{number}</button>
        ))}
        {currentPage === pageNumbers.length ? 
        <button className='opacity-30' disabled>Next</button> : currentPage <= pageNumbers.length - 1 && <button onClick={()=>pagination(currentPage + 1)}>Next</button>  
      }
    </nav>
  )
}

export default Pagination