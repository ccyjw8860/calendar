import React, {useState, useEffect} from 'react';
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


const SelectBox = () =>{
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());
    const [weekIndex, setWeekIndex] = useState(0);
    const [previousLastDay, setPreviousLastDay] = useState(0);
    const yearList = range(2020,2051, 1);
    const monthList = range(0, 12, 1);

    const returnYear = (e) =>{
        const value = e.target.value;
        setYear(Number(value));
    }

    const returnMonth = (e) =>{
        const value = e.target.value;
        setMonth(Number(value));
    }

    const updateProps = () =>{
        const thisWeekIndex = new Date(year, month, 1).getDay();
        const thisPreviousLastDay = new Date(year, month, 0).getDate();
        setWeekIndex(thisWeekIndex);
        setPreviousLastDay(thisPreviousLastDay);
    }

    useEffect(updateProps, [year, month]);

    const yearBox = yearList.map(year=>{
    return(<option value={year}>{year}</option>)
    })

    const monthBox = monthList.map(element => {
    return(<option value={element} selected={month===element}>{element+1}</option>)
    })

    return(
        <div className = 'calendar'>
            <div className='selectbox_container'>
                <select className='yearBox' onChange = {returnYear}>
                    {yearBox}
                </select>
                <select className='monthBox' onChange = {returnMonth}>
                    {monthBox}
                </select>
            </div>
            <Calendar year={year} month={month} weekindex = {weekIndex} previouslastday = {previousLastDay}/>
        </div>
    )
}

export default SelectBox;