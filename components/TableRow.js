import React from 'react';

const TableRow = (props) => {
  const displayFoam = props.MinoxidilFoamPrice? `$${props.MinoxidilFoamPrice}`: 'N/A';
  const displaySolution = props.MinoxidilSolutionPrice? `$${props.MinoxidilSolutionPrice}`: 'N/A';
  const displayFin = props.FinasteridePrice? `$${props.FinasteridePrice}`: 'N/A';


  return (
    <div className="w-full md:w-4/5 lg:w-[1400px] h-auto transform md:scale-100 sm:scale-60 m-4 md:m-14 pt-4 sm:pt-0">
      <div className="flex flex-row justify-between items-center px-4 md:px-0 pb-4 mb-10">
        <img src={props.imageurl} className="w-24 md:w-[150px] h-16 md:h-[60px] object-contain mb-4 sm:mb-0" alt={props.brand} />
        <a className="text-center text-xl md:text-4xl text-blue-500 productpricelink mb-4 sm:mb-0" href={props.MinoxidilFoamLink}>{displayFoam}</a>
        <a className="text-center text-xl md:text-4xl text-blue-500 productpricelink mb-4 sm:mb-0" href={props.MinoxidilSolutionLink}>{displaySolution}</a>
        <a className="text-center text-xl md:text-4xl text-blue-500 productpricelink mb-4 sm:mb-0" href={props.FinasterideLink}>{displayFin}</a>
      </div>
      <div className="h-[4px] bg-[#D9D9D9]"></div>
    </div>
  
  )
};

export default TableRow;