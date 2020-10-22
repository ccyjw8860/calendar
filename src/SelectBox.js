import React from 'react';
import Calendar from './Calendar'

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

const years = range(2020,2051,1),
months = range(0,12,1),
today = new Date(),
init_year = today.getFullYear()
let init_month = today.getMonth()

class SelectBox extends React.Component{  
    state = {
        year: init_year,
        month:init_month,
    }

    returnYear = (e) =>{
        this.setState({year:Number(e.target.value)});
    }

    returnMonth = (e) =>{
        this.setState({month:Number(e.target.value)})
    }

    render(){
        const yearBasket = years.map(year => {
            return(
            <option value={year}>{year}</option>
            )
        })
        const monthBasket = months.map(month => {
            return(
                <option value={month} selected={month === this.state.month}>{month+1}</option>
                )
        })
        return(
        <div className='calendar'>
            <div className='box_container'>
            <select className = 'yearBox' onChange={this.returnYear}>{yearBasket}</select>
            <span className='text_unit'>년</span>
            <select className = 'monthBox' onChange={this.returnMonth}>{monthBasket}</select>
            <span className='text_unit'>월</span>
            </div>
            <div className='calendar_container'>
                <Calendar year={this.state.year} month={this.state.month}/>
            </div>
        </div>
        )
    }
}

export default SelectBox;