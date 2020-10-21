import React from 'react';
import Calendar from './Calendar'
import './index.css';
import SelectBox from './SelectBox';

class App extends React.Component{
  state = {
    year:2020,
    month:1,
  }

  render(){
    console.log('RENDERED!')
    return(
      <div className='calendar'>
      <div>
        <SelectBox/>
      </div>
      <div>
      <Calendar/>  
      </div>
    </div>
    )
  }
}

export default App;
