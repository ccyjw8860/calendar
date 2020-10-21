import React from 'react';


function range(start, stop, step) {
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }
  
    if (typeof step == 'undefined') {
        step = 1;
    }
  
    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }
  
    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }
  
    return result;
  };


const SelectBox = () => {

    const years = range(2020, 2051, 1);
    const months = range(1, 13, 1);

    const returnValue = (e) =>{
        console.log(e.target.value);
    }

    const makeYearBox = () => {
          const basket = years.map(year => {
              return(
              <option value={year}>{year}</option>
              )
          })
      return (<select className = 'yearBox' onChange={returnValue}>{basket}</select>)
      }
    
    const makeMonthBox = () => {
          const basket = months.map(month => {
              return(
              <option value={month}>{month}</option>
              )
          })
      return(<select className='monthBox' onChange={returnValue}>{basket}</select>)
      }
    
    const yearBox = makeYearBox();
    const monthBox = makeMonthBox();

    return(
        <div className='box_container'>
            {yearBox}
            {monthBox}
        </div>
    )
}

export default SelectBox;