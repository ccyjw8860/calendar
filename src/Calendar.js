import React, {useState} from 'react';


const updateMonthIndexArray = (year, month, weekIndex) => {
    let monthIndexArray = [[1,1,1,1,1,1,1],
                           [1,1,1,1,1,1,1],
                           [1,1,1,1,1,1,1],
                           [1,1,1,1,1,1,1],
                           [1,1,1,1,1,1,1]]

    const nextFirstDayIndex = new Date(year, month+1, 1).getDay();
    if(weekIndex !== 0){
        for(let day=0; day<weekIndex; day++){
            monthIndexArray[0][day] = 0;
        }
    }

    if(nextFirstDayIndex !== 0){
        for(let day=nextFirstDayIndex; day<7; day++){
            monthIndexArray[monthIndexArray.length-1][day] = 2;
        } 
    }

    return monthIndexArray;
}

const updateCalendar = (monthIndexArray, currentLastDay, previousLastDay, weekindex) =>{
    let sDay = 1;
    let pFirstDay = previousLastDay - weekindex + 1;
    let nDay = 1;
    let calendarArray = [[0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0]];
    
    for(let week=0; week<5; week++){
        for(let day=0; day<7; day++){
            if(monthIndexArray[week][day]===0){
                calendarArray[week][day] = pFirstDay;
                pFirstDay++
            }else if()
        }
    }
}


const Calendar = ({year, month, weekindex, currentlastday, previouslastday}) =>{
    const monthIndex = updateMonthIndexArray(year, month, weekindex)
    console.log(monthIndex);

    return (
        <div>
            <button></button>
        </div>
    )
}

export default Calendar;

