import React from 'react';

const Calendar = (year, date) =>{
    const CalendarArray = [
        [1,2,3,4,5,6,7],
        [8,9,10,11,12,13,14],
        [15,16,17,18,19,20,21],
        [22,23,24,25,26,27,28],
        [29,30]
    ]

    const selectDay = (e) =>{
        if(e.target.classList.contains('first')){
            if(e.target.classList.contains('notselected')){
                e.target.classList.remove('notselected');
                e.target.classList.add('firstselected');
            }else{
                e.target.classList.remove('firstselected');
                e.target.classList.add('notselected');
            }
        }else{
            if(e.target.classList.contains('selected')){
                e.target.classList.remove('selected');
            }else{
                e.target.classList.add('selected');
            }
        }
    }

    const result = CalendarArray.map(week => {
        let basket = week.map((day, index)=> {
            if(index===0){
                return(
                    <div className='day first notselected' onClick={selectDay}>{day}</div>        
                )
            }else{
                return(
                    <div className='day' onClick={selectDay}>{day}</div>
                    )
            }
        })
        return(
        <div className='week'>{basket}</div>
        )
    })
    return(
        <div>
            {result}
        </div>
    );
}

export default Calendar;

