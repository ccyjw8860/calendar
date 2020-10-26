import React, {useState} from 'react';

Array.prototype.shuffle = function () {
    var length = this.length;
    
    // 아래에서 length 후위 감소 연산자를 사용하면서 결국 0이된다.
    // 프로그래밍에서 0은 false를 의미하기에 0이되면 종료.
    while (length) {
 
        // 랜덤한 배열 index 추출
        var index = Math.floor((length--) * Math.random());
 
        // 배열의 끝에서부터 0번째 아이템을 순차적으로 대입
        var temp = this[length];
 
        // 랜덤한 위치의 값을 맨뒤(this[length])부터 셋팅
        this[length] = this[index];
 
        // 랜덤한 위치에 위에 설정한 temp값 셋팅
        this[index] = temp;
    }
 
    // 배열을 리턴해준다.
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

const Calendar = ({year, month, weekindex, previouslastday}) =>{
    const monthIndex = updateMonthIndexArray(year, month, weekindex);
    const calendar = updateCalendar(monthIndex, previouslastday, weekindex)
    const [selected, setSelected] = useState([]);
    const [cluster, setCluster] = useState([])

    const fade_in = (e) =>{
        const element = e.target;
        element.classList.add('fade_in');
    }

    const fade_out = (e) =>{
        const element = e.target;
        element.classList.remove('fade_in');
    }

    const leftClick = (e) =>{
        console.log('왼쪽클릭');
        const classes = e.target.classList.value;
        if(classes.includes('selected')){
            e.target.classList.remove('selected');
            let result = [];
            result = selected.filter(tomato=>{return(tomato!==e.target.id)});
            setSelected(result);
        }else{
            e.target.classList.add('selected')
            setSelected([...selected, e.target.id]);
        }
    }

    const rightClick = e =>{
        console.log('오른쪽클릭');
        const element = e.target;
        const classes = element.classList.value;
        const colors = ['#F6C5D6', '#C5D2F6', '#F6F4C5', '#C5F6DB']
        const color = colors.shuffle()[0]
        e.preventDefault();
        if(classes.includes('selected')){
            if(classes.includes('clustered')){
                element.classList.remove('clustered');
                setCluster(cluster.filter(c=>{return(!c.includes(e.target.id))}))
            }else{
                setCluster([...cluster, selected]);
                for(let i=0;i<selected.length;i++){
                    let basket = document.querySelector(`#${selected[i]}`)
                    basket.classList.remove('selected');
                    basket.classList.add('clustered');
                    basket.style.backgroundColor = color;
                }
                setSelected([]);
            }
        }

    }

    console.log(cluster);
    console.log(selected);

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

