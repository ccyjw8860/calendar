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

function arrayIncludes(arr, testArr){
    for(var i = 0; i<arr.length; i++){
        let checker = []
        for(var j = 0; j<arr[i].length; j++){
            if(arr[i][j] === testArr[j]){
                checker.push(true)
            } else {
                checker.push(false)
            }
        }
        if (checker.every(check => check === true)){
            return true
        }
    }
    return false
}

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

const updateCalendar = (monthIndexArray, previousLastDay, weekindex) =>{
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

function array_equals(a, b){
    return a.length === b.length && a.every((item,idx) => item === b[idx])
}

function diff(A, B) {
    return A.filter(test => {
      return B.findIndex(item => array_equals(item,test)) == -1;
    });
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
    const [daySelected, setDaySelected] = useState([]);
    const [cSelected, setCSelected] = useState([]);
    const [cluster, setCluster] = useState([]);
    const [colorIdx, setColorIdx] = useState(0);
    const colorClasses = ['bg_1', 'bg_2', 'bg_3', 'bg_4']
    const borderClasses = ['border_1', 'border_2', 'border_3', 'border_4']

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
        setCluster([...cluster, daySelected]);

        daySelected.map((s, idx)=>{
            let target = document.getElementById(s);
            target.classList.remove('selected');
            target.classList.add('clustered');
            target.classList.add(colorClasses[colorIdx]);
            if(idx !== 0){
                target.classList.add(borderClasses[colorIdx]);
                let checkId = `_${s.split('_')[1]}_${Number(s.split('_')[2])-1}`
                if(checkId !== daySelected[idx-1]){
                    target.classList.add('border_black');
                }
            }
            if(s.split('_')[2]==="0"){
                target.classList.add('border_black');
            }
        })
        setDaySelected([]);
        if(colorIdx !==3){
            setColorIdx(colorIdx + 1);
        }else{
            setColorIdx(0);
        }
        root.removeChild(ul);
    }

    const removeClustering = () =>{
        const root = document.getElementById('root');
        const ul = document.querySelector('.popupWindow');
        root.removeChild(ul);
        cSelected.map(c1=>{
            c1.map(c2=>{
                let element = document.getElementById(c2);
                element.style.opacity = 1;
                if(element.classList.value.includes('not')){
                    element.className = 'not_current_month day';
                }else{
                    element.className = 'current_month day';
                }
            })
        })
        const res = diff(cluster, cSelected);
        setCSelected([]);
        setCluster(res);
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
            result = daySelected.filter(tomato=>{return(tomato!==e.target.id)});
            setDaySelected(result);
        }else{
            if(!classes.includes('clustered')){
                e.target.classList.add('selected');
                setDaySelected([...daySelected, e.target.id].sort());
            }else{
                const id = e.target.id;
                const basket = cluster.filter(c=>{
                    return(c.includes(id));
                }).flat();
                if(arrayIncludes(cSelected, basket)){
                    basket.map(b=>{
                        let element = document.getElementById(b);
                        element.style.opacity=1;
                        element.classList.remove('cluster_s');                       
                    })
                    let res = diff(cSelected, [basket]);
                    setCSelected(res);
                }else{
                    basket.map(b=>{
                        let element = document.getElementById(b);
                        element.style.opacity=0.5;
                        element.classList.add('cluster_s');
                    })
                    setCSelected([...cSelected, basket]);
                }
            }
        }
    }

    const rightClick = e =>{
        e.preventDefault();
        console.log('오른쪽 클릭')
        const element = e.target;
        const topPosition = `${e.clientY}px`;
        const leftPosition = `${e.clientX}px`;
        const classes = element.classList.value;
        const root = document.querySelector('#root');
        const lastElement = document.querySelector('.popupWindow')
        const ul = popupWindow();
        if(root.lastElementChild === lastElement){
            root.removeChild(lastElement);
        }

        ul.style.top = topPosition;
        ul.style.left = leftPosition;
        
        if(classes.includes('selected')){
            root.appendChild(ul);
        }
        
        if(element.classList.value.includes('clustered')){
            if(element.classList.value.includes('cluster_s')){
                root.appendChild(ul);
                const clusterBtn = document.getElementById('clustering_btn');
                if(clusterBtn !== null){
                    clusterBtn.innerText = '묶음 해제';
                    clusterBtn.addEventListener('click', removeClustering);
                }
            }
        }else{
            const clusterBtn = document.getElementById('clustering_btn')
            if(clusterBtn !== null){
                clusterBtn.addEventListener('click', dayClustering);
            }
        }
    }
    
    const initStateAndHtml = () =>{
        setDaySelected([]);
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
                        <div className='current_month day' id={`${year}_${month}_${day}_|${id}`} onClick={leftClick} onContextMenu={rightClick} onMouseEnter={fade_in} onMouseLeave={fade_out}>{day}</div>
                            )
                    }else if(monthIndex[w_idx][d_idx] === 0){
                        return(<div className='not_current_month day' id={`${year}_${month-1}_${day}_|${id}`} onClick={leftClick} onContextMenu={rightClick} onMouseEnter={fade_in} onMouseLeave={fade_out}>{day}</div>)
                    }else{
                        return(<div className='not_current_month day' id={`${year}_${month+1}_${day}_|${id}`} onClick={leftClick} onContextMenu={rightClick} onMouseEnter={fade_in} onMouseLeave={fade_out}>{day}</div>)
                    }
                })}</div>
                )
            })}
        </div>
    )
}



export default Calendar;

