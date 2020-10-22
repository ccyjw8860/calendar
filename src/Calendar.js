import React from 'react';

const Calendar = ({year, month}) =>{
    const date = 1,
    dayIndex = new Date(year, month, date).getDay(),
    lastDay = new Date(year,month+1,0).getDate(),
    weeksArray = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const weeksDisplay = weeksArray.map(week=>{
        return(
        <div className='weekName'>{week}</div>
        )
    })

    let CalendarArray = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
    ]

    const makeCalendarArray = () =>{
        let basket = CalendarArray[0],
        j = 1;
        for(let i=dayIndex;i<7;i++){
            basket[i] = j;
            j++
        }
        CalendarArray[0] = basket;
        for(let i=1;i<5;i++){
            let basket = CalendarArray[i]
            for(let k=0; k<7; k++){
                if(j!==lastDay+1){
                    basket[k] = j
                    j++
                }else{
                    basket[k] = 0
                }
            }
            CalendarArray[i] = basket
        }
    }

    makeCalendarArray();

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

    const calendarDisplay = CalendarArray.map(week => {
        let basket = week.map((day, index)=> {
            let id = `day_${day}`
            if(index===0){
                return(
                    <div className='day first notselected' id={id} onClick={selectDay}>{day===0?'':day}</div>        
                )
            }else{
                return(
                    <div className='day' id={id} onClick={selectDay}>{day===0?'':day}</div>
                    )
                }
            }
        )
        return(
        <div className='week'>{basket}</div>
        )
    })
    return(
        <div>
            <div className='weekName_container'>{weeksDisplay}</div>
            {calendarDisplay}
        </div>
    );
}

export default Calendar;

