import React, {useState, useEffect} from 'react';

Array.prototype.shuffle = function () {
    var length = this.length;
    while (length) {
 
        var index = Math.floor((length--) * Math.random());
        var temp = this[length];
        this[length] = this[index];
        this[index] = temp;
    }
    return this;
};


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

const updateCalendar = (monthIndexArray,previousLastDay, weekindex) =>{
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
            }else if(monthIndexArray[week][day]===1){
                calendarArray[week][day] = sDay;
                sDay++
            }else{
                calendarArray[week][day] = nDay;
                nDay++
            }
        }
    }
    return calendarArray
}


const popupWindow = () =>{
    const ul = document.createElement('ul');
    const li_1 = document.createElement('li');
    const li_2 = document.createElement('li');
    ul.className = 'popupWindow';
    li_1.innerText = '일정 묶기';
    li_2.innerText = '계획 일괄 추가'
    li_1.id = 'clustering_btn'
    ul.appendChild(li_1);
    ul.appendChild(li_2);
    return ul
}


const Calendar = ({year, month, weekindex, previouslastday}) =>{
    const monthIndex = updateMonthIndexArray(year, month, weekindex);
    const calendar = updateCalendar(monthIndex, previouslastday, weekindex)
    const [selected, setSelected] = useState([]);
    const [cluster, setCluster] = useState([]);
    const colorClasses = ['bg_1', 'bg_2', 'bg_3', 'bg_4']
    const borderClasses = ['border_1', 'border_2', 'border_3', 'border_4']
    const [colorIdx, setColorIdx] = useState(0);

    const fade_in = (e) =>{
        const element = e.target;
        element.classList.add('fade_in');
    }

    const fade_out = (e) =>{
        const element = e.target;
        element.classList.remove('fade_in');
    }

    const dayClustering = (e) =>{
        const root = document.getElementById('root');
        const ul = document.querySelector('.popupWindow');
        setCluster([...cluster, selected]);

        selected.map((s, idx)=>{
            let target = document.getElementById(s);
            target.classList.add(colorClasses[colorIdx]);
            if(idx !== 0){
                target.classList.add(borderClasses[colorIdx]);
                let checkId = `_${s.split('_')[1]}_${Number(s.split('_')[2])-1}`
                if(checkId !== selected[idx-1]){
                    target.classList.add('border_black');
                }
            }
            if(s.split('_')[2]==="0"){
                target.classList.add('border_black');
            }
        })
        setSelected([]);
        if(colorIdx !==3){
            setColorIdx(colorIdx + 1);
        }else{
            setColorIdx(0);
        }
        root.removeChild(ul);
    }

    const leftClick = (e) =>{
        console.log('왼쪽 클릭')
        const classes = e.target.classList.value;
        const root = document.querySelector('#root');
        const ul = document.querySelector('.popupWindow')
        if(root.lastElementChild === ul){
            root.removeChild(ul);
        }
        if(classes.includes('selected')){
            e.target.classList.remove('selected');
            let result = [];
            result = selected.filter(tomato=>{return(tomato!==e.target.id)});
            setSelected(result);
        }else{
            e.target.classList.add('selected')
            setSelected([...selected, e.target.id].sort());
        }
    }
    
    const rightClick = e =>{
        console.log('오른쪽 클릭')
        const element = e.target;
        const topPosition = `${e.clientY}px`;
        const leftPosition = `${e.clientX}px`;
        const classes = element.classList.value;
        const root = document.querySelector('#root');
        const lastElement = root.lastElement;
        const ul = popupWindow();
    
        if(root.lastElementChild === lastElement){
            root.removeChild(lastElement);
        }
    
        e.preventDefault();
        ul.style.top = topPosition;
        ul.style.left = leftPosition;
    
        if(classes.includes('selected')){
            root.appendChild(ul);
        }
        
        const clusterBtn = document.getElementById('clustering_btn')
        if(clusterBtn !== null){
            clusterBtn.addEventListener('click', dayClustering);
        }
    }
    
    const initStateAndHtml = () =>{
        setSelected([]);
        setCluster([]);
        const days = document.querySelectorAll('.day');
        for(let i=0;i<days.length;i++){
            for(let j=0;j<colorClasses.length;j++){
                days[i].classList.remove(colorClasses[j]);
                days[i].classList.remove(borderClasses[j]);
            }
            days[i].classList.remove('selected');
        }
    }

    useEffect(initStateAndHtml, [weekindex, year, month]);

    return (
        <div className='calendar_container'>
            {calendar.map((week, w_idx)=>{
                return(
                <div className='week_container'>{week.map((day, d_idx)=>{
                    let id = `_${w_idx}_${d_idx}`
                    if(monthIndex[w_idx][d_idx] === 1){
                        return(
                        <div className='current_month day' id={id} onClick={leftClick} onContextMenu={rightClick} onMouseEnter={fade_in} onMouseLeave={fade_out}>{day}</div>
                            )
                    }else{
                        return(<div className='not_current_month day' id={id} onClick={leftClick} onContextMenu={rightClick} onMouseEnter={fade_in} onMouseLeave={fade_out}>{day}</div>)
                    }
                })}</div>
                )
            })}
        </div>
    )

}

export default Calendar;

